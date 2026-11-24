import React from "react";
import { FaCertificate, FaShieldAlt, FaRecycle, FaHandHoldingHeart, FaLeaf, FaSeedling } from "react-icons/fa";

const certificates = [
  {
    icon: FaLeaf,
    badge: "100% Organic Certified",
    desc: "Rigorous independent inspection verifying zero synthetic pesticides, fertilizers, or growth hormones.",
  },
  {
    icon: FaSeedling,
    badge: "Non-GMO Project Verified",
    desc: "Only traditional, open-pollinated, non-genetically-modified heirloom seeds and natural rootstocks.",
  },
  {
    icon: FaHandHoldingHeart,
    badge: "Fair Trade Guaranteed",
    desc: "Direct fair-value pricing guaranteeing living wages and sustainable investments for every family farm.",
  },
  {
    icon: FaRecycle,
    badge: "Eco-Packaging & Zero Waste",
    desc: "100% biodegradable and compostable packaging materials to protect your crops without cluttering landfills.",
  },
  {
    icon: FaCertificate,
    badge: "Soil Quality Excellence",
    desc: "Continual microbiological testing to assure rich microbial density and superior mineral nutrition.",
  },
  {
    icon: FaShieldAlt,
    badge: "Farm-to-Door Traceability",
    desc: "Full transparency on every batch: track harvest time, grower origin, and field conditions effortlessly.",
  },
];

const Certifications = () => {
  return (
    <section className="my-16 lg:my-28 text-white">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="subtle-semibold text-light_green uppercase tracking-wider">
          Trust & Quality Assured
        </span>
        <h2 className="h3-bold text-2xl sm:text-3xl lg:text-4xl xl:h2-bold mt-2">
          Strict Standards, Pure Results
        </h2>
        <p className="subtle-regular sm:base-regular text-light-2 mt-3">
          We believe in complete accountability. Our certifications are backed by transparent audits, strict field testing, and ethical agreements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {certificates.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-2xl bg-dark-1/70 border border-light-br/70 hover:border-light_green/50 hover:bg-dark-1 transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-light_green/10 text-light_green group-hover:scale-110 group-hover:bg-light_green group-hover:text-black transition-all shrink-0">
                <Icon className="text-xl" />
              </div>
              <div>
                <h4 className="base-bold text-white text-base group-hover:text-light_green transition-colors">
                  {cert.badge}
                </h4>
                <p className="small-regular text-light-2 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  {cert.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Certifications;
