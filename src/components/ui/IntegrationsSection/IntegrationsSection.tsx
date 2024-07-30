'use client';
import Image from 'next/image';

const IntegrationsSection = () => {
  const integrations = [
    { name: 'Stripe', logo: '/logos/stripe.svg' },
    { name: 'PayPal', logo: '/logos/paypal.svg' },
    { name: 'Google Calendar', logo: '/logos/google-calendar.svg' },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-8">Integrations</h2>
      <div className="container mx-auto flex justify-center space-x-8">
        {integrations.map((integration, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
            <Image src={integration.logo} alt={integration.name} width={128} height={128} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsSection;
