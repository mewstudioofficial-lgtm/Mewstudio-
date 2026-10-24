import { FreelanceLead, AutomationWorkflow, SecondBrainIdea, DailyTask } from '../types/beymax';

export const INITIAL_LEADS: FreelanceLead[] = [
  {
    id: 'lead-1',
    name: 'Marcus Vance',
    company: 'Apex Activewear (D2C)',
    niche: 'Fitness & Apparel',
    status: 'contacted',
    estimatedValue: '$1,800/mo',
    platform: 'LinkedIn',
    lastContactDate: '2026-10-22',
    notes: 'Needs high-converting ad creative variations and automated customer review analysis.',
  },
  {
    id: 'lead-2',
    name: 'Elena Rostova',
    company: 'FlowMetrics AI',
    niche: 'B2B SaaS',
    status: 'prospect',
    estimatedValue: '$2,500',
    platform: 'Twitter/X',
    lastContactDate: '2026-10-23',
    notes: 'CEO tweeted about drowning in manual customer onboarding messages. Ready for an automation pitch.',
  },
  {
    id: 'lead-3',
    name: 'Rohan Sharma',
    company: 'Zenith Design Agency',
    niche: 'Creative Studio',
    status: 'negotiation',
    estimatedValue: '$3,200',
    platform: 'Email',
    lastContactDate: '2026-10-21',
    notes: 'Wants an AI pipeline to auto-generate moodboards and client brief summaries.',
  },
];

export const INITIAL_AUTOMATIONS: AutomationWorkflow[] = [
  {
    id: 'auto-1',
    systemName: 'Lead Enrichment & Auto-Drafting Engine',
    estimatedTimeSavedHoursPerWeek: 6.5,
    isDeployed: true,
    architectureSteps: [
      {
        step: 1,
        name: 'Lead Webhook Ingestion',
        tool: 'n8n / Webhook',
        triggerOrAction: 'Trigger on new LinkedIn / form submission',
        details: 'Captures lead URL, domain, company size and founder profile.',
      },
      {
        step: 2,
        name: 'AI Pain-Point Scraper',
        tool: 'Gemini 3.8 Flash',
        triggerOrAction: 'Action: Analyze homepage & recent posts',
        details: 'Identifies 3 concrete conversion bottlenecks or manual bottlenecks in their business.',
      },
      {
        step: 3,
        name: 'Personalized Pitch Generation',
        tool: 'Beymax Core API',
        triggerOrAction: 'Action: Draft tailored outreach email',
        details: 'Outputs ready-to-send draft with custom loom video outline into Notion queue.',
      },
    ],
    implementationChecklist: [
      'Connect company domain webhook',
      'Test Gemini prompt with 3 real founder URLs',
      'Set automated daily dispatch at 09:00 AM',
    ],
    promptOrScriptTemplate: `import requests\n# Python starter for Beymax Lead Ingestion\ndef enrich_lead(lead_url):\n    response = requests.post('/api/beymax/outreach-generator', json={'clientUrl': lead_url})\n    return response.json()`,
    longTermScaleStrategy: 'Package as a $499/mo Done-For-You Lead Automation service for marketing agencies.',
  },
  {
    id: 'auto-2',
    systemName: 'Voice Memo to Structured Second Brain Vault',
    estimatedTimeSavedHoursPerWeek: 4.0,
    isDeployed: true,
    architectureSteps: [
      {
        step: 1,
        name: 'Audio Capture on Phone',
        tool: 'Beymax Mobile Mic',
        triggerOrAction: 'Samir speaks a 30-sec raw startup thought',
        details: 'Converts spoken stream directly into high-accuracy transcription.',
      },
      {
        step: 2,
        name: 'Synthesis & Strategy Extractor',
        tool: 'Gemini AI',
        triggerOrAction: 'Action: Tag & evaluate viability',
        details: 'Extracts core premise, 48-hour MVP roadmap, and risk factors.',
      },
      {
        step: 3,
        name: 'Vault Storage & Action Item Dispatch',
        tool: 'Local Vault / Notion',
        triggerOrAction: 'Action: Add high-priority card',
        details: 'Syncs into Samir’s second brain with next immediate micro-action.',
      },
    ],
    implementationChecklist: [
      'Enable mobile microphone permissions',
      'Add 1-tap quick capture to phone home screen',
    ],
    promptOrScriptTemplate: `// Auto-categorizes incoming thoughts into: Product, Outreach, Code, or Health`,
  },
];

export const INITIAL_IDEAS: SecondBrainIdea[] = [
  {
    id: 'idea-1',
    title: 'Autonomous Client Outreach OS for Solo Founders',
    rawThoughts: 'Most freelancers hate cold outreach because writing 30 personalized emails takes 4 hours. What if a tool watched your dream clients, noticed when they rebrand or hire, and automatically queued a personalized 3-sentence pitch ready for 1-click send?',
    tags: ['AI Product', 'Micro-SaaS', 'Freelancing', 'Automation'],
    dateAdded: '2026-10-20',
    status: 'analyzed',
    analysis: {
      elevatorPitch: 'A background client-radar that monitors prospect triggers and writes high-converting 3-sentence personalized pitches with zero manual research.',
      unconventionalAngle: 'Instead of mass spamming 10,000 bots, it acts as a sniper: 5 hyper-targeted, high-reply messages daily.',
      feasibilityScore: 9.2,
      monetizationPotential: 'High ($49 - $149/mo subscription for freelancers & agencies)',
      mvpBlueprint: [
        'Day 1: Build Chrome extension or n8n workflow monitoring RSS/LinkedIn URLs',
        'Day 2: Connect Gemini 3.8 Flash to extract specific pain-points',
        'Day 3: Test on Samir’s own freelance prospect list of 20 clients',
      ],
      potentialPitfalls: ['Platform rate limits', 'Maintaining pitch quality without feeling AI-generated'],
      automationAngle: 'Entire pipeline runs on cron jobs with webhook alerts to Telegram/WhatsApp',
      firstActionableStep: 'Test this manually for 5 of Samir’s leads this week using Beymax’s generator',
    },
  },
  {
    id: 'idea-2',
    title: 'Visual Workflow Generator: Speech to n8n Schema',
    rawThoughts: 'Speaking out loud how you want your data to move (e.g., "When a Stripe charge fails, check if the customer is on Slack, ping them warmly, and schedule a retry in 3 days") and immediately getting a copy-paste JSON workflow file for n8n/Make.',
    tags: ['Automation', 'Developer Tool', 'AI Agent'],
    dateAdded: '2026-10-22',
    status: 'raw',
  },
];

export const INITIAL_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    title: 'Send 5 customized outreach pitches to high-ticket D2C apparel brands',
    priority: 'critical',
    category: 'freelance',
    completed: false,
    timeEstimate: '45m',
  },
  {
    id: 'task-2',
    title: 'Build automated lead qualifier webhook in n8n/Python',
    priority: 'high',
    category: 'automation',
    completed: false,
    timeEstimate: '60m',
  },
  {
    id: 'task-3',
    title: 'Study Gemini 3.8 Live API real-time audio patterns',
    priority: 'normal',
    category: 'learning',
    completed: false,
    timeEstimate: '30m',
  },
  {
    id: 'task-4',
    title: 'Baymax Care: 20-min posture reset, hydration & afternoon walk',
    priority: 'normal',
    category: 'health',
    completed: true,
    timeEstimate: '20m',
  },
];
