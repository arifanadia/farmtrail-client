import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blogs";
import BlogsClient from "@/components/blogs/BlogsClient";

export const metadata: Metadata = {
  title: "Blogs | FarmTrail - Organic Farming & Nutrition Insights",
  description:
    "Read the latest articles, farmer stories, soil health guides, and organic nutrition tips from the FarmTrail community.",
};

const BlogsPage = () => {
  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Breadcrumb banner */}
      <div className="h-16 w-full pl-5 flex items-center base-semibold gap-4 bg-[#272727] py-4 lg:pl-[114px]">
        <Link href="/" className="text-light-2 hover:text-white transition-colors">
          Home
        </Link>
        <div className="border-b-4 border-light-br w-6 mt-1"></div>
        <Link href="/blogs" className="text-light_green">
          Blogs
        </Link>
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogsClient posts={blogPosts} />
      </div>
    </main>
  );
};

export default BlogsPage;
