import React from "react";
import { FaCalendarAlt, FaSeedling, FaTractor, FaSun, FaTruck } from "react-icons/fa";

const timelineEvents = [
  {
    year: "1984",
    title: "First Organic Seeds Planted",
    description:
      "FarmTrail began with just 15 acres of neglected soil in the countryside. Our founders restored the earth using heirloom seeds, green cover crops, and traditional natural compost.",
    icon: FaSeedling,
  },
  {
    year: "1998",
    title: "Certified Organic & Non-GMO",
    description:
      "Became one of the earliest certified organic operations in the region. Formed strict zero-chemical cultivation guidelines that banned synthetic inputs entirely.",
    icon: FaCalendarAlt,
  },
  {
    year: "2008",
    title: "The Regional Farmer Alliance",
    description:
      "Expanded our mission beyond our own fields by uniting 40+ neighboring smallholder farms under fair-trade purchasing agreements and unified organic standards.",
    icon: FaTractor,
  },
  {
    year: "2018",
    title: "Clean Energy Cold Chain & IoT",
    description:
      "Integrated 100% solar-powered cooling facilities and micro-drip irrigation sensors across all partner fields, cutting freshwater usage by more than half.",
    icon: FaSun,
  },
  {
    year: "2024+",
    title: "FarmTrail Direct to Doorstep",
    description:
      "Launched our direct consumer platform, delivering freshly picked, temperature-controlled organic produce straight from local growers to modern households nationwide.",
    icon: FaTruck,
  },
];

const Milestones = () => {
  return (
    <section className="my-16 lg:my-28 text-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="subtle-semibold text-light_green uppercase tracking-wider">
          Our Heritage
        </span>
        <h2 className="h3-bold text-2xl sm:text-3xl lg:text-4xl xl:h2-bold mt-2">
          Four Decades of Cultivating Change
        </h2>
        <p className="subtle-regular sm:base-regular text-light-2 mt-3">
          Explore key milestones in our ongoing journey to transform regional agriculture into a model of sustainability and fairness.
        </p>
      </div>

      {/* Timeline items */}
      <div className="relative max-w-5xl mx-auto">
        {/* Center vertical line on desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-light-br -translate-x-1/2" />

        <div className="space-y-8 md:space-y-12">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Box */}
                <div className="w-full md:w-1/2 md:px-8">
                  <div className="p-6 sm:p-7 rounded-2xl bg-dark-1/80 border border-light-br/70 hover:border-light_green/60 transition-all duration-300 shadow-lg group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-light_green/15 text-light_green font-bold text-sm tracking-wide border border-light_green/30">
                        {event.year}
                      </span>
                      <Icon className="text-light_green text-lg group-hover:scale-125 transition-transform" />
                    </div>
                    <h3 className="h3-bold text-lg sm:text-xl text-white mt-1">
                      {event.title}
                    </h3>
                    <p className="small-regular text-light-2 mt-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center Node Icon */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-10 h-10 rounded-full bg-dark-2 border-2 border-light_green text-light_green shadow-md z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-light_green" />
                </div>

                {/* Spacer on opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
