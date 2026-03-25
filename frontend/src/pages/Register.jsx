const Register = () => {

  const handleReset = () => {
    // Reset handler logic
  };

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto text-center mb-10">
         <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Register New Organization</h1>
         <p className="text-gray-600 mt-2 font-medium">Join the authoritative registry for global life science operations.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-10 border border-gray-300 border-t-4 border-t-primary rounded-sm shadow-sm">
          
          <p className="text-xs text-gray-500 mb-8 font-semibold uppercase tracking-wider pb-4 border-b border-gray-100">
             Mandatory fields are denoted by an asterisk (*).
          </p>

          <form className="space-y-8">
            
            {/* Block 1: Contact Registration */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Representative Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Name *</label>
                  <input type="text" placeholder="Enter Legal Name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Designation</label>
                  <input type="text" placeholder="Enter Professional Designation" className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Email *</label>
                  <input type="email" placeholder="Enter Corporate Email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Contact Number *</label>
                  <div className="flex shadow-sm">
                     <select className="px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-sm bg-gray-50 focus:outline-none text-sm text-gray-700 font-medium">
                       <option>-</option>
                       <option>+1</option>
                       <option>+44</option>
                     </select>
                     <input type="text" placeholder="Enter Direct Line" required className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Operations Geography */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-2 mt-8 mb-4">Geography & Location</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Country *</label>
                  <select required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                    <option value="">Select Registration Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">State</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                    <option value="">Select State</option>
                    <option value="NY">New York</option>
                    <option value="NJ">New Jersey</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">City</label>
                  <input type="text" placeholder="City Name" className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
              </div>

              <div className="max-w-xs">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Zip code / Pin code</label>
                <input type="text" placeholder="Postal Code" className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
              </div>
            </div>

            {/* Block 3: Organization Details */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-2 mt-8 mb-4">Organization Taxonomy</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Company Name *</label>
                  <input type="text" placeholder="Official Corporate Entity Name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Company Website</label>
                  <input type="url" placeholder="https://www.example.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Company Size</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                    <option value="">Assign Size Cohort</option>
                    <option value="1-50">1-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="200+">200+ Employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Company Type</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                    <option value="">Assign Framework</option>
                    <option value="Public">Public Entity</option>
                    <option value="Private">Privately Held</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Industry Type</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                    <option value="">Assign Sector</option>
                    <option value="Pharma">Pharmaceuticals</option>
                    <option value="Biotech">Biotech / R&D</option>
                    <option value="Medical Device">Medical Device</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 mt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-end">
              <button 
                type="reset" 
                onClick={handleReset}
                className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 font-bold tracking-wide uppercase text-sm py-3 px-8 rounded-sm transition-colors w-full sm:w-auto"
              >
                Reset Data
              </button>
              <button 
                type="submit" 
                className="bg-primary hover:bg-[#004182] text-white font-bold tracking-wide uppercase text-sm py-3.5 px-10 rounded-sm shadow-sm transition-colors w-full sm:w-auto"
              >
                Submit Registration
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
