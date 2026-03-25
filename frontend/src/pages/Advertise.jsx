const Advertise = () => {
  return (
    <div className="bg-[#f3f2ef] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Advertise With Us</h1>
           <p className="text-gray-600 mt-2 font-medium">Maximize your organization's visibility among premier life science stakeholders.</p>
        </div>

        <div className="bg-white p-8 md:p-10 border border-gray-300 border-t-4 border-t-primary rounded-sm shadow-sm">
          
          <p className="text-xs text-gray-500 mb-8 font-semibold uppercase tracking-wider pb-4 border-b border-gray-100">
             Personal & Professional Details — All fields marked with (*) are required.
          </p>

          <form className="space-y-8">
              
              {/* Block 1: Contact Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Full Name *</label>
                    <input type="text" placeholder="Enter Full Name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Work Email *</label>
                    <input type="email" placeholder="Enter Work Email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
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
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Contact Number</label>
                    <div className="flex shadow-sm">
                       <select className="px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-sm bg-gray-50 focus:outline-none text-sm text-gray-700 font-medium">
                         <option>-</option>
                         <option>+1</option>
                         <option>+44</option>
                       </select>
                       <input type="text" placeholder="Enter Contact Number" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Header inside form */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-2 mt-8 mb-6">Organization Profile</h3>

              {/* Block 2: Company Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Company Name *</label>
                    <input type="text" placeholder="Enter Corporate Name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Job Title</label>
                    <input type="text" placeholder="Enter Official Title" className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Purchasing Role</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                      <option value="">Select Role Authority</option>
                      <option value="Decision Maker">Decision Maker</option>
                      <option value="Influencer">Influencer</option>
                      <option value="Evaluator">Evaluator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">No. of Employees</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-white text-gray-800 shadow-sm transition-colors font-medium">
                      <option value="">Select Workforce Size</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201+">201+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Header inside form */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-2 mt-8 mb-6">Additional Information</h3>

              {/* Block 3: Attachments & Comments */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Detailed Comments</label>
                  <textarea placeholder="Describe your advertising goals and campaign targets..." rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors resize-y leading-relaxed"></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">Attachment <span className="font-semibold text-gray-500 normal-case ml-1">(Max 3MB)</span></label>
                  <input type="file" className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200 cursor-pointer border border-gray-300 rounded-sm p-1.5 bg-white shadow-sm transition-colors" />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start mt-4 bg-gray-50 p-4 border border-gray-200 rounded-sm">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded-sm cursor-pointer" />
                <p className="ml-3 text-sm text-gray-700 font-medium">
                  I expressly agree to the <a href="#" className="text-primary font-bold hover:underline">Terms and Conditions</a>.
                </p>
              </div>
              
              {/* Strict Legal Disclosure */}
              <div className="bg-white border border-gray-300 p-5 rounded-sm">
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                   By clicking Submit you agree to our Terms & Conditions and consent to us collecting your details for the purposes of your enquiry. Visit our privacy policy for more information about our services, how we may use, process and share your personal data, including information on your rights in respect of your personal data and how you can unsubscribe from future marketing communications. Our services are intended for corporate subscribers and you warrant that the email address submitted is your corporate email address. <a href="#" className="font-bold text-gray-800 hover:underline">Read More</a>
                </p>
              </div>

              {/* Submission Area */}
              <div className="pt-6 border-t border-gray-200 flex justify-end">
                <button type="submit" className="bg-primary hover:bg-[#004182] text-white font-bold text-sm tracking-wide py-3.5 px-12 rounded-sm shadow-sm transition-colors uppercase">
                  Transmit Inquiry
                </button>
              </div>
              
          </form>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
