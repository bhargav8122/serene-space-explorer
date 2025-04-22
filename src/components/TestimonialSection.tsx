
const testimonials = [
  {
    quote: "The kitchen design transformed our cooking experience. It's both beautiful and functional.",
    author: "Samantha Richards",
    role: "Homeowner"
  },
  {
    quote: "My master bedroom feels like a luxury retreat. I couldn't be happier with the design!",
    author: "Michael Johnson",
    role: "Client"
  },
  {
    quote: "The living room redesign has made entertaining guests so much more enjoyable.",
    author: "Emma Williams",
    role: "Homeowner"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-interior-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-interior-navy">What Our Clients Say</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from homeowners who have transformed their living spaces with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md flex flex-col"
            >
              <div className="text-4xl text-interior-gold mb-4">"</div>
              <p className="text-gray-700 mb-6 flex-grow">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-interior-navy">{testimonial.author}</p>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
