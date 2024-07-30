'use client';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: 'This app made booking events so easy!',
      name: 'John Doe',
      role: 'Event Organizer',
      image: '/images/user1.jpg',
    },
    {
      quote: 'A fantastic platform for managing events.',
      name: 'Jane Smith',
      role: 'Vendor',
      image: '/images/user2.jpg',
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8">What Our Customers Say</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <img src={testimonial.image} alt={testimonial.name} className="mx-auto rounded-full w-24 h-24 mb-4"/>
            <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
