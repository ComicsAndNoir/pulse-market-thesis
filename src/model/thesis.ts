/**
 * thesis.ts — THE SINGLE SOURCE OF TRUTH.
 * ---------------------------------------------------------------------------
 * The entire dashboard is a pure function of the object exported from this
 * file. To change the market thesis you edit DATA here — never a component.
 *
 *   - Add / retire a segment  -> add or remove an entry in `segments`.
 *   - Add / remove a dimension -> edit `dimensions` (scores are keyed by id,
 *                                 so nothing silently mis-aligns).
 *   - Re-weight the rubric     -> change `weight` values (they are normalized
 *                                 at runtime, so they need not sum to 1).
 *   - Re-score a cell          -> edit `value` (1-5) and its `rationale`.
 *
 * Every score below is an ASSUMPTION to be validated with real buyers in the
 * first 90 days, not a fact. The `rationale` on each cell is the "showing your
 * work" that the UI surfaces on hover.
 */

export type Verdict = 'winner' | 'runner-up' | 'parked' | 'kill';

export interface Dimension {
  id: string;
  label: string;
  /** Relative weight. Normalized at runtime; expressed here as a %  for readability. */
  weight: number;
  /** Methodology copy — why this dimension exists and why it's weighted this way. */
  description: string;
}

export interface Cell {
  /** 1 (weak) - 5 (strong). */
  value: number;
  /** One-line justification shown on hover. This is a hypothesis, not a fact. */
  rationale: string;
}

export interface RoiSkeleton {
  buyer: string;
  math: string;
}

export interface UpsellTarget {
  name: string;
  /** Why this existing Napster account is a plausible Pulse expansion. */
  rationale: string;
}

export interface DemoAccess {
  /** Where the live working demo(s) for this segment's upsell targets can be tried. */
  url: string;
  /** Who to contact for the access password (kept out of the demo to protect API limits). */
  contactEmail: string;
}

export interface Segment {
  id: string;
  name: string;
  /** Short descriptor shown under the name. */
  tagline: string;
  /** Which Pulse interview mode this leans on. */
  mode: 'evidentiary' | 'exploratory' | 'mixed';
  /** Scores keyed by Dimension.id. */
  scores: Record<string, Cell>;
  /** Editorial verdict — drives the chip and the kill list. */
  verdict: Verdict;
  /** For the winner / top candidates: what must be true for this to work. */
  whatWouldHaveToBeTrue?: string[];
  /** For the winner / top candidates: the first-principles ROI sketch. */
  roi?: RoiSkeleton;
  /** Existing Napster accounts that could plausibly be upsold into this segment. */
  upsellTargets?: UpsellTarget[];
  /** Where to try a live demo backing up this segment's upsell targets, if one exists. */
  demoAccess?: DemoAccess;
}

export interface ThesisModel {
  /** The one-sentence bet, stated above the tool. */
  thesisStatement: string;
  /** Sub-line under the thesis. */
  thesisContext: string;
  dimensions: Dimension[];
  segments: Segment[];
}

/* -------------------------------------------------------------------------- */
/*  DIMENSIONS — the rubric. Weights encode what actually kills a 0-1 product: */
/*  you can't reach the buyer, or you can't prove value before the room loses  */
/*  patience. So proof-speed and ROI are weighted highest and TAM/expansion    */
/*  is deliberately underweighted (it's a tiebreaker, not a driver).           */
/* -------------------------------------------------------------------------- */

export const DIMENSIONS: Dimension[] = [
  {
    id: 'proof',
    label: 'Time to First Proof',
    weight: 20,
    description:
      'Days from "go" to a pilot showing signal. A 0-1 product dies on slow proof — this is the day-90 test.',
  },
  {
    id: 'roi',
    label: 'Willingness to Pay / ROI Clarity',
    weight: 20,
    description:
      'Can the conversation be tied to a dollar the buyer already owns? No dollar means no budget means no pilot.',
  },
  {
    id: 'reach',
    label: 'Buyer Reachability',
    weight: 15,
    description: 'Whether Pulse can be in front of the buyer within the first week.',
  },
  {
    id: 'pain',
    label: 'Severity of Pain Point',
    weight: 15,
    description: 'Painkiller vs. vitamin. Determines whether pilots convert into repeat usage.',
  },
  {
    id: 'fit',
    label: 'Capability Fit Today',
    weight: 15,
    description:
      'Match to what Pulse is excellent at today: scripted/evidentiary vs. outcome-chasing/exploratory. The sharp edge in hand beats the roadmap.',
  },
  {
    id: 'whitespace',
    label: 'Competitive Whitespace',
    weight: 10,
    description: 'How crowded the incumbent field is. A thin field means a faster wedge.',
  },
  {
    id: 'expansion',
    label: 'Expansion Path',
    weight: 5,
    description:
      'Land-and-expand potential. Deliberately low weight — it is a tiebreaker, not a reason to start here.',
  },
];

/* -------------------------------------------------------------------------- */
/*  SEGMENTS — the candidate conversations Pulse could own.                    */
/* -------------------------------------------------------------------------- */

export const SEGMENTS: Segment[] = [
  {
    id: 'churn',
    name: 'Exit / Churn Interviews',
    tagline: 'Ask every customer who left why they left.',
    mode: 'evidentiary',
    verdict: 'winner',
    scores: {
      proof: {
        value: 5,
        rationale:
          'Churned-customer lists already exist and interviews run async — no scheduling friction, signal in days.',
      },
      roi: {
        value: 5,
        rationale:
          'Ties directly to a retention/revenue number the buyer already owns and reports on.',
      },
      reach: {
        value: 5,
        rationale:
          'The buyer is a Head of Retention / CX who owns a churn number and takes the meeting.',
      },
      pain: {
        value: 4,
        rationale:
          'Real, recurring pain — but teams have limped along with surveys, so not screaming.',
      },
      fit: {
        value: 4,
        rationale:
          'Semi-structured, evidentiary-leaning: a consistent core script with room to probe. Good fit for what ships today.',
      },
      whitespace: {
        value: 3,
        rationale:
          'Churn surveys and CS tools exist, but an AI that actually interviews at scale is genuine whitespace.',
      },
      expansion: {
        value: 4,
        rationale: 'Natural expansion into win/loss, onboarding, and NPS follow-up interviews.',
      },
    },
    whatWouldHaveToBeTrue: [
      '~50 recently-churned customers should be easy to source and interview inside two weeks.',
      "Not replacing existing human-led interviews, but conducting those they simply don't have time or resources to hold.",
    ],
    roi: {
      buyer: 'Head of Retention / Customer Experience',
      math: 'A 1-point retention lift on a $50M book is ~$500K/yr. A pilot that informs even one save motion pays for itself many times over.',
    },
    demoAccess: {
      url: 'https://pulse-demo-5mpr.onrender.com',
      contactEmail: 'stuart.inskip@gmail.com',
    },
    upsellTargets: [
      {
        name: 'Napster AI Companion (Internal)',
        rationale:
          'Free-tier Companion users who used credits but never converted. Internal, so procurement and onboarding are near-instant, integration stays inside the Napster ecosystem, and the insight feeds a sibling product line with its own retention problem.',
      },
      {
        name: 'Sports Clubs & Event Operators',
        rationale:
          'Onboarding/offboarding interviews for every event staff member, plus potential follow-up with attendees.',
      },
      {
        name: 'Existing Retail Clients',
        rationale: 'Onboarding/offboarding interviews at retailers with high staff churn.',
      },
    ],
  },
  {
    id: 'research',
    name: 'Research-Study Participants',
    tagline: 'Run the same study interview with every subject.',
    mode: 'evidentiary',
    verdict: 'runner-up',
    scores: {
      proof: {
        value: 4,
        rationale:
          'Participants are recruitable, but study design and IRB-style setup add lead time.',
      },
      roi: {
        value: 3,
        rationale:
          'Value is real but paid from research budgets, not a revenue line — fuzzier to price.',
      },
      reach: {
        value: 3,
        rationale: 'Buyer is fragmented across researchers, insights teams, and agencies.',
      },
      pain: {
        value: 4,
        rationale: 'Structured interviewing at scale is genuinely painful and manual today.',
      },
      fit: {
        value: 5,
        rationale:
          'The purest fit for Pulse\u2019s evidentiary mode: same script to every subject, and the record matters.',
      },
      whitespace: {
        value: 4,
        rationale:
          'Interview-research tools exist, but AI-conducted, identical-script interviews are open.',
      },
      expansion: {
        value: 3,
        rationale: 'Expands across study types, but each buyer is a fresh sale.',
      },
    },
    whatWouldHaveToBeTrue: [
      'A research buyer will trust an AI interviewer to preserve methodological consistency.',
      'The evidentiary record is defensible enough for publication or decision-making.',
    ],
    roi: {
      buyer: 'Head of Research / Insights',
      math: 'Replaces or augments $150–300/hr moderator time across dozens of interviews per study.',
    },
  },
  {
    id: 'field',
    name: 'Multi-Site Field Check-ins',
    tagline: 'Every site, every week, actually heard.',
    mode: 'mixed',
    verdict: 'parked',
    scores: {
      proof: {
        value: 3,
        rationale: 'Needs site coordination and a rollout — slower to first signal.',
      },
      roi: {
        value: 3,
        rationale: 'Ties to ops consistency and shrink, but the dollar is indirect.',
      },
      reach: { value: 3, rationale: 'Buyer is a Field/Ops leader — reachable, but a longer sell.' },
      pain: {
        value: 4,
        rationale: 'Distributed sites are a genuine blind spot for multi-location operators.',
      },
      fit: { value: 3, rationale: 'Mixed mode — part scripted, part exploratory.' },
      whitespace: { value: 4, rationale: 'Few tools do conversational field check-ins at scale.' },
      expansion: {
        value: 4,
        rationale: 'Strong expansion across every site and region once proven.',
      },
    },
    upsellTargets: [
      {
        name: 'Cooper Parry',
        rationale:
          'Already a Napster client for leadership development — a natural expansion into Pulse for better conversations across the organization.',
      },
      {
        name: 'Imperial College London',
        rationale:
          'Student outreach to gather feedback and identify gaps in understanding of course material.',
      },
    ],
  },
  {
    id: 'compliance',
    name: 'Evidentiary Compliance Interviews',
    tagline:
      'Ask every subject exactly the same thing, on the record.\n\nCompliance interviews implies they are already being held. In this instance, Pulse would be a cost saving, not expanding existing capabilities, which I see as our core strength.',
    mode: 'evidentiary',
    verdict: 'parked',
    scores: {
      proof: {
        value: 2,
        rationale: 'Legal gatekeeping and review cycles push the first pilot out — slow proof.',
      },
      roi: {
        value: 4,
        rationale: 'Clear ROI: compliance cost and risk avoidance are quantified line items.',
      },
      reach: {
        value: 2,
        rationale: 'Buyer sits behind legal/compliance procurement — hard to reach in week one.',
      },
      pain: { value: 4, rationale: 'High-stakes and painful when done manually.' },
      fit: {
        value: 5,
        rationale:
          'Perfect evidentiary fit: scripted, identical for every subject, record is the point.',
      },
      whitespace: {
        value: 4,
        rationale: 'Little conversational-AI competition in regulated interviewing.',
      },
      expansion: {
        value: 3,
        rationale: 'Expands across regulated processes, but each is a slow enterprise motion.',
      },
    },
  },
  {
    id: 'newhire',
    name: '30-Day New-Hire Check-ins',
    tagline: 'Catch the new hire before they quietly disengage.',
    mode: 'mixed',
    verdict: 'kill',
    scores: {
      proof: {
        value: 2,
        rationale: 'Proof is structurally slow — signal doesn’t land for 60–90 days.',
      },
      roi: {
        value: 2,
        rationale: 'Ties to new-hire retention, but the dollar is diffuse and lagging.',
      },
      reach: { value: 3, rationale: 'HRBP / People Ops are reachable, but budgets move slowly.' },
      pain: { value: 3, rationale: 'A known gap, but rarely an urgent, funded priority.' },
      fit: { value: 4, rationale: 'A 30-day check-in fits a scripted-plus-probe format well.' },
      whitespace: {
        value: 2,
        rationale: 'Crowded: Lattice, Culture Amp, Enboarder already own onboarding pulse.',
      },
      expansion: { value: 3, rationale: 'Some expansion into the wider employee lifecycle.' },
    },
  },
  {
    id: 'oneonones',
    name: 'Weekly Manager 1:1s',
    tagline: 'The huge, obvious market — and the trap.',
    mode: 'exploratory',
    verdict: 'kill',
    scores: {
      proof: {
        value: 3,
        rationale: 'Could run next week technically, but "did it work" is hard to define.',
      },
      roi: {
        value: 1,
        rationale: 'No dollar to point to. Engagement is real but unpriceable at pilot stage.',
      },
      reach: {
        value: 2,
        rationale:
          'No single buyer — the "buyer" is every manager, which means no one owns the budget.',
      },
      pain: { value: 2, rationale: 'A vitamin. Nice to have, easy to defer.' },
      fit: {
        value: 4,
        rationale: 'Fits the exploratory mode well — but fit alone does not make a market.',
      },
      whitespace: { value: 2, rationale: 'Crowded: 15Five, Lattice, Culture Amp all play here.' },
      expansion: {
        value: 5,
        rationale:
          'Massive TAM and expansion — which is exactly the trap that makes it look like the answer.',
      },
    },
  },
];

export const THESIS: ThesisModel = {
  thesisStatement: 'Pulse First Market Analysis',
  thesisContext:
    'The fastest path to proof: churned-customer lists already exist, the buyer owns a revenue number, and the interview fits what Pulse can ship today. The full reasoning — and what would change it — is below.',
  dimensions: DIMENSIONS,
  segments: SEGMENTS,
};
