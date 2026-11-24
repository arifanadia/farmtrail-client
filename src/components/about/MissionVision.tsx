import React from "react";
import { FaBullseye, FaEye, FaHeart, FaShieldAlt, FaLeaf, FaHandsHelping } from "react-icons/fa";

const values = [
  {
    icon: FaLeaf,
    title: "Ecological Harmony",
    desc: "We farm with nature rather than against it, replenishing soil nutrients, fostering pollinators, and safeguarding clean waterways.",
  },
  {
    icon: FaShieldAlt,
    title: "Zero-Chemical Integrity",
    desc: "Never any synthetic pesticides, artificial growth stimulants, or GMOs. Only pure organic nutrients nurtured by sunlight and rainwater.",
  },
  {
    icon: FaHandsHelping,
    title: "Farmer Prosperity",
    desc: "We prioritize fair compensation, long-term land security, and shared educational resources for our cooperative grower families.",
  },
  {
    icon: FaHeart,
    title: "Radical Transparency",
    desc: "From seed provenance to harvest timestamps, you know exactly who cultivated your food, where it grew, and how it was harvested.",
  },
];

const MissionVision = () => {
  return (
    <section className="my-16 lg:my-28 text-white">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="subtle-semibold text-light_green uppercase tracking-wider">
          Our Purpose & Compass
        </span>
        <h2 className="h3-bold text-2xl sm:text-3xl lg:text-4xl xl:h2-bold mt-2">
          Driven by Mission, Guided by Enduring Values
        </h2>
        <p className="subtle-regular sm:base-regular text-light-2 mt-3">
          Our daily decisions are anchored in a deep stewardship of nature and an unwavering commitment to genuine human well-being.
        </p>
      </div>

      {/* Mission & Vision Twin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Mission Card */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-dark-1 via-dark-1/80 to-dark-2 border border-light-br/80 hover:border-light_green/60 transition-all duration-300 shadow-xl group">
          <div className="p-3.5 rounded-xl bg-light_green/15 text-light_green w-fit mb-5 group-hover:scale-110 transition-transform">
            <FaBullseye className="text-2xl" />
          </div>
          <span className="text-light_green subtle-semibold uppercase tracking-wider">Our Mission</span>
          <h3 className="h3-bold text-2xl text-white mt-2">Cultivate Health, Nourish Communities</h3>
          <p className="small-regular sm:base-regular text-light-2 mt-4 leading-relaxed">
            To provide families and communities with direct access to pure, nutrient-dense organic crops through restorative agriculture that regenerates living soils, eliminates chemical toxicity, and guarantees fair livelihood for local farmers.
          </p>
          <div className="mt-6 pt-6 border-t border-light-br/40 flex items-center gap-2 text-sm text-light_green font-medium">
            <span>Healthy soil • Wholesome crops • Thriving future</span>
          </div>
        </div>

        {/* Vision Card */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-dark-1 via-dark-1/80 to-dark-2 border border-light-br/80 hover:border-light_green/60 transition-all duration-300 shadow-xl group">
          <div className="p-3.5 rounded-xl bg-light_green/15 text-light_green w-fit mb-5 group-hover:scale-110 transition-transform">
            <FaEye className="text-2xl" />
          </div>
          <span className="text-light_green subtle-semibold uppercase tracking-wider">Our Vision</span>
          <h3 className="h3-bold text-2xl text-white mt-2">A Resilient, Regenerative World</h3>
          <p className="small-regular sm:base-regular text-light-2 mt-4 leading-relaxed">
            To inspire a global shift where sustainable agriculture is the gold standard—where every seed sown honors biodiversity, climate resilience is engineered through natural living ecosystems, and honest food is accessible to every doorstep.
          </p>
          <div className="mt-6 pt-6 border-t border-light-br/40 flex items-center gap-2 text-sm text-light_green font-medium">
            <span>Biodiversity • Climate resilience • Food sovereignty</span>
          </div>
        </div>
      </div>

      {/* Core Values 4-Grid */}
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="subtle-semibold text-light_green uppercase tracking-wider">Our Pillars</span>
          <h3 className="h3-bold text-xl sm:text-2xl text-white mt-1">The Core Values We Live By Every Day</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-dark-1/60 border border-light-br/60 hover:border-light_green/50 hover:bg-dark-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-lg bg-light_green/10 text-light_green w-fit mb-4">
                    <Icon className="text-xl" />
                  </div>
                  <h4 className="base-bold text-white text-base sm:text-lg">{val.title}</h4>
                  <p className="small-regular text-light-2 mt-2 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
