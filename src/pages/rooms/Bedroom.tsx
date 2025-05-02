
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCurrentUser } from "@/utils/authUtils";
import { useState, useEffect } from "react";

const Bedroom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1480&auto=format&fit=crop')",
              filter: "brightness(0.7)"
            }}
          ></div>
          
          <div className="relative z-10 container mx-auto text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bedroom Design</h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Create a tranquil retreat with our beautiful bedroom designs.
            </p>
            
            <Link to={isLoggedIn ? "/3d-designer?room=bedroom" : "/login?redirect=3d-designer&room=bedroom"}>
              <Button size="lg" className="bg-interior-gold hover:bg-yellow-600 text-black font-semibold">
                Try 3D Design Now
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=735&auto=format&fit=crop" 
                    alt="Bedroom Design" 
                    className="rounded-lg shadow-md h-full object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=735&auto=format&fit=crop" 
                    alt="Bedroom Detail" 
                    className="rounded-lg shadow-md h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-interior-navy mb-4">Peaceful Bedroom Spaces</h2>
                <p className="text-gray-700 mb-4">
                  Our bedroom designs focus on creating serene, comfortable spaces that help you relax and recharge. We carefully select colors, textures, and lighting to promote rest and wellbeing.
                </p>
                <p className="text-gray-700 mb-6">
                  From minimalist designs to cozy retreats, we design bedrooms that reflect your personal style while optimizing the space for comfort.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-interior-navy hover:bg-blue-900">Book a Consultation</Button>
                  <Link to={isLoggedIn ? "/3d-designer?room=bedroom" : "/login?redirect=3d-designer&room=bedroom"}>
                    <Button variant="outline" className="border-interior-navy text-interior-navy hover:bg-interior-navy hover:text-white">
                      Try for Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-12 text-center">Bedroom Design Elements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Comfortable Bedding</h3>
                <p className="text-gray-700">
                  Luxurious bedding options that provide both comfort and style for a restful night's sleep.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Ambient Lighting</h3>
                <p className="text-gray-700">
                  Thoughtfully designed lighting that creates the perfect atmosphere for relaxation and rest.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Storage Solutions</h3>
                <p className="text-gray-700">
                  Smart storage options that keep your bedroom organized and clutter-free.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-12 text-center">Bedroom Gallery</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <img 
                src="https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=500&auto=format&fit=crop" 
                alt="Bedroom Gallery 1" 
                className="rounded-lg shadow-md h-64 w-full object-cover hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=500&auto=format&fit=crop" 
                alt="Bedroom Gallery 2" 
                className="rounded-lg shadow-md h-64 w-full object-cover hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=500&auto=format&fit=crop" 
                alt="Bedroom Gallery 3" 
                className="rounded-lg shadow-md h-64 w-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bedroom;
