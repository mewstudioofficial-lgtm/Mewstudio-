import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const BEYMAX_CORE_PERSONA = `
You are BEYMAX, the personal AI companion and tactical autonomous operating system built exclusively for Samir.

CREATOR & USER PROFILE:
- Name: Samir
- Profile: Ambitious young entrepreneur & student.
- Key Interests: AI, intelligent automation, freelancing, design, marketing, long-term tech startups.
- Core Creed: "Build scalable systems; never do repetitive manual work." Thinks long-term, embraces unconventional ideas.
- Current Goals:
  1. Build substantial income through freelancing and high-converting client outreach.
  2. Master AI engineering, automation frameworks (Python, n8n, API workflows), and programming.
  3. Create automated workflows that eliminate manual friction.
  4. Launch original AI-driven micro-products and tools.

YOUR INSPIRATION & VOICE (Jarvis + Baymax Fusion):
- Jarvis side: Tactical, witty, mathematically precise, proactive, strategic, calling him "Samir" or "Sir". Anticipates hurdles and proposes solutions before being asked.
- Baymax side: Warm, genuinely caring, monitoring energy, stress, and burnout. Will periodically remind Samir: "On a scale of 1 to 10, how is your energy level, Samir?" and keep him focused on sustainable high performance.
- Language: Native English with fluent understanding of Hinglish/Hindi phrasing. If Samir talks in Hinglish, respond warmly with appropriate Hinglish/English blend.
- Style: Crisp formatting with bullets, actionable takeaways, and direct execution steps. No fluff or generic AI disclaimers.
`;

// Endpoint 1: Conversational Chat with Beymax
app.post('/api/beymax/chat', async (req, res) => {
  try {
    const { message, history = [], mode = 'tactical_jarvis' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    let modeFlavor = '';
    if (mode === 'care_baymax') {
      modeFlavor = 'BAYMAX CARE MODE: Emphasize calm reassurance, physical/mental wellness, energy check, and sustainable focus balance while helping with the task.';
    } else if (mode === 'automation_architect') {
      modeFlavor = 'AUTOMATION ARCHITECT MODE: Be relentlessly focused on systems, automation steps, code snippets, tool stacks, eliminating manual work, and ROI.';
    } else {
      modeFlavor = 'TACTICAL JARVIS MODE: High-velocity execution, strategic business guidance, outreach precision, and entrepreneurial leadership.';
    }

    const contents: any[] = [];

    // System instruction passed via config
    // Append conversation history
    if (Array.isArray(history)) {
      for (const h of history) {
        if (h.role === 'user' || h.role === 'model') {
          contents.push({
            role: h.role,
            parts: [{ text: h.text || '' }],
          });
        }
      }
    }

    // Append current message
    contents.push({
      role: 'user',
      parts: [{ text: `${modeFlavor}\n\nSamir: ${message}` }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: BEYMAX_CORE_PERSONA,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Beymax online. Ready for your directive, Samir.';

    return res.json({
      reply,
      timestamp: new Date().toISOString(),
      mode,
    });
  } catch (err: any) {
    console.error('Error in /api/beymax/chat:', err);
    return res.status(500).json({
      error: 'Beymax core encountered an issue.',
      details: err?.message || 'Unknown error',
    });
  }
});

// Endpoint 2: Cold Outreach & Freelance Pitch Generator
app.post('/api/beymax/outreach-generator', async (req, res) => {
  try {
    const { clientName, platform, niche, serviceOffered, painPoint, notes } = req.body;

    const prompt = `
Generate 3 high-converting, personalized outreach variations for Samir to send to a prospective client.
Target Client / Lead: ${clientName || 'Target Business / Brand'}
Platform: ${platform || 'Email / LinkedIn'}
Niche / Industry: ${niche || 'D2C / E-commerce / Tech'}
Service Samir is Offering: ${serviceOffered || 'AI Automation & High-Converting Creative Design'}
Specific Pain Point to Solve: ${painPoint || 'Inefficient manual marketing and poor creative conversion'}
Additional Context: ${notes || 'Samir provides modern high-ROI systems'}

Please structure your response in clean JSON with this exact structure:
{
  "subjectLines": ["Subject line 1", "Subject line 2", "Subject line 3"],
  "variants": [
    {
      "type": "Direct & Value-Driven",
      "hook": "Opening hook",
      "body": "Full body text",
      "cta": "Call to action"
    },
    {
      "type": "Casual / Social DM (Short & Punchy)",
      "hook": "Opening hook",
      "body": "Full body text",
      "cta": "Call to action"
    },
    {
      "type": "Free Audit / Sample Teaser",
      "hook": "Opening hook",
      "body": "Full body text",
      "cta": "Call to action"
    }
  ],
  "followUpStrategy": "A 3-step follow up schedule (Day 3, Day 7, Day 12)",
  "jarvisTip": "Tactical insight to maximize reply rate for this specific niche"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: BEYMAX_CORE_PERSONA,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/beymax/outreach-generator:', err);
    return res.status(500).json({
      error: 'Failed to generate outreach pitch.',
      details: err?.message || 'Unknown error',
    });
  }
});

// Endpoint 3: Automation & Systems Blueprint Architect
app.post('/api/beymax/automation-builder', async (req, res) => {
  try {
    const { manualTask, desiredOutcome, toolsPreference } = req.body;

    const prompt = `
Samir wants to automate a repetitive task so he never has to do it manually again.
Manual Task: ${manualTask}
Desired Outcome: ${desiredOutcome || 'Fully automated execution with instant alerts'}
Preferred Tools / Stack: ${toolsPreference || 'n8n / Zapier / Make / Python / Gemini API'}

Provide a complete, production-grade automation system design in JSON format:
{
  "systemName": "Concise catchy system title",
  "estimatedTimeSavedHoursPerWeek": 5,
  "architectureSteps": [
    {
      "step": 1,
      "name": "Step title",
      "tool": "Tool name",
      "triggerOrAction": "Trigger/Action description",
      "details": "Precise execution details"
    }
  ],
  "promptOrScriptTemplate": "A starter Python snippet or AI prompt used in the workflow",
  "implementationChecklist": ["Step 1 to deploy", "Step 2", "Step 3"],
  "longTermScaleStrategy": "How Samir can turn this automation into a repeatable freelance offer or micro-SaaS"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: BEYMAX_CORE_PERSONA,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/beymax/automation-builder:', err);
    return res.status(500).json({
      error: 'Failed to generate automation blueprint.',
      details: err?.message || 'Unknown error',
    });
  }
});

// Endpoint 4: Second Brain / Unconventional Idea Analyzer
app.post('/api/beymax/idea-analyzer', async (req, res) => {
  try {
    const { ideaTitle, rawThoughts, tags } = req.body;

    const prompt = `
Samir is logging an unconventional idea in his Beymax Second Brain.
Idea Title: ${ideaTitle}
Raw Thoughts: ${rawThoughts}
Tags: ${tags || 'AI, Automation, Startup'}

Evaluate this idea critically and constructively from the perspective of Jarvis + Baymax:
Return JSON:
{
  "elevatorPitch": "Refined 2-sentence crisp description",
  "unconventionalAngle": "What makes this unique or contrarian",
  "feasibilityScore": 8.5,
  "monetizationPotential": "High / Medium / Explosive",
  "mvpBlueprint": [
    "Day 1: Action",
    "Day 2: Action",
    "Day 3: Action"
  ],
  "potentialPitfalls": ["Risk 1", "Risk 2"],
  "automationAngle": "How can this idea be run with zero or minimal manual maintenance",
  "firstActionableStep": "Immediate next task for Samir today"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: BEYMAX_CORE_PERSONA,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/beymax/idea-analyzer:', err);
    return res.status(500).json({
      error: 'Failed to analyze idea.',
      details: err?.message || 'Unknown error',
    });
  }
});

// Endpoint 5: Daily Mission Briefing (Morning / Evening)
app.post('/api/beymax/daily-briefing', async (req, res) => {
  try {
    const { energyLevel = 8, activeGoals = [] } = req.body;

    const prompt = `
Generate a quick tactical audio-ready briefing for Samir.
Current Energy Level: ${energyLevel}/10
Active Priorities: ${JSON.stringify(activeGoals)}

Return JSON:
{
  "greeting": "Personalized Jarvis + Baymax greeting for Samir",
  "quote": "Short punchy reminder on systems and ambition",
  "topFocusRecommendation": "The single highest leverage move Samir should make today",
  "baymaxCareNote": "Caring health/energy check-in with practical advice",
  "tacticalDirective": "Immediate next 60-minute mission"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: BEYMAX_CORE_PERSONA,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/beymax/daily-briefing:', err);
    return res.status(500).json({
      error: 'Failed to generate briefing.',
      details: err?.message || 'Unknown error',
    });
  }
});

// Vite middleware / static serving
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 BEYMAX Core initialized on http://0.0.0.0:${PORT}`);
  });
}

startServer();
