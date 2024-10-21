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
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Add icons
import { usePathname } from "next/navigation";
import { BsFillBasket2Fill } from "react-icons/bs";

const navLinks = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "products", label: "Products", href: "/products" },
  { key: "blogs", label: "Blogs", href: "/blogs" },
];

const Navbar = () => {
  const router = usePathname();
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
    <nav className={`flex justify-between gap-4 items-center fixed z-50 py-4 px-5 lg:px-28 w-full ${bgColor} transition-all duration-300 text-white `}>
      <Link href="/" aria-label="Home">
        <Image
          src="/png/Farmtrail-logo-light.png"
          alt="Farmtrail Logo"
          width={200}
          height={50}
          className="w-[120px] h-[30px] lg:w-[180px] lg:h-[40px]"
        />
      </Link>

      {/* Hamburger icon for small screens */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Main menu - hidden on small screens */}
      <NavigationMenu className="hidden lg:flex space-x-4 menu-medium">
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
              <span className="hover:underline">Services</span>
            </NavigationMenuTrigger>

            {/* Dropdown for Services */}
            <NavigationMenuContent>
              <ul className="flex flex-col p-2 bg-black rounded">
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

      {/* Search, Cart, Login Icons */}
      <div className="hidden lg:flex items-center space-x-6">
        <button aria-label="Search">
          <MagnifyingGlassIcon className="h-6 w-6 text-white" />
        </button>
        <button aria-label="Cart">
          <BsFillBasket2Fill className="h-6 w-6 text-white" />
        </button>
        <Link href="/auth/login">
          <button className="outline-btn-light px-4 py-2 rounded-md small-bold lg:base-bold">Login</button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:hidden fixed top-16 left-0 right-0 bg-black p-4`}
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
              className="block hover:underline subtle-semibold"
            >
              Services
            </Link>
          </li>
        </ul>

        {/* Mobile Search, Cart, Login */}
        <div className="flex justify-between mt-4">
          <button aria-label="Search">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </button>
          <button aria-label="Cart">
            <BsFillBasket2Fill className="h-6 w-6 text-white" />
          </button>
          <Link href="/auth/login">
            <button className="bg-light_green bg-opacity-90 hover:bg-transparent hover:border-2 hover:border-light_green transition-all ease-in px-4 py-2 rounded-md small-bold">Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
