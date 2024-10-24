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
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent } from "../ui/dropdown-menu";

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
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = !!user;

  const dispatch: AppDispatch = useDispatch();

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
            <NavigationMenuTrigger>
              <span className="hover:underline">Services</span>
            </NavigationMenuTrigger>
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
               className="transition-all duration-300 ease-in-out bg-transparent text-white px-4 py-1 rounded-md border-light_green border-2 outline-none w-36 md:w-48"
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
        <button aria-label="Cart" className="hidden md:block">
          <BsFillBasket2Fill className="h-6 w-6 text-white" />
        </button>
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
                  <Link href="/profile" passHref>
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
          <Link href="/auth/login">
            <button className="outline-btn-light px-4 py-2 rounded-md small-bold lg:base-bold">
              Login
            </button>
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
            <Link href="#" className="block hover:underline subtle-semibold">
              Services
            </Link>
          </li>
        </ul>
        <div className="flex justify-between mt-4">
          <button aria-label="Search">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </button>
          <button aria-label="Cart">
            <BsFillBasket2Fill className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
