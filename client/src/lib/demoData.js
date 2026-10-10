export const SAMPLE_DOCUMENT = {
  id: 'demo-doc-bright-future-2026',
  filename: 'National_Bright_Future_Grant_2026_Notice.pdf',
  file_type: 'application/pdf',
  file_size: 245000,
  analysis_status: 'completed',
  is_demo: true,
  disclaimer: 'Fictional demonstration document — not an actual scholarship.',
  extracted_text: `NATIONAL BRIGHT FUTURE HIGHER EDUCATION GRANT 2026
OFFICIAL ANNOUNCEMENT & GUIDELINES
Ref No: NBF/GRANT/2026/8892

1. SCHEME OBJECTIVE
The Ministry of Higher Education announces the National Bright Future Higher Education Grant 2026 to support meritorious students pursuing undergraduate degrees in engineering, medicine, science, and humanities.

2. ELIGIBILITY CRITERIA
- Applicant must be a citizen of India aged between 17 and 24 years as of January 1, 2026.
- Total annual family income from all sources must not exceed INR 6,00,000 (Rupees Six Lakhs only) for the preceding financial year.
- Must have scored a minimum of 75% marks or 7.5 CGPA in the 12th Standard Board Examination.
- Must be enrolled in a full-time recognized undergraduate program in India for the academic year 2026-2027.

3. FINANCIAL ASSISTANCE
Selected scholars will receive financial assistance of INR 50,000 per academic year towards tuition fees and learning material.

4. IMPORTANT DEADLINES & TIMELINE
- Online Application Starts: October 1, 2026
- Application Closing Date: November 30, 2026 (11:59 PM IST)
- Document Verification Deadline: December 15, 2026
- Final Merit List Announcement: January 15, 2027

5. APPLICATION FEE
There is NO application fee for this scheme. Beware of fraudulent agents claiming processing fees.

6. MANDATORY REQUIRED DOCUMENTS
- Valid Aadhaar Card or National ID proof.
- Official Income Certificate issued by competent authority (Tahsildar/Gazetted Officer) after April 1, 2026.
- Certified 12th Class Mark Sheet and Passing Certificate.
- Enrolment Certificate / Admission Letter from current College/University.
- Active Bank Account details (Passbook first page copy or cancelled cheque linked to Aadhaar).

7. HOW TO APPLY
Applications must be submitted exclusively online through the official portal (https://brightfuturegrant.gov.in). Hard copy applications will NOT be accepted.

8. CONTACT & HELPDESK
For technical support or clarification, email helpdesk@brightfuturegrant.gov.in or call Toll-Free 1800-111-2026 (Mon-Fri 9:00 AM - 5:00 PM IST).`,
  
  summary: 'The National Bright Future Higher Education Grant 2026 provides ₹50,000/year to Indian undergraduate students aged 17-24 with family income under ₹6 Lakhs and at least 75% in 12th grade. Applications close on November 30, 2026, and must be submitted online.',

  structured_analysis: {
    purpose: 'To provide financial assistance of ₹50,000/year to undergraduate students pursuing technical and general higher education degrees.',
    
    key_information: {
      financial_assistance: 'INR 50,000 per academic year',
      application_fee: 'No fee (Free of cost)',
      application_mode: 'Exclusively online via official portal',
      contact_email: 'helpdesk@brightfuturegrant.gov.in',
      contact_phone: '1800-111-2026 (Mon-Fri 9 AM - 5 PM IST)'
    },

    eligibility_criteria: [
      { rule: 'Indian citizenship', passage: 'Applicant must be a citizen of India aged between 17 and 24 years as of January 1, 2026.', page: 1 },
      { rule: 'Age: 17 to 24 years', passage: 'aged between 17 and 24 years as of January 1, 2026.', page: 1 },
      { rule: 'Family income <= ₹6,00,000/year', passage: 'Total annual family income from all sources must not exceed INR 6,00,000', page: 1 },
      { rule: '12th standard score >= 75% or 7.5 CGPA', passage: 'minimum of 75% marks or 7.5 CGPA in the 12th Standard Board Examination.', page: 1 },
      { rule: 'Enrolled in full-time recognized UG program', passage: 'enrolled in a full-time recognized undergraduate program in India', page: 1 }
    ],

    deadlines: [
      { event: 'Online Application Closing Date', date: 'November 30, 2026 (11:59 PM IST)', page: 1, explicit: true },
      { event: 'Document Verification Deadline', date: 'December 15, 2026', page: 1, explicit: true },
      { event: 'Final Merit List Announcement', date: 'January 15, 2027', page: 1, explicit: true }
    ],

    required_documents: [
      { doc: 'Valid Aadhaar Card', required: true, details: 'National ID proof' },
      { doc: 'Income Certificate', required: true, details: 'Issued after April 1, 2026 by Tahsildar/Gazetted Officer' },
      { doc: '12th Mark Sheet & Certificate', required: true, details: 'Certified copy' },
      { doc: 'College Admission Letter / Enrolment Certificate', required: true, details: 'Proof of current UG enrollment' },
      { doc: 'Aadhaar-linked Bank Account details', required: true, details: 'Cancelled cheque or passbook copy' }
    ],

    things_to_double_check: [
      'Ensure your Income Certificate is issued AFTER April 1, 2026, or your application will be rejected.',
      'Verify that your bank account is linked to your Aadhaar number for direct benefit transfer.',
      'Confirm with your college office if hard copies are needed locally, though official notice states online only.'
    ]
  },

  action_items: [
    {
      id: 'action-1',
      title: 'Obtain Official Income Certificate',
      description: 'Visit local Tahsildar office or online revenue portal to obtain income certificate issued after April 1, 2026 (family income < ₹6 Lakhs).',
      priority: 'High',
      due_date: 'November 20, 2026',
      is_completed: false,
      source_reference: { passage: 'Official Income Certificate issued by competent authority (Tahsildar/Gazetted Officer) after April 1, 2026.', page: 1 }
    },
    {
      id: 'action-2',
      title: 'Get Enrolment Certificate from College',
      description: 'Request signed enrollment certificate or admission verification letter from your college administration office.',
      priority: 'High',
      due_date: 'November 25, 2026',
      is_completed: false,
      source_reference: { passage: 'Enrolment Certificate / Admission Letter from current College/University.', page: 1 }
    },
    {
      id: 'action-3',
      title: 'Verify Aadhaar-Bank Account Linking',
      description: 'Check bank account status to confirm Aadhaar NPCI seeding for direct grant credit.',
      priority: 'Medium',
      due_date: 'November 28, 2026',
      is_completed: false,
      source_reference: { passage: 'Active Bank Account details (Passbook first page copy or cancelled cheque linked to Aadhaar).', page: 1 }
    },
    {
      id: 'action-4',
      title: 'Submit Online Application on Official Portal',
      description: 'Complete form and upload scanned documents at https://brightfuturegrant.gov.in before 11:59 PM IST.',
      priority: 'High',
      due_date: 'November 30, 2026 (11:59 PM IST)',
      is_completed: false,
      source_reference: { passage: 'Application Closing Date: November 30, 2026 (11:59 PM IST)', page: 1 }
    }
  ],

  sample_chats: [
    {
      question: 'What is the last date to apply?',
      answer: 'According to Section 4 of the document, the online application closing date is **November 30, 2026 at 11:59 PM IST**.',
      sources: [{ passage: 'Application Closing Date: November 30, 2026 (11:59 PM IST)', page: 1 }]
    },
    {
      question: 'Is there any application fee?',
      answer: 'No. Section 5 explicitly states that there is **NO application fee** for this scheme. The document warns applicants to beware of fraudulent agents requesting money.',
      sources: [{ passage: 'There is NO application fee for this scheme. Beware of fraudulent agents claiming processing fees.', page: 1 }]
    },
    {
      question: 'What is the income limit for eligibility?',
      answer: 'Section 2 specifies that the total annual family income from all sources must **not exceed INR 6,00,000** (Rupees Six Lakhs only) for the preceding financial year.',
      sources: [{ passage: 'Total annual family income from all sources must not exceed INR 6,00,000 (Rupees Six Lakhs only)', page: 1 }]
    }
  ]
};
