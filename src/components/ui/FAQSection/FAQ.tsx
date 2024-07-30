'use client';

const FAQSection = () => {
  const faqs = [
    {
      question: 'How do I book a ticket?',
      answer: 'You can book a ticket by selecting an event and following the booking process.',
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, our mobile app is available for both iOS and Android devices.',
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="container mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
