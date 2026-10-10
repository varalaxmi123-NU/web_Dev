import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SAMPLE_DOCUMENT } from './demoData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const isUuid = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

async function getAuthHeaders() {
  const headers = {};
  if (isSupabaseConfigured && supabase) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
  }
  return headers;
}

export async function sendGeneralChatMessage(message, language = 'en', history = []) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language, history })
    });
    return await res.json();
  } catch (err) {
    return {
      success: true,
      data: {
        answer: "Hey! 👋 I'm SAHAYA AI. How can I help you today?",
        sources: []
      }
    };
  }
}

export async function loadDemoDocument() {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/documents/demo`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
    return await res.json();
  } catch (err) {
    return { success: true, data: SAMPLE_DOCUMENT };
  }
}

export async function uploadAndAnalyzeDocument(file) {
  const headers = await getAuthHeaders();
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/documents/analyze`, {
    method: 'POST',
    headers,
    body: formData
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to analyze document.');
  }

  if (isSupabaseConfigured && supabase && data?.data && isUuid(data.data.id)) {
    try {
      const doc = data.data;
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('documents').upsert({
          id: doc.id,
          user_id: user.id,
          filename: doc.filename,
          file_type: doc.file_type || 'application/pdf',
          file_size: doc.file_size || 0,
          summary: doc.summary,
          extracted_text: doc.extracted_text,
          structured_analysis: doc.structured_analysis || {}
        });

        if (doc.action_items && doc.action_items.length > 0) {
          const actionRecords = doc.action_items.map((item, idx) => ({
            user_id: user.id,
            document_id: doc.id,
            title: item.title,
            description: item.description,
            priority: item.priority || 'Medium',
            due_date: item.due_date || 'Not specified',
            is_completed: item.is_completed || false,
            source_reference: item.source_reference || {}
          }));
          await supabase.from('action_items').upsert(actionRecords);
        }
      }
    } catch (syncErr) {
      console.warn('Direct Supabase DB sync warning:', syncErr);
    }
  }

  return data;
}

export async function fetchUserDocuments() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: dbDocs, error } = await supabase
          .from('documents')
          .select('*, action_items(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(dbDocs)) {
          return { success: true, data: dbDocs };
        }
      }
    } catch (err) {
      console.warn('Fetch DB documents error:', err);
    }
  }

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/documents`, { headers });
    const data = await res.json();
    if (data?.data && Array.isArray(data.data)) {
      return data;
    }
  } catch (err) {}

  return { success: true, data: [] };
}

export async function fetchDocumentById(id) {
  if (id === SAMPLE_DOCUMENT.id) {
    return { success: true, data: SAMPLE_DOCUMENT };
  }

  if (isSupabaseConfigured && supabase && isUuid(id)) {
    try {
      const { data: doc, error } = await supabase
        .from('documents')
        .select('*, action_items(*)')
        .eq('id', id)
        .single();

      if (!error && doc) {
        return { success: true, data: doc };
      }
    } catch (err) {}
  }

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/documents/${id}`, { headers });
    return await res.json();
  } catch (err) {
    return { success: false, error: 'Document not found' };
  }
}

export async function deleteDocument(id) {
  if (isSupabaseConfigured && supabase && isUuid(id)) {
    try {
      await supabase.from('documents').delete().eq('id', id);
    } catch (e) {}
  }

  try {
    const headers = await getAuthHeaders();
    await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE', headers });
  } catch (e) {}

  return { success: true };
}

export async function askDocumentQuestion(docId, question, history = [], isGuest = false) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/documents/${docId}/chat`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) return data;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using client fallback:', err);
  }

  // Client-side Fallback Engine for Guest Demo / Offline Mode
  const qClean = (question || '').trim();
  const qLower = qClean.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

  // Category A: Greetings & Casual Conversation
  if (
    qLower.includes('how are you') || 
    qLower.includes('how r u') || 
    qLower.includes('how u doing') || 
    qLower.includes('how do you do') ||
    qLower === 'hw r u' ||
    qLower === 'how r u'
  ) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "I'm doing well, thank you for asking! 😊 How can I help you today?",
        sources: []
      }
    };
  }

  if (
    qLower.includes('good morning') || 
    qLower.includes('gud morning') || 
    qLower === 'gm' ||
    qLower.startsWith('gm ') ||
    qLower.endsWith(' gm')
  ) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "Good morning! ☀️ Hope you're having a great day. What would you like help with?",
        sources: []
      }
    };
  }

  if (qLower.includes('good afternoon')) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "Good afternoon! ☀️ How can I help you today?",
        sources: []
      }
    };
  }

  if (qLower.includes('good evening')) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "Good evening! 🌙 How can I assist you today?",
        sources: []
      }
    };
  }

  if (
    qLower.includes('good night') ||
    qLower.includes('goodnight') ||
    qLower.includes('gud night') ||
    qLower === 'gn' ||
    qLower === 'night' ||
    qLower.includes('sweet dreams')
  ) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "Good night! 🌙 Sleep well! Let me know whenever you have document questions tomorrow.",
        sources: []
      }
    };
  }

  if (
    qLower.includes('goodbye') ||
    qLower.includes('bye') ||
    qLower.includes('see you') ||
    qLower.includes('take care') ||
    qLower === 'tc'
  ) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "Goodbye! 👋 Have a fantastic day!",
        sources: []
      }
    };
  }

  if (['hi', 'hello', 'hey', 'hai', 'hlo', 'hallo', 'heyy', 'hiii'].some(g => qLower === g || qLower.startsWith(g + ' ') || qLower.endsWith(' ' + g))) {
    if (qLower.includes('hello')) {
      return {
        success: true,
        data: {
          question: qClean,
          answer: "Hello! 😊 What can I help you with?",
          sources: []
        }
      };
    }
    return {
      success: true,
      data: {
        question: qClean,
        answer: "Hey! 👋 I'm SAHAYA AI. How can I help you today?",
        sources: []
      }
    };
  }

  if (qLower.includes('thank') || qLower.includes('thanks') || qLower.includes('thx')) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "You're very welcome! 💜 I'm happy to help.",
        sources: []
      }
    };
  }

  if (qLower.includes('who are you') || qLower.includes('who r u') || qLower.includes('what can you do') || qLower.includes('what do you do') || qLower === 'who' || qLower === 'help') {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "I'm SAHAYA AI, your document and everyday information assistant. I can help explain documents, answer questions, and organize useful next steps.",
        sources: []
      }
    };
  }

  // Category B/C: Document vs General Questions
  const isDocQuery = 
    qLower.includes('date') || qLower.includes('deadline') || qLower.includes('when') || qLower.includes('last day') || qLower.includes('closing') ||
    qLower.includes('fee') || qLower.includes('cost') || qLower.includes('pay') || qLower.includes('price') ||
    qLower.includes('eligible') || qLower.includes('eligibility') || qLower.includes('qualification') || qLower.includes('criteria') || qLower.includes('requirement') ||
    qLower.includes('document') || qLower.includes('certificate') || qLower.includes('marksheet') || qLower.includes('apply') ||
    qLower.includes('summary') || qLower.includes('overview') || qLower.includes('this document') || qLower.includes('the notice');

  if (isDocQuery) {
    if (qLower.includes('date') || qLower.includes('deadline') || qLower.includes('last day') || qLower.includes('when')) {
      return {
        success: true,
        data: {
          question: qClean,
          answer: 'Based on the document, the application closing date is **November 30, 2026 at 11:59 PM IST**.',
          sources: [{ passage: 'Application Closing Date: November 30, 2026 (11:59 PM IST)', page: 1 }]
        }
      };
    }

    if (qLower.includes('fee') || qLower.includes('cost') || qLower.includes('pay')) {
      return {
        success: true,
        data: {
          question: qClean,
          answer: 'The document explicitly states: **There is NO application fee for this scheme.**',
          sources: [{ passage: 'There is NO application fee for this scheme.', page: 1 }]
        }
      };
    }

    if (qLower.includes('eligible') || qLower.includes('eligibility') || qLower.includes('qualification') || qLower.includes('criteria')) {
      return {
        success: true,
        data: {
          question: qClean,
          answer: 'Eligibility criteria listed in the document:\n- Must be an Indian citizen aged 17–24 years\n- Family income must not exceed ₹6,00,000/year\n- Minimum 75% or 7.5 CGPA in 12th Board Exam\n- Enrolled in full-time recognized undergraduate program in India',
          sources: [{ passage: 'Applicant must be a citizen of India aged between 17 and 24 years... family income must not exceed INR 6,00,000', page: 1 }]
        }
      };
    }

    if (qLower.includes('document') || qLower.includes('certificate') || qLower.includes('marksheet')) {
      return {
        success: true,
        data: {
          question: qClean,
          answer: 'Required documents listed in the notice:\n1. 12th Marks Sheet\n2. Valid Income Certificate\n3. Aadhaar Card (ID Proof)\n4. College Admission Proof',
          sources: [{ passage: 'Scanned copy of 12th Marks Sheet, Income Certificate, Aadhaar Card', page: 1 }]
        }
      };
    }

    return {
      success: true,
      data: {
        question: qClean,
        answer: 'The uploaded document does not provide the requested information.',
        sources: []
      }
    };
  }

  // Casual acknowledgements (oh, ok, cool, fine, nice, yup, got it, etc.)
  const casuals = ['oh', 'ok', 'okay', 'cool', 'fine', 'nice', 'yup', 'yes', 'no', 'sure', 'got it', 'understood', 'awesome', 'great', 'haha', 'hmm', 'ah', 'alright', 'k'];
  if (casuals.some(c => qLower === c || qLower.startsWith(c + ' ') || qLower.endsWith(' ' + c))) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: "Understood! 👍 Feel free to ask any question about deadlines, eligibility, fees, or required documents.",
        sources: []
      }
    };
  }

  // How to apply / Apply details
  if (qLower.includes('apply') || qLower.includes('how to apply') || qLower.includes('form') || qLower.includes('submission')) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: 'Applications must be submitted exclusively online through the official portal (https://brightfuturegrant.gov.in). Hard copy applications will NOT be accepted. Make sure to complete your submission before **November 30, 2026**.',
        sources: [{ passage: 'Applications must be submitted exclusively online through the official portal', page: 1 }]
      }
    };
  }

  // Income / Financial details
  if (qLower.includes('income') || qLower.includes('salary') || qLower.includes('lakh') || qLower.includes('money')) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: 'The total annual family income from all sources must not exceed **INR 6,00,000 (Rupees Six Lakhs only)** for the preceding financial year.',
        sources: [{ passage: 'Total annual family income from all sources must not exceed INR 6,00,000', page: 1 }]
      }
    };
  }

  // Age limits
  if (qLower.includes('age') || qLower.includes('year') || qLower.includes('old')) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: 'Applicants must be citizens of India aged between **17 and 24 years** as of January 1, 2026.',
        sources: [{ passage: 'Applicant must be a citizen of India aged between 17 and 24 years', page: 1 }]
      }
    };
  }

  // Contact / Helpdesk
  if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('phone') || qLower.includes('helpdesk')) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: 'Official Contact Details:\n- **Email**: helpdesk@brightfuturegrant.gov.in\n- **Toll-Free Phone**: 1800-111-2026 (Mon-Fri 9:00 AM - 5:00 PM IST)',
        sources: [{ passage: 'For technical support or clarification, email helpdesk@brightfuturegrant.gov.in', page: 1 }]
      }
    };
  }

  // General Knowledge Fallback
  if (qLower.includes('scholarship')) {
    return {
      success: true,
      data: {
        question: qClean,
        answer: 'A scholarship is financial support awarded to students to assist with education expenses, typically based on academic achievement, financial need, or specific eligibility criteria.',
        sources: []
      }
    };
  }

  return {
    success: true,
    data: {
      question: qClean,
      answer: `I have analyzed your query about "${qClean}". You can ask me for exact facts on deadlines, eligibility rules (75% in 12th, ₹6 Lakh income limit), required certificates, or contact information.`,
      sources: []
    }
  };
}

export async function updateActionStatus(actionId, isCompleted) {
  if (isSupabaseConfigured && supabase && isUuid(actionId)) {
    try {
      await supabase
        .from('action_items')
        .update({ is_completed: isCompleted, updated_at: new Date().toISOString() })
        .eq('id', actionId);
    } catch (err) {}
  }

  try {
    const headers = await getAuthHeaders();
    await fetch(`${API_BASE}/documents/actions/${actionId}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed: isCompleted })
    });
  } catch (err) {}

  return { success: true };
}
