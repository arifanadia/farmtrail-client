import Image from "next/image";
import React from "react";
import { FaCheckCircle, FaWater, FaSun, FaLeaf, FaGraduationCap } from "react-icons/fa";

const practices = [
  {
    tag: "Soil & Crop Science",
    title: "Regenerative Soil Health",
    description:
      "We practice intensive crop rotation, nitrogen-fixing cover cropping, and biological compost tea enrichment. Healthy soil microbes unlock essential minerals naturally, producing fruits and vegetables rich in antioxidants and vital micronutrients.",
    points: [
      "Zero synthetic nitrogen fertilizers",
      "Organic compost & mulching protocols",
      "Biological beneficial pest management",
    ],
    image: "/Service/agriculture.jpg",
    icon: FaLeaf,
  },
  {
    tag: "Conservation",
    title: "Precision Water Stewardship",
    description:
      "Agriculture consumes immense freshwater resources. We deploy subsurface micro-drip irrigation linked to IoT soil-moisture telemetry, saving over 60% of irrigation water compared to flood methods while eliminating evaporation waste.",
    points: [
      "Solar-powered sensor-guided drip systems",
      "On-farm rainwater retention ponds",
      "Zero runoff contamination into local waterways",
    ],
    image: "/Service/Technology & Innovation.jpg",
    icon: FaWater,
  },
  {
    tag: "Clean Energy",
    title: "Solar Cold-Chain & Circular Waste",
    description:
      "From solar-harvested energy powering our refrigeration hubs to 100% biodegradable shipping boxes, every link in our supply line is designed for minimal environmental impact. Organic crop residues return to our composting beds.",
    points: [
      "Solar array on-farm energy generation",
      "100% recyclable, plastic-free packaging",
      "Zero-waste circular biomass composting",
    ],
    image: "/Service/Natural-products.jpg",
    icon: FaSun,
  },
  {
    tag: "Community",
    title: "Farmer Education & Fair Trade",
    description:
      "We run regional Agronomy Field Schools providing smallholder family farmers with free soil testing, certified organic seeds, and hands-on guidance. We guarantee fair purchase prices well above volatile commodity market rates.",
    points: [
      "Guaranteed price floors for grower stability",
      "Hands-on organic certification guidance",
      "Empowering next-generation young farmers",
    ],
    image: "/Service/Education & Training.jpg",
    icon: FaGraduationCap,
  },
];

const SustainablePractices = () => {
  return (
    <section className="my-16 lg:my-28 text-white">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="subtle-semibold text-light_green uppercase tracking-wider">
          How We Cultivate
        </span>
        <h2 className="h3-bold text-2xl sm:text-3xl lg:text-4xl xl:h2-bold mt-2">
          Sustainable Farming Practices in Action
        </h2>
        <p className="subtle-regular sm:base-regular text-light-2 mt-3">
          Behind every basket of FarmTrail produce is a meticulous, science-backed approach to stewardship, energy conservation, and ecological harmony.
        </p>
      </div>

      <div className="space-y-12 lg:space-y-16 max-w-6xl mx-auto">
        {practices.map((practice, index) => {
          const Icon = practice.icon;
          const isEven = index % 2 === 1;

          return (
            <div
              key={index}
              className={`flex flex-col ${
                isEven ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-8 lg:gap-14 items-center bg-dark-1/50 border border-light-br/70 rounded-2xl p-6 sm:p-8 hover:border-light_green/40 transition-colors duration-300`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-xl group">
                <Image
                  src={practice.image}
                  width={600}
                  height={400}
                  alt={practice.title}
                  className="w-full h-[260px] sm:h-[340px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-dark-2/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-light-br text-light_green text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Icon className="text-sm" />
                  {practice.tag}
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-4">
                <span className="text-light_green text-xs font-bold uppercase tracking-wider">
                  Pillar 0{index + 1}
                </span>
                <h3 className="h3-bold text-xl sm:text-2xl lg:text-3xl text-white">
                  {practice.title}
                </h3>
                <p className="small-regular sm:base-regular text-light-2 leading-relaxed">
                  {practice.description}
                </p>

                <div className="pt-2 space-y-2.5">
                  {practice.points.map((point, ptIdx) => (
                    <div key={ptIdx} className="flex items-center gap-3">
                      <FaCheckCircle className="text-light_green text-sm shrink-0" />
                      <span className="text-xs sm:text-sm text-light-1">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SustainablePractices;
