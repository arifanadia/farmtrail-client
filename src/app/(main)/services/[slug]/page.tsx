import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/data/services";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) {
    return {
      title: "Service Not Found | FarmTrail",
    };
  }
  return {
    title: `${service.title} | FarmTrail Services`,
    description: service.shortDescription,
  };
}

const ServiceDetailPage = ({ params }: ServiceDetailPageProps) => {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen pt-20 pb-16 text-white">
      {/* Breadcrumb banner */}
      <div className="h-16 w-full pl-5 flex items-center base-semibold gap-4 bg-[#272727] py-4 lg:pl-[114px] overflow-x-auto whitespace-nowrap">
        <Link
          href="/"
          className="text-light-2 hover:text-white transition-colors"
        >
          Home
        </Link>
        <div className="border-b-4 border-light-br w-6 mt-1 shrink-0"></div>
        <Link
          href="/services"
          className="text-light-2 hover:text-white transition-colors"
        >
          Services
        </Link>
        <div className="border-b-4 border-light-br w-6 mt-1 shrink-0"></div>
        <span className="text-light_green truncate max-w-[220px] sm:max-w-md">
          {service.title}
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 lg:mt-14 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-light_green hover:underline"
          >
            <FaArrowLeft className="text-xs" /> Back to all services
          </Link>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-light_green/10 text-light_green border border-light_green/30 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              {service.category}
            </span>
            <h1 className="h3-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-light_green font-medium leading-relaxed">
              {service.tagline}
            </p>
            <div className="space-y-4 text-light-2 base-regular leading-relaxed">
              {service.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="px-6 py-3 rounded-lg bg-light_green text-black font-bold text-sm sm:text-base hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 rounded-lg border border-light-br text-white font-semibold text-sm sm:text-base hover:border-light_green hover:text-light_green transition-colors"
              >
                About FarmTrail
              </Link>
            </div>
          </div>

          <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden border border-light-br shadow-2xl">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </section>

        {/* Key Metrics / Benefits */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {service.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-dark-1/70 border border-light-br/70 rounded-2xl p-6 text-center space-y-1"
            >
              <p className="h2-bold text-3xl sm:text-4xl text-light_green">
                {benefit.value}
              </p>
              <p className="text-sm text-light-2 font-medium">{benefit.label}</p>
            </div>
          ))}
        </section>

        {/* What's Included */}
        <section className="bg-dark-1/60 border border-light-br/70 rounded-2xl p-6 sm:p-10 space-y-6">
          <div>
            <span className="subtle-semibold text-light_green uppercase tracking-wider">
              Service Scope
            </span>
            <h2 className="h3-bold sm:text-3xl text-white mt-1">
              What&apos;s Included
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-black/40 border border-light-br/50"
              >
                <FaCheckCircle className="text-light_green mt-1 shrink-0" />
                <span className="text-sm sm:text-base text-light-2">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-8">
          <div>
            <span className="subtle-semibold text-light_green uppercase tracking-wider">
              Our Process
            </span>
            <h2 className="h3-bold sm:text-3xl text-white mt-1">
              How {service.title} Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="bg-dark-1/70 border border-light-br/70 rounded-2xl p-6 space-y-3"
              >
                <span className="inline-block text-2xl font-bold text-light_green">
                  {step.step}
                </span>
                <h3 className="body-bold text-lg text-white">{step.title}</h3>
                <p className="text-sm text-light-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <div>
            <span className="subtle-semibold text-light_green uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="h3-bold sm:text-3xl text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-dark-1/60 border border-light-br/70 rounded-2xl p-6 space-y-2"
              >
                <h3 className="body-bold text-base sm:text-lg text-white">
                  {faq.question}
                </h3>
                <p className="text-sm text-light-2 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Services */}
        <section className="pt-4 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="subtle-semibold text-light_green uppercase tracking-wider">
                Explore More
              </span>
              <h2 className="h3-bold sm:text-3xl text-white mt-1">
                Other FarmTrail Services
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-light_green hover:underline"
            >
              View All <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedServices.map((related) => (
              <Link
                key={related.id}
                href={`/services/${related.slug}`}
                className="group flex flex-col bg-dark-1/60 border border-light-br/70 rounded-2xl overflow-hidden hover:border-light_green/50 transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-light_green uppercase tracking-wider">
                    {related.category}
                  </span>
                  <h3 className="body-bold text-lg text-white group-hover:text-light_green transition-colors mt-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-light-2 mt-2 line-clamp-2">
                    {related.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServiceDetailPage;
