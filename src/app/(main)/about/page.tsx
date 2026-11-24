import AboutIntro from "@/components/about/AboutIntro";
import Overview from "@/components/about/Overview";
import MissionVision from "@/components/about/MissionVision";
import SustainablePractices from "@/components/about/SustainablePractices";
import Milestones from "@/components/about/Milestones";
import Certifications from "@/components/about/Certifications";
import TeamSection from "@/components/about/TeamSection";
import AboutCTA from "@/components/about/AboutCTA";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | FarmTrail - Sustainable Organic Agriculture",
  description:
    "Learn about FarmTrail's 40-year heritage in organic farming, regenerative agriculture, fair-trade grower partnerships, and farm-to-table freshness.",
};

const About = () => {
  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Breadcrumb banner */}
      <div className="h-16 w-full pl-5 flex items-center base-semibold gap-4 bg-[#272727] py-4 lg:pl-[114px]">
        <Link href="/" className="text-light-2 hover:text-white transition-colors">
          Home
        </Link>
        <div className="border-b-4 border-light-br w-6 mt-1"></div>
        <Link href="/about" className="text-light_green">
          About
        </Link>
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutIntro />
        <Overview />
        <MissionVision />
        <SustainablePractices />
        <Milestones />
        <Certifications />
        <TeamSection />
        <AboutCTA />
      </div>
    </main>
  );
};

export default About;
