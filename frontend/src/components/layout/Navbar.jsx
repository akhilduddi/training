import { Link } from 'react-router-dom';
import { Search, Menu, X, Building2 } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex flex-shrink-0 items-center gap-1.5">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                 <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-primary tracking-tight hidden sm:block">cGxP.Directory</span>
            </Link>
            
            {/* Search Bar */}
            <div className="hidden md:block relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-64 md:w-80 lg:w-96 pl-10 pr-3 py-1.5 border border-gray-300 rounded bg-[#eef3f8] focus:bg-white focus:outline-none focus:border-gray-400 focus:ring-0 text-sm font-medium transition-colors"
                placeholder="Search companies by name, category, or keyword..."
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            
            {/* Secondary Links */}
            <Link to="/advertise" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">
              Advertise
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors">
              Contact us
            </Link>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4 pl-1">
               <Link
                 to="/register"
                 className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors border border-transparent"
               >
                 Register
               </Link>
               <Link
                 to="/login"
                 className="text-primary hover:bg-blue-50 hover:text-[#004182] px-5 py-1.5 rounded-full text-sm font-semibold transition-colors border border-primary"
               >
                 Sign in
               </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <Search className="h-5 w-5 text-gray-600" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute w-full left-0 top-full">
          <div className="px-4 py-2 space-y-1">
            <Link to="/companies" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Companies
            </Link>
            <Link to="/advertise" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Advertise
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Contact us
            </Link>
          </div>
          <div className="px-4 py-4 border-t border-gray-200 space-y-3">
             <Link to="/register" className="block w-full text-center px-4 py-2 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors">
               Register
             </Link>
             <Link to="/login" className="block w-full text-center px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-[#004182] transition-colors">
               Sign in
             </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
