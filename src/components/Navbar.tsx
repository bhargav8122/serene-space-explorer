
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { getCurrentUser } from "@/utils/authUtils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = getCurrentUser();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-interior-navy">Dream Space</span>
          </Link>

          {/* Desktop Navigation - Only shown when logged in */}
          {currentUser && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-interior-navy transition-colors">Home</Link>
              <Link to="/kitchen" className="text-gray-700 hover:text-interior-navy transition-colors">Kitchen</Link>
              <Link to="/bedroom" className="text-gray-700 hover:text-interior-navy transition-colors">Bedroom</Link>
              <Link to="/master-bedroom" className="text-gray-700 hover:text-interior-navy transition-colors">Master Bedroom</Link>
              <Link to="/hall" className="text-gray-700 hover:text-interior-navy transition-colors">Hall</Link>
              <Link to="/living-room" className="text-gray-700 hover:text-interior-navy transition-colors">Living Room</Link>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <Button 
                variant="ghost" 
                className="text-interior-navy"
                onClick={() => {
                  localStorage.removeItem('currentUser');
                  window.location.href = '/';
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-interior-navy">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-interior-navy hover:bg-blue-900">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="outline-none"
              aria-label="toggle menu"
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              {currentUser && (
                <>
                  <Link 
                    to="/" 
                    className="text-gray-700 hover:text-interior-navy transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/kitchen" 
                    className="text-gray-700 hover:text-interior-navy transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Kitchen
                  </Link>
                  <Link 
                    to="/bedroom" 
                    className="text-gray-700 hover:text-interior-navy transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bedroom
                  </Link>
                  <Link 
                    to="/master-bedroom" 
                    className="text-gray-700 hover:text-interior-navy transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Master Bedroom
                  </Link>
                  <Link 
                    to="/hall" 
                    className="text-gray-700 hover:text-interior-navy transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Hall
                  </Link>
                  <Link 
                    to="/living-room" 
                    className="text-gray-700 hover:text-interior-navy transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Living Room
                  </Link>
                </>
              )}
              <div className="flex space-x-4 pt-2">
                {currentUser ? (
                  <Button 
                    variant="ghost" 
                    className="text-interior-navy"
                    onClick={() => {
                      localStorage.removeItem('currentUser');
                      window.location.href = '/';
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="text-interior-navy">Login</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="bg-interior-navy hover:bg-blue-900">Register</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
