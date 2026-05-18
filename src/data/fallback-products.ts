import type { Product } from "@/types/cms";

/** Shown when Sheets is unavailable — premium placeholder catalog. */
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "jolie-luminous-serum-1",
    name: "Luminous Renewal Serum",
    category: "Serum",
    description:
      "Advanced peptide complex for cellular radiance, barrier restoration, and visible luminosity.",
    composition:
      "Tri-Peptide Matrix · Hyaluronic Micro-Gel · Botanical Stem Extract",
    usage_method:
      "Apply 2–3 drops to cleansed skin, morning and evening. Press gently into face and neck.",
    capacity: "30 ml",
    image_url: "",
    active: true,
  },
  {
    id: "jolie-cellular-cream-2",
    name: "Cellular Recovery Cream",
    category: "Moisturizer",
    description:
      "Biotech lipid veil that locks in hydration while supporting overnight skin regeneration.",
    composition:
      "Ceramide Complex · Squalane Liposomes · Rose Stem Cell Culture",
    usage_method:
      "Massage a pearl-sized amount over face and décolleté as the final step of your ritual.",
    capacity: "50 ml",
    image_url: "",
    active: true,
  },
  {
    id: "jolie-radiance-essence-3",
    name: "Radiance Biotech Essence",
    category: "Essence",
    description:
      "Weightless pre-serum essence that primes skin for optimal absorption of active formulations.",
    composition:
      "Fermented Rice Filtrate · Niacinamide · Soft-focus Pearl Extract",
    usage_method:
      "Pat onto damp skin after cleansing, before serum application.",
    capacity: "150 ml",
    image_url: "",
    active: true,
  },
  {
    id: "jolie-eye-elixir-4",
    name: "Lifting Eye Elixir",
    category: "Eye Care",
    description:
      "Targeted micro-dose treatment for delicate periorbital skin with cooling peptide technology.",
    composition:
      "Caffeine Peptide · Soft-focus Optical Diffusers · Chamomile Bioferment",
    usage_method:
      "Tap a small amount along the orbital bone using your ring finger. Use AM and PM.",
    capacity: "15 ml",
    image_url: "",
    active: true,
  },
];
