
import { LucideHome, Users, Bed, DoorOpen } from "lucide-react";

const features = [
  {
    icon: <DoorOpen className="h-8 w-8 text-interior-navy" />,
    title: "Kitchen Design",
    description: "Modern kitchen designs with functional layouts and stylish finishes."
  },
  {
    icon: <Bed className="h-8 w-8 text-interior-navy" />,
    title: "Bedroom Comfort",
    description: "Cozy bedroom spaces designed for optimal comfort and relaxation."
  },
  {
    icon: <LucideHome className="h-8 w-8 text-interior-navy" />,
    title: "Living Room",
    description: "Elegant living room designs that balance style and functionality."
  },
  {
    icon: <Users className="h-8 w-8 text-interior-navy" />,
    title: "Master Bedroom",
    description: "Luxurious master bedrooms with personalized design elements."
  },
  {
    icon: <DoorOpen className="h-8 w-8 text-interior-navy" />,
    title: "Hall Design",
    description: "Welcoming hall designs that make a stunning first impression."
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-interior-navy">Our Interior Design Specialties</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our range of interior design services tailored to every room in your home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform hover:-translate-y-1"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
