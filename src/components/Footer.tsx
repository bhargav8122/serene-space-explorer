
import { Link } from "react-router-dom";
import { getCurrentUser } from "@/utils/authUtils";

const Footer = () => {
  const currentUser = getCurrentUser();
  
  return (
    <footer className="bg-interior-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Dream Space</h3>
            <p className="text-gray-300">
              Transforming houses into beautiful homes with expert interior design solutions.
            </p>
          </div>
          {currentUser && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link to="/kitchen" className="text-gray-300 hover:text-white transition-colors">Kitchen</Link></li>
                <li><Link to="/bedroom" className="text-gray-300 hover:text-white transition-colors">Bedroom</Link></li>
                <li><Link to="/master-bedroom" className="text-gray-300 hover:text-white transition-colors">Master Bedroom</Link></li>
                <li><Link to="/hall" className="text-gray-300 hover:text-white transition-colors">Hall</Link></li>
                <li><Link to="/living-room" className="text-gray-300 hover:text-white transition-colors">Living Room</Link></li>
              </ul>
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {!currentUser ? (
                <>
                  <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link></li>
                  <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link></li>
                </>
              ) : (
                <li>
                  <button 
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => {
                      localStorage.removeItem('currentUser');
                      window.location.href = '/';
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} Dream Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
