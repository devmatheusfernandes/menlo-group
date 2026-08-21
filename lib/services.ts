import type { PracticeId } from "@/lib/divisions";

/** Keys the services page maps to real icon components. */
export type ServiceIcon =
  | "search"
  | "tag"
  | "chart"
  | "key"
  | "tooth"
  | "network"
  | "scale"
  | "sprout"
  | "lock"
  | "handshake"
  | "calendar"
  | "document";

export type Service = {
  id: string;
  practice: PracticeId;
  num: string;
  title: string;
  icon: ServiceIcon;
  /** One line. If it needs two, it belongs on a detail page, not here. */
  summary: string;
  /** Three short chips — scanned, not read. */
  points: [string, string, string];
};

export const SERVICES: Service[] = [
  /* --------------------------------------------------------------- Real Estate */
  {
    id: "buyer-tenant-representation",
    practice: "real-estate",
    num: "01",
    title: "Buyer & tenant representation",
    icon: "search",
    summary: "We shop the market on your side — including buildings never listed publicly.",
    points: ["Market survey", "Tours", "Lease negotiation"],
  },
  {
    id: "seller-landlord-representation",
    practice: "real-estate",
    num: "02",
    title: "Seller & landlord representation",
    icon: "tag",
    summary: "Pricing and a marketing campaign built for your asset class.",
    points: ["Opinion of value", "Listing campaign", "Offer analysis"],
  },
  {
    id: "investment-services",
    practice: "real-estate",
    num: "03",
    title: "Investment services",
    icon: "chart",
    summary: "Underwriting and hold-or-sell analysis for Greater Phoenix assets.",
    points: ["Underwriting", "1031 exchanges", "Disposition timing"],
  },
  {
    id: "property-management",
    practice: "real-estate",
    num: "04",
    title: "Property management",
    icon: "key",
    summary: "Tenants, vendors, budgets and the capital plan — handled daily.",
    points: ["Rent & reporting", "Maintenance", "Lease admin"],
  },

  /* -------------------------------------------------------------------- Dental */
  {
    id: "doctor-to-doctor-practice-sales",
    practice: "dental",
    num: "01",
    title: "Doctor-to-doctor practice sales",
    icon: "tooth",
    summary: "A confidential sale directly to another dentist, priced off a certified appraisal.",
    points: ["Certified appraisal", "Buyer screening", "Closing & handover"],
  },
  {
    id: "dso-affiliations",
    practice: "dental",
    num: "02",
    title: "DSO affiliations",
    icon: "network",
    summary: "A competitive process for groups: rollover equity, earn-outs, institutional diligence.",
    points: ["EBITDA normalization", "Q of E prep", "Multiple bidders"],
  },
  {
    id: "dental-appraisals",
    practice: "dental",
    num: "03",
    title: "Certified appraisals",
    icon: "scale",
    summary: "A CVA™ appraisal that stands up to a lender, a partner or an estate.",
    points: ["Written report", "Financial recast", "Comp analysis"],
  },
  {
    id: "dental-buyer-startup",
    practice: "dental",
    num: "04",
    title: "Buyer & startup advisory",
    icon: "sprout",
    summary: "For associates buying in, and dentists building from a shell.",
    points: ["Practice search", "Lender intros", "Site selection"],
  },

  /* ---------------------------------------------------------- Other businesses */
  {
    id: "confidential-business-sales",
    practice: "business-brokerage",
    num: "01",
    title: "Confidential business sales",
    icon: "lock",
    summary: "Staff, vendors and customers find out when it suits the business — not before.",
    points: ["Blind profile", "NDA screening", "Data room"],
  },
  {
    id: "business-valuation",
    practice: "business-brokerage",
    num: "02",
    title: "Valuation & pricing",
    icon: "scale",
    summary: "A number that survives the buyer's accountant pulling it apart.",
    points: ["Recast financials", "Market multiples", "Written report"],
  },
  {
    id: "buyer-investor-advisory",
    practice: "business-brokerage",
    num: "03",
    title: "Buyer & investor advisory",
    icon: "handshake",
    summary: "Acquisition search and negotiation for buyers shopping the Southwest.",
    points: ["Off-market sourcing", "Diligence", "Offer structuring"],
  },
  {
    id: "transition-planning",
    practice: "business-brokerage",
    num: "04",
    title: "Post-sale transition",
    icon: "calendar",
    summary: "The handover sequencing that keeps a business running as it changes hands.",
    points: ["Training schedule", "Staff comms", "Contract assignment"],
  },
];

export function servicesOfPractice(practice: PracticeId): Service[] {
  return SERVICES.filter((service) => service.practice === practice);
}

/** Photography that identifies each practice area at a glance. */
export const PRACTICE_MEDIA: Record<
  PracticeId,
  { img: string; alt: string; tag: string }
> = {
  "real-estate": {
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=70",
    alt: "Commercial office building exterior in the Greater Phoenix area",
    tag: "INDUSTRIAL · RETAIL · MEDICAL",
  },
  dental: {
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=70",
    alt: "Modern dental treatment room",
    tag: "DOCTOR-TO-DOCTOR · DSO AFFILIATION",
  },
  "business-brokerage": {
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=70",
    alt: "Business partners meeting around a table",
    tag: "CONFIDENTIAL · NDA REQUIRED",
  },
};

/** The steps every engagement runs through, whichever division owns it. */
export const PROCESS = [
  { num: "01", title: "Conversation", body: "The goal, the timeline, and who can know." },
  { num: "02", title: "Valuation", body: "A certified appraisal or opinion of value." },
  { num: "03", title: "Preparation", body: "Financials and the package, before market." },
  { num: "04", title: "Qualified market", body: "Screened, NDA-signed parties only." },
  { num: "05", title: "Negotiation", body: "Offers compared on structure, not headline." },
  { num: "06", title: "Closing", body: "Diligence through closing, then handover." },
];
