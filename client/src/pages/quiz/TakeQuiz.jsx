import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getQuizById, submitQuizAttempt } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    getQuizById(id)
      .then((res) => {
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(-1));
      })
      .catch(() => toast.error('Failed to load quiz'))
      .finally(() => setLoading(false));
  }, [id]);

  const selectAnswer = (idx) => {
    const updated = [...answers];
    updated[current] = idx;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(-1)) {
      return toast.error('Please answer all questions before submitting');
    }
    setSubmitting(true);
    try {
      const res = await submitQuizAttempt(id, answers);
      setResult(res.data);
      setShowResult(true);
    } catch {
      toast.error('Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  if (!quiz) return <div className="text-center py-20 text-slate-400">Quiz not found.</div>;

  const q = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;

  // Results screen
  if (showResult && result) {
    const passed = result.percentage >= 60;
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-slide-up">
        {/* Score Card */}
        <div className={`card text-center mb-8 border ${passed ? 'border-teal-500/30' : 'border-amber-500/30'}`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-teal-500/10' : 'bg-amber-500/10'}`}>
            <TrophyIcon className={`h-10 w-10 ${passed ? 'text-teal-400' : 'text-amber-400'}`} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{passed ? '🎉 Well Done!' : 'Keep Practicing!'}</h2>
          <div className="text-6xl font-extrabold text-gradient my-4">{result.percentage}%</div>
          <p className="text-slate-400 text-lg">
            {result.score} out of {result.totalQuestions} correct
          </p>
          <div className="progress-bar max-w-xs mx-auto mt-4">
            <div className="progress-fill" style={{ width: `${result.percentage}%` }} />
          </div>
        </div>

        {/* Question Review */}
        <h3 className="section-title mb-4">Question Review</h3>
        <div className="space-y-4 mb-8">
          {result.questions.map((q, idx) => (
            <div key={idx} className={`card border ${q.isCorrect ? 'border-teal-500/30' : 'border-red-500/30'}`}>
              <div className="flex items-start gap-3 mb-3">
                {q.isCorrect
                  ? <CheckCircleIcon className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  : <XCircleIcon className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                }
                <p className="font-medium text-white text-sm">{q.questionText}</p>
              </div>

              <div className="grid grid-cols-1 gap-1.5 ml-8">
                {q.options.map((opt, oi) => (
                  <div
                    key={oi}
                    className={`px-3 py-1.5 rounded text-xs ${
                      oi === q.correctAnswer
                        ? 'bg-teal-900/30 text-teal-300 border border-teal-600/40'
                        : oi === q.selectedAnswer && !q.isCorrect
                        ? 'bg-red-900/30 text-red-300 border border-red-600/40'
                        : 'text-slate-500'
                    }`}
                  >
                    {oi === q.correctAnswer && '✓ '}
                    {oi === q.selectedAnswer && !q.isCorrect && '✗ '}
                    {opt}
                  </div>
                ))}
              </div>

              {q.explanation && (
                <p className="text-slate-400 text-xs mt-3 ml-8 pl-3 border-l-2 border-primary-500/40 italic">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link to="/quiz" className="btn-secondary flex-1 text-center">← All Quizzes</Link>
          <button onClick={() => { setShowResult(false); setCurrent(0); setAnswers(new Array(quiz.questions.length).fill(-1)); }} className="btn-primary flex-1">
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz Taking screen
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate('/quiz')} className="text-slate-400 hover:text-white text-sm flex items-center gap-1">
            <ArrowLeftIcon className="h-4 w-4" /> Back
          </button>
          <span className="text-slate-400 text-sm">{current + 1} / {quiz.questions.length}</span>
        </div>
        <h1 className="text-xl font-bold text-white mb-3">{quiz.title}</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="card mb-5">
        <p className="text-lg font-semibold text-white mb-6 leading-relaxed">
          <span className="text-primary-400 font-bold">Q{current + 1}. </span>
          {q.questionText}
        </p>

        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => selectAnswer(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 text-sm font-medium
                ${answers[current] === idx
                  ? 'border-primary-500 bg-primary-500/10 text-white'
                  : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-700/50'
                }`}
            >
              <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-xs mr-3 flex-shrink-0
                ${answers[current] === idx ? 'bg-primary-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="btn-secondary flex-1 flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Previous
        </button>

        {current < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrent(current + 1)}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            Next <ArrowRightIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || answers.includes(-1)}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
            <CheckCircleIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Answer tracker */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {quiz.questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
              idx === current
                ? 'bg-primary-600 text-white scale-110'
                : answers[idx] !== -1
                ? 'bg-teal-600 text-white'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TakeQuiz;
