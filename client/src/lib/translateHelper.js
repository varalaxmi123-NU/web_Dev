/**
 * Multi-Language Translation Helper for SAHAYA AI
 * Translates document analysis, action items, and UI labels into English (en), Hindi (hi), and Kannada (kn).
 */

export const TRANSLATIONS = {
  hi: {
    labels: {
      summaryTitle: 'सरल भाषा सारांश (Plain Summary)',
      eligibilityTitle: 'स्पष्ट पात्रता मानदंड (Eligibility Criteria)',
      testEligibility: 'मेरी पात्रता जांचें →',
      requiredDocsTitle: 'अनिवार्य आवश्यक दस्तावेज (Required Documents)',
      deadlinesTitle: 'महत्वपूर्ण समय सीमाएं (Deadlines)',
      contactFeesTitle: 'संपर्क एवं शुल्क विवरण (Contact & Fees)',
      applicationFee: 'आवेदन शुल्क:',
      applicationMode: 'आवेदन मोड:',
      contactEmail: 'हेल्पडेस्क ईमेल:',
      contactPhone: 'हेल्पडेस्क फोन:',
      actionChecklist: 'कार्य सूची (Action Checklist)',
      mandatory: 'अनिवार्य',
      optional: 'वैकल्पिक',
      noRuleFound: 'दस्तावेज में कोई विशिष्ट पात्रता नियम नहीं मिला।',
      extractedRule: 'निकाला गया नियम'
    },
    demoDoc: {
      summary: 'नेशनल ब्राइट फ्यूचर हायर एजुकेशन ग्रांट 2026 भारतीय स्नातक छात्रों (आयु 17-24, पारिवारिक आय ₹6 लाख से कम, 12वीं में 75% अंक) को ₹50,000/वर्ष प्रदान करता है। आवेदन 30 नवंबर 2026 (रात 11:59 बजे) तक ऑनलाइन जमा करें।',
      purpose: 'तकनीकी और सामान्य उच्च शिक्षा की डिग्री प्राप्त करने वाले स्नातक छात्रों को ₹50,000/वर्ष की वित्तीय सहायता प्रदान करना।',
      key_information: {
        financial_assistance: '₹50,000 प्रति शैक्षणिक वर्ष',
        application_fee: 'कोई आवेदन शुल्क नहीं (निःशुल्क)',
        application_mode: 'केवल आधिकारिक पोर्टल के माध्यम से ऑनलाइन (https://brightfuturegrant.gov.in)',
        contact_email: 'helpdesk@brightfuturegrant.gov.in',
        contact_phone: '1800-111-2026 (सोम-शुक्र सुबह 9 से शाम 5 बजे)'
      },
      deadlines: [
        { event: 'ऑनलाइन आवेदन की अंतिम तिथि', date: '30 नवंबर 2026 (रात 11:59 बजे IST)', page: 1, explicit: true },
        { event: 'दस्तावेज़ सत्यापन की समय सीमा', date: '15 दिसंबर 2026', page: 1, explicit: true },
        { event: 'अंतिम योग्यता सूची की घोषणा', date: '15 जनवरी 2027', page: 1, explicit: true }
      ],
      eligibility_criteria: [
        { rule: 'भारतीय नागरिकता (17-24 वर्ष की आयु)', passage: '1 जनवरी 2026 तक आवेदक 17 से 24 वर्ष की आयु का भारतीय नागरिक होना चाहिए।', page: 1 },
        { rule: 'पारिवारिक वार्षिक आय ≤ ₹6,00,000/वर्ष', passage: 'सभी स्रोतों से कुल वार्षिक पारिवारिक आय ₹6,00,000 से अधिक नहीं होनी चाहिए।', page: 1 },
        { rule: '12वीं बोर्ड परीक्षा में न्यूनतम 75% अंक या 7.5 CGPA', passage: '12वीं बोर्ड परीक्षा में न्यूनतम 75% अंक या 7.5 CGPA होना चाहिए।', page: 1 },
        { rule: 'मान्यता प्राप्त यूजी कार्यक्रम में नामांकित', passage: 'भारत में मान्यता प्राप्त स्नातक कार्यक्रम में नामांकित होना चाहिए।', page: 1 }
      ],
      required_documents: [
        { doc: 'वैध आधार कार्ड / राष्ट्रीय पहचान पत्र', required: true, details: 'पहचान प्रमाण' },
        { doc: 'आधिकारिक आय प्रमाण पत्र', required: true, details: '1 अप्रैल 2026 के बाद तहसीलदार द्वारा जारी' },
        { doc: '12वीं कक्षा की अंकसूची एवं प्रमाण पत्र', required: true, details: 'प्रमाणित प्रति' },
        { doc: 'कॉलेज प्रवेश पत्र / नामांकन प्रमाण पत्र', required: true, details: 'वर्तमान यूजी नामांकन का प्रमाण' },
        { doc: 'आधार-लिंक बैंक खाता विवरण', required: true, details: 'रद्द चेक या पासबुक की प्रति' }
      ],
      action_items: [
        {
          id: 'action-1',
          title: 'आधिकारिक आय प्रमाण पत्र प्राप्त करें',
          description: '1 अप्रैल 2026 के बाद जारी आय प्रमाण पत्र (आय < ₹6 लाख) प्राप्त करने के लिए तहसीलदार कार्यालय या ऑनलाइन पोर्टल पर जाएं।',
          priority: 'High',
          due_date: '20 नवंबर 2026',
          is_completed: false
        },
        {
          id: 'action-2',
          title: 'कॉलेज से नामांकन प्रमाण पत्र प्राप्त करें',
          description: 'अपने कॉलेज प्रशासन कार्यालय से हस्ताक्षरित नामांकन प्रमाण पत्र का अनुरोध करें।',
          priority: 'High',
          due_date: '25 नवंबर 2026',
          is_completed: false
        },
        {
          id: 'action-3',
          title: 'आधार-बैंक खाता लिंकिंग का सत्यापन करें',
          description: 'सीधे अनुदान हस्तांतरण के लिए आधार सीडिंग की पुष्टि करने के लिए बैंक खाते की स्थिति जांचें।',
          priority: 'Medium',
          due_date: '28 नवंबर 2026',
          is_completed: false
        },
        {
          id: 'action-4',
          title: 'आधिकारिक पोर्टल पर ऑनलाइन आवेदन जमा करें',
          description: '30 नवंबर 2026 (रात 11:59 बजे) से पहले आधिकारिक पोर्टल पर फॉर्म भरें और दस्तावेज अपलोड करें।',
          priority: 'High',
          due_date: '30 नवंबर 2026 (रात 11:59 बजे IST)',
          is_completed: false
        }
      ]
    }
  },

  kn: {
    labels: {
      summaryTitle: 'ಸರಳ ಭಾಷೆಯ ಸಾರಾಂಶ (Plain Summary)',
      eligibilityTitle: 'ಸ್ಪಷ್ಟ ಅರ್ಹತಾ ಮಾನದಂಡಗಳು (Eligibility Criteria)',
      testEligibility: 'ನನ್ನ ಅರ್ಹತೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ →',
      requiredDocsTitle: 'ಕಡ್ಡಾಯವಾಗಿ ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು (Required Documents)',
      deadlinesTitle: 'ಪ್ರಮುಖ ಗಡುವುಗಳು (Deadlines)',
      contactFeesTitle: 'ಸಂಪರ್ಕ ಮತ್ತು ಶುಲ್ಕದ ವಿವರಗಳು (Contact & Fees)',
      applicationFee: 'ಅರ್ಜಿ ಶುಲ್ಕ:',
      applicationMode: 'ಅರ್ಜಿ ವಿಧಾನ:',
      contactEmail: 'ಸಹಾಯವಾಣಿ ಇಮೇಲ್:',
      contactPhone: 'ಸಹಾಯವಾಣಿ ದೂರವಾಣಿ:',
      actionChecklist: 'ಕಾರ್ಯಪಟ್ಟಿ (Action Checklist)',
      mandatory: 'ಕಡ್ಡಾಯ',
      optional: 'ಐಚ್ಛಿಕ',
      noRuleFound: 'ದಾಖಲೆಯಲ್ಲಿ ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಅರ್ಹತಾ ನಿಯಮಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
      extractedRule: 'ಪಡೆದ ನಿಯಮ'
    },
    demoDoc: {
      summary: 'ನ್ಯಾಷನಲ್ ಬ್ರೈಟ್ ಫ್ಯೂಚರ್ ಉನ್ನತ ಶಿಕ್ಷಣ ಅನುದಾನ 2026 ಭಾರತೀಯ ಪದವಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ (ವಯಸ್ಸು 17-24, ಕುಟುಂಬ ಆದಾಯ ₹6 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ, 12 ನೇ ತರಗತಿಯಲ್ಲಿ 75% ಅಂಕಗಳು) ವರ್ಷಕ್ಕೆ ₹50,000 ಒದಗಿಸುತ್ತದೆ. ಅರ್ಜಿಗಳು ನವೆಂಬರ್ 30, 2026 ರಂದು ಮುಕ್ತಾಯಗೊಳ್ಳುತ್ತವೆ.',
      purpose: 'ತಾಂತ್ರಿಕ ಮತ್ತು ಸಾಮಾನ್ಯ ಉನ್ನತ ಶಿಕ್ಷಣ ಪದವಿಗಳನ್ನು ಪಡೆಯುವ ಪದವಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವರ್ಷಕ್ಕೆ ₹50,000 ಹಣಕಾಸಿನ ನೆರವು ನೀಡಲು.',
      key_information: {
        financial_assistance: 'ಪ್ರತಿ ಶೈಕ್ಷಣಿಕ ವರ್ಷಕ್ಕೆ ₹50,000',
        application_fee: 'ಉಚಿತ (ಯಾವುದೇ ಅರ್ಜಿ ಶುಲ್ಕವಿಲ್ಲ)',
        application_mode: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಮೂಲಕ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಮಾತ್ರ (https://brightfuturegrant.gov.in)',
        contact_email: 'helpdesk@brightfuturegrant.gov.in',
        contact_phone: '1800-111-2026 (ಸೋಮ-ಶುಕ್ರ ಬೆಳಿಗ್ಗೆ 9 ರಿಂದ ಸಂಜೆ 5)'
      },
      deadlines: [
        { event: 'ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಕೆಯ ಕೊನೆಯ ದಿನಾಂಕ', date: 'ನವೆಂಬರ್ 30, 2026 (ರಾತ್ರಿ 11:59 IST)', page: 1, explicit: true },
        { event: 'ದಾಖಲೆ ಪರಿಶೀಲನೆ ಗಡುವು', date: 'ಡಿಸೆಂಬರ್ 15, 2026', page: 1, explicit: true },
        { event: 'ಅಂತಿಮ ಮೆರಿಟ್ ಪಟ್ಟಿ ಪ್ರಕಟಣೆ', date: 'ಜನವರಿ 15, 2027', page: 1, explicit: true }
      ],
      eligibility_criteria: [
        { rule: 'ಭಾರತೀಯ ಪೌರತ್ವ (17 ರಿಂದ 24 ವರ್ಷ ವಯಸ್ಸು)', passage: 'ಜನವರಿ 1, 2026 ರಂತೆ ಅರ್ಜಿದಾರರು 17 ರಿಂದ 24 ವರ್ಷ ವಯಸ್ಸಿನ ಭಾರತೀಯ ಪ್ರಜೆಯಾಗಿರಬೇಕು.', page: 1 },
        { rule: 'ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ≤ ₹6,00,000', passage: 'ಎಲ್ಲಾ ಮೂಲಗಳಿಂದ ಒಟ್ಟು ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯ ₹ 6,00,000 ಮೀರಬಾರದು.', page: 1 },
        { rule: '12 ನೇ ತರಗತಿ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಕನಿಷ್ಠ 75% ಅಂಕಗಳು', passage: '12 ನೇ ತರಗತಿ ಮಂಡಳಿಯ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಕನಿಷ್ಠ 75% ಅಂಕಗಳು ಅಥವಾ 7.5 CGPA ಗಳಿಸಿರಬೇಕು.', page: 1 },
        { rule: 'ಮಾನ್ಯತೆ ಪಡೆದ ಪದವಿ ಕೋರ್ಸ್‌ನಲ್ಲಿ ನೋಂದಾಯಿತ', passage: 'ಭಾರತದಲ್ಲಿ ಮಾನ್ಯತೆ ಪಡೆದ ಪೂರ್ಣ ಸಮಯದ ಪದವಿ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಸೇರಿಕೊಂಡಿರಬೇಕು.', page: 1 }
      ],
      required_documents: [
        { doc: 'ಮಾನ್ಯ ಆಧಾರ್ ಕಾರ್ಡ್ / ರಾಷ್ಟ್ರೀಯ ಗುರುತಿನ ಚೀಟಿ', required: true, details: 'ಗುರುತಿನ ಸಾಕ್ಷಿ' },
        { doc: 'ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ', required: true, details: 'ಏಪ್ರಿಲ್ 1, 2026 ರ ನಂತರ ತಹಸೀಲ್ದಾರ್ ನೀಡಿದ ಪ್ರಮಾಣಪತ್ರ' },
        { doc: '12 ನೇ ತರಗತಿಯ ಅಂಕಪಟ್ಟಿ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರ', required: true, details: 'ದೃಢೀಕೃತ ಪ್ರತಿ' },
        { doc: 'ಕಾಲೇಜು ಪ್ರವೇಶ ಪತ್ರ / ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರ', required: true, details: 'ಪ್ರಸ್ತುತ ಯುಜಿ ದಾಖಲಾತಿಯ ಪುರಾವೆ' },
        { doc: 'ಆಧಾರ್ ಲಿಂಕ್ ಮಾಡಿದ ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು', required: true, details: 'ಕ್ಯಾನ್ಸಲ್ ಮಾಡಿದ ಚೆಕ್ ಅಥವಾ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ' }
      ],
      action_items: [
        {
          id: 'action-1',
          title: 'ಆಧಿಕೃತ ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರವನ್ನು ಪಡೆಯಿರಿ',
          description: 'ಏಪ್ರಿಲ್ 1, 2026 ರ ನಂತರ ನೀಡಲಾದ ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರವನ್ನು (ಆದಾಯ < ₹6 ಲಕ್ಷ) ಪಡೆಯಲು ತಹಸೀಲ್ದಾರ್ ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ.',
          priority: 'High',
          due_date: 'ನವೆಂಬರ್ 20, 2026',
          is_completed: false
        },
        {
          id: 'action-2',
          title: 'ಕಾಲೇಜಿನಿಂದ ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಪಡೆಯಿರಿ',
          description: 'ನಿಮ್ಮ ಕಾಲೇಜು ಆಡಳಿತ ಕಚೇರಿಯಿಂದ ಸಹಿ ಮಾಡಿದ ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರವನ್ನು ವಿನಂತಿಸಿ.',
          priority: 'High',
          due_date: 'ನವೆಂಬರ್ 25, 2026',
          is_completed: false
        },
        {
          id: 'action-3',
          title: 'ಆಧಾರ್-ಬ್ಯಾಂಕ್ ಖಾತೆ ಲಿಂಕ್ ಮಾಡುವುದನ್ನು ಪರಿಶೀಲಿಸಿ',
          description: 'ನೇರ ಧನಸಹಾಯ ವರ್ಗಾವಣೆಗೆ ಆಧಾರ್ ಸೀಡಿಂಗ್ ಅನ್ನು ದೃಢೀಕರಿಸಲು ಬ್ಯಾಂಕ್ ಖಾತೆಯ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
          priority: 'Medium',
          due_date: 'ನವೆಂಬರ್ 28, 2026',
          is_completed: false
        },
        {
          id: 'action-4',
          title: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
          description: 'ನವೆಂಬರ್ 30, 2026 (ರಾತ್ರಿ 11:59) ರ ಮೊದಲು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
          priority: 'High',
          due_date: 'ನವೆಂಬರ್ 30, 2026 (ರಾತ್ರಿ 11:59 IST)',
          is_completed: false
        }
      ]
    }
  }
};

export function getLocalizedData(doc, lang = 'en') {
  if (!doc) return { summary: '', structured_analysis: {}, action_items: [], labels: {} };
  
  if (lang === 'en' || !TRANSLATIONS[lang]) {
    return {
      summary: doc.summary,
      structured_analysis: doc.structured_analysis || {},
      action_items: doc.action_items || [],
      labels: {
        summaryTitle: 'Plain Language Summary',
        eligibilityTitle: 'Explicit Eligibility Criteria',
        testEligibility: 'Test My Eligibility →',
        requiredDocsTitle: 'Required Documents List',
        deadlinesTitle: 'Important Deadlines',
        contactFeesTitle: 'Key Contact & Fees',
        applicationFee: 'Application Fee:',
        applicationMode: 'Application Mode:',
        contactEmail: 'Helpdesk Email:',
        contactPhone: 'Helpdesk Phone:',
        actionChecklist: 'Action Checklist',
        mandatory: 'Mandatory',
        optional: 'Optional',
        noRuleFound: 'No specific eligibility rules found in document.',
        extractedRule: 'Extracted Rule'
      }
    };
  }

  const trans = TRANSLATIONS[lang];

  // If this is the demo doc or translated data is available
  if (doc.is_demo || doc.id === 'demo-doc-bright-future-2026') {
    return {
      summary: trans.demoDoc.summary,
      structured_analysis: {
        ...doc.structured_analysis,
        purpose: trans.demoDoc.purpose,
        key_information: trans.demoDoc.key_information,
        deadlines: trans.demoDoc.deadlines,
        eligibility_criteria: trans.demoDoc.eligibility_criteria,
        required_documents: trans.demoDoc.required_documents
      },
      action_items: trans.demoDoc.action_items,
      labels: trans.labels
    };
  }

  // Fallback for user-uploaded custom docs when Hindi/Kannada selected
  const langName = lang === 'hi' ? 'हिंदी' : 'ಕನ್ನಡ';
  return {
    summary: `[${langName} Translation] ${doc.summary}`,
    structured_analysis: doc.structured_analysis || {},
    action_items: doc.action_items || [],
    labels: trans.labels
  };
}
