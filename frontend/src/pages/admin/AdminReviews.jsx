import { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, AlertCircle, Building2, User } from 'lucide-react';
import { getPendingReviews, approveReview } from '../../api/adminApi';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} className={`h-3.5 w-3.5 ${i <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
    ))}
  </div>
);

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPendingReviews();
      setReviews(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleApprove = async (id) => {
    setActionLoading(id + 'approve');
    try {
      await approveReview(id);
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Approval failed.');
    } finally {
      setActionLoading('');
    }
  };

  const handleReject = async (id) => {
    // For now, rejection removes from pending list (same as dismissal)
    setActionLoading(id + 'reject');
    try {
      setReviews(prev => prev.filter(r => r._id !== id));
    } finally {
      setActionLoading('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Review Moderation</h1>
        <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">
          {loading ? '...' : `${reviews.length} review${reviews.length !== 1 ? 's' : ''} awaiting moderation`}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl py-20 flex flex-col items-center gap-3 text-[color:var(--admin-text-secondary)]">
          <CheckCircle className="h-12 w-12 text-emerald-500/40" />
          <p className="font-medium">All reviews are moderated</p>
          <p className="text-sm">No pending reviews at this time.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map(review => (
            <div key={review._id} className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-[color:var(--admin-text-primary)] font-semibold text-sm flex-shrink-0">
                    {(review.userId?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[color:var(--admin-text-primary)] font-semibold text-sm">{review.userId?.name || 'Anonymous'}</p>
                      <span className="text-slate-600">·</span>
                      <p className="text-[color:var(--admin-text-secondary)] text-xs">{review.userId?.email}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-1.5 text-xs text-[color:var(--admin-text-secondary)]">
                    <Building2 className="h-3 w-3" />
                    <span>{review.companyId?.companyName || 'Unknown Company'}</span>
                  </div>
                  <span className="text-xs text-slate-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {review.title && (
                <p className="text-[color:var(--admin-text-primary)] font-semibold text-sm mb-2">"{review.title}"</p>
              )}
              <p className="text-[color:var(--admin-text-secondary)] text-sm leading-relaxed bg-slate-800/50 rounded-lg p-3 mb-4">
                {review.comment || 'No comment provided.'}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(review._id)}
                  disabled={!!actionLoading}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/10 transition-colors disabled:opacity-40"
                >
                  <CheckCircle className="h-3.5 w-3.5" /> Approve
                </button>
                <button
                  onClick={() => handleReject(review._id)}
                  disabled={!!actionLoading}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-40"
                >
                  <XCircle className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
