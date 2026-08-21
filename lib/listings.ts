import type { DivisionId, PracticeId } from "@/lib/divisions";
import { PRACTICES } from "@/lib/divisions";

/**
 * How a dental opportunity is structured. Buyers shop very differently
 * depending on the answer, so it is a first-class filter — not a tag.
 */
export type DentalDealType = "doctor-to-doctor" | "dso-affiliation";

export type ListingStatus = "available" | "new" | "under-contract";

export type Listing = {
  /** URL segment — also the React key and the NDA reference. */
  id: string;
  /** Public file number, the way clients quote a listing on the phone. */
  ref: string;
  division: DivisionId;
  practice: PracticeId;
  title: string;
  city: string;
  state: string;
  status: ListingStatus;
  /** Chips on the card: three short facts, no financials. */
  meta: string[];
  teaser: string;
  /** Everything a visitor may read before signing anything. */
  summary: string[];
  /** Released only after the NDA is signed. */
  confidential: Record<string, string>;
  /** Always public — asking price, size, rate. */
  facts: Record<string, string>;
  img: string;
  gallery: string[];
  /** Dental and business opportunities stay behind an NDA; real estate does not. */
  requiresNda: boolean;
  /** Dental listings additionally require the HIPAA Business Associate Agreement. */
  requiresHipaa: boolean;
  dealType?: DentalDealType;
  /** Sub-type shown under the title: "General Practice", "Retail", "Distribution"… */
  kind: string;
};

const RE_GALLERY = [
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70",
];

const DENTAL_GALLERY = [
  "https://images.unsplash.com/photo-1629909613654-be1e7e179c0a?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=70",
];

const BIZ_GALLERY = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=70",
];

export const listings: Listing[] = [
  /* --------------------------------------------------------------- Real estate */
  {
    id: "mre-214-tempe-industrial-warehouse",
    ref: "MRE 214",
    division: "real-estate",
    practice: "real-estate",
    kind: "Industrial",
    title: "Industrial Warehouse · Tempe",
    city: "Tempe",
    state: "AZ",
    status: "available",
    meta: ["18,400 sq ft", "Industrial", "For Lease"],
    teaser:
      "Warehouse with truck court and fast access to the I-10, ideal for logistics or distribution.",
    summary: [
      "Clear height of 24 ft with two dock-high doors and one grade-level door.",
      "Fenced truck court with room for 53-ft trailers to turn.",
      "Roughly 2,000 sq ft of finished office at the front of the building.",
    ],
    confidential: {},
    facts: {
      "Lease rate": "$0.85 / sq ft / month",
      "Total area": "18,400 sq ft",
      Zoning: "Light industrial (I-1)",
      Availability: "Immediate",
      Parking: "22 surface spaces",
    },
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=70",
    gallery: RE_GALLERY,
    requiresNda: false,
    requiresHipaa: false,
  },
  {
    id: "mre-231-chandler-medical-dental-suite",
    ref: "MRE 231",
    division: "real-estate",
    practice: "real-estate",
    kind: "Medical / Dental office",
    title: "Medical/Dental Suite · Chandler",
    city: "Chandler",
    state: "AZ",
    status: "new",
    meta: ["2,100 sq ft", "Medical/Dental", "For Sale"],
    teaser:
      "Move-in ready suite with plumbing already roughed in for dental chairs.",
    summary: [
      "Four operatory positions already plumbed and vacuum-lined.",
      "Anchored center with a pediatric group and an imaging clinic as neighbors.",
      "Landlord improvement allowance available for a qualified medical tenant.",
    ],
    confidential: {},
    facts: {
      Price: "$690,000",
      "Total area": "2,100 sq ft",
      Parking: "12 dedicated spaces",
      Zoning: "Commercial / Medical",
      "Year built": "2016",
    },
    img: "https://images.unsplash.com/photo-1629909613654-be1e7e179c0a?auto=format&fit=crop&w=900&q=70",
    gallery: RE_GALLERY,
    requiresNda: false,
    requiresHipaa: false,
  },
  {
    id: "mre-198-mesa-retail-storefront",
    ref: "MRE 198",
    division: "real-estate",
    practice: "real-estate",
    kind: "Retail",
    title: "Retail Storefront · Mesa",
    city: "Mesa",
    state: "AZ",
    status: "available",
    meta: ["3,600 sq ft", "Retail", "For Lease"],
    teaser:
      "High-traffic corner spot on an established commercial corridor with double frontage.",
    summary: [
      "Corner unit with glass on two elevations and a monument sign panel included.",
      "Grease interceptor in place — restaurant-ready without a full conversion.",
      "Co-tenancy with a national pharmacy and a grocery anchor.",
    ],
    confidential: {},
    facts: {
      "Lease rate": "$2.10 / sq ft / month",
      "Total area": "3,600 sq ft",
      "Traffic count": "~28,000 vehicles/day",
      Availability: "60 days",
      Term: "5–10 years",
    },
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=70",
    gallery: RE_GALLERY,
    requiresNda: false,
    requiresHipaa: false,
  },
  {
    id: "mre-240-gilbert-child-care-campus",
    ref: "MRE 240",
    division: "real-estate",
    practice: "real-estate",
    kind: "Child care",
    title: "Child Care Campus · Gilbert",
    city: "Gilbert",
    state: "AZ",
    status: "available",
    meta: ["10,200 sq ft", "Child care", "For Sale"],
    teaser:
      "Purpose-built early-education campus with fenced play yards and a licensed capacity of 180.",
    summary: [
      "Licensed for 180 children across nine classrooms.",
      "Two shaded, fenced play yards with poured-in-place surfacing.",
      "Sale includes the real estate only; an operator lease-back can be negotiated.",
    ],
    confidential: {},
    facts: {
      Price: "$4,150,000",
      "Total area": "10,200 sq ft",
      "Lot size": "1.4 acres",
      "Licensed capacity": "180 children",
      Zoning: "Commercial with child care use permit",
    },
    img: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=900&q=70",
    gallery: RE_GALLERY,
    requiresNda: false,
    requiresHipaa: false,
  },
  {
    id: "mre-206-phoenix-flex-office",
    ref: "MRE 206",
    division: "real-estate",
    practice: "real-estate",
    kind: "Office / Flex",
    title: "Flex Office Building · Phoenix",
    city: "Phoenix",
    state: "AZ",
    status: "under-contract",
    meta: ["7,800 sq ft", "Office/Flex", "For Sale"],
    teaser:
      "Single-tenant flex building minutes from Sky Harbor, currently owner-occupied.",
    summary: [
      "Open floorplate with four private offices and a 1,900 sq ft shop area.",
      "Fully fenced yard with a secured gate.",
      "Under contract — accepting backup offers.",
    ],
    confidential: {},
    facts: {
      Price: "$2,340,000",
      "Total area": "7,800 sq ft",
      "Lot size": "0.72 acres",
      Zoning: "C-2",
      Status: "Under contract",
    },
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=70",
    gallery: RE_GALLERY,
    requiresNda: false,
    requiresHipaa: false,
  },

  /* -------------------------------------------------------------------- Dental */
  {
    id: "mdt-677-charleston-general-practice",
    ref: "MDT 677",
    division: "business",
    practice: "dental",
    kind: "General Practice",
    dealType: "doctor-to-doctor",
    title: "General Practice · Charleston",
    city: "Charleston",
    state: "SC",
    status: "new",
    meta: ["5 operatories", "Fee-for-service", "Doctor-to-doctor sale"],
    teaser:
      "Established fee-for-service practice in a growing coastal market, seller retiring within 12 months.",
    summary: [
      "Long-tenured team, all of whom have indicated they would stay through a transition.",
      "Digital records, intraoral scanner and cone-beam imaging already in place.",
      "Seller is open to a short mentorship period after closing.",
    ],
    confidential: {
      "Annual collections": "~$1.45M",
      "Adjusted EBITDA": "~$470K",
      "Active patients": "1,780",
      "New patients": "~34 / month",
      Operatories: "5 (plus 1 plumbed)",
      "Hygiene days": "8 per week",
      "Payer mix": "82% fee-for-service, 18% PPO",
      "Reason for sale": "Retirement",
      "Real estate": "Available for purchase or lease",
    },
    facts: {
      "Practice type": "General dentistry",
      Structure: "Doctor-to-doctor sale",
      Operatories: "5",
      "Square footage": "2,650 sq ft",
    },
    img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=70",
    gallery: DENTAL_GALLERY,
    requiresNda: true,
    requiresHipaa: true,
  },
  {
    id: "mdt-682-scottsdale-general-practice",
    ref: "MDT 682",
    division: "business",
    practice: "dental",
    kind: "General Practice",
    dealType: "doctor-to-doctor",
    title: "General Practice · Scottsdale",
    city: "Scottsdale",
    state: "AZ",
    status: "available",
    meta: ["4 operatories", "Fee-for-service", "Doctor-to-doctor sale"],
    teaser:
      "Established 22-year practice with a loyal patient base and a full staff willing to stay on.",
    summary: [
      "Single-owner practice with no associate turnover in the last decade.",
      "Referral-driven — no active marketing spend.",
      "Building is leased with an assignable term through 2031.",
    ],
    confidential: {
      "Annual collections": "~$1.2M",
      "Adjusted EBITDA": "~$385K",
      "Active patients": "1,340",
      "New patients": "~22 / month",
      Operatories: "4",
      "Payer mix": "100% fee-for-service",
      "Reason for sale": "Retirement",
    },
    facts: {
      "Practice type": "General dentistry",
      Structure: "Doctor-to-doctor sale",
      Operatories: "4",
      "Square footage": "2,100 sq ft",
    },
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=70",
    gallery: DENTAL_GALLERY,
    requiresNda: true,
    requiresHipaa: true,
  },
  {
    id: "mdt-701-phoenix-four-location-group",
    ref: "MDT 701",
    division: "business",
    practice: "dental",
    kind: "Multi-site Group",
    dealType: "dso-affiliation",
    title: "Four-Location Group · Metro Phoenix",
    city: "Metro Phoenix",
    state: "AZ",
    status: "new",
    meta: ["4 locations", "18 operatories", "DSO affiliation"],
    teaser:
      "Four-site group prepared for a DSO affiliation, with regional management already separated from clinical.",
    summary: [
      "Non-clinical operations already run by a regional manager, not the owner.",
      "Consolidated financials prepared to a quality-of-earnings standard.",
      "Owner intends to stay clinically for a three-to-five-year earn-out.",
    ],
    confidential: {
      "Group collections": "~$9.8M",
      "Adjusted EBITDA": "~$2.1M",
      Locations: "4 (all leased, assignable)",
      Operatories: "18 across four sites",
      Providers: "6 dentists, 2 specialists",
      "Deal structure": "Majority recapitalization with rollover equity",
      "Owner intent": "3–5 year clinical earn-out",
      "Quality of earnings": "Completed February 2026",
    },
    facts: {
      "Practice type": "Multi-site general & specialty",
      Structure: "DSO affiliation",
      Locations: "4",
      Operatories: "18",
    },
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=900&q=70",
    gallery: DENTAL_GALLERY,
    requiresNda: true,
    requiresHipaa: true,
  },
  {
    id: "mdt-694-denver-ortho-platform",
    ref: "MDT 694",
    division: "business",
    practice: "dental",
    kind: "Orthodontic Platform",
    dealType: "dso-affiliation",
    title: "Orthodontic Platform · Denver",
    city: "Denver",
    state: "CO",
    status: "available",
    meta: ["3 locations", "Orthodontics", "DSO affiliation"],
    teaser:
      "Specialty orthodontic platform positioned as a partnership entry point into the Front Range.",
    summary: [
      "Three clinics plus one satellite operating under a single brand.",
      "In-house aligner workflow with a digital scanner at every chair.",
      "Two associate orthodontists under contract beyond closing.",
    ],
    confidential: {
      "Group collections": "~$5.4M",
      "Adjusted EBITDA": "~$1.35M",
      Locations: "3 clinics + 1 satellite",
      "Starts per year": "~980",
      Providers: "1 owner + 2 associate orthodontists",
      "Deal structure": "Platform acquisition or DSO affiliation",
      "Owner intent": "Post-close leadership role",
    },
    facts: {
      "Practice type": "Orthodontics",
      Structure: "DSO affiliation",
      Locations: "3 + satellite",
      Operatories: "22 chairs",
    },
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=70",
    gallery: DENTAL_GALLERY,
    requiresNda: true,
    requiresHipaa: true,
  },
  {
    id: "mdt-688-queen-creek-startup",
    ref: "MDT 688",
    division: "business",
    practice: "dental",
    kind: "Startup Opportunity",
    dealType: "doctor-to-doctor",
    title: "Dental Startup · Queen Creek",
    city: "Queen Creek",
    state: "AZ",
    status: "available",
    meta: ["New build", "Full buildout", "Doctor-to-doctor sale"],
    teaser:
      "Startup opportunity in a fast-growing suburb, with architectural plans already complete.",
    summary: [
      "Shell space reserved in a center delivering later this year.",
      "Architectural and equipment plans complete and permit-ready.",
      "Menlo can introduce lenders experienced with dental startups.",
    ],
    confidential: {
      "Estimated investment": "$480K",
      "Projected year-2 collections": "~$820K",
      Area: "1,800 sq ft",
      Model: "Startup / buildout",
      Demographics: "Population growth of 6.1% annually",
      "Nearest competitor": "1.8 miles",
    },
    facts: {
      "Practice type": "General dentistry (startup)",
      Structure: "Startup / buildout",
      Operatories: "4 planned (6 plumbed)",
      "Square footage": "1,800 sq ft",
    },
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=70",
    gallery: DENTAL_GALLERY,
    requiresNda: true,
    requiresHipaa: true,
  },

  /* --------------------------------------------------------- Other businesses */
  {
    id: "mbb-108-phoenix-boutique-fitness",
    ref: "MBB 108",
    division: "business",
    practice: "business-brokerage",
    kind: "Fitness",
    title: "Boutique Fitness Chain",
    city: "Metro Phoenix",
    state: "AZ",
    status: "available",
    meta: ["3 locations", "Fitness", "Confidential"],
    teaser:
      "Three profitable locations with proprietary branding and professional management in place.",
    summary: [
      "Membership base of roughly 2,400 on a monthly recurring model.",
      "General manager and three studio leads stay through the transition.",
      "All three leases assignable with landlord consent.",
    ],
    confidential: {
      "Annual revenue": "~$2.4M",
      EBITDA: "~$540K",
      Locations: "3 sites",
      Members: "~2,400 recurring",
      Employees: "26 (9 full-time)",
      "Reason for sale": "Owner pursuing new venture",
      "Asking price": "$1.95M",
    },
    facts: {
      Industry: "Boutique fitness",
      Structure: "Asset sale",
      Locations: "3",
      "Years in operation": "7",
    },
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=70",
    gallery: BIZ_GALLERY,
    requiresNda: true,
    requiresHipaa: false,
  },
  {
    id: "mbb-114-scottsdale-med-spa",
    ref: "MBB 114",
    division: "business",
    practice: "business-brokerage",
    kind: "Aesthetics",
    title: "Established Med Spa",
    city: "Scottsdale",
    state: "AZ",
    status: "available",
    meta: ["8 years in operation", "Aesthetics", "Confidential"],
    teaser:
      "Loyal high-end clientele, full licensed staff, and recently updated equipment throughout.",
    summary: [
      "Medical director agreement in place and transferable.",
      "Device fleet refreshed within the last 24 months.",
      "Repeat clients account for roughly three quarters of revenue.",
    ],
    confidential: {
      "Annual revenue": "~$1.8M",
      EBITDA: "~$410K",
      Employees: "11",
      "Repeat revenue": "~74%",
      "Reason for sale": "Retirement",
      "Asking price": "$1.5M",
    },
    facts: {
      Industry: "Medical aesthetics",
      Structure: "Asset sale",
      Locations: "1",
      "Years in operation": "8",
    },
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=70",
    gallery: BIZ_GALLERY,
    requiresNda: true,
    requiresHipaa: false,
  },
  {
    id: "mbb-121-tempe-distribution",
    ref: "MBB 121",
    division: "business",
    practice: "business-brokerage",
    kind: "Distribution",
    title: "Regional Distribution Co.",
    city: "Tempe",
    state: "AZ",
    status: "available",
    meta: ["B2B", "Logistics", "Confidential"],
    teaser:
      "Long-term contracts with corporate clients and an owned delivery fleet.",
    summary: [
      "Top five customers all under contract beyond 2028.",
      "Six-vehicle fleet owned outright and included in the sale.",
      "Warehouse leased from a third party; the lease is assignable.",
    ],
    confidential: {
      "Annual revenue": "~$3.6M",
      EBITDA: "~$720K",
      Fleet: "6 vehicles, owned",
      "Customer concentration": "Top customer = 19% of revenue",
      Employees: "18",
      "Reason for sale": "Family succession",
      "Asking price": "$2.85M",
    },
    facts: {
      Industry: "B2B distribution",
      Structure: "Stock or asset sale",
      Locations: "1 warehouse",
      "Years in operation": "16",
    },
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=70",
    gallery: BIZ_GALLERY,
    requiresNda: true,
    requiresHipaa: false,
  },
  {
    id: "mbb-126-mesa-commercial-landscaping",
    ref: "MBB 126",
    division: "business",
    practice: "business-brokerage",
    kind: "Services",
    title: "Commercial Landscaping Co.",
    city: "Mesa",
    state: "AZ",
    status: "new",
    meta: ["Recurring contracts", "Services", "Confidential"],
    teaser:
      "Route-based commercial maintenance company with recurring HOA and property-manager contracts.",
    summary: [
      "Roughly 90% of revenue comes from recurring monthly maintenance.",
      "Crews run independently; the owner works fewer than 15 hours a week.",
      "Equipment and vehicles owned, with no capital leases outstanding.",
    ],
    confidential: {
      "Annual revenue": "~$2.1M",
      EBITDA: "~$495K",
      "Recurring revenue": "~90%",
      Contracts: "64 active accounts",
      Employees: "24 at seasonal peak",
      "Reason for sale": "Relocation",
      "Asking price": "$1.7M",
    },
    facts: {
      Industry: "Commercial landscaping",
      Structure: "Asset sale",
      Locations: "1 yard",
      "Years in operation": "12",
    },
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=900&q=70",
    gallery: BIZ_GALLERY,
    requiresNda: true,
    requiresHipaa: false,
  },
];

/* ------------------------------------------------------------------- helpers */

export type PracticeFilter = "all" | PracticeId;
export type DealTypeFilter = "all" | DentalDealType;

export const PRACTICE_FILTERS: { label: string; value: PracticeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Dental", value: "dental" },
  { label: "Other Businesses", value: "business-brokerage" },
];

/** Only offered once the dental practice area is selected. */
export const DEAL_TYPE_FILTERS: { label: string; value: DealTypeFilter }[] = [
  { label: "All dental", value: "all" },
  { label: "Doctor-to-doctor", value: "doctor-to-doctor" },
  { label: "DSO affiliation", value: "dso-affiliation" },
];

export const STATUS_LABELS: Record<ListingStatus, string> = {
  available: "Available",
  new: "New listing",
  "under-contract": "Under contract",
};

export const DEAL_TYPE_LABELS: Record<DentalDealType, string> = {
  "doctor-to-doctor": "Doctor-to-doctor",
  "dso-affiliation": "DSO affiliation",
};

export function practiceLabel(listing: Listing): string {
  return PRACTICES[listing.practice].label;
}

export function locationOf(listing: Listing): string {
  return `${listing.city}, ${listing.state}`;
}

export function getListing(id: string): Listing | undefined {
  return listings.find((listing) => listing.id === id);
}

/** Same practice first, then anything else, so a detail page always fills its row. */
export function relatedListings(listing: Listing, count = 3): Listing[] {
  const score = (other: Listing) =>
    (other.practice === listing.practice ? 2 : 0) +
    (listing.dealType && other.dealType === listing.dealType ? 1 : 0);

  return listings
    .filter((other) => other.id !== listing.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, count);
}

/** Text the search box matches against. */
export function haystack(listing: Listing): string {
  return [
    listing.title,
    listing.ref,
    locationOf(listing),
    listing.kind,
    practiceLabel(listing),
    listing.dealType ? DEAL_TYPE_LABELS[listing.dealType] : "",
    listing.meta.join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

/** Shared by the landing-page section and the dedicated /listings page. */
export function filterListings(
  practice: PracticeFilter,
  dealType: DealTypeFilter,
  query: string,
): Listing[] {
  const q = query.trim().toLowerCase();
  return listings.filter((listing) => {
    if (practice !== "all" && listing.practice !== practice) return false;
    if (practice === "dental" && dealType !== "all" && listing.dealType !== dealType)
      return false;
    return !q || haystack(listing).includes(q);
  });
}
