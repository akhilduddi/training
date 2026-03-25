import { useState } from 'react';
import { Bookmark, MessageSquare, Bell, Settings, Building2, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('watchlist');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Mini Profile Rail */}
        <aside className="w-full lg:w-[225px] flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
            <div className="h-14 bg-gray-200 border-b border-gray-200"></div>
            <div className="px-4 pb-4 text-center">
              <div className="h-16 w-16 bg-white rounded-full border-2 border-white shadow-sm flex items-center justify-center mx-auto -mt-8 mb-2">
                <div className="h-full w-full bg-gray-100 rounded-full flex items-center justify-center">
                   <span className="font-semibold text-gray-500 text-xl">SJ</span>
                </div>
              </div>
              <h2 className="font-semibold text-gray-900 text-base hover:underline cursor-pointer">Dr. Sarah Jenkins</h2>
              <p className="text-xs text-gray-500 mt-0.5">Clinical Researcher at BioHealth</p>
            </div>
            <div className="border-t border-gray-200 py-3">
               <div className="px-4 py-1 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <span className="text-xs text-gray-500 font-semibold">Profile viewers</span>
                  <span className="text-xs text-primary font-semibold">18</span>
               </div>
               <div className="px-4 py-1 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <span className="text-xs text-gray-500 font-semibold">Post impressions</span>
                  <span className="text-xs text-primary font-semibold">142</span>
               </div>
            </div>
            <div className="border-t border-gray-200 p-4 hover:bg-gray-50 cursor-pointer text-xs font-semibold text-gray-600 flex items-center gap-2">
               <Bookmark className="h-4 w-4 text-gray-500 fill-current" /> My items
            </div>
          </div>
        </aside>

        {/* Main Content Feed Area */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
             {/* Navigation Tabs */}
             <div className="flex border-b border-gray-200">
               <button onClick={() => setActiveTab('watchlist')} className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'watchlist' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Saved Companies</button>
               <button onClick={() => setActiveTab('inquiries')} className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'inquiries' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>My Inquiries</button>
               <button onClick={() => setActiveTab('notifications')} className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'notifications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Notifications</button>
             </div>

             <div className="p-4 min-h-[500px]">
               {activeTab === 'watchlist' && (
                 <div>
                   <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Saved Companies</h2>
                   <div className="divide-y divide-gray-100">
                     {[1, 2].map(item => (
                       <div key={item} className="py-4 flex gap-4">
                         <div className="w-14 h-14 bg-gray-100 border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
                           <Building2 className="h-6 w-6 text-gray-400" />
                         </div>
                         <div className="flex-1">
                           <div className="flex justify-between items-start">
                             <div>
                               <Link to="/companies/pharmatech" className="text-base font-semibold text-gray-900 hover:text-primary hover:underline">PharmaTech Solutions</Link>
                               <p className="text-sm text-gray-600 mt-0.5">Biotech • R&D</p>
                               <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Boston, MA</p>
                             </div>
                             <div className="flex flex-col gap-2">
                               <button className="text-gray-500 hover:text-gray-900 text-sm font-semibold"><Bookmark className="h-5 w-5 fill-current border border-black rounded-sm p-0.5" /></button>
                             </div>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {activeTab === 'inquiries' && (
                 <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Recent Inquiries</h2>
                    <div className="border border-gray-200 rounded p-4 mb-4">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-semibold text-gray-900 text-sm">To: <Link to="/companies" className="text-primary hover:underline">PharmaTech Solutions</Link></h3>
                         <span className="text-xs text-gray-500">Oct 24, 2024</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-3 rounded">"I am interested in learning more about your API manufacturing capabilities in the EU region..."</p>
                      <div className="text-xs font-semibold text-gray-500 flex justify-between items-center">
                         <span>Status: <span className="text-green-600 font-bold">Read</span></span>
                         <button className="text-primary hover:underline">View Conversation</button>
                      </div>
                    </div>
                 </div>
               )}

               {activeTab === 'notifications' && (
                 <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <Bell className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-sm">You have no new notifications.</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Right Rail Modules */}
        <aside className="w-full lg:w-[300px] flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 text-center">
            <h3 className="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-100 pb-2">Upgrade to Premium</h3>
            <p className="text-xs text-gray-600 mb-3">Unlock advanced search filters and direct messaging capabilities.</p>
            <button className="text-sm font-semibold text-[#b28b32] border border-[#b28b32] hover:bg-[#fbf7ee] hover:ring-1 hover:ring-[#b28b32] px-4 py-1.5 rounded-full transition-colors">
              Try Premium for free
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default UserDashboard;
