import { Search, Building2, Pill, Syringe, Stethoscope, Zap, PawPrint, Sparkles, Apple, Leaf, Target, Eye, BadgeCheck, PencilLine } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const professionalCategories = [
  { name: 'Drugs', icon: Pill },
  { name: 'Vaccines, Blood and Biologics', icon: Syringe },
  { name: 'Medical Devices', icon: Stethoscope },
  { name: 'Radiation-Emitting Products', icon: Zap },
  { name: 'Animal and Veterinary', icon: PawPrint },
  { name: 'Cosmetics', icon: Sparkles },
  { name: 'Food', icon: Apple },
  { name: 'Tobacco Products', icon: Leaf }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/companies?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/companies');
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 w-full text-left">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 font-sans tracking-tight leading-[1.1]">
            Welcome to <span className="text-primary">(cGxP).Directory</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 tracking-tight">
            An Encyclopedia of Life Science Companies.
          </h2>
          <p className="text-xl text-gray-600 font-medium mb-10">
            Explore the world's largest network of Life Science Companies.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-lg mt-12 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies by name, category, or keyword..."
                className="w-full pl-5 pr-14 py-4 border border-gray-400 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white shadow-sm text-base font-medium"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary hover:bg-[#004182] text-white font-semibold py-4 rounded-full transition-colors text-lg shadow-sm"
            >
              Search Directory
            </button>
          </form>
        </div>

        <div className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0 w-full">
           <div className="w-full max-w-md h-[400px] bg-[#f3f2ef] rounded-md border border-gray-200 shadow-sm flex items-center justify-center relative overflow-hidden group">
              <img 
                 src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                 alt="Life Science Corporate Architecture" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
           </div>
        </div>
      </section>

      {/* Popular Professional Categories */}
      <section className="bg-slateBg py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
           <h2 className="text-3xl font-bold text-gray-900 mb-3 border-l-4 border-primary pl-4">Popular Professional Categories</h2>
           <p className="text-base text-gray-600 mb-8 font-medium">
             You can view the company details by clicking the category below.
           </p>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {professionalCategories.map((cat, index) => {
               const Icon = cat.icon;
               return (
                  <Link
                    key={index}
                    to={`/companies?industry=${encodeURIComponent(cat.name)}`}
                    className="flex flex-col items-center justify-center bg-white p-6 rounded-md border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all text-center h-full gap-4 group"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#f3f2ef] group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{cat.name}</span>
                  </Link>
               );
             })}
           </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
           <div className="flex flex-col lg:flex-row gap-12 items-center">
             <div className="flex-1 w-full">
               <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-primary pl-4">Company Information</h2>
               <div className="space-y-4 text-gray-700 leading-relaxed font-medium">
                 <p>
                   cGxP.Directory is a global directory of life science organizations. Our directory consists of information on Pharmaceutical, Biotech, Medical Device, Cosmetics, Food, Tobacco, Contract Research Organization (CRO), Life Science IT and many more life science companies around the world.
                 </p>
                 <p>
                   cGxP.Directory is a digital platform/product of a small, private and minority-owned life science technology and data science company cGxP Tech Inc., headquartered in South Plainfield, New Jersey, though our team is across the U.S., Canada, Europe and beyond.
                 </p>
               </div>
             </div>
             
             <div className="flex-1 w-full">
               <img 
                 src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
                 alt="Life Science Professionals and Laboratory" 
                 className="w-full h-[360px] object-cover rounded-md shadow-sm border border-gray-200"
               />
             </div>
           </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-[#f3f2ef] py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="bg-white rounded-md border border-gray-200 p-8 sm:p-10 shadow-sm hover:shadow transition-shadow">
               <div className="flex items-center gap-4 mb-6">
                 <div className="h-14 w-14 bg-[#f3f2ef] rounded flex items-center justify-center border border-gray-200 shadow-sm">
                    <Target className="h-7 w-7 text-primary" />
                 </div>
                 <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
               </div>
               <p className="text-gray-700 leading-relaxed font-medium">
                 “To provide an exhaustive, user-friendly platform that connects life science companies, researchers, and all other stakeholders for promoting transparency, fostering partnerships, and driving advancements in life science and healthcare industry.”
               </p>
             </div>
             
             <div className="bg-white rounded-md border border-gray-200 p-8 sm:p-10 shadow-sm hover:shadow transition-shadow">
               <div className="flex items-center gap-4 mb-6">
                 <div className="h-14 w-14 bg-[#f3f2ef] rounded flex items-center justify-center border border-gray-200 shadow-sm">
                    <Eye className="h-7 w-7 text-primary" />
                 </div>
                 <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
               </div>
               <p className="text-gray-700 leading-relaxed font-medium">
                 “To revolutionize the life sciences industry by creating the most comprehensive and trusted directory, facilitating seamless collaboration, innovation, and growth among companies, researchers, and stakeholders worldwide.”
               </p>
             </div>
           </div>
        </div>
      </section>

      {/* Auth / CTA Section */}
      <section className="bg-white py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block pb-3">
                  Join your colleagues, suppliers, and competitors
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
               </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
               
               {/* Register Card */}
               <div className="bg-[#f3f2ef] rounded-md border border-gray-200 overflow-hidden shadow-sm hover:shadow transition-shadow group flex flex-col items-center">
                 <div className="h-32 w-full overflow-hidden border-b border-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                      alt="Corporate Office Building" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                 </div>
                 <div className="p-8 text-center flex-1 flex flex-col items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Create a New Listing</h3>
                      <p className="text-sm text-gray-600 mb-8 font-medium">Add your life science organization to the world's fastest growing directory and gain global visibility and leads.</p>
                    </div>
                    <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#004182] text-white font-semibold py-3 px-8 rounded-md transition-colors text-sm shadow-sm">
                       <PencilLine className="h-5 w-5" /> REGISTER YOUR BUSINESS
                    </Link>
                 </div>
               </div>
               
               {/* Claim Card */}
               <div className="bg-[#f3f2ef] rounded-md border border-gray-200 overflow-hidden shadow-sm hover:shadow transition-shadow group flex flex-col items-center">
                 <div className="h-32 w-full overflow-hidden border-b border-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800" 
                      alt="Business Colleagues Collaborating" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                 </div>
                 <div className="p-8 text-center flex-1 flex flex-col items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Claim an Existing Page</h3>
                      <p className="text-sm text-gray-600 mb-8 font-medium">Take control of your organization's presence, update executive information, and connect with direct B2B inquiries.</p>
                    </div>
                    <Link to="/register?claim=true" className="inline-flex items-center justify-center gap-2 bg-white border border-gray-500 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-1 font-semibold py-3 px-8 rounded-md transition-colors text-sm shadow-sm box-border">
                       <BadgeCheck className="h-5 w-5" /> CLAIM YOUR BUSINESS
                    </Link>
                 </div>
               </div>

            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
