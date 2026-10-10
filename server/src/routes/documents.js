import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import { extractTextFromFile } from '../services/pdfService.js';
import { analyzeDocumentText, answerDocumentQuestion } from '../services/aiService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { SAMPLE_DOCUMENT } from '../utils/demoData.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

const guestDocumentStore = new Map();
guestDocumentStore.set(SAMPLE_DOCUMENT.id, { ...SAMPLE_DOCUMENT });

const isUuid = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

/**
 * POST /api/documents/demo
 */
router.post('/demo', authenticateToken, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Demo document loaded successfully',
      data: SAMPLE_DOCUMENT
    });
  } catch (err) {
    console.error('Demo document route error:', err);
    res.status(500).json({ success: false, error: 'Failed to load demo document' });
  }
});

/**
 * POST /api/documents/analyze
 */
router.post('/analyze', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No document file provided. Please select a PDF or text file.'
      });
    }

    const { originalname, mimetype, buffer, size } = req.file;

    let extractionResult;
    try {
      extractionResult = await extractTextFromFile(buffer, mimetype, originalname);
    } catch (extractErr) {
      return res.status(422).json({
        success: false,
        error: extractErr.message || 'Could not extract text from document.'
      });
    }

    const { text: extractedText, isScannedPdf } = extractionResult;

    if (!extractedText || extractedText.length < 20) {
      return res.status(422).json({
        success: false,
        error: 'Document contains no extractable text. If this is a scanned image or photo PDF, OCR text extraction is required.'
      });
    }

    const aiAnalysis = await analyzeDocumentText(extractedText, originalname);

    // Generate valid UUID for Supabase compatibility
    const docId = crypto.randomUUID ? crypto.randomUUID() : `doc-${Date.now()}`;

    const documentData = {
      id: docId,
      user_id: req.user.id,
      filename: originalname,
      file_type: mimetype || 'application/pdf',
      file_size: size,
      analysis_status: 'completed',
      summary: aiAnalysis.summary,
      extracted_text: extractedText,
      structured_analysis: aiAnalysis.structured_analysis,
      is_demo: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      action_items: aiAnalysis.action_items,
      isScannedPdf
    };

    if (isSupabaseConfigured && !req.user.isGuest && isUuid(docId)) {
      try {
        const { error: dbDocErr } = await supabase.from('documents').insert({
          id: docId,
          user_id: req.user.id,
          filename: originalname,
          file_type: mimetype || 'application/pdf',
          file_size: size,
          analysis_status: 'completed',
          summary: aiAnalysis.summary,
          extracted_text: extractedText,
          structured_analysis: aiAnalysis.structured_analysis,
          is_demo: false
        });

        if (dbDocErr) {
          console.warn('Supabase Document Insert Warning:', dbDocErr.message);
        } else if (aiAnalysis.action_items && aiAnalysis.action_items.length > 0) {
          const actionRecords = aiAnalysis.action_items.map((item, idx) => ({
            user_id: req.user.id,
            document_id: docId,
            title: item.title,
            description: item.description,
            priority: item.priority || 'Medium',
            due_date: item.due_date || 'Not specified',
            is_completed: false,
            source_reference: item.source_reference || {}
          }));

          await supabase.from('action_items').insert(actionRecords);
        }
      } catch (dbErr) {
        console.error('Supabase DB Sync Exception:', dbErr);
      }
    }

    guestDocumentStore.set(docId, documentData);

    return res.status(200).json({
      success: true,
      message: 'Document analyzed successfully',
      data: documentData
    });

  } catch (err) {
    console.error('Document Analyze Route Error:', err);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while analyzing the document: ' + err.message
    });
  }
});

/**
 * GET /api/documents
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (isSupabaseConfigured && !req.user.isGuest) {
      const { data: dbDocs, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false });

      if (!error && dbDocs && dbDocs.length > 0) {
        return res.status(200).json({ success: true, data: dbDocs });
      }
    }

    const userDocs = Array.from(guestDocumentStore.values()).filter(
      doc => doc.user_id === req.user.id || doc.is_demo
    );

    return res.status(200).json({ success: true, data: userDocs });
  } catch (err) {
    console.error('GET Documents Error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch documents' });
  }
});

/**
 * GET /api/documents/:id
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const docId = req.params.id;

    if (docId === SAMPLE_DOCUMENT.id) {
      return res.status(200).json({ success: true, data: SAMPLE_DOCUMENT });
    }

    if (isSupabaseConfigured && !req.user.isGuest && isUuid(docId)) {
      const { data: doc, error } = await supabase
        .from('documents')
        .select('*, action_items(*)')
        .eq('id', docId)
        .single();

      if (!error && doc) {
        return res.status(200).json({ success: true, data: doc });
      }
    }

    const memoryDoc = guestDocumentStore.get(docId);
    if (memoryDoc) {
      return res.status(200).json({ success: true, data: memoryDoc });
    }

    return res.status(404).json({ success: false, error: 'Document not found' });
  } catch (err) {
    console.error('GET Document By ID Error:', err);
    res.status(500).json({ success: false, error: 'Error loading document' });
  }
});

/**
 * DELETE /api/documents/:id
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const docId = req.params.id;

    if (isSupabaseConfigured && !req.user.isGuest && isUuid(docId)) {
      await supabase.from('documents').delete().eq('id', docId);
    }

    guestDocumentStore.delete(docId);

    return res.status(200).json({ success: true, message: 'Document deleted successfully' });
  } catch (err) {
    console.error('DELETE Document Error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete document' });
  }
});

/**
 * POST /api/documents/:id/chat
 */
router.post('/:id/chat', authenticateToken, async (req, res) => {
  try {
    const docId = req.params.id;
    const { question, history } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, error: 'Question text is required' });
    }

    let extractedText = '';
    if (docId === SAMPLE_DOCUMENT.id) {
      extractedText = SAMPLE_DOCUMENT.extracted_text;
    } else if (guestDocumentStore.has(docId)) {
      extractedText = guestDocumentStore.get(docId).extracted_text;
    } else if (isSupabaseConfigured && !req.user.isGuest && isUuid(docId)) {
      const { data: dbDoc } = await supabase.from('documents').select('extracted_text').eq('id', docId).single();
      if (dbDoc) extractedText = dbDoc.extracted_text;
    }

    const responseData = await answerDocumentQuestion(extractedText, question, history || []);

    if (isSupabaseConfigured && !req.user.isGuest && isUuid(docId) && docId !== SAMPLE_DOCUMENT.id) {
      try {
        await supabase.from('chat_messages').insert([
          { user_id: req.user.id, document_id: docId, role: 'user', content: question },
          { user_id: req.user.id, document_id: docId, role: 'assistant', content: responseData.answer, sources: responseData.sources }
        ]);
      } catch (chatErr) {
        console.warn('Chat DB insert error:', chatErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        question,
        answer: responseData.answer,
        sources: responseData.sources
      }
    });

  } catch (err) {
    console.error('Document Chat Route Error:', err);
    res.status(500).json({ success: false, error: 'Failed to answer question' });
  }
});

/**
 * PATCH /api/documents/actions/:actionId
 */
router.patch('/actions/:actionId', authenticateToken, async (req, res) => {
  try {
    const { actionId } = req.params;
    const { is_completed } = req.body;

    if (isSupabaseConfigured && !req.user.isGuest && isUuid(actionId)) {
      await supabase
        .from('action_items')
        .update({ is_completed, updated_at: new Date().toISOString() })
        .eq('id', actionId);
    }

    return res.status(200).json({
      success: true,
      message: 'Action completion status updated',
      data: { id: actionId, is_completed }
    });

  } catch (err) {
    console.error('PATCH Action Item Error:', err);
    res.status(500).json({ success: false, error: 'Failed to update action task' });
  }
});

export default router;
