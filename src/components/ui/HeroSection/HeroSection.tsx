
import Image from "next/image";
import teenga from "../../../../public/images/m.jpg"
import woman from "../../../../public/images/gym.jpg"
import girls from "../../../../public/images/football.jpg"
import { DateTimeComponent } from "../time/Time";

const HeroSection = () => (
  <section
    className="relative flex flex-col items-start justify-center p-1 bg-gradient-to-r from-orange-300 to-blue-300 min-h-[68vh]"
    style={{
      backgroundImage: `url(${girls.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="max-w-5xl z-10 text-left">
      <p className="text-black text-lg mb-2"><DateTimeComponent /></p>
      <h1 className="text-5xl font-bold text-yellow mb-4">
        EVENTS, MEETUPS <br /> & CONFERENCES
      </h1>
      <div className="flex justify-start items-center text-black mb-6">
        <div className="mx-4 flex items-center">
          <span className="material-icons-outlined"></span>
          <span className="ml-2">30,000 Seats</span>
        </div>
        <div className="mx-4 flex items-center">
          <span className="material-icons-outlined"></span>
          <span className="ml-2">10 Speakers</span>
        </div>
      </div>
      <p className="text-black text-lg mb-6">Mulungushi Conference,Lusaka</p>
      <div className="flex justify-start">
        <a href="/book" className="px-6 py-3 bg-blue-600 text-white rounded-md mx-2">Book Now</a>
        <a href="/details" className="px-6 py-3 bg-orange-500 text-white rounded-md mx-2">View Details</a>
      </div>
    </div>
   
  </section>
);

export default HeroSection;
