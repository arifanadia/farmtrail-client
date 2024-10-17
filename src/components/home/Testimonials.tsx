"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = useRef(null);
  const testimonialData = [
    {
      id: 1,
      name: "Yasmin Blackburn",
      position: "Product Manager",
      rating: 4,
      image: "/testimonial/review-1.jpg",
      heading: "Very good support and system",
      text: "Nulla pharetra diam sit amet nisl suscipit. Nulla malesuada pellentesque elit eget gravida cum. Vivamus arcu bibendum!",
    },
    {
      id: 2,
      name: "John Doe",
      position: "Marketing Head",
      rating: 5,
      image: "/testimonial/review-2.jpg",
      heading: "A team of experts who listen",
      text: "Mauris in aliquam sem fringilla ut morbi tincidunt. In est ante in nibh mauris cursus mattis molestie!",
    },
    {
      id: 3,
      name: "Anna Smith",
      position: "Software Engineer",
      rating: 5,
      image: "/testimonial/review-3.jpg",
      heading: "Great people and good vacation time",
      text: "Aliquam malesuada bibendum arcu vitae elementum curabitur. Ut placerat orci nulla pellentesque dignissim enim sit amet venenatis.",
    },
    {
      id: 4,
      name: "Michael Jordan",
      position: "CEO",
      rating: 4,
      image: "/testimonial/review-4.jpg",
      heading: "Very good support and system",
      text: "Ornare quam viverra orci sagittis eu volutpat odio. Urna nunc id cursus metus aliquam eleifend.",
    },
    {
      id: 5,
      name: "Emily Green",
      position: "Designer",
      rating: 4,
      image: "/testimonial/review-5.jpg",
      heading: "A team of experts who listen",
      text: "Sed libero enim sed faucibus turpis. Nec nam aliquam sem et tortor consequat id porta nibh.",
    },
    {
      id: 6,
      name: "David Williams",
      position: "UX Designer",
      rating: 5,
      image: "/testimonial/review-6.jpg",
      heading: "Great people and good vacation time",
      text: "Aenean pharetra magna ac placerat vestibulum. Massa tincidunt dui ut ornare lectus sit amet est.",
    },
  ];

  const visibleSlides = 4;
  const slideWidth = 100 / visibleSlides;

  useEffect(() => {
    gsap.set(testimonials.current, { x: 0 });
  }, []);

  const goToNextSlide = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= testimonialData.length) {
      nextIndex = 0; // Reset to the first slide
    }
    setCurrentIndex(nextIndex);
    gsap.to(testimonials.current, {
      x: `-${nextIndex * slideWidth}%`,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const goToPreviousSlide = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = testimonialData.length - 1; // Go to the last slide
    }
    setCurrentIndex(prevIndex);
    gsap.to(testimonials.current, {
      x: `-${prevIndex * slideWidth}%`,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section className="container ml-24">
      <div>
        <span className="subtle-semibold text-light_green uppercase">
          testimonials
        </span>
        <h2 className="h2-bold">Customer Stories</h2>
      </div>

      <div className="relative w-full overflow-hidden mt-8">
        {/* Testimonials */}
        <div className="flex gap-6" ref={testimonials}>
          {testimonialData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0"
              style={{ width: `${slideWidth}%` }} // Each testimonial takes up 25% of the width
            >
              <div className="p-8 border-2 border-light-br h-80">
                <div className="h-36">
                  <Rating
                    initialRating={testimonial.rating}
                    readonly
                    emptySymbol={<FaRegStar className="mr-2" />}
                    fullSymbol={<FaStar className="mr-2 text-[#FCCB28]" />}
                  />
                  <h4 className="base-bold text-light_green my-2">
                    {testimonial.heading}
                  </h4>
                  <p className="small-regular text-light-2">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex gap-4 items-center mt-8">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={400}
                    height={400}
                    className="object-cover size-24 rounded-full"
                  />
                  <div>
                    <h1 className="subtle-semibold text-light-1 uppercase">
                      {testimonial.name}
                    </h1>
                    <span className="text-[12px]">{testimonial.position}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-10 mt-12">
          <button
            className="border border-light-br p-2 xl:p-4 rounded-lg transition-all duration-300 ease-in-out"
            onClick={goToPreviousSlide}
          >
            <FiArrowLeft className="text-light_green base-bold" />
          </button>
          <button
            className="border border-light-br p-2 xl:p-4 rounded-lg transition-all duration-300 ease-in-out"
            onClick={goToNextSlide}
          >
            <FiArrowRight className="text-light_green base-bold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
