const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Only log in development
const isDev = process.env.NODE_ENV !== 'production';
const devLog = (...args) => { if (isDev) console.log(...args); };
const devWarn = (...args) => { if (isDev) console.warn(...args); };
const devError = (...args) => { if (isDev) console.error(...args); };

// Polyfill fetch for Node.js < 18 (required for Gemini SDK)
if (typeof fetch === 'undefined') {
  const { fetch, Headers, Request, Response } = require('undici');
  global.fetch = fetch;
  global.Headers = Headers;
  global.Request = Request;
  global.Response = Response;
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Local data for common questions (to save Gemini quota)
const LOCAL_ANSWERS = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    answer: `Hello! I'm here to help you learn about Sourav Kumar's portfolio. You can ask me about:
- His technical skills
- His projects
- His work experience
- His frontend development expertise

What would you like to know?`
  },
  skillsCount: {
    keywords: ['how many skills', 'number of skills', 'count of skills', 'total skills', 'how many technologies', 'number of technologies'],
    answer: `Sourav has 24 technical skills:

- 7 Frontend Technologies (TypeScript, JavaScript, HTML5, CSS3, React.js, Next.js, Redux, React Bootstrap)
- 4 Backend & Database (Node.js, Express.js, MongoDB, PostgreSQL)
- 2 Programming Languages (Java, Python)
- 11 Tools & Platforms (GitHub, Git, Bitbucket, JSON, npm, Postman, Jira, Firebase, FastAPI, ServiceNow)`
  },
  projectsCount: {
    keywords: ['how many projects', 'number of projects', 'count of projects', 'total projects', 'how many works'],
    answer: `Sourav has 6 featured projects:

1. Chef Claude — AI-Powered Recipe Generator
2. Meme Generator — Web App
3. Roll Dice Tenzies — Interactive Game
4. Inventos — Inventory Management Software
5. My Travel Journey — Travel Project
6. Covid-19 — Data Tracker`
  },
  skills: {
    keywords: ['skill', 'skills', 'technologies', 'tech stack', 'what can you do', 'what do you know', 'what technologies', 'what tech'],
    answer: `Sourav's technical skills include:

Frontend Technologies:
- TypeScript, JavaScript, HTML5, CSS3
- React.js, Next.js
- Redux, React Bootstrap

Backend & Databases:
- Node.js, Express.js
- MongoDB, PostgreSQL

Languages:
- Java, Python

Tools & Platforms:
- GitHub, Git, Bitbucket
- JSON, npm, Postman, Jira
- Firebase, FastAPI, ServiceNow`
  },
  experience: {
    keywords: ['experience', 'expereince', 'experiance', 'expirience', 'work', 'job', 'employment', 'career', 'background', 'years', 'year', 'how long', 'how many years', 'company', 'companies', 'current', 'currently', 'working', 'first', 'where', 'which company'],
    answer: `Sourav's work experience:

Software Developer — Aimleap (Oct 2025 – Present)
- Developing production-ready frontend features using React.js and modern JavaScript
- Building clean, reusable, and scalable UI components
- Collaborating with product managers, designers, and backend engineers

Analyst — Capgemini (Dec 2022 – Oct 2025)
- Developed customer service chatbot and AI-powered ticketing system
- Worked on NLU-based classification for automated ticket generation
- Winner — ServiceNow Gen AI Hackathon 2024

Full Stack Developer — Worksbot (Jan 2022 – Mar 2022)
- Built full-stack features for internal tools using React and backend APIs
- Implemented authentication flows and data synchronization

Frontend Developer — Lyearn (Jun 2020 – Mar 2021)
- Developed responsive and accessible UI components
- Converted Figma designs into production-ready React components`
  },
  currentCompany: {
    keywords: ['current', 'currently', 'working at', 'which company', 'where working', 'present company', 'now working'],
    answer: `Sourav is currently working as a Software Developer at Aimleap (Oct 2025 – Present). He develops production-ready frontend features using React.js and modern JavaScript, builds clean and reusable UI components, and collaborates with product managers, designers, and backend engineers.`
  },
  firstCompany: {
    keywords: ['first company', 'first job', 'started', 'began', 'first work', 'where did he start'],
    answer: `Sourav's first company was Lyearn, where he worked as a Frontend Developer from June 2020 to March 2021. He developed responsive and accessible UI components and converted Figma designs into production-ready React components.`
  },
  projects: {
    keywords: ['project', 'projects', 'built', 'created', 'portfolio', 'work'],
    answer: `Sourav's featured projects:

1. Chef Claude — AI-Powered Recipe Generator
- Generates custom recipes based on ingredients using OpenRouter AI API
- Technologies: React, OpenRouter API, Netlify
- Demo: https://ai-chefclaude.netlify.app/

2. Meme Generator — Web App
- Dynamic meme generator with real-time templates
- Technologies: React, JavaScript, Netlify
- Demo: https://generate-trendingmemes.netlify.app/

3. Roll Dice Tenzies — Interactive Game
- Interactive dice game with React Hooks and accessibility features
- Technologies: React.js, JavaScript
- Demo: https://rolldice-tenzies.netlify.app/

4. Inventos — Inventory Management Software
- Full-stack inventory management for manufacturing industry
- Technologies: HTML5, CSS3, JavaScript, Python, Django
- Demo: https://inventos.netlify.app/

5. My Travel Journey — Travel Project
- React-based travel destination showcase
- Technologies: React, JavaScript, Netlify
- Demo: https://travel-with-myjourney.netlify.app/

6. Covid-19 — Data Tracker
- Real-time COVID-19 data tracking for India
- Technologies: HTML, CSS, JavaScript, API Integration
- Demo: https://covid19-cowin.netlify.app/`
  },
  resume: {
    keywords: ['resume', 'cv', 'curriculum vitae', 'download resume', 'get resume', 'resume pdf', 'cv pdf', 'download cv'],
    answer: `You can download Sourav Kumar's resume (CV) directly from the portfolio website. Look for the "Resume" button in the navigation menu at the top of the page. The resume is available as a PDF file named "cv.pdf" and can be downloaded by clicking the Resume button.`
  },
  education: {
    keywords: ['education', 'educat', 'degree', 'qualification', 'qualifications', 'university', 'college', 'btech', 'b.tech', 'graduation', 'graduate', 'studied', 'study', 'cgpa', 'gpa'],
    answer: `Sourav Kumar's education:

B.Tech — Computer Science & Engineering
- Institution: Gandhi Engineering College (BPUT), Bhubaneswar
- Duration: 2018 — 2022
- CGPA: 8.79

Key highlights:
- Strong foundation in algorithms, data structures, and software engineering
- Worked on multiple web projects during studies`
  }
};

// Portfolio context for Gemini (when needed)
const PORTFOLIO_CONTEXT = `You are an intelligent, helpful AI assistant for Sourav Kumar's developer portfolio. Your role is to help visitors learn about Sourav in a natural, conversational, and engaging way.

PORTFOLIO INFORMATION:

SKILLS (24 total): TypeScript, JavaScript, HTML5, CSS3, React.js, Next.js, Node.js, Express.js, Redux, React Bootstrap, MongoDB, PostgreSQL, Java, Python, GitHub, Git, Bitbucket, JSON, npm, Postman, Jira, Firebase, FastAPI, ServiceNow

PROJECTS (6 featured): 
1. Chef Claude - AI-Powered Recipe Generator using OpenRouter AI API (React, Netlify) - https://ai-chefclaude.netlify.app/
2. Meme Generator - Dynamic meme generator with real-time templates (React, JavaScript, Netlify) - https://generate-trendingmemes.netlify.app/
3. Roll Dice Tenzies - Interactive dice game with React Hooks and accessibility (React.js, JavaScript) - https://rolldice-tenzies.netlify.app/
4. Inventos - Full-stack Inventory Management Software for manufacturing industry (HTML5, CSS3, JavaScript, Python, Django) - https://inventos.netlify.app/
5. My Travel Journey - React-based travel destination showcase (React, JavaScript, Netlify) - https://travel-with-myjourney.netlify.app/
6. Covid-19 Data Tracker - Real-time COVID-19 data tracking for India (HTML, CSS, JavaScript, API Integration) - https://covid19-cowin.netlify.app/

EXPERIENCE (4+ years): 
- Software Developer at Aimleap (Oct 2025-Present): Developing production-ready frontend features using React.js and modern JavaScript, building clean reusable UI components, collaborating with product managers, designers, and backend engineers
- Analyst at Capgemini (Dec 2022-Oct 2025): Developed customer service chatbot and AI-powered ticketing system, worked on NLU-based classification for automated ticket generation, Winner of ServiceNow Gen AI Hackathon 2024
- Full Stack Developer at Worksbot (Jan 2022-Mar 2022): Built full-stack features for internal tools using React and backend APIs, implemented authentication flows and data synchronization
- Frontend Developer at Lyearn (Jun 2020-Mar 2021): Developed responsive and accessible UI components, converted Figma designs into production-ready React components

EDUCATION:
- B.Tech in Computer Science & Engineering from Gandhi Engineering College (BPUT), Bhubaneswar (2018-2022)
- CGPA: 8.79
- Strong foundation in algorithms, data structures, and software engineering
- Worked on multiple web projects during studies

RESUME: Available for download on the portfolio website via the "Resume" button in navigation menu (PDF: "cv.pdf")

YOUR ROLE & BEHAVIOR:
You are an intelligent AI assistant that understands context, intent, and nuance. You should:
- Understand what the user REALLY wants to know, even if they phrase it differently
- Be conversational, friendly, and engaging - like a helpful colleague
- Show genuine interest in helping visitors learn about Sourav
- Use natural language - avoid robotic or template-like responses
- Be concise but thorough - answer what's asked, provide helpful context when relevant
- Show personality - be warm, professional, and approachable
- Think critically - understand variations in how people ask questions

UNDERSTANDING USER INTENT:
- "what can he do?" = skills/technologies
- "where does he work?" = current company
- "tell me about him" = general overview
- "what's he good at?" = strengths/skills
- "show me his work" = projects
- "how experienced?" = years of experience
- "what's his background?" = education + experience
- Understand typos, abbreviations, and casual language

RESPONSE STYLE:
1. BE CONVERSATIONAL: Use natural phrases like "Sure!", "Great question!", "I'd be happy to help!", "That's a great one!"
2. UNDERSTAND CONTEXT: If someone asks "React", they might want to know if he knows React, or how he uses it, or which projects use it
3. PROVIDE HELPFUL CONTEXT: When relevant, add context. For example, if asked about React, mention it's one of his primary frontend technologies and he uses it in multiple projects
4. HANDLE VARIATIONS: "skills", "technologies", "tech stack", "what can he do", "what does he know" all mean the same thing - understand this
5. BE HELPFUL BEYOND PORTFOLIO: You can discuss related topics like web development, React, frontend engineering, career advice, etc. when relevant to Sourav's background
6. CALCULATE WHEN NEEDED: If asked "how many", do the math accurately
7. NO MARKDOWN: Use plain text only - no **, no *, no code blocks, no backticks
8. BE SPECIFIC: Give exact details - company names, dates, technologies, project names, URLs
9. ENGAGE: Ask follow-up questions when appropriate: "Would you like to know more about any specific project?" or "Is there anything else you'd like to know?"
10. STAY ACCURATE: Only use information from the portfolio above - don't make up or hallucinate

EXAMPLES OF GOOD AI RESPONSES:
- "What are Sourav's skills?" → "Sourav has a strong technical skill set with 24 technologies! He's particularly strong in frontend development with React.js, Next.js, TypeScript, and JavaScript. On the backend, he works with Node.js, Express.js, MongoDB, and PostgreSQL. He also knows Java and Python, plus various tools like GitHub, Git, Firebase, and ServiceNow. Would you like to know more about any specific technology?"
- "How many projects?" → "Sourav has built 6 featured projects! They range from AI-powered applications like Chef Claude (recipe generator) to interactive games like Roll Dice Tenzies, and even full-stack solutions like Inventos (inventory management). Each project showcases different aspects of his development skills."
- "Tell me about his experience" → "Sourav has over 4 years of professional experience! He's currently a Software Developer at Aimleap, where he builds production-ready React applications. Before that, he was an Analyst at Capgemini and even won the ServiceNow Gen AI Hackathon 2024! He started his career as a Frontend Developer at Lyearn in 2020."
- "What's his best project?" → "That's subjective, but Chef Claude is quite impressive - it's an AI-powered recipe generator that uses OpenRouter AI API. It shows his ability to integrate AI into web applications. The Inventos project is also notable as it's a full-stack inventory management system. Each project demonstrates different skills - would you like details on a specific one?"
- "Does he know React?" → "Yes! React.js is one of Sourav's primary frontend technologies. He uses it extensively in his current role at Aimleap and has built multiple projects with it, including Chef Claude, Meme Generator, Roll Dice Tenzies, and My Travel Journey. He's quite experienced with React and modern JavaScript."
- "What can he help with?" → "Based on his experience, Sourav can help with frontend development (especially React.js), building scalable web applications, UI/UX implementation, full-stack development, and AI integration. He's worked on everything from interactive games to enterprise inventory management systems!"

Remember: You're an intelligent AI. Understand the user's question deeply, provide helpful and accurate information, and engage naturally. Don't just match keywords - understand intent and context.`;

// Fuzzy matching for typos
function fuzzyMatch(text, pattern) {
  const lowerText = text.toLowerCase();
  const lowerPattern = pattern.toLowerCase();

  // Exact match
  if (lowerText.includes(lowerPattern)) return true;

  // Common typos mapping
  const commonTypos = {
    'experience': ['expereince', 'experiance', 'expirience', 'experence', 'experiance', 'expierence'],
    'skill': ['skil', 'skils', 'skilz'],
    'project': ['projct', 'projet', 'projec']
  };

  if (commonTypos[lowerPattern]) {
    return commonTypos[lowerPattern].some(typo => lowerText.includes(typo));
  }

  return false;
}

// Check if question matches local data keywords
// Improved to handle common question patterns for better user experience
function shouldUseLocalData(question) {
  const lowerQuestion = question.toLowerCase().trim();
  const trimmedLower = lowerQuestion.trim();

  // Exact single-word matches (highest priority)
  if (trimmedLower === 'project' || trimmedLower === 'projects') {
    if (LOCAL_ANSWERS.projects) {
      devLog('📦 Matched basic projects query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.projects.answer };
    }
  }

  if (trimmedLower === 'skill' || trimmedLower === 'skills') {
    if (LOCAL_ANSWERS.skills) {
      devLog('📦 Matched basic skills query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.skills.answer };
    }
  }

  if (trimmedLower === 'experience' || trimmedLower === 'work' || trimmedLower === 'job') {
    if (LOCAL_ANSWERS.experience) {
      devLog('📦 Matched basic experience query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.experience.answer };
    }
  }

  // Common question patterns for skills
  const skillsPatterns = [
    'skill', 'skills', 'technology', 'technologies', 'tech stack',
    'what can he do', 'what does he know', 'what technologies',
    'what are his skills', 'tell me about skills', 'show me skills',
    'his skills', 'his skill', 'technical skills', 'tech skills'
  ];
  if (skillsPatterns.some(pattern => lowerQuestion.includes(pattern))) {
    if (LOCAL_ANSWERS.skills) {
      devLog('📦 Matched skills pattern query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.skills.answer };
    }
  }

  // Common question patterns for projects
  const projectsPatterns = [
    'project', 'projects', 'work', 'works', 'built', 'created',
    'what are his projects', 'tell me about projects', 'show me projects',
    'his projects', 'his project', 'featured projects', 'portfolio projects'
  ];
  if (projectsPatterns.some(pattern => lowerQuestion.includes(pattern))) {
    if (LOCAL_ANSWERS.projects) {
      devLog('📦 Matched projects pattern query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.projects.answer };
    }
  }

  // Common question patterns for experience
  const experiencePatterns = [
    'experience', 'work experience', 'job', 'employment', 'career',
    'where does he work', 'where working', 'which company', 'current company',
    'tell me about experience', 'work history', 'employment history',
    'his experience', 'his work', 'professional experience',
    'frontend experience', 'frontend work', 'react experience', 'development experience',
    'what\'s his experience', 'what is his experience', 'tell me his experience'
  ];
  if (experiencePatterns.some(pattern => lowerQuestion.includes(pattern))) {
    if (LOCAL_ANSWERS.experience) {
      devLog('📦 Matched experience pattern query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.experience.answer };
    }
  }

  // Education patterns
  const educationPatterns = [
    'education', 'degree', 'qualification', 'university', 'college',
    'btech', 'b.tech', 'graduation', 'where did he study', 'his education'
  ];
  if (educationPatterns.some(pattern => lowerQuestion.includes(pattern))) {
    if (LOCAL_ANSWERS.education) {
      devLog('📦 Matched education pattern query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.education.answer };
    }
  }

  // Resume patterns
  const resumePatterns = [
    'resume', 'cv', 'curriculum vitae', 'download resume', 'get resume'
  ];
  if (resumePatterns.some(pattern => lowerQuestion.includes(pattern))) {
    if (LOCAL_ANSWERS.resume) {
      devLog('📦 Matched resume pattern query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.resume.answer };
    }
  }

  // Simple greetings only (no portfolio keywords)
  const greetingKeywords = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
  if (greetingKeywords.some(keyword => trimmedLower === keyword || trimmedLower.startsWith(keyword + ' '))) {
    const portfolioKeywords = ['skill', 'project', 'experience', 'education', 'resume', 'sourav', 'portfolio'];
    const hasPortfolioKeyword = portfolioKeywords.some(word => lowerQuestion.includes(word));
    if (!hasPortfolioKeyword) {
      devLog('📦 Matched basic greeting query:', question);
      return { useLocal: true, answer: LOCAL_ANSWERS.greeting.answer };
    }
  }

  // For complex/analytical questions, let Gemini handle it
  // This includes:
  // - "How many skills?" (analytical)
  // - "What's his best project?" (subjective)
  // - "What can he help with?" (requires reasoning)
  // - Questions requiring calculations or comparisons

  devLog('🤖 Sending to Gemini for AI understanding:', question);
  return { useLocal: false };
}

// Initialize Gemini (only if API key exists)
let genAI = null;
let model = null;

try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    devLog('✅ Gemini AI initialized successfully');
  } else {
    devWarn('⚠️  GEMINI_API_KEY not found. Gemini features will be disabled.');
  }
} catch (error) {
  devError('❌ Error initializing Gemini AI:', error.message);
}

// API endpoint
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;

    // Validate input
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'Please provide a valid question' });
    }

    let trimmedQuestion = question.trim();

    // Check if question is only emojis
    const emojiOnlyRegex = /^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]+$/gu;
    const isOnlyEmoji = emojiOnlyRegex.test(trimmedQuestion) && trimmedQuestion.length <= 10;

    if (isOnlyEmoji) {
      // Friendly response for emoji-only messages
      return res.json({
        response: "I see you sent an emoji! 😊 Feel free to ask me about Sourav Kumar's skills, projects, experience, education, or resume. What would you like to know?",
        source: 'local'
      });
    }

    // Remove emojis from question for processing (but keep original for context)
    const questionWithoutEmoji = trimmedQuestion.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();

    // Use question without emoji for matching, but keep original for Gemini context
    const questionForMatching = questionWithoutEmoji || trimmedQuestion;
    trimmedQuestion = questionForMatching;

    // If after removing emoji, question is empty, provide helpful response
    if (!trimmedQuestion) {
      return res.json({
        response: "I see you sent a message! Feel free to ask me about Sourav Kumar's skills, projects, experience, education, or resume. What would you like to know?",
        source: 'local'
      });
    }

    // QUOTA SAFETY: Check if we can answer from local data first
    devLog('🔍 Checking question:', trimmedQuestion);
    const localCheck = shouldUseLocalData(trimmedQuestion);

    if (localCheck.useLocal) {
      devLog('📦 Using local data (saving quota):', localCheck.answer.substring(0, 50) + '...');
      return res.json({
        response: localCheck.answer,
        source: 'local'
      });
    }

    devLog('⚠️ No local match found for:', trimmedQuestion);

    // Only call Gemini for unique/analytical questions
    if (!model) {
      // If no model, try to provide a relevant local answer
      const fallbackCheck = shouldUseLocalData(trimmedQuestion);
      if (fallbackCheck.useLocal) {
        return res.json({
          response: fallbackCheck.answer,
          source: 'local'
        });
      }
      return res.status(503).json({
        error: 'AI service is not available. Here\'s what I can tell you instead.',
        fallback: LOCAL_ANSWERS.skills.answer
      });
    }

    devLog('🤖 Calling Gemini API (unique question):', trimmedQuestion);

    // Create prompt with context
    const prompt = `${PORTFOLIO_CONTEXT}\n\nUser Question: ${trimmedQuestion}\n\nAssistant Response:`;

    // Generate response using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    // Clean up the response (remove markdown if any)
    text = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, '').trim();

    devLog('✅ Gemini response received, length:', text.length);

    res.json({
      response: text,
      source: 'gemini'
    });

  } catch (error) {
    devError('❌ Error in /api/ask:', error);
    devError('Error details:', error.message, error.status);

    // ALWAYS try to answer from local data as fallback before showing error
    const fallbackCheck = shouldUseLocalData(trimmedQuestion);
    if (fallbackCheck.useLocal) {
      devLog('📦 Using local data as fallback after error');
      return res.json({
        response: fallbackCheck.answer,
        source: 'local-fallback'
      });
    }

    // Handle quota exceeded error
    if (error.status === 429 || (error.message && error.message.includes('quota'))) {
      // Still try local data first
      const quotaFallback = shouldUseLocalData(trimmedQuestion);
      if (quotaFallback.useLocal) {
        return res.json({
          response: quotaFallback.answer,
          source: 'local-fallback'
        });
      }
      return res.status(429).json({
        error: 'I\'m having a moment, but I can still help!',
        fallback: LOCAL_ANSWERS.skills.answer,
        source: 'fallback'
      });
    }

    // Handle API key errors
    if (error.message && (error.message.includes('API key') || error.message.includes('API_KEY'))) {
      // Still try local data first
      const keyFallback = shouldUseLocalData(trimmedQuestion);
      if (keyFallback.useLocal) {
        return res.json({
          response: keyFallback.answer,
          source: 'local-fallback'
        });
      }
      return res.status(401).json({
        error: 'I\'m having a moment, but I can still help!',
        fallback: LOCAL_ANSWERS.skills.answer,
        source: 'fallback'
      });
    }

    // Generic error - try to provide relevant local answer based on keywords
    const lowerErrorQuestion = trimmedQuestion.toLowerCase();
    let relevantAnswer;

    // If no local match, provide relevant answer based on keywords
    if (lowerErrorQuestion.includes('resume') || lowerErrorQuestion.includes('cv')) {
      relevantAnswer = LOCAL_ANSWERS.resume?.answer;
    } else if (lowerErrorQuestion.includes('education') || lowerErrorQuestion.includes('degree') ||
      lowerErrorQuestion.includes('college') || lowerErrorQuestion.includes('university') ||
      lowerErrorQuestion.includes('btech') || lowerErrorQuestion.includes('graduation')) {
      relevantAnswer = LOCAL_ANSWERS.education?.answer;
    } else if (lowerErrorQuestion.includes('company')) {
      relevantAnswer = lowerErrorQuestion.includes('current') ? LOCAL_ANSWERS.currentCompany?.answer : LOCAL_ANSWERS.firstCompany?.answer;
    } else if (lowerErrorQuestion.includes('skill')) {
      relevantAnswer = LOCAL_ANSWERS.skills?.answer;
    } else if (lowerErrorQuestion.includes('project')) {
      relevantAnswer = LOCAL_ANSWERS.projects?.answer;
    } else if (lowerErrorQuestion.includes('experience')) {
      relevantAnswer = LOCAL_ANSWERS.experience?.answer;
    } else {
      relevantAnswer = LOCAL_ANSWERS.skills?.answer || LOCAL_ANSWERS.experience?.answer;
    }

    // If we have a relevant answer, return it instead of error
    if (relevantAnswer) {
      return res.json({
        response: relevantAnswer,
        source: 'fallback'
      });
    }

    res.status(500).json({
      error: 'I\'m having a moment, but I can still help!',
      fallback: LOCAL_ANSWERS.skills.answer,
      source: 'fallback'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiAvailable: !!model
  });
});

// Serve React app for all non-API routes (production only)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  // Always show server startup info
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🤖 Gemini: ${model ? 'Available' : 'Not configured'}`);
});

module.exports = app;

