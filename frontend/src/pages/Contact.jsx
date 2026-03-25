import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-[#f3f2ef] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center md:text-left mb-8">
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Contact cGxP.Directory</h1>
           <p className="text-gray-600 mt-2 text-sm font-medium">For inquiries, partnership opportunities, or support, please submit your information below.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Form Area */}
          <div className="flex-1 bg-white p-8 border border-gray-300 border-t-4 border-t-primary shadow-sm rounded-sm">
            <p className="text-xs text-gray-500 mb-6 font-semibold uppercase tracking-wider pb-4 border-b border-gray-100">
               All fields marked with an asterisk (*) are mandatory.
            </p>

            <form className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Company Name *</label>
                  <input type="text" placeholder="Enter Company Name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input type="text" placeholder="Enter Full Name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Work Email *</label>
                  <input type="email" placeholder="Enter Work Email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Contact Number</label>
                  <div className="flex shadow-sm">
                     <select className="px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-sm bg-gray-50 focus:outline-none text-sm text-gray-700 font-medium">
                       <option>-</option>
                       <option>+1</option>
                       <option>+44</option>
                       <option>+91</option>
                     </select>
                     <input type="text" placeholder="Enter Contact Number" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Country *</label>
                  <select required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">State</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                    <option value="">Select State</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    <option value="NJ">New Jersey</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Comments</label>
                <textarea placeholder="Please detail the nature of your inquiry here..." rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors resize-y leading-relaxed"></textarea>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">Attachment <span className="font-semibold text-gray-500 normal-case ml-1">(Max 3MB)</span></label>
                <input type="file" className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200 cursor-pointer border border-gray-300 rounded-sm p-1.5 bg-white shadow-sm transition-colors" />
              </div>

              <div className="flex items-start bg-gray-50 p-4 border border-gray-200 rounded-sm mt-6">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded-sm cursor-pointer" />
                <p className="ml-3 text-sm text-gray-700 font-medium">
                  I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms and Conditions</a> governing data collection and usage.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button type="submit" className="bg-primary hover:bg-[#004182] text-white font-bold text-sm tracking-wide py-3 px-10 rounded-sm shadow-sm transition-colors uppercase">
                  Submit Inquiry
                </button>
              </div>
              
            </form>
          </div>

          {/* Corporate Info Widget */}
          <aside className="w-full lg:w-[360px] flex-shrink-0">
            <div className="bg-white p-8 border border-gray-300 rounded-sm shadow-sm sticky top-[72px]">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">Corporate Headquarters</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                   <div className="mt-0.5 bg-gray-100 p-2 rounded border border-gray-200">
                     <Phone className="h-5 w-5 text-gray-700" />
                   </div>
                   <div>
                     <p className="font-bold text-gray-900 text-sm uppercase">Direct Line</p>
                     <p className="text-gray-700 text-base mt-0.5 font-medium">+1 (908) 524-0575</p>
                   </div>
                </li>
                <li className="flex items-start gap-4">
                   <div className="mt-0.5 bg-gray-100 p-2 rounded border border-gray-200">
                     <Mail className="h-5 w-5 text-gray-700" />
                   </div>
                   <div>
                     <p className="font-bold text-gray-900 text-sm uppercase">Email Address</p>
                     <p className="text-gray-700 text-base mt-0.5 font-medium">Contact@cGxP.Directory</p>
                   </div>
                </li>
                <li className="flex items-start gap-4">
                   <div className="mt-0.5 bg-gray-100 p-2 rounded border border-gray-200">
                     <MapPin className="h-5 w-5 text-gray-700" />
                   </div>
                   <div>
                     <p className="font-bold text-gray-900 text-sm uppercase">Mailing Address</p>
                     <p className="text-gray-700 text-sm mt-1 leading-relaxed font-medium">
                        285 Durham Ave,<br/>
                        South Plainfield,<br/>
                        NJ 07080 USA.
                     </p>
                   </div>
                </li>
              </ul>
              
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Contact;
