'use client';
import Image from 'next/image';
import { UserPlus, Search, Ticket, Smile } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      title: 'Sign Up',
      description: 'Create an account to get started.',
      details: [
        'Fill in your personal information.',
        'Verify your email address.',
        'Set up your profile to personalize your experience.',
      ],
      icon: <UserPlus className="h-8 w-8 text-blue-600 mb-4" />, // Icon for Sign Up
      image: '/images/sign-up.png',
    },
    {
      title: 'Browse Events',
      description: 'Explore events that match your interests.',
      details: [
        'Use filters to find events by category, date, or location.',
        'Save your favorite events for easy access later.',
        'Get recommendations based on your preferences.',
        'You can also buy NFC tags and cards to enhance your experience.',
      ],
      icon: <Search className="h-8 w-8 text-blue-600 mb-4" />, // Icon for Browse Events
      image: '/images/browse-events.png',
    },
    {
      title: 'Book Tickets',
      description: 'Secure your spot by booking tickets.',
      details: [
        'Choose your preferred seating options.',
        'Receive instant confirmation via email.',
        'Easily manage your bookings through your account.',
        'Tickets will be sent to your email for easy access.',
      ],
      icon: <Ticket className="h-8 w-8 text-blue-600 mb-4" />, // Icon for Book Tickets
      image: '/images/book-tickets.png',
    },
    {
      title: 'Enjoy the Event',
      description: 'Attend and enjoy the event.',
      details: [
        'Arrive early to get settled and enjoy the atmosphere.',
        'Use your NFC tag for entry and to purchase food from vendors.',
        'Bring your ticket (digital or printed) for entry.',
        'Share your experience with friends and family!',
      ],
      icon: <Smile className="h-8 w-8 text-blue-600 mb-4" />, // Icon for Enjoy the Event
      image: '/images/enjoy-event.png',
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-8">How It Works</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg">
            {step.icon} {/* Render the icon here */}
            <Image src={step.image} alt={step.title} width={128} height={128} className="mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
            <h4 className="text-lg font-semibold mt-4">What to Expect:</h4>
            <ul className="text-gray-600 mb-4">
              {step.details.map((detail, index) => (
                <li key={index}>- {detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
