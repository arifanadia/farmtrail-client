"use client";

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import Image from 'next/image';

const ProjectsSlider = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  return (
    <div className="swiper-container">
      <Swiper
        ref={swiperRef}
        modules={[EffectCoverflow, Navigation,]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        className="mySwiper"
      >
        {/* Slides */}
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <Image 
              src={`/project/Project-${index + 1}.jpg`} 
              width={400} 
              height={250} 
              alt={`Project ${index + 1}`} 
              className='object-cover h-96' 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectsSlider;
