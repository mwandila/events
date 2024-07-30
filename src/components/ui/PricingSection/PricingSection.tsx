'use client';

const PricingSection = () => {
  const plans = [
    {
      title: 'Basic',
      price: 'Free',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      title: 'Pro',
      price: '$19.99/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
      title: 'Enterprise',
      price: 'Contact Us',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8">Pricing Plans</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="text-center p-6 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="text-gray-600 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
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
