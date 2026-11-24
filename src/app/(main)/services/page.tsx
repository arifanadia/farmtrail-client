import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/data/services";
import ServicesClient from "@/components/services/ServicesClient";

export const metadata: Metadata = {
  title: "Services | FarmTrail - Sustainable Organic Agriculture Solutions",
  description:
    "Explore FarmTrail's agricultural services: Farm Services, Organic Agriculture, Food & Beverage, Animal Services, Education & Training, Tech & Innovation, and Agri Financial Services.",
};

const ServicesPage = () => {
  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Breadcrumb banner */}
      <div className="h-16 w-full pl-5 flex items-center base-semibold gap-4 bg-[#272727] py-4 lg:pl-[114px]">
        <Link
          href="/"
          className="text-light-2 hover:text-white transition-colors"
        >
          Home
        </Link>
        <div className="border-b-4 border-light-br w-6 mt-1"></div>
        <Link href="/services" className="text-light_green">
          Services
        </Link>
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesClient services={services} />
      </div>
    </main>
  );
};

export default ServicesPage;
