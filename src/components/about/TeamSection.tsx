import Image from "next/image";
import React from "react";
import { FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";

const team = [
  {
    name: "Dr. Julian Vance",
    role: "Chief Agricultural Officer & Soil Scientist",
    bio: "Over 20 years guiding biological soil rejuvenation, microscopic flora ecology, and non-chemical pest dynamics.",
    image: "/testimonial/review-2.jpg",
  },
  {
    name: "Clara Henderson",
    role: "Director of Organic Cultivation",
    bio: "Passionate heirloom crop specialist dedicated to open-pollinated seed varieties, companion planting, and harvest flavor profiles.",
    image: "/testimonial/review-1.jpg",
  },
  {
    name: "David Ramirez",
    role: "Head of Sustainable Logistics",
    bio: "Pioneered our solar-cooled micro-distribution network, ensuring crops reach kitchens within hours of morning harvesting.",
    image: "/testimonial/review-4.jpg",
  },
  {
    name: "Sarah Jenkins",
    role: "Farmer Relations & Community Liaison",
    bio: "Works directly with over 150 local grower families, running regional field workshops and guaranteeing fair-trade pricing.",
    image: "/testimonial/review-3.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="my-16 lg:my-28 text-white">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="subtle-semibold text-light_green uppercase tracking-wider">
          The People Behind The Harvest
        </span>
        <h2 className="h3-bold text-2xl sm:text-3xl lg:text-4xl xl:h2-bold mt-2">
          Meet Our Agricultural Leaders
        </h2>
        <p className="subtle-regular sm:base-regular text-light-2 mt-3">
          Our team combines multi-generational farming expertise with progressive soil science to deliver pure, living produce every single day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {team.map((member, index) => (
          <div
            key={index}
            className="rounded-2xl bg-dark-1/80 border border-light-br/70 hover:border-light_green/50 transition-all duration-300 overflow-hidden group shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Member Image */}
              <div className="relative h-64 w-full overflow-hidden bg-dark-2">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-light_green/20 text-light_green text-[11px] font-semibold border border-light_green/30 backdrop-blur-md">
                    Leadership
                  </span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="p-5">
                <h4 className="base-bold text-lg text-white group-hover:text-light_green transition-colors">
                  {member.name}
                </h4>
                <p className="text-light_green text-xs font-medium mt-1 leading-snug">
                  {member.role}
                </p>
                <p className="subtle-regular text-light-2 text-xs mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-5 pt-0 border-t border-light-br/40 mt-2 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-dark-2 text-light-2 hover:text-light_green transition-colors cursor-pointer">
                <FaLinkedinIn className="text-xs" />
              </span>
              <span className="p-2 rounded-lg bg-dark-2 text-light-2 hover:text-light_green transition-colors cursor-pointer">
                <FaTwitter className="text-xs" />
              </span>
              <span className="p-2 rounded-lg bg-dark-2 text-light-2 hover:text-light_green transition-colors cursor-pointer">
                <FaEnvelope className="text-xs" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
