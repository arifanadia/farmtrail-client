import Image from 'next/image'
import React from 'react'

const AboutIntro = () => {
  return (
    <section className='text-white mt-8'>
        <div className='text-center'>
            <h1 className='h2-bold '>About FarmTrail</h1>
            <p className='base-regular text-light-2 w-[40%] mx-auto'>Placerat vestibulum lectus mauris ultrices. Felis bibendum ut tristique 
            egestas quis ipsum. Faucibus nisl tincidunt eget </p>
            <Image 
            src={'/about/aboutintro.jpg'} 
            width={800} 
            height={500} 
            alt='about' 
            className='object-cover w-full h-[500px] mt-8'/>
        </div>

    </section>
  )
}

export default AboutIntro