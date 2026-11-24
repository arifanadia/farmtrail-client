"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogCategories, BlogPost } from "@/data/blogs";
import { FaArrowRight, FaClock, FaSearch, FaSeedling } from "react-icons/fa";

interface BlogsClientProps {
  posts: BlogPost[];
}

const BlogsClient = ({ posts }: BlogsClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const featuredPost = useMemo(
    () => posts.find((post) => post.featured) || posts[0],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const isDefaultView = selectedCategory === "All" && !searchQuery.trim();
  const gridPosts = isDefaultView
    ? filteredPosts.filter((post) => post.id !== featuredPost?.id)
    : filteredPosts;

  return (
    <div className="text-white mt-10 lg:mt-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light_green/10 text-light_green border border-light_green/30 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
          <FaSeedling className="text-sm" /> Blog &amp; Field Notes
        </span>
        <h1 className="h3-bold text-3xl sm:text-4xl lg:text-5xl xl:h1-bold text-white tracking-tight leading-tight">
          Latest <span className="text-light_green">Articles &amp; Tips</span>
        </h1>
        <p className="subtle-regular sm:base-regular text-light-2 mt-4 leading-relaxed">
          Stories from our partner farms, practical nutrition facts, and sustainable
          growing guides straight from the FarmTrail community.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="mt-10 flex flex-col lg:flex-row gap-5 items-stretch lg:items-center justify-between">
        <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
          {blogCategories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  active
                    ? "bg-light_green text-black border-light_green shadow-md"
                    : "bg-dark-1/70 text-light-2 border-light-br hover:border-light_green/60 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-2 text-sm pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, topics..."
            aria-label="Search blog articles"
            className="search-input w-full pl-10 pr-4"
          />
        </div>
      </div>

      {/* Featured Spotlight (shown in default view) */}
      {isDefaultView && featuredPost && (
        <section className="mt-12">
          <Link
            href={`/blogs/${featuredPost.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-dark-1/60 border border-light-br/70 rounded-2xl p-5 sm:p-8 hover:border-light_green/50 transition-all duration-300"
          >
            <div className="lg:col-span-7 relative h-[260px] sm:h-[360px] lg:h-[400px] rounded-xl overflow-hidden">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-dark-2/85 backdrop-blur-md border border-light_green/40 text-light_green text-xs font-semibold uppercase tracking-wider">
                Featured • {featuredPost.category}
              </span>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-4 text-xs sm:text-sm text-light-2">
                <span>{featuredPost.date}</span>
                <span className="inline-flex items-center gap-1.5 text-light_green">
                  <FaClock className="text-xs" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="h3-bold sm:text-3xl text-white group-hover:text-light_green transition-colors">
                {featuredPost.title}
              </h2>

              <p className="subtle-regular sm:base-regular text-light-2 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-light-br/50">
                <div className="flex items-center gap-3">
                  <Image
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10 border border-light_green/40"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {featuredPost.author.name}
                    </p>
                    <p className="text-xs text-light-2">{featuredPost.author.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-light_green group-hover:translate-x-1 transition-transform">
                  Read Article <FaArrowRight className="text-xs" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles Grid */}
      <section className="mt-12">
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col bg-dark-1/60 border border-light-br/70 rounded-2xl overflow-hidden hover:border-light_green/50 transition-all duration-300"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-dark-2/85 backdrop-blur-md border border-light-br text-light_green text-xs font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between text-xs text-light-2 mb-3">
                    <span>{post.date}</span>
                    <span className="inline-flex items-center gap-1.5 text-light_green">
                      <FaClock className="text-[11px]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="body-bold text-xl text-white group-hover:text-light_green transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="subtle-regular text-light-2 mt-3 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 pt-4 border-t border-light-br/50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover w-8 h-8 border border-light_green/30"
                      />
                      <span className="text-xs font-medium text-white">
                        {post.author.name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-light_green group-hover:translate-x-1 transition-transform">
                      Read More <FaArrowRight className="text-[10px]" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-dark-1/40 border border-light-br/60 rounded-2xl">
            <p className="h3-bold text-white">No articles found</p>
            <p className="subtle-regular text-light-2 mt-2">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 px-5 py-2.5 rounded-full bg-light_green text-black text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogsClient;
