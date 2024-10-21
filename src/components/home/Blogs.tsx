import Image from "next/image";
import React from "react";

const Blogs = () => {
  // Sample blog data
  const blogData = [
    {
      id: 1,
      title: "How Can Calcium Deficiency Cause Osteoporosis?",
      date: "October 1, 2024",
      subject: "Food Facts",
      image: "/blog/blog-1.jpg",
    },
    {
      id: 2,
      title: "Supporting Farmers Returning to Agriculture",
      date: "October 8, 2024",
      subject: "Farmer Stories",
      image: "/blog/blog-2.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-48 lg:mt-0">
      <div className="text-center lg:text-left">
        <span className="subtle-semibold text-light_green uppercase">Blog & Updates</span>
        <h2 className="h3-bold lg:h2-bold">Latest Articles & Tips</h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 items-center w-full mt-6 lg:mt-12">
        {/* First Image - 40% Width */}
        <div className="relative w-full h-[250px] lg:w-[40%] lg:h-[400px]">
          <Image
            src={blogData[0].image}
            alt={blogData[0].title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 rounded-md">
          <div className="flex items-center gap-8">
            <span className="text-light_green">{blogData[0].subject}</span>
            <span className="text-light-1 text-sm">{blogData[0].date}</span>
            </div>
            <h3 className="text-light-2 body-bold lg:h3-bold">{blogData[0].title}</h3>
          </div>
        </div>

        <div className="relative w-full h-[250px] lg:w-[60%] lg:h-[400px]">
          <Image
            src={blogData[1].image}
            alt={blogData[1].title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 rounded-md">
            <div className="flex items-center gap-8">
            <span className="text-light_green">{blogData[1].subject}</span>
            <span className="text-gray-300 text-sm">{blogData[1].date}</span>
            </div>
            <h3 className="text-light-2 body-bold lg:h3-bold">{blogData[1].title}</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
