export const ABOUT_HERO = {
  label: "European Quality & Production",
  title: "About product and production",
} as const;

export interface AboutTextSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export const ABOUT_SECTIONS: AboutTextSection[] = [
  {
    id: "product-overview",
    title: "Product Overview: Growth Hormone (GH)",
    paragraphs: [
      "A therapeutic protein designed to stimulate growth, cell reproduction, and regeneration in various indications.",
      "Available in clinically validated formulations suitable for approved uses under medical supervision.",
    ],
  },
  {
    id: "european-production",
    title: "European Production",
    paragraphs: [
      "Produced in facilities located in Europe, leveraging regional supply chains and regulatory alignment with EU standards.",
    ],
  },
  {
    id: "quality-systems",
    title: "Quality Systems",
    paragraphs: [
      "Implemented under European Good Manufacturing Practice (GMP) guidelines, with regular inspections by EU authorities.",
    ],
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    paragraphs: [
      "Benefits from EU-based sourcing of raw materials, validated processes, and robust traceability from batch release to distribution.",
    ],
  },
  {
    id: "innovation-compliance",
    title: "Innovation & Compliance",
    paragraphs: [
      "Access to European clinical research infrastructure and adherence to EU pharmacovigilance requirements.",
    ],
  },
];

export interface AboutQualityPillar {
  title: string;
  text: string;
}

export const ABOUT_QUALITY_PILLARS: AboutQualityPillar[] = [
  {
    title: "Regulatory Adherence",
    text: "Compliance with EU pharmacopoeias and member state regulations for safety, efficacy, and labeling.",
  },
  {
    title: "Quality Certifications",
    text: "GMP certification, ISO quality management standards, and routine third-party audits.",
  },
  {
    title: "Consistency & Safety",
    text: "Rigorous in-process controls, validated analytical methods, and comprehensive release testing for each batch.",
  },
  {
    title: "Clinical & Pharmacovigilance Excellence",
    text: "Post-market surveillance aligned with EU expectations, ensuring ongoing safety monitoring and reporting.",
  },
];

export const ABOUT_QUALITY_TITLE = "European Quality Emphasis";
