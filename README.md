# 🚀 SAHAYA AI

**Complex documents. Clear answers. Confident decisions.**

> **Hackathon Theme:** AI for Everyday Life  
> **Project Type:** Full-Stack AI Document Intelligence Application  

---

## 💡 Problem Statement

Every day, students, job seekers, and families receive critical official notices, such as:
- Scholarship announcements
- College admission & fee deadlines
- Government scheme eligibility guidelines
- Bills and official legal notices

Many individuals struggle to digest lengthy, complex legalese. Misunderstanding requirements leads to missed deadlines, lost financial support, and rejected applications.

---

## ✨ SAHAYA AI Solution

**SAHAYA AI** simplifies complex documents into actionable clarity:
1. **Plain Language Summaries:** Instantly explains what a document means in plain English, Hindi, or Kannada.
2. **Zero-Hallucination Citations:** Extracts exact deadlines, fees, and requirements, pairing every item with direct text quote citations and page numbers.
3. **Interactive Eligibility Checker:** Compares user qualifications (income, age, marks) against document rules with instant pass/fail breakdowns.
4. **Persistent Action Checklist:** Generates an interactive checklist saved directly to a Supabase PostgreSQL database.
5. **Grounded Document Chat:** Answers user questions strictly using document text, stating when information is missing rather than inventing facts.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, JavaScript, Tailwind CSS v4, React Router v6, Lucide React Icons
- **Backend:** Node.js, Express.js REST API, Multer, `pdf-parse`
- **Database & Auth:** Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS)
- **AI Service:** Modular Google Gemini AI integration (`@google/generative-ai`) kept exclusively server-side

---

## 📂 Project Structure

```
sahaya-ai/
├── client/                     # Vite + React Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ActionChecklist, DocumentChat, etc.
│   │   ├── context/            # AuthContext (Supabase + Guest Demo Mode)
│   │   ├── lib/                # api.js, supabaseClient.js, demoData.js
│   │   ├── pages/              # LandingPage, DashboardPage, DocumentWorkspacePage, Auth & Settings
│   │   ├── index.css           # Tailwind design tokens & glassmorphism
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/                     # Express Backend Server
│   ├── src/
│   │   ├── config/             # Supabase server client
│   │   ├── middleware/         # Supabase JWT & Guest Auth middleware
│   │   ├── routes/             # health.js, documents.js
│   │   ├── services/           # aiService.js, pdfService.js
│   │   ├── utils/              # demoData.js (Scholarship sample)
│   │   ├── app.js
│   │   └── server.js
│   ├── test/                   # Automated backend tests
│   └── package.json
├── supabase/
│   └── schema.sql              # Complete PostgreSQL tables, RLS & trigger script
├── docs/
│   └── PITCH.md                # Hackathon pitches, demo script & judge Q&A
├── .env.example                # Sample environment configuration
└── README.md
```

---

## 🚀 Quick Setup Instructions (Beginner-Friendly)

### 1. Install Dependencies

In the root directory, install server and client packages:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### 2. Running in One-Click Demo Mode (No API Keys Required)

You can run and demonstrate the full app **immediately without configuring external keys**:

```bash
# Start backend server (Terminal 1)
cd server
npm start

# Start frontend dev server (Terminal 2)
cd client
npm run dev
```

Open `http://localhost:5173` in your browser. Click **"Explore Demo"** or **"Try Sample Analysis"** to test the entire workflow with the built-in 2026 Scholarship Notice!

---

### 3. Setting Up Supabase Database & Auth (Optional for Live Data)

1. Create a free project at [supabase.com](https://supabase.com).
2. In your Supabase Dashboard, go to **SQL Editor**.
3. Copy the contents of [`supabase/schema.sql`](file:///c:/Users/varal/Desktop/hackathon/supabase/schema.sql) and click **Run**.
4. Copy your **Project URL** and **Public Anon Key** from **Project Settings → API**.

---

### 4. Setting Up Environment Variables

Create `.env` inside `server/`:

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Create `.env` inside `client/`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🧪 Running Tests

To run automated backend tests:

```bash
cd server
npm test
```

---

## 🔒 Security & Privacy Approach

- **Server-Only Secrets:** AI API keys are stored exclusively on the backend.
- **Row Level Security (RLS):** All Supabase PostgreSQL tables restrict read/write access using `auth.uid() = user_id`.
- **Informational Disclaimer:** Clear user disclaimers that output is for informational comparison, avoiding false legal or government authority claims.

---

## 📄 License
Built for Hackathon Demonstration. All rights reserved.
