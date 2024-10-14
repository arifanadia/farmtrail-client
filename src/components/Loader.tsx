// components/Loader.tsx
import React, { useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect/dist/core';

const Loader = () => {
    const typewriterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typewriterRef.current) {
        new Typewriter(typewriterRef.current, {
          strings: [
            "FarmTrail... "
          ],
          autoStart: true,
          loop: true,
          delay: 50,
          deleteSpeed: 50,
        });
      }
    }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 ">
     <div className='flex items-center gap-3'>
    
        <h2 className='h3-bold' ref={typewriterRef}></h2>
     </div>
    </div>
  );
};

export default Loader;
