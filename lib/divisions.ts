/**
 * Menlo Group is two businesses, not three.
 *
 * Real Estate stands on its own. Everything else — dental practices and every
 * other kind of company — is one business-transitions division that happens to
 * run a dedicated dental practice inside it.
 */

export type DivisionId = "real-estate" | "business";

/** A practice area is what a client actually shops for. */
export type PracticeId = "real-estate" | "dental" | "business-brokerage";

export type Practice = {
  id: PracticeId;
  division: DivisionId;
  /** Short label used on filters, chips and cards. */
  label: string;
  /** Full trading name of the team behind it. */
  brand: string;
  blurb: string;
  phone: string;
  tel: string;
  email: string;
};

export type Division = {
  id: DivisionId;
  slug: string;
  num: string;
  eyebrow: string;
  /** Trading name. */
  title: string;
  /** One line, used in the hero and the selector. */
  tagline: string;
  lede: string;
  reach: string;
  services: string[];
  practices: PracticeId[];
  img: string;
  imgAlt: string;
  visualTag: string;
};

export const PRACTICES: Record<PracticeId, Practice> = {
  "real-estate": {
    id: "real-estate",
    division: "real-estate",
    label: "Real Estate",
    brand: "Menlo Commercial Real Estate",
    blurb:
      "Industrial, retail, child care and medical/dental office space across the Greater Phoenix area.",
    phone: "(480) 525-5362",
    tel: "4805255362",
    email: "info@menlocre.com",
  },
  dental: {
    id: "dental",
    division: "business",
    label: "Dental Transitions",
    brand: "Menlo Dental Transitions",
    blurb:
      "Practice sales, buyer representation, certified appraisals, startups and DSO affiliations — nationwide.",
    phone: "(480) 267-9530",
    tel: "4802679530",
    email: "info@menlotransitions.com",
  },
  "business-brokerage": {
    id: "business-brokerage",
    division: "business",
    label: "General Businesses",
    brand: "Menlo Business",
    blurb:
      "Confidential sales and valuations for every business outside dentistry — services, retail, distribution, light manufacturing.",
    phone: "(480) 290-7720",
    tel: "4802907720",
    email: "info@menlobusinessbrokers.com",
  },
};

export const PRACTICE_LIST: Practice[] = Object.values(PRACTICES);

export const DIVISIONS: Division[] = [
  {
    id: "real-estate",
    slug: "real-estate",
    num: "01",
    eyebrow: "Commercial Real Estate",
    title: "Menlo Real Estate",
    tagline: "Space to buy, lease, own and manage.",
    lede: "Full-service commercial brokerage across the Greater Phoenix area — buyer and tenant representation, seller and landlord representation, investment consulting and property management for industrial, retail, child care and medical/dental office markets.",
    reach: "GREATER PHOENIX",
    services: [
      "Buyer & tenant representation",
      "Seller & landlord representation",
      "Investment services & real estate consulting",
      "Commercial property management",
    ],
    practices: ["real-estate"],
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=72",
    imgAlt: "Modern commercial office building exterior",
    visualTag: "INDUSTRIAL · RETAIL · MEDICAL/DENTAL",
  },
  {
    id: "business",
    slug: "business",
    num: "02",
    eyebrow: "Business Transitions",
    title: "Menlo Business Advisors",
    tagline: "Companies to value, sell and hand over.",
    lede: "One division for every business transition: a dedicated dental practice that works nationwide on practice sales, appraisals and DSO affiliation deals, and a general brokerage team for every other kind of company. Same process, same confidentiality, two sets of specialists.",
    reach: "NATIONWIDE · 100% CONFIDENTIAL",
    services: [
      "Confidential business & practice sales",
      "Buyer, startup & investor advisory",
      "Certified Valuation Analyst™ appraisals",
      "DSO affiliations & post-sale transition planning",
    ],
    practices: ["dental", "business-brokerage"],
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1800&q=72",
    imgAlt: "Modern dental office treatment room",
    visualTag: "DENTAL + EVERY OTHER BUSINESS",
  },
];

export function getDivision(id: DivisionId): Division {
  const division = DIVISIONS.find((d) => d.id === id);
  if (!division) throw new Error(`Unknown division: ${id}`);
  return division;
}

export function practicesOf(id: DivisionId): Practice[] {
  return getDivision(id).practices.map((p) => PRACTICES[p]);
}
