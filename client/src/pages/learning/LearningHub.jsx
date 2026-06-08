import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLearningContent } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { CheckCircleIcon, ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const CATEGORIES = [
  { id: 'all', label: 'All Topics' },
  { id: 'patent', label: 'Patents' },
  { id: 'copyright', label: 'Copyrights' },
  { id: 'trademark', label: 'Trademarks' },
  { id: 'industrial-design', label: 'Industrial Designs' },
];

const categoryColors = {
  patent: 'badge-patent',
  copyright: 'badge-copyright',
  trademark: 'badge-trademark',
  'industrial-design': 'badge-industrial-design',
};

const categoryGradients = {
  patent: 'from-amber-500 to-orange-600',
  copyright: 'from-blue-500 to-indigo-600',
  trademark: 'from-purple-500 to-pink-600',
  'industrial-design': 'from-teal-500 to-cyan-600',
};

const LearningHub = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await getLearningContent();
        setContent(res.data);
      } catch {
        // handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const filtered = activeCategory === 'all' ? content : content.filter((c) => c.category === activeCategory);
  const completedCount = content.filter((c) => c.completed).length;

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">Learning Hub</h1>
          <p className="page-subtitle">Master Intellectual Property Rights with structured guides</p>
        </div>
        {content.length > 0 && (
          <div className="card !py-3 !px-5 flex items-center gap-3 min-w-fit">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{completedCount}/{content.length}</div>
              <div className="text-xs text-slate-400">Completed</div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-700 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-12 h-12 -rotate-90">
                <circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="4"
                  strokeDasharray={`${(completedCount / content.length) * 125} 125`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs font-bold text-primary-400">
                {content.length > 0 ? Math.round((completedCount / content.length) * 100) : 0}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
              ${activeCategory === cat.id
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpenIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No content in this category yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <Link key={item._id} to={`/learn/${item._id}`} className="card-hover group relative">
              {item.completed && (
                <div className="absolute top-4 right-4">
                  <CheckCircleIcon className="h-5 w-5 text-teal-400" />
                </div>
              )}
              {/* Category accent bar */}
              <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${categoryGradients[item.category]} mb-4`} />

              <div className="flex items-center gap-2 mb-3">
                <span className={categoryColors[item.category]}>
                  {item.category.replace('-', ' ')}
                </span>
                {item.completed && (
                  <span className="badge bg-teal-900/50 text-teal-300 border border-teal-700/50">✓ Done</span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                {item.content.substring(0, 120)}...
              </p>

              {item.keyPoints?.length > 0 && (
                <p className="text-slate-500 text-xs">{item.keyPoints.length} key points</p>
              )}

              <div className="flex items-center gap-1 text-primary-400 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                Read More <ArrowRightIcon className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningHub;
