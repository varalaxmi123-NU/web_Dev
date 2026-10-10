# 🏆 SAHAYA AI — Hackathon Pitch & Presentation Guide

**Tagline:** Complex documents. Clear answers. Confident decisions.  
**Theme:** AI for Everyday Life  

---

## ⚡ 30-Second Elevator Pitch

> "Every day, millions of students, job seekers, and families miss out on life-changing scholarships, government schemes, and official opportunities because the documents are too complex and full of legal jargon.
> 
> **SAHAYA AI** solves this by turning confusing notices into plain-language summaries, exact deadline calendars, evidence-backed answers, and interactive action checklists. Unlike generic AI chatbots that guess or hallucinate, every claim in SAHAYA AI is anchored directly to exact text quotes and page numbers from your document. Complex documents become clear answers and confident decisions."

---

## 🎙️ 2-Minute Full Pitch

### 1. The Problem
"When a student discovers a 20-page government scholarship announcement or college notice, they face immediate anxiety:
- *Am I eligible?*
- *When is the cutoff date?*
- *Which documents do I need to get from the local government office?*
- *Is there an application fee?*

Reading through dense legalese often leads to missed deadlines or incorrect applications. Standard AI tools often invent fake dates or criteria when asked about specific local notices."

### 2. Our Solution: SAHAYA AI
"SAHAYA AI is a full-stack document intelligence application built specifically for everyday document clarity. When a user uploads a document:
1. **Plain Language Explanation:** Converts complex notices into concise summaries in English, Hindi, or Kannada.
2. **Zero-Hallucination Evidence Inspector:** Extracts dates, fees, and eligibility rules, pairing every single item with direct quotes and page citations.
3. **Interactive Eligibility Checker:** Allows users to input their income, age, and marks to automatically test whether they meet the document's explicit rules.
4. **Personalized Action Checklist:** Automatically converts required steps into an interactive checklist persisted directly in Supabase PostgreSQL.
5. **Grounded Document Chat:** Users can ask follow-up questions, and SAHAYA AI responds strictly using document facts, stating *'I couldn't find that information in the uploaded document'* whenever details are missing."

### 3. Impact & Differentiators
- **Trust-First Design:** Never invents facts or claims official authority.
- **Accessible & Multilingual:** Breaks language barriers for rural and first-generation applicants.
- **Enterprise Security:** Secured with Supabase Row Level Security (RLS) so user documents remain completely private.

---

## 🎬 3-Minute Live Demo Script for Judges

| Time | Action | What to Say |
| shadow | --- | --- |
| **0:00 - 0:30** | Open Landing Page | "Welcome to SAHAYA AI. Notice our sleek modern startup interface designed for everyday users." |
| **0:30 - 1:15** | Click **Explore Demo** | "Let's test an official 2026 Scholarship Notice. In one click, SAHAYA AI extracts the summary, ₹50,000 grant amount, and the critical Nov 30 deadline." |
| **1:15 - 1:45** | Click **Check My Eligibility** | "Watch this: when I enter ₹4.5 Lakhs income and 82% marks, SAHAYA AI compares my values against Section 2 rules and highlights exact supporting quotes." |
| **1:45 - 2:20** | Open **Action Checklist** | "Notice how required documents like the Income Certificate are organized into a checklist. I can mark them completed, and it saves to PostgreSQL." |
| **2:20 - 3:00** | Ask Question in **Document Chat** | "Let's ask: *'Is there any application fee?'* The assistant responds directly quoting Section 5: *'There is NO application fee.'*" |

---

## 🎯 Likely Judge Questions & Answers

### Q1: "How do you handle hallucination if the document text is missing an answer?"
> **Answer:** "Our server-side system prompt strictly constrains the AI model to document content only. If a user asks a question not present in the text, SAHAYA AI is explicitly programmed to return: *'I couldn't find that information in the uploaded document.'* Furthermore, every positive answer includes a clickable source quotation."

### Q2: "What happens if a user uploads a scanned image PDF?"
> **Answer:** "Our backend PDF parser analyzes text density. If a scanned image PDF without a text layer is uploaded, SAHAYA AI gracefully detects the condition and informs the user that OCR pre-processing is required rather than giving empty results."

### Q3: "How is user data secured?"
> **Answer:** "All user tables (`documents`, `action_items`, `chat_messages`) in Supabase PostgreSQL enforce Row Level Security (RLS) checked against `auth.uid()`. Cross-user data access is strictly prevented at the database level."

---

## 🛠️ Technical Architecture

```
[ Frontend: React + Vite + Tailwind CSS ]
         │
         ▼ REST API Calls (JWT / Demo Headers)
[ Backend: Node.js + Express Server ]
    ├── Multer File Processing
    ├── pdf-parse Text Extraction
    ├── Google Gemini AI Service (Server Key Safety)
    └── Supabase JS Client
         │
         ▼ Row Level Security (RLS)
[ Database: Supabase Hosted PostgreSQL ]
    ├── profiles
    ├── documents
    ├── action_items
    └── chat_messages
```
