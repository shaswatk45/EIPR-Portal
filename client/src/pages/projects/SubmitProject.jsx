import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { submitProject, getRecommendation } from '../../api';
import { ArrowLeftIcon, LightBulbIcon, FolderPlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Software / App',
  'Mechanical Device',
  'Logo / Brand Name',
  'Artwork / Writing',
  'Circuit / Electronics',
  'Product Design',
  'Business Method',
  'Music / Media',
  'Other',
];

const SubmitProject = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingRec, setLoadingRec] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'category') setRecommendation(null);
  };

  const fetchRecommendation = async () => {
    if (!form.category) return;
    setLoadingRec(true);
    try {
      const res = await getRecommendation(form.category);
      setRecommendation(res.data);
    } catch {
      toast.error('Could not fetch recommendation');
    } finally {
      setLoadingRec(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category) {
      return toast.error('Please fill in all fields');
    }
    setLoading(true);
    try {
      await submitProject({
        ...form,
        iprSuggestion: recommendation
          ? `${recommendation.primary}${recommendation.secondary ? ' + ' + recommendation.secondary : ''}`
          : ''
      });
      toast.success('Project submitted successfully!');
      navigate('/projects');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-slide-up">
      <Link to="/projects" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm group">
        <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to My Projects
      </Link>

      <div className="mb-8">
        <h1 className="page-title flex items-center gap-3">
          <FolderPlusIcon className="h-8 w-8 text-primary-400" />
          Submit a Project
        </h1>
        <p className="page-subtitle">Submit your project and get instant IPR recommendations</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="label">Project Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Smart Irrigation System"
              value={form.title}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label htmlFor="category" className="label">Project Category *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select a category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {form.category && (
            <div className="flex justify-end -mt-2">
              <button
                type="button"
                onClick={fetchRecommendation}
                disabled={loadingRec}
                className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors"
              >
                <LightBulbIcon className="h-4 w-4" />
                {loadingRec ? 'Getting suggestion...' : 'Get IPR suggestion for this category'}
              </button>
            </div>
          )}

          {/* Recommendation Preview */}
          {recommendation && (
            <div className="p-4 bg-primary-500/5 border border-primary-500/20 rounded-xl animate-slide-up">
              <h4 className="text-sm font-semibold text-primary-400 mb-2 flex items-center gap-2">
                <LightBulbIcon className="h-4 w-4" />
                IPR Recommendation
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge bg-teal-900/50 text-teal-300 border border-teal-700/50 text-sm px-3 py-1">
                  🎯 {recommendation.primary}
                </span>
                {recommendation.secondary && (
                  <span className="badge bg-blue-900/50 text-blue-300 border border-blue-700/50 text-sm px-3 py-1">
                    + {recommendation.secondary}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{recommendation.explanation}</p>
            </div>
          )}

          <div>
            <label htmlFor="description" className="label">Project Description *</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Describe your project: what it does, how it works, what problem it solves..."
              value={form.description}
              onChange={handleChange}
              required
              className="input resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">{form.description.length}/1000 characters</p>
          </div>

          <div className="flex gap-3 pt-2">
            <Link to="/projects" className="btn-secondary flex-1 text-center">Cancel</Link>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProject;
