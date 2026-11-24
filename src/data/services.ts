export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  category: "Cultivation & Land" | "Livestock & Food" | "Advisory & Tech";
  tagline: string;
  shortDescription: string;
  description: string[];
  image: string;
  highlights: string[];
  process: ServiceProcessStep[];
  benefits: { label: string; value: string }[];
  faqs: ServiceFAQ[];
}

export const services: ServiceItem[] = [
  {
    id: 1,
    slug: "farm-services",
    title: "Farm Services",
    category: "Cultivation & Land",
    tagline: "End-to-end field operations, soil restoration, and seasonal land stewardship.",
    shortDescription:
      "Comprehensive on-ground farm management covering soil testing, land preparation, irrigation engineering, and harvest coordination.",
    description: [
      "Healthy harvests begin long before seeds touch the ground. Our Farm Services team partners with landowners and grower cooperatives to design resilient, organic-ready acreage from the soil up.",
      "We conduct comprehensive physical and biological soil audits, build custom cover-cropping and composting schedules, and deploy water-efficient drip and micro-sprinkler irrigation tailored to your microclimate.",
      "Whether you are converting conventional pasture to certified organic farmland or scaling an existing operation, our field specialists stay on-site from pre-planting through post-harvest storage.",
    ],
    image: "/Service/farm-service.jpg",
    highlights: [
      "Full-spectrum soil microbiome & nutrient profiling",
      "Precision laser land leveling & conservation tillage",
      "Drip & solar-powered irrigation design and installation",
      "Seasonal crop rotation & cover-crop planning",
      "Dedicated on-site agronomy & harvest crew support",
    ],
    process: [
      {
        step: "01",
        title: "Site & Soil Assessment",
        description:
          "We sample soil horizons, map drainage patterns, and evaluate existing infrastructure.",
      },
      {
        step: "02",
        title: "Custom Field Blueprint",
        description:
          "Our agronomists deliver a seasonal plan covering amendments, irrigation zones, and crop blocks.",
      },
      {
        step: "03",
        title: "Execution & Monitoring",
        description:
          "Field crews prepare beds, install irrigation, and track moisture and plant vigor weekly.",
      },
    ],
    benefits: [
      { label: "Water Savings", value: "Up to 38%" },
      { label: "Soil Organic Matter", value: "+1.4% / yr" },
      { label: "Field Uptime", value: "99.2%" },
    ],
    faqs: [
      {
        question: "What farm sizes do you support?",
        answer:
          "We work with boutique market gardens starting at 2 acres up to commercial organic estates exceeding 500 acres.",
      },
      {
        question: "Can you help transition conventional land to organic?",
        answer:
          "Yes. We manage the full 36-month transition roadmap, including buffer zones, approved inputs, and audit documentation.",
      },
    ],
  },
  {
    id: 2,
    slug: "agriculture",
    title: "Agriculture",
    category: "Cultivation & Land",
    tagline: "Regenerative crop cultivation engineered for yield, flavor, and biodiversity.",
    shortDescription:
      "Sustainable crop production programs utilizing heirloom and climate-resilient seeds, biological pest control, and zero-synthetic inputs.",
    description: [
      "Modern organic agriculture balances ecological integrity with dependable commercial output. FarmTrail's Agriculture division oversees thousands of acres of certified organic vegetables, grains, and orchards.",
      "By pairing beneficial insect habitats and botanical biopesticides with data-backed planting windows, we eliminate synthetic chemical runoff while protecting crop quality.",
      "Our seed-to-crate traceability ensures every bushel meets strict purity standards for retail grocers, restaurants, and community-supported agriculture programs.",
    ],
    image: "/Service/agriculture.jpg",
    highlights: [
      "Certified organic & non-GMO heirloom seed sourcing",
      "Integrated Pest Management (IPM) with beneficial insects",
      "Pollinator hedgerows & agroforestry windbreaks",
      "Cold-chain ready harvest & grading protocols",
      "Full lot-level traceability from field to buyer",
    ],
    process: [
      {
        step: "01",
        title: "Variety & Seed Selection",
        description:
          "Match disease-resistant, high-flavor cultivars to your local climate and market demand.",
      },
      {
        step: "02",
        title: "Regenerative Cultivation",
        description:
          "Implement living mulches, foliar compost teas, and biological pest scouting.",
      },
      {
        step: "03",
        title: "Peak-Ripeness Harvest",
        description:
          "Coordinate dawn harvesting and rapid hydro-cooling to lock in nutrients and shelf life.",
      },
    ],
    benefits: [
      { label: "Synthetic Pesticides", value: "0%" },
      { label: "Pollinator Diversity", value: "+65%" },
      { label: "Grade-A Yield Rate", value: "94%" },
    ],
    faqs: [
      {
        question: "Do you supply seeds and organic inputs?",
        answer:
          "Yes, all partner farms receive vetted organic seeds, OMRI-listed bio-fertilizers, and biological pest controls.",
      },
      {
        question: "How is crop quality verified before shipping?",
        answer:
          "Every harvest batch undergoes Brix sugar testing, visual grading, and residue screening before dispatch.",
      },
    ],
  },
  {
    id: 3,
    slug: "food-and-beverage",
    title: "Food & Beverage",
    category: "Livestock & Food",
    tagline: "Farm-to-table processing, artisanal packaging, and cold-chain distribution.",
    shortDescription:
      "Value-added food and beverage solutions turning fresh organic harvests into shelf-ready juices, preserves, grains, and culinary staples.",
    description: [
      "Capturing the peak flavor of organic produce requires speed, hygiene, and minimal processing. Our Food & Beverage facilities sit minutes from partner fields so harvests are washed, pressed, or packed within hours.",
      "From cold-pressed orchard juices and stone-milled flours to flash-frozen greens and fermented condiments, we help growers and food brands launch clean-label products without artificial preservatives.",
      "Our HACCP- and USDA Organic-certified kitchens handle co-packing, nutritional labeling, and refrigerated distribution to regional grocers and hospitality groups.",
    ],
    image: "/Service/food.jpg",
    highlights: [
      "USDA Organic & HACCP-certified processing kitchens",
      "Cold-pressed beverage bottling & HPP preservation",
      "Compostable & recyclable retail packaging lines",
      "Private-label recipe formulation & shelf-life testing",
      "Temperature-monitored regional cold-chain logistics",
    ],
    process: [
      {
        step: "01",
        title: "Intake & Quality Grading",
        description:
          "Fresh harvests arrive directly from partner farms and are triple-washed and sorted.",
      },
      {
        step: "02",
        title: "Small-Batch Crafting",
        description:
          "Produce juices, purees, or packaged goods using gentle thermal or cold-press methods.",
      },
      {
        step: "03",
        title: "Cold-Chain Dispatch",
        description:
          "Seal, label, and ship in refrigerated fleets directly to retail shelves and kitchens.",
      },
    ],
    benefits: [
      { label: "Field-to-Pack Time", value: "< 6 hrs" },
      { label: "Artificial Additives", value: "None" },
      { label: "Cold-Chain Integrity", value: "99.8%" },
    ],
    faqs: [
      {
        question: "Do you offer small-batch co-packing for new brands?",
        answer:
          "Yes, we offer flexible pilot runs starting at 500 units so emerging organic food brands can test markets affordably.",
      },
      {
        question: "What packaging formats are available?",
        answer:
          "We support glass bottles, compostable pouches, kraft produce trays, and bulk foodservice totes.",
      },
    ],
  },
  {
    id: 4,
    slug: "animal-services",
    title: "Animal Services",
    category: "Livestock & Food",
    tagline: "Humane, pasture-raised livestock care, nutrition, and veterinary wellness.",
    shortDescription:
      "Holistic animal husbandry programs focused on rotational grazing, organic feed formulation, and stress-free herd health.",
    description: [
      "Ethical livestock stewardship enriches both animal welfare and pasture ecosystems. FarmTrail's Animal Services team designs rotational grazing systems that mimic natural herd movement, regenerating grasslands while raising healthier animals.",
      "Our animal nutritionists formulate 100% organic, soy-free and antibiotic-free feed rations tailored to cattle, poultry, sheep, and dairy goats.",
      "Regular preventative veterinary checkups, mineral supplementation, and spacious shelter design keep herds thriving naturally year-round.",
    ],
    image: "/Service/animal.jpg",
    highlights: [
      "Managed intensive rotational grazing (MIRG) planning",
      "Custom certified-organic & non-GMO feed rations",
      "Preventative holistic veterinary care & herd audits",
      "Humane housing, shade, and clean-water systems",
      "Pasture-to-market dairy, egg, and meat certification",
    ],
    process: [
      {
        step: "01",
        title: "Pasture & Herd Audit",
        description:
          "Evaluate forage density, stocking rates, water access, and current animal health metrics.",
      },
      {
        step: "02",
        title: "Grazing & Nutrition Plan",
        description:
          "Establish paddock rotation intervals and balanced organic mineral/feed programs.",
      },
      {
        step: "03",
        title: "Ongoing Wellness Care",
        description:
          "Conduct scheduled vet visits, parasite monitoring, and seasonal forage adjustments.",
      },
    ],
    benefits: [
      { label: "Pasture Recovery", value: "2.3x faster" },
      { label: "Routine Antibiotics", value: "0%" },
      { label: "Herd Wellness Score", value: "98%" },
    ],
    faqs: [
      {
        question: "Which livestock species do you support?",
        answer:
          "We support beef and dairy cattle, pastured laying hens and broilers, sheep, goats, and heritage hogs.",
      },
      {
        question: "Can you help us achieve Certified Humane or Grass-Fed status?",
        answer:
          "Yes, our team prepares all grazing logs, feed invoices, and welfare checklists required for third-party audits.",
      },
    ],
  },
  {
    id: 5,
    slug: "education-and-training",
    title: "Education and Training",
    category: "Advisory & Tech",
    tagline: "Hands-on agronomy workshops, organic certification prep, and grower bootcamps.",
    shortDescription:
      "Practical field schools, digital courses, and mentorship programs empowering the next generation of regenerative farmers.",
    description: [
      "Knowledge is the highest-leverage input on any farm. FarmTrail's Education and Training academy bridges traditional farming wisdom with modern ecological science.",
      "Through seasonal field days, multi-week apprenticeships, and online modules, growers learn composting chemistry, biological pest identification, farm financial bookkeeping, and organic compliance.",
      "We also partner with local schools and community organizations to run urban gardening clinics and youth agricultural leadership fellowships.",
    ],
    image: "/Service/Education & Training.jpg",
    highlights: [
      "In-field regenerative agronomy & soil-lab workshops",
      "Step-by-step USDA Organic certification bootcamps",
      "Seasonal farm apprenticeship & mentorship placements",
      "On-demand video library & downloadable field guides",
      "School garden & community food-literacy programs",
    ],
    process: [
      {
        step: "01",
        title: "Skill & Goal Mapping",
        description:
          "Identify your team's experience level and operational priorities before enrollment.",
      },
      {
        step: "02",
        title: "Hands-On Field Modules",
        description:
          "Train directly on working organic plots alongside senior agronomists and equipment leads.",
      },
      {
        step: "03",
        title: "Certification & Follow-Up",
        description:
          "Earn completion credentials with 6 months of post-course advisory check-ins.",
      },
    ],
    benefits: [
      { label: "Graduates Trained", value: "2,400+" },
      { label: "Audit Pass Rate", value: "97%" },
      { label: "Partner Farms", value: "180+" },
    ],
    faqs: [
      {
        question: "Are courses suitable for complete beginners?",
        answer:
          "Yes. We offer foundational tracks for new growers alongside advanced technical seminars for commercial farm managers.",
      },
      {
        question: "Do you offer on-farm team training?",
        answer:
          "We can send instructors directly to your farm for customized 2-day or 5-day crew workshops.",
      },
    ],
  },
  {
    id: 6,
    slug: "tech-and-innovation",
    title: "Tech & Innovation",
    category: "Advisory & Tech",
    tagline: "Precision IoT sensors, drone scouting, and smart farm automation.",
    shortDescription:
      "Clean agritech tools—from wireless soil moisture probes to multispectral drone mapping—designed to cut waste and boost organic yields.",
    description: [
      "Organic farming thrives when intuition is backed by real-time field data. Our Tech & Innovation group equips farms with rugged, easy-to-use sensors and automation that respect natural ecosystems.",
      "Wireless soil probes monitor root-zone moisture, EC, and temperature around the clock, automatically triggering drip valves only when crops need water.",
      "Multispectral drone flyovers detect early nutrient stress or pest pressure days before it becomes visible to the naked eye, allowing targeted biological treatments.",
    ],
    image: "/Service/Technology & Innovation.jpg",
    highlights: [
      "LoRaWAN wireless soil moisture & temperature sensors",
      "Automated weather-linked drip irrigation controllers",
      "Multispectral drone NDVI crop-health mapping",
      "Unified farm dashboard with mobile frost & pest alerts",
      "Solar-powered telemetry for off-grid acreage",
    ],
    process: [
      {
        step: "01",
        title: "Connectivity & Zone Survey",
        description:
          "Map field topography, cellular/LoRa coverage, and micro-climate zones.",
      },
      {
        step: "02",
        title: "Hardware Deployment",
        description:
          "Install weather stations, soil probes, and smart valves with zero trenching disruption.",
      },
      {
        step: "03",
        title: "Live Telemetry & Insights",
        description:
          "Access daily irrigation recommendations, NDVI maps, and yield forecasts from any device.",
      },
    ],
    benefits: [
      { label: "Irrigation Efficiency", value: "+42%" },
      { label: "Early Stress Detection", value: "7 days earlier" },
      { label: "Labor Hours Saved", value: "12 hrs / wk" },
    ],
    faqs: [
      {
        question: "Does the sensor network work in remote areas without Wi-Fi?",
        answer:
          "Yes. Our solar LoRaWAN gateways cover up to 5 miles of open farmland and sync via cellular or satellite uplink.",
      },
      {
        question: "Do I need technical expertise to use the dashboard?",
        answer:
          "Not at all—our app translates raw sensor readings into plain-language daily action items and SMS alerts.",
      },
    ],
  },
  {
    id: 7,
    slug: "agri-financial-service",
    title: "Agri Financial Service",
    category: "Advisory & Tech",
    tagline: "Tailored crop financing, transition grants, and farm risk protection.",
    shortDescription:
      "Flexible agricultural capital, equipment leasing, and organic-transition funding built around real harvest cycles.",
    description: [
      "Traditional bank loans rarely match the seasonal rhythm of organic farming. FarmTrail's Agri Financial Service connects growers with patient capital designed specifically for sustainable agriculture.",
      "We structure seasonal operating lines, solar and irrigation equipment leases, and bridge financing for farms navigating the 3-year organic transition window.",
      "Our financial advisors also help growers stack federal conservation grants, carbon-sequestration incentives, and multi-peril crop insurance to safeguard family livelihoods.",
    ],
    image: "/Service/finacial.jpg",
    highlights: [
      "Harvest-aligned seasonal operating credit lines",
      "Organic transition bridge loans & grant matching",
      "Low-APR equipment, greenhouse & cold-storage leasing",
      "Crop insurance & weather-index risk advisory",
      "Cash-flow modeling & wholesale buyer contract structuring",
    ],
    process: [
      {
        step: "01",
        title: "Financial Health Review",
        description:
          "Review historical yields, acreage plans, and capital needs without rigid collateral hurdles.",
      },
      {
        step: "02",
        title: "Tailored Capital Package",
        description:
          "Pair low-interest financing with eligible conservation grants and buyer offtake agreements.",
      },
      {
        step: "03",
        title: "Seasonal Repayment",
        description:
          "Align repayment schedules with actual post-harvest revenue rather than flat monthly bills.",
      },
    ],
    benefits: [
      { label: "Approval Turnaround", value: "5 business days" },
      { label: "Grant Match Success", value: "89%" },
      { label: "Capital Deployed", value: "$18M+" },
    ],
    faqs: [
      {
        question: "Can new or transitioning organic farms apply?",
        answer:
          "Yes. We have dedicated transition-bridge funds specifically for growers in years 1–3 of organic conversion.",
      },
      {
        question: "Are repayments required during off-season months?",
        answer:
          "Our seasonal lines defer principal payments until your primary harvest and wholesale settlement window.",
      },
    ],
  },
];

export const serviceCategories = [
  "All",
  "Cultivation & Land",
  "Livestock & Food",
  "Advisory & Tech",
] as const;
