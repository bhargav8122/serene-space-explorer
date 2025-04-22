
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MasterBedroom = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1617098474210-ad7a700d8c49?q=80&w=1480&auto=format&fit=crop')",
              filter: "brightness(0.7)"
            }}
          ></div>
          
          <div className="relative z-10 container mx-auto text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Master Bedroom</h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Luxurious master bedroom designs for your personal sanctuary.
            </p>
            <Link to="/3d-designer">
              <Button className="bg-primary hover:bg-primary/90 text-lg">
                Design Your Own in 3D
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-interior-navy mb-4">Luxury Master Bedroom</h2>
                <p className="text-gray-700 mb-4">
                  Our master bedroom designs create luxurious retreats where you can relax and recharge. We combine elegant aesthetics with practical features to create the perfect personal sanctuary.
                </p>
                <p className="text-gray-700 mb-6">
                  From spacious layouts to custom storage solutions, every element is thoughtfully designed to enhance your comfort and reflect your personal style.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-interior-navy hover:bg-blue-900">Book a Consultation</Button>
                  <Link to="/register">
                    <Button variant="outline" className="border-interior-navy text-interior-navy hover:bg-interior-navy hover:text-white">
                      Create Account
                    </Button>
                  </Link>
                  <Link to="/3d-designer">
                    <Button variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Try 3D Designer
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=735&auto=format&fit=crop" 
                  alt="Master Bedroom Design" 
                  className="rounded-lg shadow-md h-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?q=80&w=735&auto=format&fit=crop" 
                  alt="Master Bedroom Detail" 
                  className="rounded-lg shadow-md h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-12 text-center">Master Bedroom Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Ensuite Bathrooms</h3>
                <p className="text-gray-700">
                  Seamlessly integrated ensuite bathrooms that combine convenience with luxury.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Walk-in Closets</h3>
                <p className="text-gray-700">
                  Custom designed walk-in closets with personalized storage solutions for your wardrobe.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-interior-navy mb-3">Luxury Finishes</h3>
                <p className="text-gray-700">
                  Premium materials and finishes that create a sophisticated and elegant atmosphere.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-interior-navy mb-12 text-center">Master Bedroom Gallery</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <img 
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=500&auto=format&fit=crop" 
                alt="Master Bedroom Gallery 1" 
                className="rounded-lg shadow-md h-64 w-full object-cover hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=500&auto=format&fit=crop" 
                alt="Master Bedroom Gallery 2" 
                className="rounded-lg shadow-md h-64 w-full object-cover hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://images.unsplash.com/photo-1615874694520-474822394e73?q=80&w=500&auto=format&fit=crop" 
                alt="Master Bedroom Gallery 3" 
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

export default MasterBedroom;
