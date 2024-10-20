import React from 'react';
import Typewriter from 'typewriter-effect';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className='flex items-center gap-3'>
        {/* Typewriter effect integrated here */}
        <h2 className='h3-bold text-white'>
          <Typewriter
            options={{
              strings: ["FarmTrail..."],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 50,
            }}
          />
        </h2>
      </div>
    </div>
  );
};

export default Loader;
