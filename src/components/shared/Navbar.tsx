// Navbar.tsx
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
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { BsFillBasket2Fill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector to access Redux state
import { usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store/store";
import { logoutUser } from "@/lib/store/features/authentication/authSlice";
import { services } from "@/data/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navLinks = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "products", label: "Products", href: "/products" },
  { key: "blogs", label: "Blogs", href: "/blogs" },
];

const Navbar = () => {
  const router = usePathname();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);
  const cartQuantity = useSelector((state: RootState) => state.cart?.totalQuantity || 0);
  const isLoggedIn = !!user;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCancel = () => {
    setSearchQuery("");
    setIsHovered(false);
  };
  return (
    <nav
      className={`flex justify-between gap-4 items-center fixed z-50 py-4 px-5 lg:px-28 w-full ${bgColor} transition-all duration-300 text-white`}
    >
      <div className="flex gap-4 items-center">
        <div className="lg:hidden mt-2">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        <Link href="/" aria-label="Home">
          <Image
            src="/png/Farmtrail-logo-light.png"
            alt="Farmtrail Logo"
            width={200}
            height={50}
            className="w-[110px] h-[25px] lg:w-[180px] lg:h-[40px]"
          />
        </Link>
      </div>

      <NavigationMenu className="hidden lg:flex space-x-4 menu-medium">
        <NavigationMenuList className="flex space-x-12">
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.key}>
              <Link
                href={link.href}
                className={`${
                  router === link.href ? "text-light_green" : "text-white"
                } hover:underline`}
              >
                {link.label}
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`bg-transparent hover:bg-transparent ${
                router.startsWith("/services") ? "text-light_green" : "text-white"
              } hover:text-light_green focus:bg-transparent focus:text-light_green data-[active]:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-light_green`}
            >
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col p-2 bg-black rounded min-w-[220px] border border-light-br/60">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-light_green font-semibold hover:bg-gray-800 rounded"
                    >
                      All Services
                    </Link>
                  </NavigationMenuLink>
                </li>
                {services.map((service) => (
                  <li key={service.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/services/${service.slug}`}
                        className="block px-4 py-2 hover:bg-gray-800 hover:text-light_green rounded transition-colors"
                      >
                        {service.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-6">
        <div
          className="relative flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!isHovered && (
            <button aria-label="Search" className="focus:outline-none">
              <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            </button>
          )}
          {isHovered && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search..."
                className="transition-all duration-300 ease-in-out bg-transparent text-white px-4 py-1 rounded-md border-light_green border-2 outline-none w-48"
              />
              <button
                aria-label="Cancel Search"
                className="focus:outline-none"
                onClick={handleCancel}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
          )}
        </div>
        <Link
          href="/cart"
          aria-label="Cart"
          className="relative p-1 hover:text-light_green transition-colors"
        >
          <BsFillBasket2Fill className="h-6 w-6 text-white" />
          {mounted && cartQuantity > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-light_green text-black font-extrabold text-[11px] size-5 rounded-full flex items-center justify-center shadow">
              {cartQuantity}
            </span>
          )}
        </Link>
        {isLoggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src="/user.jpg"
                  width={24}
                  height={24}
                  alt={`${user.username}`}
                  className="size-12 rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black">
                <div className="flex flex-col py-4 px-2 space-y-2 base-medium ">
                  <Link href="/profile" passHref>
                    <DropdownMenuItem className="hover:px-3 hover:py-1 hover:border hover:border-light_green">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/orders" passHref>
                    <DropdownMenuItem className="hover:px-3 hover:py-1 hover:border hover:border-light_green">
                      Orders
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:px-3 hover:py-1 hover:border hover:border-light_green"
                  >
                    Logout
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="outline-btn-light inline-block px-4 py-2 rounded-md small-bold lg:base-bold"
          >
            Login
          </Link>
        )}
      </div>

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
                  router === link.href ? "text-light_green" : "text-white"
                } block hover:underline subtle-semibold`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className={`${
                router.startsWith("/services") ? "text-light_green" : "text-white"
              } block hover:underline subtle-semibold`}
            >
              Services
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
