
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCurrentUser } from "@/utils/authUtils";
import { useState, useEffect } from "react";

const Kitchen = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1480&auto=format&fit=crop')",
              filter: "brightness(0.7)"
            }}
          ></div>
          
          <div className="relative z-10 container mx-auto text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kitchen Design</h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Functional and beautiful kitchen spaces tailored to your lifestyle.
            </p>
            
            <Link to={isLoggedIn ? "/3d-designer?room=kitchen" : "/login?redirect=3d-designer&room=kitchen"}>
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
              <div>
                <h2 className="text-3xl font-bold text-interior-navy mb-4">Modern Kitchen Design</h2>
                <p className="text-gray-700 mb-4">
                  Our kitchen designs combine functionality with aesthetics, creating spaces that are both practical for cooking and beautiful for entertaining. We focus on efficient layouts, quality materials, and thoughtful details.
                </p>
                <p className="text-gray-700 mb-6">
                  From sleek contemporary designs to warm traditional styles, we tailor each kitchen to reflect your personal taste while maximizing the available space.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-interior-navy hover:bg-blue-900">Book a Consultation</Button>
                  <Link to={isLoggedIn ? "/3d-designer?room=kitchen" : "/login?redirect=3d-designer&room=kitchen"}>
                    <Button variant="outline" className="border-interior-navy text-interior-navy hover:bg-interior-navy hover:text-white">
                      Try for Free
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=735&auto=format&fit=crop" 
                  alt="Kitchen Design" 
                  className="rounded-lg shadow-md h-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=735&auto=format&fit=crop" 
                  alt="Kitchen Detail" 
                  className="rounded-lg shadow-md h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-12 text-center">Kitchen Design Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Custom Cabinetry</h3>
                <p className="text-gray-700">
                  Tailor-made cabinets designed to maximize storage while complementing your kitchen's overall aesthetic.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Kitchen Islands</h3>
                <p className="text-gray-700">
                  Functional islands that provide additional counter space, storage, and create a social hub in your kitchen.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Smart Appliances</h3>
                <p className="text-gray-700">
                  Integration of modern, energy-efficient appliances that enhance both functionality and design.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-12 text-center">Kitchen Gallery</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=500&auto=format&fit=crop" 
                alt="Kitchen Gallery 1" 
                className="rounded-lg shadow-md h-64 w-full object-cover hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=500&auto=format&fit=crop" 
                alt="Kitchen Gallery 2" 
                className="rounded-lg shadow-md h-64 w-full object-cover hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=500&auto=format&fit=crop" 
                alt="Kitchen Gallery 3" 
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

export default Kitchen;
