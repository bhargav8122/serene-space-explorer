
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCurrentUser } from "@/utils/authUtils";
import { useState, useEffect } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const LivingRoom = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1480&auto=format&fit=crop')",
              filter: "brightness(0.7)"
            }}
          ></div>
          
          <div className="relative z-10 container mx-auto text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Living Room Design</h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Create a comfortable and stylish space for family gathering and entertaining.
            </p>
            
            <Link to={isLoggedIn ? "/3d-designer?room=living-room" : "/login?redirect=3d-designer&room=living-room"}>
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
                <h2 className="text-3xl font-bold text-interior-navy mb-4">Elegant Living Spaces</h2>
                <p className="text-gray-700 mb-4">
                  Our living room designs create spaces where style meets comfort. We focus on creating rooms that are perfect for both everyday family life and entertaining guests.
                </p>
                <p className="text-gray-700 mb-6">
                  From furniture placement to lighting and décor, every element is thoughtfully designed to create a cohesive and inviting living space.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={isLoggedIn ? "/3d-designer?room=living-room" : "/login?redirect=3d-designer&room=living-room"}>
                    <Button variant="outline" className="border-interior-navy text-interior-navy hover:bg-interior-navy hover:text-white">
                      Try for Free
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=735&auto=format&fit=crop" 
                  alt="Living Room Design" 
                  className="rounded-lg shadow-md h-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=735&auto=format&fit=crop" 
                  alt="Living Room Detail" 
                  className="rounded-lg shadow-md h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-12 text-center">Living Room Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Comfortable Seating</h3>
                <p className="text-gray-700">
                  Thoughtfully arranged seating that encourages conversation and comfort for family and guests.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Entertainment Zones</h3>
                <p className="text-gray-700">
                  Dedicated areas for entertainment systems that balance technology with aesthetic appeal.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Accent Features</h3>
                <p className="text-gray-700">
                  Carefully selected accent pieces and artwork that bring personality and style to your living space.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Photo Album Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-8 text-center">Living Room Design Gallery</h2>
            <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Explore our collection of living room designs to find inspiration for your home.
              These designs showcase different styles and layouts to help you create your ideal space.
            </p>
            
            <div className="relative mx-auto max-w-5xl px-8">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=1200&auto=format&fit=crop" 
                          alt="Living Room Design 1" 
                          className="h-[500px] w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-interior-navy">Modern Sophistication</h3>
                      <p className="text-sm text-gray-600">Clean lines and a neutral palette create an elegant living space</p>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop" 
                          alt="Living Room Design 2" 
                          className="h-[500px] w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-interior-navy">Cozy Traditional</h3>
                      <p className="text-sm text-gray-600">Warm colors and classic furniture for a homey atmosphere</p>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200&auto=format&fit=crop" 
                          alt="Living Room Design 3" 
                          className="h-[500px] w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-interior-navy">Contemporary Open Plan</h3>
                      <p className="text-sm text-gray-600">Spacious design with abundant natural light</p>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop" 
                          alt="Living Room Design 4" 
                          className="h-[500px] w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-interior-navy">Urban Minimalist</h3>
                      <p className="text-sm text-gray-600">Sleek furniture and strategic accents for a clean aesthetic</p>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-0 lg:-left-12" />
                <CarouselNext className="right-0 lg:-right-12" />
              </Carousel>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LivingRoom;
