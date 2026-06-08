import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyAttempts } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { TrophyIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const QuizResults = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyAttempts()
      .then((res) => setAttempts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) / attempts.length)
    : 0;

  const passed = attempts.filter((a) => (a.score / a.totalQuestions) * 100 >= 60).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">My Quiz Results</h1>
          <p className="page-subtitle">Review your past quiz performance</p>
        </div>
        <Link to="/quiz" className="btn-secondary text-sm">Take a Quiz</Link>
      </div>

      {/* Stats */}
      {attempts.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Attempts', value: attempts.length, icon: ClockIcon, color: 'text-blue-400' },
            { label: 'Average Score', value: `${avgScore}%`, icon: TrophyIcon, color: 'text-amber-400' },
            { label: 'Quizzes Passed', value: `${passed}/${attempts.length}`, icon: TrophyIcon, color: 'text-teal-400' },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className={`w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {attempts.length === 0 ? (
        <div className="text-center py-16">
          <TrophyIcon className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No attempts yet</h3>
          <p className="text-slate-400 mb-6">Take your first quiz to see your results here.</p>
          <Link to="/quiz" className="btn-primary">Browse Quizzes</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => {
            const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
            const passed = pct >= 60;
            return (
              <div key={attempt._id} className="card flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${passed ? 'bg-teal-900/30 text-teal-400' : 'bg-red-900/30 text-red-400'}`}>
                  {pct}%
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">
                    {attempt.quizTitle || attempt.quizId?.title || 'Quiz'}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {attempt.score}/{attempt.totalQuestions} correct · {new Date(attempt.attemptedAt).toLocaleDateString()}
                  </p>
                  <div className="progress-bar mt-2 max-w-xs">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className={`badge flex-shrink-0 ${passed ? 'bg-teal-900/50 text-teal-300 border border-teal-700/50' : 'bg-red-900/50 text-red-300 border border-red-700/50'}`}>
                  {passed ? 'Passed' : 'Try Again'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizResults;
