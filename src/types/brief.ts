export type PropertyGoal =
  | 'Buy a Property'
  | 'Sell My Property'
  | 'Rent / Lease'
  | 'Asset Progression & Advisory';

export type PropertyType = 'Condominium' | 'HDB' | 'Landed' | 'Commercial';

export type BudgetRange =
  | 'Below $1.2M'
  | '$1.2M – $2M'
  | '$2M – $3.5M'
  | '$3.5M+'
  | 'Rental Budget';

export type TimelineOption =
  | 'Immediate / Within 1 Month'
  | '1 – 3 Months'
  | '3 – 6 Months'
  | 'Just Exploring';

export type ReplyWindow = 'Morning' | 'Afternoon' | 'Evening';

export type ViewMode = 'client' | 'agent';

export type LeadStatus = 'New Enquiry' | 'Replied' | 'Viewing Scheduled';

export interface PropertyBriefState {
  goal: PropertyGoal | '';
  propertyType: PropertyType | '';
  preferredArea: string;
  budget: BudgetRange | '';
  timeline: TimelineOption | '';
  referenceLink: string;
  clientName: string;
  replyWindow: ReplyWindow | '';
}

export interface DemoLead {
  id: string;
  clientName: string;
  receivedAt: string;
  goal: PropertyGoal;
  propertyType: PropertyType;
  preferredArea: string;
  budget: BudgetRange;
  timeline: TimelineOption;
  referenceLink?: string;
  replyWindow: ReplyWindow;
  status: LeadStatus;
  isLiveDraft?: boolean;
}

export const ZACH_CONTACT = {
  name: 'Zach Lin',
  role: 'Independent Property Agent, Singapore',
  website: 'https://zachlin.co/',
  aboutUrl: 'https://zachlin.co/about-zach-lin/',
  contactUrl: 'https://zachlin.co/contact/',
  email: 'info@zachlin.co',
  phoneDisplay: '+65 9327 7196',
  whatsappNumber: '6593277196',
  heroImage: '/src/assets/images/singapore_luxury_architecture_1795694544865.jpg',
} as const;

export const GOAL_OPTIONS: Array<{
  value: PropertyGoal;
  subtitle: string;
}> = [
  {
    value: 'Buy a Property',
    subtitle: 'Shortlist units, compare PSF trends, and arrange private viewings',
  },
  {
    value: 'Sell My Property',
    subtitle: 'Indicative valuation, launch positioning, and buyer qualification',
  },
  {
    value: 'Rent / Lease',
    subtitle: 'Tenant matching, lease review, or corporate relocation search',
  },
  {
    value: 'Asset Progression & Advisory',
    subtitle: 'Portfolio restructuring, HDB-to-private upgrades, and timeline planning',
  },
];

export const PROPERTY_TYPE_OPTIONS: PropertyType[] = [
  'Condominium',
  'HDB',
  'Landed',
  'Commercial',
];

export const AREA_SUGGESTIONS: string[] = [
  'District 9 / 10 (Orchard, River Valley)',
  'District 15 (East Coast, Katong)',
  'District 11 (Novena, Newton)',
  'City Fringe (RCR)',
  'Heartland / MRT-Connected',
];

export const BUDGET_OPTIONS: BudgetRange[] = [
  'Below $1.2M',
  '$1.2M – $2M',
  '$2M – $3.5M',
  '$3.5M+',
  'Rental Budget',
];

export const TIMELINE_OPTIONS: TimelineOption[] = [
  'Immediate / Within 1 Month',
  '1 – 3 Months',
  '3 – 6 Months',
  'Just Exploring',
];

export const REPLY_WINDOW_OPTIONS: Array<{
  value: ReplyWindow;
  hours: string;
}> = [
  { value: 'Morning', hours: '9am – 12pm' },
  { value: 'Afternoon', hours: '12pm – 5pm' },
  { value: 'Evening', hours: '5pm – 9pm' },
];

export const INITIAL_BRIEF: PropertyBriefState = {
  goal: 'Buy a Property',
  propertyType: 'Condominium',
  preferredArea: '',
  budget: '$2M – $3.5M',
  timeline: '1 – 3 Months',
  referenceLink: '',
  clientName: '',
  replyWindow: 'Evening',
};

export const EMPTY_BRIEF: PropertyBriefState = {
  goal: '',
  propertyType: '',
  preferredArea: '',
  budget: '',
  timeline: '',
  referenceLink: '',
  clientName: '',
  replyWindow: '',
};

export function formatWhatsAppBrief(brief: PropertyBriefState): string {
  const goalText = brief.goal || '[Select Goal]';
  const typeText = brief.propertyType || '[Select Property Type]';
  const areaText = brief.preferredArea.trim() || 'Open to recommendations';
  const budgetText = brief.budget || '[Select Budget]';
  const timelineText = brief.timeline || '[Select Timeline]';
  const windowText = brief.replyWindow || 'Anytime';
  const linkTrimmed = brief.referenceLink.trim();
  const nameTrimmed = brief.clientName.trim();

  const lines = [
    `Hi Zach, I came across zachlin.co and would like to enquire about ${goalText}.`,
    `• Property Type: ${typeText}`,
    `• Preferred Area: ${areaText}`,
    `• Budget: ${budgetText}`,
    `• Timeline: ${timelineText}`,
  ];

  if (linkTrimmed) {
    lines.push(`• Reference Link: ${linkTrimmed}`);
  }

  lines.push(`• Preferred Reply Time: ${windowText}`);

  if (nameTrimmed) {
    lines.push(`- ${nameTrimmed}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${ZACH_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildAgentReplyUrl(lead: DemoLead): string {
  const firstName = lead.clientName.replace(/\s*\(Demo.*?\)/i, '').trim() || 'there';
  const replyMessage = `Hi ${firstName}, thanks for sending your ${lead.goal.toLowerCase()} brief via zachlin.co (${lead.propertyType}, ${lead.preferredArea}, ${lead.budget}). I'm available during your preferred ${lead.replyWindow.toLowerCase()} window — would you like to discuss options then? — Zach Lin`;
  return buildWhatsAppUrl(replyMessage);
}

export const INITIAL_DEMO_LEADS: DemoLead[] = [
  {
    id: 'demo-1',
    clientName: 'Rachel Tan (Demo Lead)',
    receivedAt: 'Today, 2:14 PM',
    goal: 'Buy a Property',
    propertyType: 'Condominium',
    preferredArea: 'District 15 — Katong / Tanjong Rhu MRT',
    budget: '$2M – $3.5M',
    timeline: '1 – 3 Months',
    referenceLink: 'propertyguru.com.sg/listing/sample-d15-reference',
    replyWindow: 'Evening',
    status: 'New Enquiry',
  },
  {
    id: 'demo-2',
    clientName: 'Daniel Koh (Demo Lead)',
    receivedAt: 'Today, 11:40 AM',
    goal: 'Sell My Property',
    propertyType: 'HDB',
    preferredArea: 'Bishan / Marymount',
    budget: 'Below $1.2M',
    timeline: 'Immediate / Within 1 Month',
    replyWindow: 'Afternoon',
    status: 'New Enquiry',
  },
  {
    id: 'demo-3',
    clientName: 'Priya & Arjun (Demo Lead)',
    receivedAt: 'Yesterday, 6:25 PM',
    goal: 'Asset Progression & Advisory',
    propertyType: 'Condominium',
    preferredArea: 'District 19 or City Fringe (RCR)',
    budget: '$1.2M – $2M',
    timeline: '3 – 6 Months',
    replyWindow: 'Evening',
    status: 'Replied',
  },
  {
    id: 'demo-4',
    clientName: 'Marcus Lim (Demo Lead)',
    receivedAt: 'Yesterday, 10:05 AM',
    goal: 'Rent / Lease',
    propertyType: 'Condominium',
    preferredArea: 'District 9 / 10 — Orchard or River Valley',
    budget: 'Rental Budget',
    timeline: 'Immediate / Within 1 Month',
    referenceLink: '99.co/singapore/rent/sample-d09-reference',
    replyWindow: 'Morning',
    status: 'Viewing Scheduled',
  },
];
