import { useNavigate } from 'react-router-dom';
import AddCompanyForm from '../components/AddCompanyForm';
import { ChevronLeft } from 'lucide-react';

const AddCompanyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/companies')}
          className="p-2 rounded-xl text-[color:var(--admin-text-secondary)] hover:bg-[color:var(--admin-hover)] hover:text-white transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Add Company Registry</h1>
          <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">Provide full entity details below.</p>
        </div>
      </div>

      <AddCompanyForm 
        onCancel={() => navigate('/companies')}
        onSuccess={() => navigate('/companies')}
      />
    </div>
  );
};

export default AddCompanyPage;
