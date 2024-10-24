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
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2} 
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1, 
          },
 
          768: {
            slidesPerView: 2, 
          },
          1024: {
            slidesPerView: 3, 
          },
          1440: {
            slidesPerView: 4, 
          }
        }}
      >

        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <Image 
              src={`/project/project-${index + 1}.jpg`} 
              width={400} 
              height={500} 
              alt={`Project ${index + 1}`} 
              className='object-cover  h-72 lg:h-[500px]' 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectsSlider;
