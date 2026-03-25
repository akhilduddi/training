import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-1.5 mb-4">
              <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                 <Building2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-primary tracking-tight">cGxP.Directory</span>
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">General</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline">About</Link></li>
              <li><Link to="/guidelines" className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline">Community Guidelines</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline">Privacy & Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Directories</h3>
            <ul className="space-y-3">
              <li><Link to="/companies" className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline">Companies</Link></li>
              <li><Link to="/articles" className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline">Articles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Business Solutions</h3>
            <ul className="space-y-3">
              <li><Link to="/marketing" className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline">Marketing</Link></li>
              <li><Link to="/sales" className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline">Sales</Link></li>
              <li><Link to="/register" className="text-sm text-gray-500 hover:text-primary transition-colors hover:underline">Create a Company Page</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>cGxP.Directory Corporation &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
