import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes, getMyAttempts } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  ClipboardDocumentListIcon,
  TrophyIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const categoryColors = {
  patent: 'badge-patent',
  copyright: 'badge-copyright',
  trademark: 'badge-trademark',
  'industrial-design': 'badge-industrial-design',
  general: 'badge-general',
};

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getQuizzes(), getMyAttempts()])
      .then(([qRes, aRes]) => {
        setQuizzes(qRes.data);
        setAttempts(aRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Get best score for each quiz
  const getBestScore = (quizId) => {
    const quizAttempts = attempts.filter((a) => a.quizId?._id === quizId || a.quizId === quizId);
    if (!quizAttempts.length) return null;
    const best = quizAttempts.reduce((max, a) => (a.score > max.score ? a : max));
    return Math.round((best.score / best.totalQuestions) * 100);
  };

  const getAttemptCount = (quizId) =>
    attempts.filter((a) => a.quizId?._id === quizId || a.quizId === quizId).length;

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Quizzes</h1>
          <p className="page-subtitle">Test your IPR knowledge and track your progress</p>
        </div>
        <Link to="/quiz/results" className="btn-secondary flex items-center gap-2 text-sm">
          <TrophyIcon className="h-4 w-4" />
          My Results
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <ClipboardDocumentListIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No quizzes available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {quizzes.map((quiz) => {
            const bestScore = getBestScore(quiz._id);
            const attemptCount = getAttemptCount(quiz._id);

            return (
              <div key={quiz._id} className="card-hover group">
                <div className="flex items-start justify-between mb-3">
                  <span className={categoryColors[quiz.category] || 'badge-general'}>
                    {quiz.category.replace('-', ' ')}
                  </span>
                  {bestScore !== null && (
                    <div className={`flex items-center gap-1 text-sm font-bold ${bestScore >= 70 ? 'text-teal-400' : 'text-amber-400'}`}>
                      <TrophyIcon className="h-4 w-4" />
                      {bestScore}%
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                  {quiz.title}
                </h3>

                {quiz.description && (
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{quiz.description}</p>
                )}

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-5">
                  <span className="flex items-center gap-1">
                    <ClipboardDocumentListIcon className="h-4 w-4" />
                    {/* We don't have question count from listing, show attempts */}
                  </span>
                  {attemptCount > 0 && (
                    <span className="flex items-center gap-1">
                      <CheckCircleIcon className="h-4 w-4 text-teal-400" />
                      {attemptCount} attempt{attemptCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {/* Score bar if attempted */}
                {bestScore !== null && (
                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Best Score</span>
                      <span>{bestScore}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${bestScore}%` }}
                      />
                    </div>
                  </div>
                )}

                <Link
                  to={`/quiz/${quiz._id}`}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {attemptCount > 0 ? 'Retake Quiz' : 'Start Quiz'}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizList;
