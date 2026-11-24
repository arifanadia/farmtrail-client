"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

const BackToHomeButton = () => {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  return (
    <Link
      href="/"
      aria-label="Back to Home"
      className="group fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-light_green/50 text-white text-xs sm:text-sm font-semibold shadow-lg hover:bg-light_green hover:text-black transition-all duration-200"
    >
      <FaHome className="text-light_green group-hover:text-black text-sm transition-colors" />
      <span>Back to Home</span>
    </Link>
  );
};

export default BackToHomeButton;
