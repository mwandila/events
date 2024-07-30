import React from 'react';
import Image from 'next/image';
import logo from "../../../../public/images/teenag.jpg";

const HeroSection2 = () => {
  return (
    <section className="relative bg-cover bg-center h-[65vh]" style={{
      backgroundImage: `url(${logo.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl font-bold">FIND YOUR NEXT GO TO</h1>
        <button className="mt-4 bg-orange-500 text-white p-2 rounded-md">Find your next event</button>
      </div>
    </section>
  );
};

export default HeroSection2;
