"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceItem, serviceCategories } from "@/data/services";
import { FaArrowRight, FaCheckCircle, FaSearch } from "react-icons/fa";

interface ServicesClientProps {
  services: ServiceItem[];
}

const ServicesClient = ({ services }: ServicesClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.tagline.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div className="py-12 lg:py-16 space-y-14">
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-light_green/10 text-light_green border border-light_green/30 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          What We Offer
        </span>
        <h1 className="h3-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
          End-to-End Organic{" "}
          <span className="text-light_green">Agricultural Services</span>
        </h1>
        <p className="text-light-2 base-regular sm:text-lg leading-relaxed">
          From soil restoration and regenerative crop production to precision
          agritech and seasonal farm financing, FarmTrail supports every stage of
          the organic food ecosystem.
        </p>
      </section>

      {/* Filter & Search Bar */}
      <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-light-br/60">
        <div className="flex flex-wrap items-center gap-2.5">
          {serviceCategories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  active
                    ? "bg-light_green text-black border-light_green"
                    : "bg-dark-1/70 text-light-2 border-light-br hover:border-light_green/60 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-light-2 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            aria-label="Search services"
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#272727] text-white border border-light-br placeholder:text-gray-400 text-sm focus:outline-none focus:border-light_green"
          />
        </div>
      </section>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group flex flex-col bg-dark-1/70 border border-light-br/70 rounded-2xl overflow-hidden hover:border-light_green/60 transition-all duration-300 shadow-lg"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm text-light_green border border-light_green/30 text-xs font-semibold uppercase tracking-wider">
                  {service.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
                <div className="space-y-3">
                  <h2 className="h3-bold text-xl text-white group-hover:text-light_green transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-sm text-light-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <ul className="space-y-2 pt-2 border-t border-light-br/50">
                  {service.highlights.slice(0, 3).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-light-2"
                    >
                      <FaCheckCircle className="text-light_green mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex items-center justify-between text-sm font-semibold text-light_green">
                  <span>Explore Service</span>
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div className="text-center py-16 bg-dark-1/50 border border-light-br/60 rounded-2xl space-y-3">
          <p className="body-bold text-white">No matching services found</p>
          <p className="text-sm text-light-2">
            Try clearing your search query or selecting another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-2 inline-block px-5 py-2 rounded-lg bg-light_green text-black text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="rounded-2xl bg-gradient-to-r from-[#1a2614] via-[#1b1b1b] to-[#1a2614] border border-light_green/30 p-8 sm:p-12 text-center space-y-5">
        <span className="subtle-semibold text-light_green uppercase tracking-wider">
          Custom Partnerships
        </span>
        <h2 className="h3-bold text-2xl sm:text-3xl text-white">
          Need a Tailored Agricultural Program?
        </h2>
        <p className="text-light-2 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Combine soil restoration, agritech telemetry, and seasonal financing
          into a unified plan built around your acreage and harvest goals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-lg bg-light_green text-black font-bold text-sm sm:text-base hover:opacity-90 transition-opacity"
          >
            Request a Consultation
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 rounded-lg border border-light-br text-white font-semibold text-sm sm:text-base hover:border-light_green hover:text-light_green transition-colors"
          >
            Browse Organic Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesClient;
