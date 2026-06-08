import { useState } from 'react';
import { getRecommendation } from '../../api';
import { LightBulbIcon, ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { id: 'Software / App', label: 'Software / App', emoji: '💻', desc: 'Apps, websites, algorithms' },
  { id: 'Mechanical Device', label: 'Mechanical Device', emoji: '⚙️', desc: 'Machines, tools, devices' },
  { id: 'Logo / Brand Name', label: 'Logo / Brand Name', emoji: '™', desc: 'Logos, names, slogans' },
  { id: 'Artwork / Writing', label: 'Artwork / Writing', emoji: '🎨', desc: 'Art, books, illustrations' },
  { id: 'Circuit / Electronics', label: 'Circuit / Electronics', emoji: '⚡', desc: 'PCBs, hardware, circuits' },
  { id: 'Product Design', label: 'Product Design', emoji: '📐', desc: 'Product shape, aesthetics' },
  { id: 'Business Method', label: 'Business Method', emoji: '💼', desc: 'Business processes' },
  { id: 'Music / Media', label: 'Music / Media', emoji: '🎵', desc: 'Music, videos, recordings' },
  { id: 'Other', label: 'Other', emoji: '💡', desc: 'Other innovations' },
];

const iprColors = {
  'Patent': 'bg-amber-900/30 border-amber-600/40 text-amber-300',
  'Copyright': 'bg-blue-900/30 border-blue-600/40 text-blue-300',
  'Trademark': 'bg-purple-900/30 border-purple-600/40 text-purple-300',
  'Industrial Design': 'bg-teal-900/30 border-teal-600/40 text-teal-300',
};

const Recommend = () => {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGet = async () => {
    if (!selected) return toast.error('Please select a project type');
    setLoading(true);
    try {
      const res = await getRecommendation(selected);
      setResult(res.data);
    } catch {
      toast.error('Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
          <LightBulbIcon className="h-9 w-9 text-white" />
        </div>
        <h1 className="page-title">IPR Recommender</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Select your project type and get an instant recommendation on which Intellectual Property Right best protects your work.
        </p>
      </div>

      {/* Category Grid */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Step 1: What type of project do you have?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelected(cat.id); setResult(null); }}
              className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150
                ${selected === cat.id
                  ? 'border-primary-500 bg-primary-500/10 text-white'
                  : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                }`}
            >
              <span className="text-2xl flex-shrink-0">{cat.emoji}</span>
              <div>
                <div className="font-semibold text-sm">{cat.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{cat.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Get Recommendation Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleGet}
          disabled={!selected || loading}
          className="btn-primary px-10 py-3 text-lg flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          <ShieldCheckIcon className="h-5 w-5" />
          {loading ? 'Analyzing...' : 'Get IPR Recommendation'}
          {!loading && <ArrowRightIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="card border border-primary-500/30 animate-slide-up">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheckIcon className="h-6 w-6 text-primary-400" />
            Recommendation for: <span className="text-primary-400">{result.category}</span>
          </h2>

          {/* Primary suggestion */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className={`p-4 rounded-xl border ${iprColors[result.primary] || 'bg-slate-700'}`}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">Primary Protection</p>
              <p className="text-xl font-bold">🎯 {result.primary}</p>
            </div>
            {result.secondary && (
              <div className={`p-4 rounded-xl border ${iprColors[result.secondary] || 'bg-slate-700'}`}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">Additional Protection</p>
                <p className="text-xl font-bold">➕ {result.secondary}</p>
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="p-4 bg-slate-700/30 rounded-xl mb-6">
            <p className="text-slate-300 leading-relaxed text-sm">{result.explanation}</p>
          </div>

          {/* Next steps */}
          <div className="border-t border-slate-700 pt-5">
            <p className="text-sm font-semibold text-slate-300 mb-3">📋 Suggested Next Steps:</p>
            <ol className="space-y-2 text-sm text-slate-400 list-decimal list-inside">
              <li>Read our guide on <strong className="text-slate-300">{result.primary}</strong> in the Learning Hub</li>
              <li>Submit your project to track it with this recommendation</li>
              <li>Take the related quiz to test your understanding</li>
              <li>Consult an IP attorney for formal filing</li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/learn" className="btn-primary text-sm flex items-center gap-2">
              <ArrowRightIcon className="h-4 w-4" />
              Go to Learning Hub
            </Link>
            <Link to="/projects/new" className="btn-secondary text-sm">
              Submit This Project
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommend;
