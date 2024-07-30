'use client';
import Image from 'next/image';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Easy Ticket Booking',
      description: 'Book tickets effortlessly with our user-friendly interface.',
      icon: '/icons/ticket-booking.svg',
    },
    {
      title: 'Secure Payments',
      description: 'Make secure transactions with multiple payment options.',
      icon: '/icons/secure-payments.svg',
    },
    {
      title: 'Event Management',
      description: 'Manage your events with powerful tools and analytics.',
      icon: '/icons/event-management.svg',
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8">Features</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-6 bg-gray-100 rounded-lg shadow-lg">
            <Image src={feature.icon} alt={feature.title} width={64} height={64} className="mx-auto mb-4"/>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
