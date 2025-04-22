import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";
import RoomCard from "@/components/RoomCard";

const rooms = [
  {
    title: "Kitchen",
    description: "Modern kitchen designs with functional layouts and stylish finishes.",
    imageSrc: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1480&auto=format&fit=crop",
    path: "/kitchen"
  },
  {
    title: "Bedroom",
    description: "Cozy bedroom spaces designed for optimal comfort and relaxation.",
    imageSrc: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1480&auto=format&fit=crop",
    path: "/bedroom"
  },
  {
    title: "Master Bedroom",
    description: "Luxurious master bedrooms with personalized design elements.",
    imageSrc: "https://images.unsplash.com/photo-1617098474210-ad7a700d8c49?q=80&w=1480&auto=format&fit=crop",
    path: "/master-bedroom"
  },
  {
    title: "Hall",
    description: "Welcoming hall designs that make a stunning first impression.",
    imageSrc: "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1480&auto=format&fit=crop",
    path: "/hall"
  },
  {
    title: "Living Room",
    description: "Elegant living room designs that balance style and functionality.",
    imageSrc: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1480&auto=format&fit=crop",
    path: "/living-room"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-interior-navy">Explore Our Room Designs</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Discover beautiful interior designs for every room in your home.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard 
                  key={room.title}
                  title={room.title}
                  description={room.description}
                  imageSrc={room.imageSrc}
                  path={room.path}
                />
              ))}
            </div>
          </div>
        </section>
        
        <FeatureSection />
        <TestimonialSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
