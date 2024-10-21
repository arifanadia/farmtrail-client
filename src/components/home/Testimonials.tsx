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
  const slideWidth = window.innerWidth < 640 ? 102 : 100 / visibleSlides;
  const duration = window.innerWidth < 768 ? 0.5 : 0.8;
  useEffect(() => {
    gsap.set(testimonials.current, { x: 0 });
  }, []);

  const goToNextSlide = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= testimonialData.length) {
      nextIndex = 0; 
    }
    setCurrentIndex(nextIndex);
    gsap.to(testimonials.current, {
      x: `-${nextIndex * slideWidth}%`,
      duration: duration,
      ease: "power2.out",
    });
  };

  const goToPreviousSlide = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = testimonialData.length - 1; 
    }
    setCurrentIndex(prevIndex);
    gsap.to(testimonials.current, {
      x: `-${prevIndex * slideWidth}%`,
      duration: duration,
      ease: "power2.out",
    });
  };

  return (
    <section className="lg:container lg:ml-24">
      <div className="text-center lg:text-left">
        <span className="subtle-semibold text-light_green uppercase">
          testimonials
        </span>
        <h2 className="h3-bold lg:h2-bold">Customer Stories</h2>
      </div>

      <div className="relative w-full overflow-hidden mt-8">
  
        <div className="flex gap-2 lg:gap-6" ref={testimonials}>
          {testimonialData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-full mx-auto md:w-1/2 lg:w-1/3"
       
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
                  <p className="subtle-regular lg:small-regular text-light-2">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex gap-4 items-center mt-8">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={400}
                    height={400}
                    className="object-cover size-20 lg:size-24 rounded-full"
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

        <div className="flex gap-10 mt-6 lg:mt-12">
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
