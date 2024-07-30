'use client';
import Image from 'next/image';

const HowItWorksSection = () => {
  const steps = [
    {
      title: 'Sign Up',
      description: 'Create an account to get started.',
      image: '/images/sign-up.png',
    },
    {
      title: 'Browse Events',
      description: 'Explore events that match your interests.',
      image: '/images/browse-events.png',
    },
    {
      title: 'Book Tickets',
      description: 'Secure your spot by booking tickets.',
      image: '/images/book-tickets.png',
    },
    {
      title: 'Enjoy the Event',
      description: 'Attend and enjoy the event.',
      image: '/images/enjoy-event.png',
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-8">How It Works</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg">
            <Image src={step.image} alt={step.title} width={128} height={128} className="mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
