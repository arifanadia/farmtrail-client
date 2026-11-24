import Image from "next/image";
import Link from "next/link";
import React from "react";
import { blogPosts } from "@/data/blogs";

const Blogs = () => {
  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <section className="max-w-7xl mx-auto mt-48 lg:mt-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 text-center lg:text-left">
        <div>
          <span className="subtle-semibold text-light_green uppercase">Blog &amp; Updates</span>
          <h2 className="h3-bold lg:h2-bold">Latest Articles &amp; Tips</h2>
        </div>
        <Link
          href="/blogs"
          className="text-light_green base-semibold hover:underline self-center lg:self-end"
        >
          View All Articles &rarr;
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 items-center w-full mt-6 lg:mt-12">
        {/* First Image - 40% Width */}
        <Link
          href={`/blogs/${featuredPosts[0].slug}`}
          className="group relative w-full h-[250px] lg:w-[40%] lg:h-[400px] overflow-hidden rounded-md"
        >
          <Image
            src={featuredPosts[0].image}
            alt={featuredPosts[0].title}
            fill
            className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 rounded-md">
            <div className="flex items-center gap-8">
              <span className="text-light_green">{featuredPosts[0].category}</span>
              <span className="text-light-1 text-sm">{featuredPosts[0].date}</span>
            </div>
            <h3 className="text-light-2 body-bold lg:h3-bold group-hover:text-light_green transition-colors">
              {featuredPosts[0].title}
            </h3>
          </div>
        </Link>

        <Link
          href={`/blogs/${featuredPosts[1].slug}`}
          className="group relative w-full h-[250px] lg:w-[60%] lg:h-[400px] overflow-hidden rounded-md"
        >
          <Image
            src={featuredPosts[1].image}
            alt={featuredPosts[1].title}
            fill
            className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 rounded-md">
            <div className="flex items-center gap-8">
              <span className="text-light_green">{featuredPosts[1].category}</span>
              <span className="text-gray-300 text-sm">{featuredPosts[1].date}</span>
            </div>
            <h3 className="text-light-2 body-bold lg:h3-bold group-hover:text-light_green transition-colors">
              {featuredPosts[1].title}
            </h3>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Blogs;
