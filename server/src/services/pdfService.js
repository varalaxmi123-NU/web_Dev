import pdfParse from 'pdf-parse';

/**
 * Extracts plain text from an uploaded file buffer.
 * Supports PDF and plain text formats.
 */
export async function extractTextFromFile(fileBuffer, mimeType, originalName = '') {
  const isPdf = mimeType === 'application/pdf' || originalName.toLowerCase().endsWith('.pdf');
  const isTxt = mimeType.startsWith('text/') || originalName.toLowerCase().endsWith('.txt') || originalName.toLowerCase().endsWith('.md');

  if (isTxt) {
    const text = fileBuffer.toString('utf-8').trim();
    if (!text) {
      throw new Error('The uploaded text file is empty.');
    }
    return {
      text,
      numpages: 1,
      info: { title: originalName },
      isScannedPdf: false
    };
  }

  if (isPdf) {
    try {
      const parsed = await pdfParse(fileBuffer);
      const text = (parsed.text || '').trim();
      
      // Check if extracted text is suspiciously short (indicates scanned PDF image)
      const isScannedPdf = text.length < 50;

      return {
        text: isScannedPdf ? `[Scanned Document Warning] This document appears to be a scanned image PDF with minimal extractable text layer.\n\nExtracted snippet:\n${text}` : text,
        numpages: parsed.numpages || 1,
        info: parsed.info || {},
        isScannedPdf
      };
    } catch (err) {
      console.error('PDF parsing error:', err);
      throw new Error('Failed to parse PDF document. The file may be password-protected or corrupted.');
    }
  }

  throw new Error('Unsupported file format. Please upload a PDF (.pdf) or text document (.txt).');
}
