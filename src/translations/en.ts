import type { Translations } from './index';

/** English interface text (Stage 2). Mirrors `ar.ts`; pathway copy is DRAFT. */
export const en: Translations = {
  app: {
    title: 'Chemistry on Trial',
    module: 'Chemical Equilibrium',
    skipToContent: 'Skip to main content',
  },
  nav: {
    home: 'Home',
    results: 'Your results',
    help: 'Help',
    exit: 'Exit',
    exitDisabled: 'Sign-in and sign-out arrive in a later stage',
    designSystem: 'Design system',
    language: 'العربية',
    languageLabel: 'Switch to Arabic',
    menu: 'Menu',
  },
  stage: {
    preview: 'Stage 2 preview',
    synthetic: 'Synthetic demonstration data — not real student data',
    laterStageTitle: 'This screen belongs to a later stage',
    laterStageBody: 'It will be built after Stage 2 is reviewed and the next stage is approved.',
    backHome: 'Back to home',
  },
  banner: {
    title: 'Your result sets your starting point',
    subtitle: 'Based on your diagnostic answers, we have identified the pathway that best fits your learning needs.',
  },
  score: {
    heading: 'Your diagnostic result',
    caption: 'of answers correct',
    conceptsHeading: 'Concepts that need support:',
    ringLabel: 'Overall score {value} percent',
  },
  note: {
    title: 'Important note:',
    body: 'The diagnostic test sets your main pathway, and you will see targeted activities for the concepts that need support.',
  },
  pathways: {
    whatYouFind: 'What will you find here?',
    recommended: 'Right for you',
    remedial: {
      name: 'Remedial Path',
      description: 'Step-by-step learning that rebuilds concepts from the beginning, with simple explanations and support.',
      features: ['Step-by-step explanations', 'Guided simulations and labs', 'Short checks after each stage'],
      cta: 'Start Remedial Path',
    },
    corrective: {
      name: 'Corrective & Reinforcement Path',
      description: 'Focuses on your specific gaps and misconceptions, with targeted reinforcement.',
      features: ['Focused explanations of weak concepts', 'Comparisons of confusing concepts', 'Rechecks of needed concepts only'],
      cta: 'Start Corrective Path',
    },
    enrichment: {
      name: 'Enrichment Path',
      description: 'Advanced applications, investigations and challenges that build independent scientific thinking.',
      features: ['Advanced problems and critical thinking', 'Investigations and simulations', 'Challenges in new situations'],
      cta: 'Start Enrichment Path',
    },
    ctaUnavailable: 'Pathway content is built after the scientific content review',
  },
  recommendation: {
    title: 'Suggested targeted activity',
    body: 'Strengthen your understanding of “{concept}” before or alongside your next activities.',
  },
  equi: {
    name: 'EQUI',
    fullName: 'EQUI – your smart chemistry companion',
    bubbleTitle: 'Do you have a question?',
    bubbleBody: 'I’m EQUI, here to help you understand chemical equilibrium more deeply!',
    cta: 'Ask EQUI',
    panelTitle: 'EQUI – your smart chemistry companion',
    close: 'Close',
    notConnected: 'EQUI interface only — the assistant is not connected to any AI model in this stage.',
    welcome: 'Hello! I’ll help you find your way around the platform and understand concepts. Chat will be enabled in a later stage.',
    starters: ['How do I use my learning pathway?', 'Explain the concept more simply', 'Give me a hint without the answer'],
    inputPlaceholder: 'Chat is not available yet',
  },
  illustration: {
    pending: '3D illustration in preparation',
  },
  status: {
    weak: 'Needs support',
    developing: 'Developing',
    mastered: 'Mastered',
    approved: 'Approved',
    pending: 'Awaiting teacher approval',
    hold: 'On hold — not shown to students',
  },
};
