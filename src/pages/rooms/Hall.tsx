
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

const Hall = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1480&auto=format&fit=crop')",
              filter: "brightness(0.7)"
            }}
          ></div>
          
          <div className="relative z-10 container mx-auto text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hall Design</h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Create a welcoming entrance that sets the tone for your entire home.
            </p>
            
            <Link to={isLoggedIn ? "/3d-designer?room=hall" : "/login?redirect=3d-designer&room=hall"}>
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
                    src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=735&auto=format&fit=crop" 
                    alt="Hall Design" 
                    className="rounded-lg shadow-md h-full object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=735&auto=format&fit=crop" 
                    alt="Hall Detail" 
                    className="rounded-lg shadow-md h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-interior-navy mb-4">Impressive Entryways</h2>
                <p className="text-gray-700 mb-4">
                  Your hall or entryway creates the first impression of your home. Our designs focus on creating welcoming, functional spaces that set the tone for the rest of your interior.
                </p>
                <p className="text-gray-700 mb-6">
                  From elegant foyers to practical mudrooms, we design halls that balance style with functionality while reflecting your home's overall design aesthetic.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={isLoggedIn ? "/3d-designer?room=hall" : "/login?redirect=3d-designer&room=hall"}>
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
            <h2 className="text-3xl font-bold text-interior-navy mb-12 text-center">Hall Design Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Storage Solutions</h3>
                <p className="text-gray-700">
                  Practical storage options for coats, shoes, and accessories that keep your entryway organized.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Statement Lighting</h3>
                <p className="text-gray-700">
                  Eye-catching lighting fixtures that create ambiance and make a design statement.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Welcoming Décor</h3>
                <p className="text-gray-700">
                  Thoughtfully selected décor elements that create a warm, inviting atmosphere.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Photo Album Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-8 text-center">Hall Design Gallery</h2>
            <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Explore our collection of hall and entryway designs to make a great first impression.
              These designs showcase different styles and solutions to create welcoming entrances.
            </p>
            
            <div className="relative mx-auto max-w-5xl px-8">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=1200&auto=format&fit=crop" 
                          alt="Hall Design 1" 
                          className="h-[500px] w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-interior-navy">Modern Minimalist</h3>
                      <p className="text-sm text-gray-600">Clean lines and functional storage for sleek entryways</p>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop" 
                          alt="Hall Design 2" 
                          className="h-[500px] w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-interior-navy">Classic Elegance</h3>
                      <p className="text-sm text-gray-600">Traditional features with sophisticated details</p>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop" 
                          alt="Hall Design 3" 
                          className="h-[500px] w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-interior-navy">Practical Entryway</h3>
                      <p className="text-sm text-gray-600">Functional spaces with organized storage solutions</p>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop" 
                          alt="Hall Design 4" 
                          className="h-[500px] w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-interior-navy">Contemporary Foyer</h3>
                      <p className="text-sm text-gray-600">Stylish entrance with statement décor elements</p>
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

export default Hall;
