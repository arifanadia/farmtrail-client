"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation"; // Import useRouter for route matching

const navLinks = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "products", label: "Products", href: "/products" },
  { key: "blogs", label: "Blogs", href: "/blogs" },
];

const Navbar = () => {
  const router = usePathname(); // Get the router instance
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setBgColor("bg-black");
    } else {
      setBgColor("bg-transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`flex justify-between gap-4 items-center fixed z-50 text-white py-4 px-28 w-full ${bgColor} transition-all duration-300`}>
      <Link href="/" aria-label="Home">
        <Image
          src="/png/Farmtrail-logo-light.png"
          alt="Farmtrail Logo"
          width={180}
          height={50}
        />
      </Link>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Main menu - hidden on small screens */}
      <NavigationMenu className="hidden md:flex space-x-4 menu-medium">
        <NavigationMenuList className="flex space-x-12">
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.key}>
              <Link
                href={link.href}
                className={`${
                  router === link.href
                    ? "text-light_green"
                    : "text-white"
                } hover:underline`}
              >
                {link.label}
              </Link>
            </NavigationMenuItem>
          ))}
          {/* Services Trigger */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span className="text-white hover:underline">Services</span>
            </NavigationMenuTrigger>

            {/* Dropdown for Services */}
            <NavigationMenuContent>
              <ul className="flex flex-col p-2 bg-black text-white rounded">
                <li>
                  <NavigationMenuLink>
                    <Link
                      href="/services/service1"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Service 1
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink>
                    <Link
                      href="/services/service2"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Service 2
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink>
                    <Link
                      href="/services/service3"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Service 3
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Contact button - Always visible */}
      <Button className="hidden md:flex outline-btn-light text-light_green small-bold lg:body-bold">
        Contact Us
      </Button>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden fixed top-16 left-0 right-0 bg-black text-white p-4`}
      >
        <ul className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className={`${
                  router === link.href
                    ? "text-light_green"
                    : "text-white"
                } block hover:underline subtle-semibold`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#"
              className="block text-white hover:underline subtle-semibold"
            >
              Services
            </Link>
          </li>
        </ul>
        <Button className="mt-4 w-full outline-btn-light text-light_green small-bold">
          Contact Us
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
