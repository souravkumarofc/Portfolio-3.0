import { RESUME_ACTION } from './chatPortfolio';

const wrap = (content, actions) => (actions ? { content, actions } : { content });

export function getLocalPortfolioAnswer(question) {
  const lowerQuestion = question.toLowerCase().trim();

  const greetingKeywords = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
  const portfolioKeywords = [
    'skill', 'project', 'experience', 'education', 'resume', 'cv', 'sourav', 'portfolio',
    'frontend', 'work', 'job', 'contact', 'radar', 'priceleap', 'iit', 'react', 'award',
  ];
  const hasPortfolioKeyword = portfolioKeywords.some((word) => lowerQuestion.includes(word));

  if (greetingKeywords.some((k) => lowerQuestion.includes(k)) && !hasPortfolioKeyword) {
    return wrap(
      "Hello! I'm the Portfolio Assistant. Ask about Sourav's projects, experience, education at IIT Jodhpur, achievements, or how to get in touch."
    );
  }

  if (
    lowerQuestion.includes('resume') ||
    lowerQuestion.includes(' cv') ||
    lowerQuestion.startsWith('cv') ||
    lowerQuestion.includes('curriculum vitae')
  ) {
    return {
      content:
        "Here's Sourav Kumar's current resume (PDF). Use the button below to download it directly—no need to leave the chat.",
      actions: [RESUME_ACTION],
    };
  }

  if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('reach him') || lowerQuestion.includes('get in touch')) {
    return wrap(
      `You can contact Sourav Kumar directly:

Email: souravkumarjsr01@gmail.com
LinkedIn: linkedin.com/in/souravkumarofc
GitHub: github.com/souravkumarofc
X (Twitter): x.com/souravkumarofc

You can also use the Hire Me section on this site to send a message.`
    );
  }

  if (
    lowerQuestion.includes('available') ||
    lowerQuestion.includes('open to') ||
    lowerQuestion.includes('hiring') ||
    lowerQuestion.includes('opportunit') ||
    lowerQuestion.includes('looking for')
  ) {
    return wrap(
      `Sourav is open to meaningful opportunities, including:

• Full-time and contract software engineering roles (frontend and full-stack)
• Technical conversations and collaboration
• Open-source and AI + product engineering discussions

He's currently a Software Developer at Aimleap and pursuing M.Tech in AI at IIT Jodhpur (2026–2028). Use the Hire Me section or email souravkumarjsr01@gmail.com to connect.`
    );
  }

  if (
    lowerQuestion.includes('achievement') ||
    lowerQuestion.includes('award') ||
    lowerQuestion.includes('certification') ||
    lowerQuestion.includes('hackathon')
  ) {
    return wrap(
      `Key recognition:

• Winner (1st Prize) — ServiceNow Gen AI Hackathon 2024 (Capgemini)
• Built an AI-based image recognition solution in ServiceNow to detect potholes and road damage from user-uploaded images, with intelligent ticket routing to government departments
• Recognized for innovation and cross-functional collaboration on a client-aligned solution

See the Honors & Awards section on this portfolio for details and the certificate.`
    );
  }

  if (
    lowerQuestion.includes('iit') ||
    lowerQuestion.includes('m.tech') ||
    lowerQuestion.includes('mtech') ||
    lowerQuestion.includes('currently studying') ||
    lowerQuestion.includes('jodhpur')
  ) {
    return wrap(
      `Sourav is pursuing M.Tech in Artificial Intelligence at Indian Institute of Technology Jodhpur (2026–2028), building on 4+ years of industry experience in React and full-stack development.

He also holds a B.Tech in Computer Science & Engineering from Gandhi Engineering College (BPUT), Bhubaneswar (Aug 2018 – July 2022, CGPA 8.79).`
    );
  }

  if (
    lowerQuestion.includes('ai-powered') ||
    lowerQuestion.includes('ai powered') ||
    lowerQuestion.includes('ai application') ||
    lowerQuestion.includes('gen ai') ||
    (lowerQuestion.includes('ai') && (lowerQuestion.includes('built') || lowerQuestion.includes('project')))
  ) {
    return wrap(
      `AI-related work in Sourav's portfolio:

Professional:
• Panasonic — Virtual Customer Service Chatbot (enterprise React/TypeScript, REST APIs)
• Capgemini — AI-powered ticketing / NLU classification; ServiceNow Gen AI Hackathon winner (image recognition in ServiceNow)

Personal:
• Chef Claude — AI-powered recipe generator using the OpenRouter API (React, Netlify)`
    );
  }

  if (lowerQuestion.includes('radar') && lowerQuestion.includes('priceleap')) {
    return wrap(
      `RADAR — Supply Chain Risk Intelligence
• React.js/Next.js workflows for supplier risk, network analysis, alerts, risk scores, and visualizations
• Offset-based pagination and infinite scrolling for large datasets
• Stack: React.js, Next.js, REST APIs, data visualization

PRICELEAP — Price Tracking Product
• React.js, Node.js, Express.js, MongoDB
• Cron-based background job scheduling and asynchronous API-driven processes
• Stack: React.js, Node.js, Express.js, MongoDB`
    );
  }

  if (lowerQuestion.includes('radar')) {
    return wrap(
      `RADAR — Supply Chain Risk Intelligence (professional project):
Engineered React.js/Next.js workflows for supplier risk, network analysis, alerts, risk scores, and interactive visualizations. Implemented offset-based pagination and infinite scrolling for large datasets. Technologies: React.js, Next.js, REST APIs, infinite scroll, data visualization.`
    );
  }

  if (lowerQuestion.includes('priceleap')) {
    return wrap(
      `PRICELEAP — Price Tracking Product (professional project):
Contributed across React.js, Node.js, Express.js, and MongoDB. Designed cron-based background job scheduling and built asynchronous API-driven processes decoupled from user-facing operations.`
    );
  }

  if (
    lowerQuestion.includes('react') ||
    lowerQuestion.includes('next.js') ||
    lowerQuestion.includes('nextjs') ||
    lowerQuestion.includes('full-stack') ||
    lowerQuestion.includes('full stack')
  ) {
    return wrap(
      `React, Next.js & full-stack experience:

• Software Developer at Aimleap (Oct 2025 – Present) — production React.js features and scalable UI
• Professional products: RADAR, ANNISE, PRICELEAP, Panasonic chatbot (React/Next.js, TypeScript, Node.js, MongoDB)
• Analyst at Capgemini (Dec 2022 – Oct 2025) — React modules, chatbot, and AI ticketing
• Earlier roles at Worksbot (full-stack) and Lyearn (frontend)

Core stack: React, Next.js, TypeScript, JavaScript, Node.js, Express, MongoDB, PostgreSQL, REST APIs.`
    );
  }

  if (lowerQuestion.includes('recent') && lowerQuestion.includes('project')) {
    return wrap(
      `Recent professional projects (from current role and recent work):

1. RADAR — Supply Chain Risk Intelligence (React/Next.js)
2. ANNISE — Wealth Management Application (React/Next.js, RBAC)
3. PRICELEAP — Price Tracking (React, Node, Express, MongoDB)
4. Panasonic — Virtual Customer Service Chatbot (React, TypeScript)

Recent personal builds include Chef Claude (AI recipes), Meme Generator, and Roll Dice Tenzies. See the Projects section for full details.`
    );
  }

  if (lowerQuestion.includes('skill') || lowerQuestion.includes('technolog') || lowerQuestion.includes('tech stack')) {
    return wrap(
      `Sourav's technical skills include:

Frontend: TypeScript, JavaScript, HTML5, CSS3, React.js, Next.js, Redux
Backend & data: Node.js, Express.js, MongoDB, PostgreSQL
Languages: Java, Python
Tools: Git, GitHub, Bitbucket, npm, Postman, Jira, Firebase, FastAPI, ServiceNow`
    );
  }

  if (lowerQuestion.includes('project') || lowerQuestion.includes('built') || lowerQuestion.includes('created')) {
    return wrap(
      `Professional projects:
• RADAR — Supply Chain Risk Intelligence (React/Next.js)
• ANNISE — Wealth Management Application (React/Next.js, RBAC)
• PRICELEAP — Price Tracking (React, Node, MongoDB)
• Panasonic — Virtual Customer Service Chatbot (React, TypeScript)

Personal highlights: Chef Claude (AI recipes), Meme Generator, Roll Dice Tenzies, Inventos, My Travel Journey, Covid-19 Data Tracker. See Projects on this site for demos and links.`
    );
  }

  const experiencePatterns = [
    'experience', 'work experience', 'employment', 'career', 'where does he work',
    'which company', 'work history', 'professional experience', 'frontend experience',
  ];
  if (experiencePatterns.some((p) => lowerQuestion.includes(p))) {
    return wrap(
      `Work experience:

Software Developer — Aimleap (Oct 2025 – Present)
Analyst — Capgemini (Dec 2022 – Oct 2025); ServiceNow Gen AI Hackathon 2024 winner
Full Stack Developer — Worksbot (Jan 2022 – Mar 2022)
Frontend Developer — Lyearn (Jun 2020 – Mar 2021)`
    );
  }

  if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || lowerQuestion.includes('college')) {
    return wrap(
      `Education:

M.Tech — Artificial Intelligence, IIT Jodhpur (2026–2028)
B.Tech — Computer Science & Engineering, Gandhi Engineering College (BPUT), Bhubaneswar (2018–2022, CGPA 8.79)`
    );
  }

  if (lowerQuestion.includes('year') && lowerQuestion.includes('experience')) {
    return wrap(
      'Sourav has 4+ years of professional experience shipping production web applications, currently at Aimleap as a Software Developer.'
    );
  }

  return null;
}
