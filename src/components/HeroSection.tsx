
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/utils/authUtils";

const HeroSection = () => {
  const currentUser = getCurrentUser();
  const designerLink = currentUser ? "/3d-designer" : "/login";
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1580&auto=format&fit=crop')",
          filter: "brightness(0.6)"
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to DreamSpace</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Discover beautiful interior designs that transform your house into a home.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={designerLink}>
            <Button size="lg" className="bg-interior-gold hover:bg-yellow-600 text-black font-semibold">
              {currentUser ? "Try for Free" : "Login to Design"}
            </Button>
          </Link>
          {currentUser && (
            <Link to="/kitchen">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-interior-navy">
                Explore Designs
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
