import { useState } from 'react';
import { Briefcase, BarChart2, ShieldCheck, Mail, Users, Box, Eye, MousePointerClick, TrendingUp, Settings } from 'lucide-react';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Analytics', icon: BarChart2 },
    { id: 'profile', label: 'Page Info', icon: ShieldCheck },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Super Admin / Edit Mode Banner */}
      <div className="bg-[#057642] rounded-md px-6 py-4 mb-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-base font-semibold">Super admin view</h2>
          <p className="text-sm opacity-90">Previewing as PharmaTech Solutions. Your page completeness is 75%.</p>
        </div>
        <button className="bg-white text-[#057642] hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border border-transparent whitespace-nowrap">
          Complete page
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full lg:w-[225px] flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 sticky top-[72px]">
            <div className="p-4 border-b border-gray-200">
               <h3 className="text-sm font-semibold text-gray-900">Manage page</h3>
            </div>
            <nav className="flex flex-col">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === item.id ? 'bg-gray-100 text-gray-900 border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
                  >
                    <Icon className="h-5 w-5 text-gray-500" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
            <div className="p-4 border-t border-gray-200 text-center">
              <button className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 w-full">
                <Settings className="h-4 w-4" /> Settings
              </button>
            </div>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div className="flex-1 max-w-4xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6 min-h-[600px]">
            
            {activeTab === 'overview' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700 bg-white">
                     <option>Past 30 days</option>
                     <option>Past 90 days</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  
                  <div className="border border-gray-200 rounded p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                       <h3 className="text-sm text-gray-600 font-semibold mb-2">Unique visitors</h3>
                       <Eye className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-end gap-2">
                       <p className="text-2xl font-light text-gray-900">4,208</p>
                       <span className="text-xs font-semibold text-green-600 flex items-center mb-1"><TrendingUp className="h-3 w-3 mr-0.5" /> 12%</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                       <h3 className="text-sm text-gray-600 font-semibold mb-2">Inquiries</h3>
                       <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-end gap-2">
                       <p className="text-2xl font-light text-gray-900">34</p>
                       <span className="text-xs font-semibold text-green-600 flex items-center mb-1"><TrendingUp className="h-3 w-3 mr-0.5" /> 5%</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                       <h3 className="text-sm text-gray-600 font-semibold mb-2">Button clicks</h3>
                       <MousePointerClick className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-end gap-2">
                       <p className="text-2xl font-light text-gray-900">512</p>
                       <span className="text-xs font-semibold text-gray-500 flex items-center mb-1">- 2%</span>
                    </div>
                  </div>
                  
                </div>

                {/* Data Table */}
                <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
                <div className="border border-gray-200 rounded overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[1, 2, 3].map((item) => (
                        <tr key={item} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 24, 2024</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Dr. Sarah Jenkins</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">I am interested in learning m...</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-primary hover:underline">Reply</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab !== 'overview' && (
              <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                <Settings className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-sm font-semibold text-gray-900 mb-1">Module under construction</p>
                <p className="text-xs text-gray-500">This management area will be available shortly.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyDashboard;
