import type { Metadata } from "next";
import { DM_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner"
import AuthListener from "@/lib/store/features/authentication/authlListener";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});
const openSans = Open_Sans({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  icons: ["/png/Farmtrail-logo.png"],
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
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthListener />
            <div>{children}</div>
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
