import type { Metadata } from "next";
import { DM_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Choose the required weights
  variable: "--font-dm-sans", // Define a CSS variable for custom fonts
});
const openSans = Open_Sans({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "FarmTrail",
  description:
    "FarmTrail is a platform that connects farmers and consumers, promoting sustainable agriculture and farm-to-table practices. Discover farming tips, local produce, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${openSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
