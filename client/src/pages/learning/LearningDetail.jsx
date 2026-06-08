import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLearningById, markContentComplete } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  LightBulbIcon,
  BookmarkIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon as CheckBadgeSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const categoryColors = {
  patent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  copyright: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  trademark: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  'industrial-design': 'text-teal-400 border-teal-500/30 bg-teal-500/10',
};

const LearningDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    getLearningById(id)
      .then((res) => setContent(res.data))
      .catch(() => toast.error('Failed to load content'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleComplete = async () => {
    setCompleting(true);
    try {
      await markContentComplete(id);
      setContent((prev) => ({ ...prev, completed: true }));
      toast.success('Marked as completed! 🎉');
    } catch {
      toast.error('Failed to mark complete');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  if (!content) return <div className="text-center py-20 text-slate-400">Content not found.</div>;

  const colorClass = categoryColors[content.category] || 'text-slate-400';
  const paragraphs = content.content.split('\n\n');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Learning Hub
      </button>

      {/* Header Card */}
      <div className={`card border ${colorClass} mb-8`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${colorClass}`}>
              {content.category.replace('-', ' ').toUpperCase()}
            </span>
            <h1 className="text-3xl font-bold text-white mb-2">{content.title}</h1>
          </div>
          {content.completed && (
            <CheckBadgeSolid className="h-10 w-10 text-teal-400 flex-shrink-0" />
          )}
        </div>

        {!content.completed && (
          <button
            onClick={handleComplete}
            disabled={completing}
            className="btn-primary flex items-center gap-2 mt-4"
          >
            <CheckCircleIcon className="h-5 w-5" />
            {completing ? 'Saving...' : 'Mark as Completed'}
          </button>
        )}
        {content.completed && (
          <div className="flex items-center gap-2 text-teal-400 text-sm font-medium mt-4">
            <CheckCircleIcon className="h-5 w-5" />
            You've completed this lesson
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="section-title flex items-center gap-2">
              <BookmarkIcon className="h-5 w-5 text-primary-400" />
              Overview
            </h2>
            <div className="prose prose-invert max-w-none">
              {paragraphs.map((para, idx) => {
                // Handle bold text
                const formatted = para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
                return (
                  <p
                    key={idx}
                    className="text-slate-300 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: formatted }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Key Points */}
          {content.keyPoints?.length > 0 && (
            <div className="card">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-teal-400" />
                Key Points
              </h3>
              <ul className="space-y-3">
                {content.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Examples */}
          {content.examples?.length > 0 && (
            <div className="card">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <LightBulbIcon className="h-5 w-5 text-amber-400" />
                Real-World Examples
              </h3>
              <ul className="space-y-3">
                {content.examples.map((example, idx) => (
                  <li key={idx} className="text-sm text-slate-300 flex items-start gap-2 pl-3 border-l-2 border-amber-500/30">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <Link to="/learn" className="btn-outline w-full text-center block">
            ← All Topics
          </Link>
          <Link to="/quiz" className="btn-primary w-full text-center block">
            Test Your Knowledge →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearningDetail;
