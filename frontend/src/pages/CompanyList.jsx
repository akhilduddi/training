import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Globe, Users, Filter, ChevronDown, CheckSquare, Square } from 'lucide-react';

const companiesData = [
  {
    id: 'pharmatech',
    name: 'PharmaTech Solutions',
    industry: 'Pharmaceuticals',
    location: 'Boston, MA, USA',
    size: '5,000+ employees',
    description: 'A leading global pharmaceutical company focused on developing cutting-edge mRNA therapeutics and vaccines for infectious diseases and oncology.',
    logo: 'P',
    color: 'bg-blue-600',
    tags: ['R&D', 'Vaccines', 'Oncology']
  },
  {
    id: 'biohealth',
    name: 'BioHealth Innovations',
    industry: 'Biotech',
    location: 'San Francisco, CA, USA',
    size: '1,000-5,000 employees',
    description: 'Pioneering biotechnology firm specializing in gene editing therapies and personalized medicine solutions for rare genetic disorders.',
    logo: 'B',
    color: 'bg-green-600',
    tags: ['CRISPR', 'Gene Therapy', 'Rare Diseases']
  },
  {
    id: 'meddevices',
    name: 'Global MedDevices',
    industry: 'Medical Devices',
    location: 'Munich, Germany',
    size: '10,000+ employees',
    description: 'Global manufacturer of advanced surgical robotics, diagnostic imaging equipment, and implantable medical devices for orthopedics and cardiology.',
    logo: 'G',
    color: 'bg-red-600',
    tags: ['Robotics', 'Imaging', 'Orthopedics']
  },
  {
    id: 'agrivet',
    name: 'AgriVet Biosciences',
    industry: 'Animal and Veterinary',
    location: 'London, UK',
    size: '500-1,000 employees',
    description: 'Specialized research organization developing advanced therapeutics, diagnostics, and nutritional products for companion animals and livestock health.',
    logo: 'A',
    color: 'bg-purple-600',
    tags: ['Veterinary', 'Diagnostics', 'Nutrition']
  }
];

const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="bg-[#f3f2ef] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h1 className="text-2xl font-semibold text-gray-900">Life Science Directory</h1>
              <p className="text-sm text-gray-600 mt-1">Explore our comprehensive encyclopedia of global organizations.</p>
           </div>
           <div className="relative w-full md:w-80">
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search registry..."
               className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm text-sm"
             />
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Sidebar Filters */}
          <aside className="w-full lg:w-[280px] flex-shrink-0">
            <div className="bg-white rounded-md border border-gray-200 p-5 shadow-sm sticky top-[72px]">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                 <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</h2>
                 <button className="text-xs text-primary font-semibold hover:underline">Clear all</button>
              </div>
              
              <div className="space-y-6">
                {/* Industry Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between">
                     Industry <ChevronDown className="h-4 w-4 text-gray-500" />
                  </h3>
                  <div className="space-y-2">
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <CheckSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Pharmaceuticals (1,204)</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <Square className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Biotech (892)</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <Square className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Medical Devices (745)</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <Square className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Contract Research (CRO) (420)</span>
                     </label>
                  </div>
                </div>

                {/* Location Filter */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between">
                     Headquarters <ChevronDown className="h-4 w-4 text-gray-500" />
                  </h3>
                  <div className="relative mb-3">
                     <input type="text" placeholder="Add a country/region" className="w-full pl-3 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <CheckSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">United States</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <Square className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Europe</span>
                     </label>
                  </div>
                </div>
                
                {/* Size Filter */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between">
                     Company Size <ChevronDown className="h-4 w-4 text-gray-500" />
                  </h3>
                  <div className="space-y-2">
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <Square className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">1-50 employees</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <Square className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">51-200 employees</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <Square className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">10,000+ employees</span>
                     </label>
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* Main Directory Feed */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
               
               {/* Feed Header */}
               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h2 className="text-sm font-semibold text-gray-700">Displaying 4,892 results</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                     <span>Sort by:</span>
                     <select className="border-none bg-transparent font-semibold text-gray-900 focus:outline-none cursor-pointer">
                        <option>Relevance</option>
                        <option>A-Z Alphabetical</option>
                        <option>Recently Updated</option>
                     </select>
                  </div>
               </div>

               {/* Company List Items */}
               <div className="divide-y divide-gray-200">
                 {companiesData.map(company => (
                   <div key={company.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-5">
                      
                      {/* Logo Area */}
                      <Link to={`/companies/${company.id}`} className="flex-shrink-0">
                        <div className={`w-20 h-20 ${company.color} rounded border border-gray-200 shadow-sm flex items-center justify-center text-white text-3xl font-bold`}>
                           {company.logo}
                        </div>
                      </Link>

                      {/* Content Area */}
                      <div className="flex-1">
                         <div className="flex justify-between items-start">
                            <div>
                               <Link to={`/companies/${company.id}`} className="text-xl font-semibold text-[#0a66c2] hover:underline block leading-tight">
                                  {company.name}
                               </Link>
                               <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-gray-600 font-medium">
                                  <span className="flex items-center gap-1"><Building2 className="h-4 w-4 text-gray-400" /> {company.industry}</span>
                                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-gray-400" /> {company.location}</span>
                                  <span className="flex items-center gap-1"><Users className="h-4 w-4 text-gray-400" /> {company.size}</span>
                               </div>
                            </div>
                         </div>
                         
                         <p className="mt-3 text-sm text-gray-700 leading-relaxed max-w-3xl">
                           {company.description}
                         </p>

                         {/* Tags */}
                         <div className="flex flex-wrap gap-2 mt-4">
                           {company.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded border border-gray-300 bg-white text-xs font-semibold text-gray-600">
                                {tag}
                              </span>
                           ))}
                         </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="sm:w-32 flex-shrink-0 flex flex-col gap-2 mt-4 sm:mt-0">
                         <Link to={`/companies/${company.id}`} className="w-full text-center px-4 py-1.5 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors focus:outline-none focus:ring-1 focus:ring-primary shadow-sm">
                           View Profile
                         </Link>
                         <button className="w-full text-center px-4 py-1.5 border border-gray-500 text-gray-600 rounded-full text-sm font-semibold hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none focus:ring-1 shadow-sm">
                           Save
                         </button>
                      </div>

                   </div>
                 ))}
               </div>

               {/* Pagination */}
               <div className="px-6 py-5 border-t border-gray-200 flex items-center justify-between">
                  <button className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                     Previous
                  </button>
                  <div className="flex items-center gap-1">
                     <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</button>
                     <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 text-sm font-bold">2</button>
                     <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 text-sm font-bold">3</button>
                     <span className="px-2 text-gray-500">...</span>
                     <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 text-sm font-bold">82</button>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold text-gray-600 hover:bg-gray-50">
                     Next
                  </button>
               </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
