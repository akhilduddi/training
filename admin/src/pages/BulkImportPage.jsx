import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ChevronLeft, AlertCircle, CheckCircle, FileSpreadsheet } from 'lucide-react';
import { bulkImportAdminCompanies } from '../api/adminApi';

const BulkImportPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [importReport, setImportReport] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const report = await bulkImportAdminCompanies(formData);
      setImportReport(report);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to bulk import companies');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/companies')}
          className="p-2 rounded-xl text-[color:var(--admin-text-secondary)] hover:bg-[color:var(--admin-hover)] hover:text-[color:var(--admin-text-primary)] transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Bulk CSV Import</h1>
          <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">Upload an Excel (.CSV) dataset containing thousands of companies at once.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Upload Container */}
        <div className="xl:col-span-1 bg-[color:var(--admin-bg-main)] border border-[color:var(--admin-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)]">
            <h2 className="text-lg font-bold text-[color:var(--admin-text-primary)] flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-500" /> Upload CSV Data
            </h2>
          </div>
          
          <div className="p-6 flex-1 flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex flex-col items-center justify-center border-4 border-blue-500/20 shadow-xl shadow-blue-500/10">
              {isUploading ? (
                 <div className="w-8 h-8 border-4 border-blue-500 border-t-white rounded-full animate-spin" />
              ) : (
                 <Upload className="w-8 h-8 text-blue-500" />
              )}
            </div>

            <div className="text-center space-y-1">
              <p className="text-[color:var(--admin-text-primary)] font-bold text-lg">Upload Dataset</p>
              <p className="text-[color:var(--admin-text-secondary)] text-sm max-w-[200px] mx-auto">Supports up to 50,000 rows. Duplicates will be intelligently skipped.</p>
            </div>

            {error && (
              <div className="w-full p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-medium flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div className="w-full pt-4">
              <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button 
                onClick={() => fileInputRef.current?.click()} 
                disabled={isUploading || !!importReport}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {isUploading ? 'Processing File...' : 'Select CSV File'}
              </button>
            </div>
          </div>
        </div>

        {/* Requirements Documentation */}
        <div className="xl:col-span-2 bg-[color:var(--admin-bg-main)] border border-[color:var(--admin-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)]">
            <h2 className="text-lg font-bold text-[color:var(--admin-text-primary)]">CSV Column Requirements</h2>
            <p className="text-xs text-[color:var(--admin-text-secondary)] mt-1">Ensure your headers exactly match these definitions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[color:var(--admin-bg-card)]">
                <tr>
                  <th className="px-6 py-3 border-b border-[color:var(--admin-border)] text-left text-xs font-semibold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Header Name</th>
                  <th className="px-6 py-3 border-b border-[color:var(--admin-border)] text-left text-xs font-semibold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 border-b border-[color:var(--admin-border)] text-left text-xs font-semibold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--admin-border)] bg-[color:var(--admin-bg-main)]">
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">companyName</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Name of the company. Determines uniqueness.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">companyType</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">e.g. Privately Held, Public Company, NGO.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">slug</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Public URL map. Auto-generated if not supplied. Must be unique.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">industryType</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">e.g. Drugs, Biotech, Medical Devices.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">country</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Headquarters country string (e.g. USA, IN).</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">state</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">State or Region mapping to geography tree.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">city</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">City of physical headquarters.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">zip</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Postal Zip Code or Pin code.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">email</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Primary company contact email identifier.</td></tr>
                
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">logo</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">A direct http URL for logo assets.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">industrySubType</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Secondary nested generic classification layer.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">companySize</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">e.g. 51-200. Used for scale metrics.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">foundedYear</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">e.g. 1981. Must be numeric integer.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">careerPageUrl</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Valid url mapping to Jobs / Careers entity.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">website</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Primary frontend domain address URL string.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">tagline</td><td className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-wider">Required</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Short catchphrase underneath the company banner text.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">street</td><td className="px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Optional</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Detailed door-level physical headquarters layout map.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">overview</td><td className="px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Optional</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Large narrative description block containing paragraphs of text.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">linkedin</td><td className="px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Optional</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">URL to respective network. Same applies for `instagram`, `twitter`, `youtube`.</td></tr>
                <tr className="hover:bg-[color:var(--admin-hover)]/20"><td className="px-6 py-3 font-mono text-[color:var(--admin-text-primary)]">phone</td><td className="px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Optional</td><td className="px-6 py-3 text-[color:var(--admin-text-secondary)]">Voice endpoint connectivity contact number (e.g. +1 123 456).</td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Bulk Import Report Modal */}
      {importReport && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-[color:var(--admin-bg-main)] border border-[color:var(--admin-border)] rounded-2xl shadow-2xl flex flex-col max-h-[80vh] fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)]">
              <h2 className="text-lg font-bold text-[color:var(--admin-text-primary)] flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Upload Complete!
              </h2>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-500/10 border border-slate-500/20 rounded-xl text-center">
                  <p className="text-xs text-[color:var(--admin-text-secondary)] font-semibold uppercase tracking-wider">Total Rows</p>
                  <p className="text-3xl font-black text-[color:var(--admin-text-primary)] mt-1">{importReport.totalProcessed}</p>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                  <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Inserted</p>
                  <p className="text-3xl font-black text-emerald-400 mt-1">{importReport.insertedCount}</p>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                  <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Skipped</p>
                  <p className="text-3xl font-black text-amber-400 mt-1">{importReport.skippedCount}</p>
                </div>
              </div>

              {importReport.skippedCount > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-[color:var(--admin-text-primary)] border-b border-[color:var(--admin-border)] pb-2 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Skipped Companies (Duplicates)
                  </h3>
                  <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl max-h-48 overflow-y-auto p-1 divide-y divide-[color:var(--admin-border)]">
                    {importReport.skippedCompanies.map((name, i) => (
                      <div key={i} className="px-4 py-2 text-sm font-medium text-[color:var(--admin-text-secondary)]">{name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-5 border-t border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)] flex justify-end gap-3">
              <button onClick={() => { setImportReport(null); navigate('/companies'); }} className="px-6 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] hover:bg-[color:var(--admin-hover)] hover:text-white text-[color:var(--admin-text-primary)] text-sm font-bold rounded-xl transition-colors">
                Back to Registry
              </button>
              <button onClick={() => setImportReport(null)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 rounded-xl transition-colors">
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BulkImportPage;
