export type AssistantMode = 'tactical_jarvis' | 'care_baymax' | 'automation_architect';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  mode?: AssistantMode;
  suggestedActions?: {
    label: string;
    actionType: 'copy' | 'save_note' | 'add_task' | 'add_lead';
    payload?: any;
  }[];
}

export interface FreelanceLead {
  id: string;
  name: string;
  company: string;
  niche: string;
  status: 'prospect' | 'contacted' | 'negotiation' | 'closed';
  estimatedValue: string;
  platform: 'Email' | 'LinkedIn' | 'Twitter/X' | 'Upwork' | 'Direct';
  lastContactDate: string;
  notes: string;
  generatedPitch?: string;
}

export interface OutreachGenerationResult {
  subjectLines: string[];
  variants: {
    type: string;
    hook: string;
    body: string;
    cta: string;
  }[];
  followUpStrategy: string;
  jarvisTip: string;
}

export interface AutomationStep {
  step: number;
  name: string;
  tool: string;
  triggerOrAction: string;
  details: string;
}

export interface AutomationWorkflow {
  id: string;
  systemName: string;
  estimatedTimeSavedHoursPerWeek: number;
  architectureSteps: AutomationStep[];
  promptOrScriptTemplate?: string;
  implementationChecklist: string[];
  longTermScaleStrategy?: string;
  isDeployed?: boolean;
}

export interface SecondBrainIdea {
  id: string;
  title: string;
  rawThoughts: string;
  tags: string[];
  dateAdded: string;
  status: 'raw' | 'analyzed' | 'in_development' | 'launched';
  analysis?: {
    elevatorPitch: string;
    unconventionalAngle: string;
    feasibilityScore: number;
    monetizationPotential: string;
    mvpBlueprint: string[];
    potentialPitfalls: string[];
    automationAngle: string;
    firstActionableStep: string;
  };
}

export interface DailyTask {
  id: string;
  title: string;
  priority: 'critical' | 'high' | 'normal';
  category: 'freelance' | 'automation' | 'learning' | 'health';
  completed: boolean;
  timeEstimate?: string;
}

export interface DailyBriefingData {
  greeting: string;
  quote: string;
  topFocusRecommendation: string;
  baymaxCareNote: string;
  tacticalDirective: string;
}
