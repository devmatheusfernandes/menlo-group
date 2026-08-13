export type Division = "real-estate" | "dental" | "business";

export type Listing = {
  id: string;
  cat: Division;
  catLabel: string;
  title: string;
  loc: string;
  meta: string[];
  teaser: string;
  details: Record<string, string>;
  img: string;
};

export const listings: Listing[] = [
  {
    id: "re1",
    cat: "real-estate",
    catLabel: "Real Estate",
    title: "Industrial Warehouse · Tempe",
    loc: "Tempe, AZ",
    meta: ["18,400 sq ft", "Industrial", "For Lease"],
    teaser:
      "Warehouse with truck court and fast access to the I-10, ideal for logistics or distribution.",
    details: {
      "Lease rate": "$0.85 / sq ft / month",
      "Total area": "18,400 sq ft",
      Zoning: "Light industrial",
      Availability: "Immediate",
    },
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=700&q=65",
  },
  {
    id: "re2",
    cat: "real-estate",
    catLabel: "Real Estate",
    title: "Medical/Dental Suite · Chandler",
    loc: "Chandler, AZ",
    meta: ["2,100 sq ft", "Medical/Dental", "For Sale"],
    teaser:
      "Move-in ready suite with plumbing already roughed in for dental chairs.",
    details: {
      Price: "$690,000",
      "Total area": "2,100 sq ft",
      Parking: "12 dedicated spaces",
      Zoning: "Commercial / Medical",
    },
    img: "https://images.unsplash.com/photo-1629909613654-be1e7e179c0a?auto=format&fit=crop&w=700&q=65",
  },
  {
    id: "re3",
    cat: "real-estate",
    catLabel: "Real Estate",
    title: "Retail Storefront · Mesa",
    loc: "Mesa, AZ",
    meta: ["3,600 sq ft", "Retail", "For Lease"],
    teaser:
      "High-traffic corner spot on an established commercial corridor with double frontage.",
    details: {
      "Lease rate": "$2.10 / sq ft / month",
      "Total area": "3,600 sq ft",
      "Traffic count": "~28,000 vehicles/day",
      Availability: "60 days",
    },
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=65",
  },
  {
    id: "dt1",
    cat: "dental",
    catLabel: "Dental Transitions",
    title: "General Practice · Scottsdale",
    loc: "Scottsdale, AZ",
    meta: ["4 operatories", "Fee-for-service", "Confidential"],
    teaser:
      "Established 22-year practice with a loyal patient base and a full staff willing to stay on.",
    details: {
      "Annual revenue": "~$1.2M",
      Operatories: "4 chairs",
      "Practice type": "Fee-for-service",
      "Reason for sale": "Retirement",
    },
    img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=700&q=65",
  },
  {
    id: "dt2",
    cat: "dental",
    catLabel: "Dental Transitions",
    title: "Orthodontic Practice · Gilbert",
    loc: "Gilbert, AZ",
    meta: ["3 operatories", "Orthodontics", "Confidential"],
    teaser:
      "Specialty orthodontic practice with a strong digital presence and steady referral flow.",
    details: {
      "Annual revenue": "~$950K",
      Operatories: "3 chairs",
      "Practice type": "Specialty · Orthodontics",
      "Reason for sale": "Relocation",
    },
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=700&q=65",
  },
  {
    id: "dt3",
    cat: "dental",
    catLabel: "Dental Transitions",
    title: "Dental Startup · Queen Creek",
    loc: "Queen Creek, AZ",
    meta: ["New build", "Full buildout", "Buy-in available"],
    teaser:
      "Startup opportunity in a fast-growing suburb, with architectural plans already complete.",
    details: {
      "Estimated investment": "$480K",
      Area: "1,800 sq ft",
      Model: "Startup / buildout",
      Demographics: "High population growth",
    },
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=700&q=65",
  },
  {
    id: "bb1",
    cat: "business",
    catLabel: "Business Brokerage",
    title: "Boutique Fitness Chain",
    loc: "Metro Phoenix, AZ",
    meta: ["3 locations", "Fitness", "Confidential"],
    teaser:
      "Three profitable locations with proprietary branding and professional management in place.",
    details: {
      "Annual revenue": "~$2.4M",
      EBITDA: "~$540K",
      Locations: "3 sites",
      "Reason for sale": "Owner pursuing new venture",
    },
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=65",
  },
  {
    id: "bb2",
    cat: "business",
    catLabel: "Business Brokerage",
    title: "Established Med Spa",
    loc: "Scottsdale, AZ",
    meta: ["8 years in operation", "Aesthetics", "Confidential"],
    teaser:
      "Loyal high-end clientele, full licensed staff, and recently updated equipment throughout.",
    details: {
      "Annual revenue": "~$1.8M",
      EBITDA: "~$410K",
      Employees: "11",
      "Reason for sale": "Retirement",
    },
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=700&q=65",
  },
  {
    id: "bb3",
    cat: "business",
    catLabel: "Business Brokerage",
    title: "Regional Distribution Co.",
    loc: "Tempe, AZ",
    meta: ["B2B", "Logistics", "Confidential"],
    teaser:
      "Long-term contracts with corporate clients and an owned delivery fleet.",
    details: {
      "Annual revenue": "~$3.6M",
      EBITDA: "~$720K",
      Fleet: "6 vehicles",
      "Reason for sale": "Family succession",
    },
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=700&q=65",
  },
];

export const filters: { label: string; value: Division | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Dental Transitions", value: "dental" },
  { label: "Business Brokerage", value: "business" },
];
