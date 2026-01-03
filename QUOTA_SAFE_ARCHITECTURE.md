# Quota-Safe AI Chatbot Architecture

## Overview

This implementation is designed for **FREE TIER quota management** with Google Gemini API. The architecture prioritizes quota conservation while maintaining a great user experience.

## Architecture

```
┌─────────────────────────────────────┐
│      React Frontend (Port 3000)     │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   FloatingChatButton          │  │
│  │   (Bottom-right button)       │  │
│  └──────────────────────────────┘  │
│            │                         │
│            ▼                         │
│  ┌──────────────────────────────┐  │
│  │   ChatWidget                 │  │
│  │   ├─ Static welcome message  │  │
│  │   ├─ User input              │  │
│  │   └─ Debounced API calls     │  │
│  └──────────────────────────────┘  │
│            │                         │
│            ▼ POST /api/ask           │
└────────────┼─────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   Express Backend (Port 3001)       │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   POST /api/ask               │  │
│  │                              │  │
│  │   1. Check local data first   │  │
│  │   2. If match → return local  │  │
│  │   3. If unique → call Gemini  │  │
│  │   4. Handle quota errors      │  │
│  └──────────────────────────────┘  │
│            │                         │
│            ▼                         │
│  ┌──────────────────────────────┐  │
│  │   Google Gemini API          │  │
│  │   (Only for unique Qs)       │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Quota Safety Features

### 1. **No Auto-Calls on Page Load**
- Chat opens with static welcome message
- Zero API calls until user asks a question
- Saves quota for actual user interactions

### 2. **Local Data for Common Questions**
The backend checks if the question matches common patterns:

**Keywords Detected:**
- Skills: "skill", "skills", "technologies", "tech stack"
- Experience: "experience", "work", "job", "employment", "career"
- Projects: "project", "projects", "built", "created", "portfolio"

**Result:** Returns pre-written answers from `LOCAL_ANSWERS` object (NO Gemini call)

### 3. **Debounced API Calls**
- Frontend: 600ms debounce (between 500-800ms as requested)
- Prevents rapid-fire requests
- Reduces accidental duplicate calls

### 4. **Smart Routing**
```javascript
// Backend logic:
if (question matches local keywords) {
  return LOCAL_ANSWERS[matchedTopic]; // No API call
} else {
  call Gemini API; // Only for unique questions
}
```

### 5. **Graceful Quota Handling**
When quota is exceeded (429 error):
- Shows friendly message: "AI is resting right now"
- Provides local fallback answer
- No retry attempts (saves quota)

### 6. **Error Recovery**
- API key errors → fallback to local data
- Network errors → friendly error message
- Model errors → fallback to local data
- **Never retries** (prevents quota waste)

## Local Data Structure

```javascript
const LOCAL_ANSWERS = {
  skills: {
    keywords: ['skill', 'skills', 'technologies', ...],
    answer: 'Pre-written answer about skills...'
  },
  experience: {
    keywords: ['experience', 'work', 'job', ...],
    answer: 'Pre-written answer about experience...'
  },
  projects: {
    keywords: ['project', 'projects', 'built', ...],
    answer: 'Pre-written answer about projects...'
  }
};
```

## API Endpoint

**POST /api/ask**

**Request:**
```json
{
  "question": "What skills do you have?"
}
```

**Response (Local Data):**
```json
{
  "response": "Sourav's technical skills include...",
  "source": "local"
}
```

**Response (Gemini):**
```json
{
  "response": "Based on Sourav's portfolio...",
  "source": "gemini"
}
```

**Response (Quota Exceeded):**
```json
{
  "error": "AI is resting right now — here's what I can tell you instead.",
  "fallback": "Sourav's technical skills include...",
  "source": "fallback"
}
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env` file:
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_API_URL=http://localhost:3001/api/ask
NODE_ENV=development
```

### 3. Run Development Server
```bash
npm run dev
```
This runs both backend (port 3001) and frontend (port 3000) concurrently.

### 4. Test the Chatbot
1. Click the floating button (bottom-right)
2. Try common questions (uses local data):
   - "What skills do you have?"
   - "Tell me about your experience"
   - "What projects have you built?"
3. Try unique questions (uses Gemini):
   - "How would you describe your frontend philosophy?"
   - "What makes your projects stand out?"

## Quota Estimation

**With Local Data:**
- Common questions (80% of queries): **0 API calls**
- Unique questions (20% of queries): **1 API call each**

**Example:**
- 100 users ask questions
- 80 ask common questions → 0 calls
- 20 ask unique questions → 20 calls
- **Total: 20 API calls** (vs 100 without local data)

**Savings: 80% quota reduction** 🎉

## Code Comments

All quota safety features are documented in code:
- `server.js`: Local data routing logic
- `ChatWidget.js`: Debounce implementation
- `AIChatbot.js`: No auto-call explanation

## Production Deployment

### Backend (Node.js/Express)
- Deploy to: Heroku, Railway, Render, or Google Cloud Run
- Set `PORT` environment variable (platform will provide)
- Set `GEMINI_API_KEY` in platform environment variables

### Frontend (React)
- Update `REACT_APP_API_URL` to your backend URL
- Build: `npm run build`
- Deploy to: Netlify, Vercel, or GitHub Pages

## Monitoring

Check backend logs for:
- `📦 Using local data (saving quota)` - Local answer used
- `🤖 Calling Gemini API (unique question)` - Gemini called
- `❌ Error in /api/ask` - Error occurred

## Why This Architecture?

1. **Quota Conservation**: 80% of queries use local data
2. **Fast Responses**: Local answers are instant
3. **Cost Effective**: Minimal API usage
4. **User Experience**: Still feels like AI (for unique questions)
5. **Reliability**: Works even if Gemini is down (local fallback)

---

**Built for Google AI "New Year, New You" Portfolio Challenge**

