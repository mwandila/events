'use client';

import { Diamond, Star, CheckCircle } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      title: 'Diamond',
      price: 'Contact Us',
      features: [
        'Unlimited access to all features',
        'Priority customer support',
        'Custom solutions tailored to your needs',
        'Dedicated account manager',
        'Advanced analytics and reporting',
      ],
      icon: <Diamond className="h-8 w-8 text-blue-600 mb-4" />,
    },
    {
      title: 'Gold',
      price: '$19.99/month',
      features: [
        'Access to premium features',
        'Standard customer support',
        'Monthly performance reports',
        'Integration with third-party tools',
        'Customizable dashboards',
      ],
      icon: <Star className="h-8 w-8 text-yellow-500 mb-4" />,
    },
    {
      title: 'Silver',
      price: 'Free',
      features: [
        'Basic features included',
        'Community support',
        'Access to tutorials and resources',
        'Limited integrations',
        'Basic reporting tools',
      ],
      icon: <CheckCircle className="h-8 w-8 text-gray-600 mb-4" />,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8">Pricing Plans</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="text-center p-6 bg-gray-100 rounded-lg shadow-lg">
            {plan.icon} {/* Render the icon here */}
            <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <h4 className="text-lg font-semibold mb-2">Features:</h4>
            <ul className="text-gray-600 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index}>- {feature}</li>
              ))}
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full">Choose Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
