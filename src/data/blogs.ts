export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-can-calcium-deficiency-cause-osteoporosis",
    title: "How Can Calcium Deficiency Cause Osteoporosis?",
    excerpt:
      "Discover how daily dietary calcium from organic leafy greens, dairy, and seeds protects bone density and prevents long-term skeletal fragility.",
    content: [
      "Calcium is the primary mineral responsible for maintaining bone structure and strength. Nearly 99% of the body's calcium is stored in bones and teeth, where it provides rigidity and acts as a mineral reserve for vital physiological functions.",
      "When dietary calcium intake falls short over an extended period, the body compensates by drawing calcium directly from bone tissue to keep blood calcium levels stable for nerve signaling, muscle contraction, and heart rhythm.",
      "Over time, this continuous withdrawal outpaces new bone formation, leading to reduced bone mineral density—a condition known as osteopenia that can progress into osteoporosis. Bones become porous, fragile, and significantly more prone to fractures.",
      "Incorporating bioavailable, farm-fresh sources of calcium—such as organic kale, arugula, sesame seeds, almonds, and pasture-raised dairy—alongside vitamin D-rich foods and regular weight-bearing exercise helps preserve bone mass naturally at every age.",
    ],
    date: "October 1, 2024",
    readTime: "5 min read",
    category: "Food Facts",
    author: {
      name: "Dr. Elena Vance",
      role: "Nutritional Agronomist",
      avatar: "/testimonial/review-1.jpg",
    },
    image: "/blog/blog-1.jpg",
    featured: true,
    tags: ["Nutrition", "Organic Produce", "Bone Health"],
  },
  {
    id: 2,
    slug: "supporting-farmers-returning-to-agriculture",
    title: "Supporting Farmers Returning to Agriculture",
    excerpt:
      "How fair-trade price floors, regenerative training, and direct-to-consumer markets are empowering a new wave of growers to return to the land.",
    content: [
      "Across rural communities, a quiet resurgence is underway. Young professionals and multi-generational families who once left farming due to volatile commodity prices are returning to cultivate the land using regenerative methods.",
      "Transitioning back to agriculture—especially certified organic farming—comes with steep upfront hurdles: soil restoration takes seasons, organic inputs require knowledge, and conventional supply chains often squeeze smallholders.",
      "At FarmTrail, our grower partnership program addresses these barriers head-on by offering guaranteed purchase price floors, free soil-microbiome testing, and direct access to conscious urban households.",
      "When farmers know their harvest has a reliable, fair buyer before the first seed is planted, they can invest in cover cropping, pollinator habitats, and water conservation—creating resilient farms and thriving rural economies.",
    ],
    date: "October 8, 2024",
    readTime: "6 min read",
    category: "Farmer Stories",
    author: {
      name: "Marcus Thorne",
      role: "Community Grower Lead",
      avatar: "/testimonial/review-2.jpg",
    },
    image: "/blog/blog-2.jpg",
    featured: true,
    tags: ["Fair Trade", "Community", "Regenerative Farming"],
  },
  {
    id: 3,
    slug: "living-soil-secret-to-nutrient-dense-harvests",
    title: "Living Soil: The Secret to Nutrient-Dense Harvests",
    excerpt:
      "Why healthy microbial ecosystems beneath our feet produce more flavorful, antioxidant-rich fruits and vegetables than synthetic fertilizers.",
    content: [
      "A single teaspoon of healthy, organically managed soil contains billions of beneficial bacteria, mycorrhizal fungi, and protozoa working in symbiosis with plant roots.",
      "Unlike synthetic NPK fertilizers that bypass soil biology and force rapid water-heavy growth, regenerative composting and cover cropping feed the soil food web. Microbes break down organic matter and deliver trace minerals directly to plants on demand.",
      "Studies consistently show that crops grown in biologically active soils develop higher concentrations of polyphenols, vitamins, and natural sugars—explaining why vine-ripened organic tomatoes and heirloom greens taste unmistakably richer.",
    ],
    date: "October 15, 2024",
    readTime: "4 min read",
    category: "Sustainable Farming",
    author: {
      name: "Amara Okafor",
      role: "Soil Microbiologist",
      avatar: "/testimonial/review-3.jpg",
    },
    image: "/Service/agriculture.jpg",
    tags: ["Soil Health", "Composting", "Organic"],
  },
  {
    id: 4,
    slug: "precision-drip-irrigation-saving-water-on-small-farms",
    title: "Precision Drip Irrigation: Saving 60% Water on Small Farms",
    excerpt:
      "Inside our solar-powered soil-moisture telemetry systems that deliver every drop directly to the root zone without waste.",
    content: [
      "Freshwater scarcity is one of the greatest challenges facing modern agriculture. Traditional overhead sprinklers and flood irrigation lose up to half their water to evaporation and runoff before roots can absorb it.",
      "By pairing subsurface micro-drip lines with solar-powered soil-moisture sensors, FarmTrail partner farms irrigate only when and where crops actually need hydration.",
      "The result is a 60% reduction in freshwater usage, healthier root systems less prone to fungal leaf diseases, and zero fertilizer or sediment runoff into nearby streams.",
    ],
    date: "October 22, 2024",
    readTime: "5 min read",
    category: "Agri-Tech",
    author: {
      name: "David Chen",
      role: "Precision Water Engineer",
      avatar: "/testimonial/review-4.jpg",
    },
    image: "/Service/Technology & Innovation.jpg",
    tags: ["Water Conservation", "Agri-Tech", "Solar"],
  },
  {
    id: 5,
    slug: "seasonal-eating-guide-autumn-harvest-benefits",
    title: "Seasonal Eating Guide: Why Autumn Harvests Taste Better",
    excerpt:
      "From crisp root vegetables to antioxidant-packed berries, learn how eating with the local harvest calendar boosts flavor and nutrition.",
    content: [
      "Produce harvested at peak ripeness and delivered within 24 to 48 hours retains far more vitamin C, folate, and phytonutrients than long-haul supermarket produce picked green weeks earlier.",
      "Autumn brings a vibrant wave of squash, sweet roots, brassicas, and late-season greens that naturally sweeten after cool nights as plants convert starches into sugars to protect against frost.",
      "Planning meals around seasonal farm boxes not only elevates home cooking—it dramatically cuts cold-storage energy and long-distance transport emissions.",
    ],
    date: "November 2, 2024",
    readTime: "4 min read",
    category: "Seasonal Guides",
    author: {
      name: "Sophia Martinez",
      role: "Culinary & Harvest Curator",
      avatar: "/testimonial/review-5.jpg",
    },
    image: "/Service/Natural-products.jpg",
    tags: ["Seasonal", "Farm to Table", "Recipes"],
  },
  {
    id: 6,
    slug: "agronomy-field-schools-training-next-gen-growers",
    title: "Agronomy Field Schools: Training the Next Generation",
    excerpt:
      "How hands-on workshops in biological pest control, seed saving, and organic certification are building resilient local food networks.",
    content: [
      "Knowledge sharing is the backbone of regenerative agriculture. Every month, FarmTrail hosts field days where veteran organic growers mentor newcomers in cover-crop selection, beneficial insect habitats, and post-harvest cold-chain handling.",
      "Graduates leave with practical transition roadmaps, starter heirloom seed kits, and ongoing peer support—turning isolated farms into collaborative regional food hubs.",
    ],
    date: "November 10, 2024",
    readTime: "5 min read",
    category: "Farmer Stories",
    author: {
      name: "Marcus Thorne",
      role: "Community Grower Lead",
      avatar: "/testimonial/review-2.jpg",
    },
    image: "/Service/Education & Training.jpg",
    tags: ["Education", "Workshops", "Next-Gen Farmers"],
  },
];

export const blogCategories = [
  "All",
  "Food Facts",
  "Farmer Stories",
  "Sustainable Farming",
  "Agri-Tech",
  "Seasonal Guides",
];
