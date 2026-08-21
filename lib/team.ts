import type { DivisionId, PracticeId } from "@/lib/divisions";

/**
 * Placeholder roster for the presentation build. Names and bios are invented —
 * swap them for the real people (and headshots) before this goes live. The
 * shape is what matters: every person belongs to one division and, inside the
 * business division, to one practice area.
 */
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  division: DivisionId;
  practice: PracticeId;
  /** Where they are based, shown under the role. */
  base: string;
  bio: string;
  credentials: string[];
  email: string;
  /** Falls back to the tinted initials block when there is no headshot yet. */
  photo?: string;
};

export const LEADERSHIP: TeamMember[] = [
  {
    id: "group-managing-partner",
    name: "A. Reyes",
    role: "Managing Partner, Menlo Group",
    division: "real-estate",
    practice: "real-estate",
    base: "Tempe, AZ",
    bio: "Founded the firm in 2008 and still sits in on the first conversation of every transition, whichever division it lands in.",
    credentials: ["Designated Broker", "CCIM candidate"],
    email: "info@menlocre.com",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "group-operations",
    name: "M. Calloway",
    role: "Director of Operations, Menlo Group",
    division: "business",
    practice: "business-brokerage",
    base: "Tempe, AZ",
    bio: "Runs the shared back office — marketing, listing production and closing coordination — so both divisions work off the same checklist.",
    credentials: ["Transaction management", "Closing coordination"],
    email: "info@menlobusinessbrokers.com",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
];

export const TEAM: TeamMember[] = [
  /* -------------------------------------------------------- Real Estate team */
  {
    id: "re-brokerage-lead",
    name: "D. Whitfield",
    role: "Senior Broker · Industrial & Flex",
    division: "real-estate",
    practice: "real-estate",
    base: "Tempe, AZ",
    bio: "Handles industrial and flex assignments across the East Valley, from single-tenant buildings to multi-building portfolios.",
    credentials: ["AZ Real Estate License", "Industrial specialization"],
    email: "info@menlocre.com",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "re-retail",
    name: "S. Marchetti",
    role: "Broker · Retail & Restaurant",
    division: "real-estate",
    practice: "real-estate",
    base: "Phoenix, AZ",
    bio: "Represents both landlords and expanding retail tenants, with a focus on corner and pad sites along established corridors.",
    credentials: ["AZ Real Estate License", "Retail tenant representation"],
    email: "info@menlocre.com",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "re-medical",
    name: "K. Osei",
    role: "Broker · Medical & Dental Office",
    division: "real-estate",
    practice: "real-estate",
    base: "Chandler, AZ",
    bio: "The bridge between the two divisions — places dentists in space that fits the practice they are buying or building.",
    credentials: ["AZ Real Estate License", "Healthcare office specialization"],
    email: "info@menlocre.com",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "re-property-management",
    name: "L. Brennan",
    role: "Director of Property Management",
    division: "real-estate",
    practice: "real-estate",
    base: "Tempe, AZ",
    bio: "Manages the commercial portfolio day to day: budgets, vendors, tenant relations and capital planning.",
    credentials: ["CPM candidate", "Commercial portfolio management"],
    email: "info@menlocre.com",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },

  /* ------------------------------------------------------------ Dental team */
  {
    id: "dental-lead",
    name: "R. Nakamura",
    role: "Practice Transition Advisor · Lead",
    division: "business",
    practice: "dental",
    base: "Tempe, AZ · nationwide",
    bio: "Leads private practice sales end to end, from the first valuation conversation through the seller's last day in the chair.",
    credentials: ["Certified Valuation Analyst™", "ADS affiliate"],
    email: "info@menlotransitions.com",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "dental-dso",
    name: "P. Adeyemi",
    role: "Director of DSO Affiliations",
    division: "business",
    practice: "dental",
    base: "Tempe, AZ · nationwide",
    bio: "Runs the group and multi-site side: platform sales, recapitalizations, rollover equity and post-close earn-out structures.",
    credentials: ["M&A advisory", "Quality-of-earnings coordination"],
    email: "info@menlotransitions.com",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "dental-appraisals",
    name: "T. Lindqvist",
    role: "Senior Appraiser · Dental",
    division: "business",
    practice: "dental",
    base: "Tempe, AZ",
    bio: "Produces the certified appraisals behind every dental listing, and the standalone valuations owners order years before they sell.",
    credentials: ["Certified Valuation Analyst™", "Practice appraisal"],
    email: "info@menlotransitions.com",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "dental-buyer-advisory",
    name: "J. Okonkwo",
    role: "Buyer & Startup Advisor",
    division: "business",
    practice: "dental",
    base: "Nationwide",
    bio: "Works with associates buying their first practice and with dentists building from a shell — lender introductions included.",
    credentials: ["Buyer representation", "Startup planning"],
    email: "info@menlotransitions.com",
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },

  /* -------------------------------------------------- Other businesses team */
  {
    id: "biz-lead",
    name: "C. Vasquez",
    role: "Business Broker · Lead",
    division: "business",
    practice: "business-brokerage",
    base: "Tempe, AZ",
    bio: "Sells owner-operated companies — services, retail, distribution — without the market finding out before closing.",
    credentials: ["Business brokerage", "Confidential marketing"],
    email: "info@menlobusinessbrokers.com",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "biz-valuation",
    name: "H. Delacroix",
    role: "Director of Business Valuation",
    division: "business",
    practice: "business-brokerage",
    base: "Tempe, AZ",
    bio: "Builds the recast financials and the pricing argument that survives a buyer's due diligence.",
    credentials: ["Certified Valuation Analyst™", "Financial recasting"],
    email: "info@menlobusinessbrokers.com",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
  {
    id: "biz-buyside",
    name: "N. Farrow",
    role: "Buy-Side & Investor Advisor",
    division: "business",
    practice: "business-brokerage",
    base: "Tempe, AZ",
    bio: "Represents buyers and investor groups searching for acquisitions across Arizona and the Southwest.",
    credentials: ["Buy-side advisory", "Search fund experience"],
    email: "info@menlobusinessbrokers.com",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&h=760&q=70&crop=faces",
  },
];

export function teamOfPractice(practice: PracticeId): TeamMember[] {
  return TEAM.filter((member) => member.practice === practice);
}

/** Two letters for the fallback avatar. */
export function initials(name: string): string {
  return name
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
