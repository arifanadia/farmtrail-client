"use client";

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';

const StorieSlider = () => {
  const swiperRef = useRef<null>(null);
  const stories = [
    { id: 1, title: "Story 1", imageUrl: "/insta/story1.jpg" },
    { id: 2, title: "Story 2", imageUrl: "/insta/story2.jpg" },
    { id: 3, title: "Story 3", imageUrl: "/insta/story3.jpg" },
    { id: 4, title: "Story 4", imageUrl: "/insta/story4.jpg" },
    { id: 5, title: "Story 5", imageUrl: "/insta/story5.jpg" },
    { id: 6, title: "Story 6", imageUrl: "/insta/story6.jpg" },
    { id: 7, title: "Story 7", imageUrl: "/insta/story7.jpg" },
  ];

  useEffect(() => {
    // Animate slides on component mount
    const slides = document.querySelectorAll('.swiper-slide');

    gsap.fromTo(
      slides,
      { opacity: 0, scale: 0.8 }, // Initial state
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 } // Animation to
    );
  }, []);

  return (
    <div className="swiper-container mt-14">
      <Swiper
        ref={swiperRef}
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4}
        coverflowEffect={{
          rotate: 0,
          stretch: 80,
          depth: 350,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        className="mySwiper"
      >
        {/* Slides */}
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <Image 
              src={story.imageUrl} 
              width={400} 
              height={250} 
              alt={`stories ${story.title}`} 
              className='object-cover h-[500px] rounded-lg' 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StorieSlider;
