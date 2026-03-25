import { useState } from 'react';
import { Building2, Save, Globe, MapPin, FileText, Link as LinkIcon } from 'lucide-react';
import { addAdminCompany } from '../api/adminApi';

const AddCompanyForm = ({ onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    logo: '',
    companyName: '',
    companyType: '',
    slug: '',
    industryType: '',
    industrySubType: '',
    companySize: '',
    foundedYear: '',
    careerPageUrl: '',
    website: '',
    tagline: '',
    address: { country: '', state: '', city: '', zip: '', street: '' },
    overview: '',
    socialLinks: { linkedin: '', instagram: '', twitter: '', youtube: '' },
    email: '',
    phone: '' // Optional extra
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (['country', 'state', 'city', 'zip', 'street'].includes(name)) {
      setFormData(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
    } else if (['linkedin', 'instagram', 'twitter', 'youtube'].includes(name)) {
      setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await addAdminCompany({ ...formData, foundedYear: formData.foundedYear ? Number(formData.foundedYear) : undefined });
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add company');
    } finally {
      setLoading(false);
    }
  };

  // Section styling classes
  const inputClass = "w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500 placeholder-slate-500";
  const selectClass = "w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500 appearance-none";
  const labelClass = "block text-xs font-semibold text-[color:var(--admin-text-secondary)] mb-1.5";
  const sectionTitleClass = "flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[color:var(--admin-text-primary)] border-b border-[color:var(--admin-border)] pb-3 mb-5";

  return (
    <div className="w-full flex flex-col bg-[color:var(--admin-bg-main)] border border-[color:var(--admin-border)] rounded-2xl shadow-sm overflow-hidden fade-in duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)]">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Building2 className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[color:var(--admin-text-primary)] leading-tight">Add New Company</h2>
            <p className="text-sm text-[color:var(--admin-text-secondary)] mt-0.5">Fill out the detailed directory profile below.</p>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="px-6 md:px-8 py-8 bg-[color:var(--admin-bg-main)]">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        <form id="add-company-form" onSubmit={handleSubmit} className="space-y-12 max-w-5xl">
          
          {/* =============== BASIC DETAILS =============== */}
          <section>
            <h3 className={sectionTitleClass}><Globe className="w-4 h-4 text-blue-500"/> Basic Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              
              <div className="md:col-span-2 flex items-center gap-4 mb-2">
                <div className="flex-1">
                  <label className={labelClass}>Logo URL (Optional)</label>
                  <input name="logo" value={formData.logo} onChange={handleChange} placeholder="https://example.com/logo.png" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Company Name <span className="text-red-500">*</span></label>
                <input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company Name" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Company Type <span className="text-red-500">*</span></label>
                <select required name="companyType" value={formData.companyType} onChange={handleChange} className={selectClass}>
                  <option value="" disabled>Select Company Type</option>
                  <option value="Privately Held">Privately Held</option>
                  <option value="Public Company">Public Company</option>
                  <option value="Partnership">Partnership</option>
                  <option value="NGO">NGO</option>
                  <option value="Government Agency">Government Agency</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Public View URL (Slug) <span className="text-red-500">*</span></label>
                <div className="flex items-center rounded-xl overflow-hidden border border-[color:var(--admin-border)] bg-[color:var(--admin-bg-card)] focus-within:border-blue-500">
                  <span className="px-4 py-2.5 text-sm text-[color:var(--admin-text-secondary)] bg-[color:var(--admin-bg-nav)] border-r border-[color:var(--admin-border)]">https://uat.cgxp.tech/company/</span>
                  <input required name="slug" value={formData.slug} onChange={handleChange} placeholder="Enter Slug (e.g. unison-pharma)" className="w-full px-4 py-2.5 bg-transparent text-sm text-[color:var(--admin-text-primary)] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Industry <span className="text-red-500">*</span></label>
                <select required name="industryType" value={formData.industryType} onChange={handleChange} className={selectClass}>
                  <option value="" disabled>Select Industry</option>
                  <option value="Drugs">Drugs</option>
                  <option value="Biotech">Biotech</option>
                  <option value="Medical Devices">Medical Devices</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Industry Sub Type</label>
                <input name="industrySubType" value={formData.industrySubType} onChange={handleChange} placeholder="e.g. Manufacturing or R&D" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Company Size</label>
                <select name="companySize" value={formData.companySize} onChange={handleChange} className={selectClass}>
                  <option value="" disabled>Select Company Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Founded Year</label>
                <input type="number" name="foundedYear" value={formData.foundedYear} onChange={handleChange} placeholder="e.g. 1981" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Career Page URL</label>
                <input type="url" name="careerPageUrl" value={formData.careerPageUrl} onChange={handleChange} placeholder="Enter Career Page URL" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Company Website</label>
                <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Enter Company Website URL" className={inputClass} />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Tagline</label>
                <input name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Enter Tagline (e.g. Innovating the Future of Health)" className={inputClass} />
              </div>

            </div>
          </section>

          {/* =============== LOCATION =============== */}
          <section>
            <h3 className={sectionTitleClass}><MapPin className="w-4 h-4 text-emerald-500"/> Location</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              
              <div>
                <label className={labelClass}>Country <span className="text-red-500">*</span></label>
                <input required name="country" value={formData.address.country} onChange={handleChange} placeholder="Enter Country (e.g. IN or USA)" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>State <span className="text-red-500">*</span></label>
                <input required name="state" value={formData.address.state} onChange={handleChange} placeholder="Enter State/Region" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>City <span className="text-red-500">*</span></label>
                <input required name="city" value={formData.address.city} onChange={handleChange} placeholder="Enter City" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Zip code / Pin code <span className="text-red-500">*</span></label>
                <input required name="zip" value={formData.address.zip} onChange={handleChange} placeholder="Enter Zipcode" className={inputClass} />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Street Address</label>
                <textarea name="street" value={formData.address.street} onChange={handleChange} rows={2} placeholder="Enter Full Street Address" className={`${inputClass} resize-none`}></textarea>
              </div>

            </div>
          </section>

          {/* =============== INFORMATION =============== */}
          <section>
            <h3 className={sectionTitleClass}><FileText className="w-4 h-4 text-amber-500"/> Information</h3>
            
            <div>
              <label className={labelClass}>Overview</label>
              <textarea name="overview" value={formData.overview} onChange={handleChange} rows={6} placeholder="Provide a detailed overview about the company..." className={`${inputClass} resize-none`}></textarea>
            </div>
          </section>

          {/* =============== SOCIAL LINKS & CONTACT =============== */}
          <section>
            <h3 className={sectionTitleClass}><LinkIcon className="w-4 h-4 text-indigo-500"/> Social Links & Contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              
              <div>
                <label className={labelClass}>LinkedIn Page</label>
                <input type="url" name="linkedin" value={formData.socialLinks.linkedin} onChange={handleChange} placeholder="https://linkedin.com/company/..." className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Instagram Page (Optional)</label>
                <input type="url" name="instagram" value={formData.socialLinks.instagram} onChange={handleChange} placeholder="https://instagram.com/..." className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Twitter (Optional)</label>
                <input type="url" name="twitter" value={formData.socialLinks.twitter} onChange={handleChange} placeholder="https://twitter.com/..." className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>YouTube (Optional)</label>
                <input type="url" name="youtube" value={formData.socialLinks.youtube} onChange={handleChange} placeholder="https://youtube.com/..." className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Company Mail <span className="text-red-500">*</span></label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. contact@company.com" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Main Phone Number (Optional)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +1 800 555 1234" className={inputClass} />
              </div>

            </div>
          </section>

        </form>
      </div>

      {/* Footer */}
      <div className="px-6 md:px-8 py-6 border-t border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)] flex flex-col sm:flex-row items-center justify-end gap-4">
         <button type="button" onClick={onCancel} className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-[color:var(--admin-text-secondary)] focus:outline-none hover:bg-[color:var(--admin-hover)] hover:text-[color:var(--admin-text-primary)] transition-colors">
          Cancel
        </button>
        <button type="submit" form="add-company-form" disabled={loading} className="flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50">
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="h-4 w-4" />}
          Save Company
        </button>
      </div>

    </div>
  );
};

export default AddCompanyForm;
