import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blogs";
import { FaArrowLeft, FaArrowRight, FaClock, FaTag } from "react-icons/fa";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return {
      title: "Article Not Found | FarmTrail",
    };
  }
  return {
    title: `${post.title} | FarmTrail Blogs`,
    description: post.excerpt,
  };
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen pt-20 pb-16 text-white">
      {/* Breadcrumb banner */}
      <div className="h-16 w-full pl-5 flex items-center base-semibold gap-4 bg-[#272727] py-4 lg:pl-[114px] overflow-x-auto whitespace-nowrap">
        <Link href="/" className="text-light-2 hover:text-white transition-colors">
          Home
        </Link>
        <div className="border-b-4 border-light-br w-6 mt-1 shrink-0"></div>
        <Link href="/blogs" className="text-light-2 hover:text-white transition-colors">
          Blogs
        </Link>
        <div className="border-b-4 border-light-br w-6 mt-1 shrink-0"></div>
        <span className="text-light_green truncate max-w-[220px] sm:max-w-md">
          {post.title}
        </span>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 lg:mt-14">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-light_green hover:underline mb-6"
        >
          <FaArrowLeft className="text-xs" /> Back to all articles
        </Link>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-light-2">
          <span className="px-3.5 py-1 rounded-full bg-light_green/10 text-light_green border border-light_green/30 font-semibold uppercase tracking-wider">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1.5 text-light_green">
            <FaClock className="text-xs" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="h3-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mt-5">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mt-6 pb-6 border-b border-light-br/60">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={44}
            height={44}
            className="rounded-full object-cover w-11 h-11 border border-light_green/40"
          />
          <div>
            <p className="text-sm sm:text-base font-semibold text-white">
              {post.author.name}
            </p>
            <p className="text-xs text-light-2">{post.author.role}</p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden border border-light-br mt-8 shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="mt-10 space-y-6 text-light-2 base-regular sm:text-lg leading-relaxed">
          <p className="text-white font-medium text-lg sm:text-xl leading-relaxed">
            {post.excerpt}
          </p>
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-light-br/60 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-light-2 mr-2">
              <FaTag className="text-light_green" /> Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-dark-1 border border-light-br text-xs text-light-2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="subtle-semibold text-light_green uppercase tracking-wider">
              Keep Reading
            </span>
            <h2 className="h3-bold sm:text-3xl text-white mt-1">
              More From FarmTrail
            </h2>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-light_green hover:underline"
          >
            View All <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((related) => (
            <Link
              key={related.id}
              href={`/blogs/${related.slug}`}
              className="group flex flex-col bg-dark-1/60 border border-light-br/70 rounded-2xl overflow-hidden hover:border-light_green/50 transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={related.image}
                  alt={related.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-semibold text-light_green uppercase tracking-wider">
                  {related.category}
                </span>
                <h3 className="body-bold text-lg text-white group-hover:text-light_green transition-colors mt-2 line-clamp-2">
                  {related.title}
                </h3>
                <p className="text-xs text-light-2 mt-2">{related.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogDetailPage;
