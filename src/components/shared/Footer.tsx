import Image from "next/image";
import Link from "next/link";
import React from "react";
import { blogPosts } from "@/data/blogs";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  // Define reusable class names
  const linkClasses =
    "flex items-center gap-1 base-semibold text-white hover:text-light_green transition-colors";
  const contactClasses =
    "flex items-center gap-3 menu-semibold text-white hover:text-light_green transition-colors";
  const socialIconClasses =
    "text-white h-6 w-6 hover:text-light_green transition-colors";

  return (
    <footer className="bg-dark-1 text-white py-8 md:py-12">
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12 lg:px-16">
        {/* Logo and description */}
        <div className="col-span-1">
          <Link href="/" aria-label="Home">
            <Image
              src="/png/Farmtrail-logo-light.png"
              alt="Farmtrail Logo"
              width={180}
              height={50}
            />
          </Link>
          <p className="mt-4 text-sm text-light-2">
            Farmtrail is dedicated to promoting sustainable farming practices
            and providing fresh, locally sourced products. Join us in supporting
            local farmers and healthier communities.
          </p>
          {/* Social media icons */}
          <div className="flex space-x-6 mt-8">
            <Link href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF className={socialIconClasses} />
            </Link>
            <Link href="https://whatsapp.com" aria-label="WhatsApp">
              <FaWhatsapp className={socialIconClasses} />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className={socialIconClasses} />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className={socialIconClasses} />
            </Link>
          </div>
        </div>

        {/* Quick links section */}
        <div className="col-span-1 2xl:pl-20">
          <h2 className="h2-medium">Explore</h2>
          <div className="mt-8 flex flex-col space-y-5">
            <Link href="/about" className={linkClasses}>
              <MdKeyboardArrowRight /> About
            </Link>
            <Link href="/project" className={linkClasses}>
              <MdKeyboardArrowRight /> Projects
            </Link>
            <Link href="/services" className={linkClasses}>
              <MdKeyboardArrowRight /> Services
            </Link>
            <Link href="/glossary" className={linkClasses}>
              <MdKeyboardArrowRight /> Glossary
            </Link>
          </div>
        </div>

        {/* Blogs */}
        <div className="col-span-1 lg:-ml-20 2xl:ml-0">
          <h2 className="h2-medium">Blogs</h2>
          <div className="mt-4 flex flex-col space-y-5">
            {blogPosts.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="flex gap-4 group"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  height={60}
                  width={80}
                  className="object-cover size-24 shrink-0 rounded"
                />
                <div>
                  <span className="small-semibold uppercase text-light_green">
                    {post.date}
                  </span>
                  <p className="menu-medium group-hover:text-light_green transition-colors line-clamp-2">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-span-1 2xl:pl-10">
          <h2 className="h2-medium">Contacts</h2>
          <ul className="mt-4 space-y-7">
            <li className={contactClasses}>
              <FaPhoneAlt className="text-light_green text-xl font-bold" />
              <a href="tel:+1234567890" className="">
                +1 (234) 567-890
              </a>
            </li>
            <li className={contactClasses}>
              <IoMail className="text-light_green text-xl font-bold" />
              <a href="mailto:info@farmtrail.com" className="">
                info@farmtrail.com
              </a>
            </li>
            <li className={contactClasses}>
              <FaLocationDot className="text-light_green text-xl font-bold" />
              123 Farm Road, Greenfield, USA
            </li>
          </ul>
        </div>
      </section>
      <div className="border-t-2 border-[#484848] w-[90%] mx-auto mt-24 lg:mt-36"></div>
      {/* Bottom Section */}
      <section className="container mx-auto md:flex justify-between items-center mt-6 lg:mt-12 px-6 md:px-12 lg:px-16">
        {/* Copyright */}
        <p className="text-sm text-white">
          &copy; 2024 Farmtrail. All Rights Reserved.
        </p>

        {/* Payment Methods */}
        <div className="flex items-center space-x-4 mt-6 md:mt-0">
          <Image
            src="/png/visa.png"
            alt="Visa"
            width={40}
            height={24}
            
          />
          <Image
            src="/png/mastercard.png"
            alt="Mastercard"
            width={40}
            height={24}
           
          />
          <Image
            src="/png/stripe.png"
            alt="Stripe"
            width={40}
            height={24}
           
          />
          <Image
            src="/png/paypal.png"
            alt="PayPal"
            width={100}
            height={35}
           
          />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
