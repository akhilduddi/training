import { MapPin, Globe, Users, Building2, Phone, Mail, ArrowUpRight, Bookmark, CheckCircle2, Factory, Calendar, DollarSign, UserCog, Briefcase, Package } from 'lucide-react';

const CompanyProfile = () => {
  return (
    <div className="bg-[#f3f2ef] min-h-screen pb-12">
      
      {/* Strict Header Block */}
      <div className="bg-white border-b border-gray-200 shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
             
             {/* Logo */}
             <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-700 rounded-md shadow border border-gray-200 flex items-center justify-center flex-shrink-0 text-white text-5xl font-bold">
                U
             </div>

             {/* Core Title Info */}
             <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-3xl font-bold text-gray-900 tracking-tight">Unison Pharmaceuticals Pvt. Ltd.</h1>
                  <CheckCircle2 className="h-6 w-6 text-primary" title="Verified listing" />
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 font-medium mt-3">
                  <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4 text-gray-400" /> Drugs</span>
                  <span className="flex items-center gap-1.5"><Factory className="h-4 w-4 text-gray-400" /> Manufacturing</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gray-400" /> Ahmedabad, Gujarat, IN</span>
                </div>
             </div>

             {/* Action Panel */}
             <div className="w-full md:w-auto flex flex-row md:flex-col gap-3 mt-4 md:mt-0 pt-4 md:pt-0">
                <button className="flex-1 justify-center inline-flex items-center gap-2 bg-primary hover:bg-[#004182] text-white font-semibold py-2.5 px-6 rounded-md transition-colors text-sm shadow-sm md:w-48 whitespace-nowrap">
                  <Bookmark className="h-4 w-4" /> Save Company
                </button>
                <button className="flex-1 justify-center inline-flex items-center gap-2 bg-white border border-gray-500 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-1 font-semibold py-2.5 px-6 rounded-md transition-colors text-sm shadow-sm md:w-48 whitespace-nowrap box-border">
                  <Globe className="h-4 w-4 text-gray-500" /> Visit Website
                </button>
             </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex text-sm font-semibold text-gray-500 overflow-x-auto">
            <button className="border-b-[3px] border-primary text-gray-900 py-3.5 px-6 whitespace-nowrap focus:outline-none">Overview</button>
            <button className="border-b-[3px] border-transparent hover:border-gray-300 hover:text-gray-900 py-3.5 px-6 whitespace-nowrap focus:outline-none transition-colors">Products</button>
            <button className="border-b-[3px] border-transparent hover:border-gray-300 hover:text-gray-900 py-3.5 px-6 whitespace-nowrap focus:outline-none transition-colors">Jobs</button>
            <button className="border-b-[3px] border-transparent hover:border-gray-300 hover:text-gray-900 py-3.5 px-6 whitespace-nowrap focus:outline-none transition-colors">Contact</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Content Pane */}
          <div className="flex-1 max-w-4xl space-y-6">
             
             {/* Overview Section */}
             <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
                <div className="prose max-w-none text-gray-600 text-sm leading-relaxed font-medium">
                  <p>N/A</p>
                </div>
             </div>

             {/* Address Section */}
             <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2"><MapPin className="text-gray-400 h-5 w-5" /> Headquarters Address</h2>
                <div className="text-gray-700 text-sm font-medium leading-relaxed bg-gray-50 p-4 rounded border border-gray-100">
                   UNISON PHARMACEUTICALS PVT. LTD. "UNISON HOUSE"<br />
                   Near Prernatirth Derasar, Near Ratnadeep-II,<br />
                   Satellite, Jodhpur 380015,<br />
                   Ahmedabad, Gujarat, IN
                </div>
             </div>

             {/* Products Section */}
             <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><Package className="text-gray-400 h-5 w-5" /> Products</h2>
                <div className="border border-gray-200 rounded p-4 hover:shadow-sm transition-shadow">
                   <h3 className="font-semibold text-primary text-lg mb-2 cursor-pointer hover:underline">APIPREV-2.5</h3>
                   <p className="text-sm text-gray-600 leading-relaxed mb-3">
                     If you have any questions about our products or want to know more about how Unis...
                   </p>
                   <button className="text-sm font-semibold text-gray-900 hover:underline">View more</button>
                </div>
             </div>

             {/* Jobs Section */}
             <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><Briefcase className="text-gray-400 h-5 w-5" /> Jobs</h2>
                <div className="text-center py-6 bg-gray-50 rounded border border-gray-100 border-dashed">
                   <Briefcase className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                   <p className="text-sm font-medium text-gray-500">No open positions currently listed.</p>
                </div>
             </div>
             
             {/* Contact Section */}
             <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><Mail className="text-gray-400 h-5 w-5" /> Contact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="border border-gray-100 bg-gray-50 rounded p-3 flex items-center gap-3">
                     <Phone className="h-4 w-4 text-gray-400" />
                     <span className="text-sm font-medium text-gray-600">N/A</span>
                   </div>
                   <div className="border border-gray-100 bg-gray-50 rounded p-3 flex items-center gap-3">
                     <Mail className="h-4 w-4 text-gray-400" />
                     <span className="text-sm font-medium text-gray-600">N/A</span>
                   </div>
                </div>
             </div>

          </div>

          {/* Right Sidebar - "At a glance" Encyclopedia Data */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">
            
            <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
               <h2 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">At a glance</h2>
               
               <dl className="space-y-4 text-sm">
                 <div>
                   <dt className="text-gray-500 font-medium mb-1 flex items-center gap-2">Company Type</dt>
                   <dd className="font-semibold text-gray-900">Privately Held Company</dd>
                 </div>
                 
                 <div>
                   <dt className="text-gray-500 font-medium mb-1 flex items-center gap-2">Industry Type</dt>
                   <dd className="font-semibold text-gray-900">Drugs</dd>
                 </div>

                 <div>
                   <dt className="text-gray-500 font-medium mb-1 flex items-center gap-2">Industry Sub Type</dt>
                   <dd className="font-semibold text-gray-900">Manufacturing</dd>
                 </div>

                 <div>
                   <dt className="text-gray-500 font-medium mb-1 flex items-center gap-2">Company Size</dt>
                   <dd className="font-semibold text-gray-900">51-200</dd>
                 </div>
                 
                 <div>
                   <dt className="text-gray-500 font-medium mb-1 flex items-center gap-2">Founded year</dt>
                   <dd className="font-semibold text-gray-900">1981</dd>
                 </div>

                 <div>
                   <dt className="text-gray-500 font-medium mb-1 flex items-center gap-2">Revenue</dt>
                   <dd className="font-semibold text-gray-900">N/A</dd>
                 </div>

                 <div>
                   <dt className="text-gray-500 font-medium mb-1 flex items-center gap-2">CEO Name</dt>
                   <dd className="font-semibold text-gray-900">N/A</dd>
                 </div>

                 <div>
                   <dt className="text-gray-500 font-medium mb-1 flex items-center gap-2">Website</dt>
                   <dd className="font-semibold text-primary hover:underline">
                     <a href="#" className="flex items-center gap-1">Website link <ArrowUpRight className="h-3 w-3" /></a>
                   </dd>
                 </div>
               </dl>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
