import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  PlusIcon, PencilIcon, TrashIcon, XMarkIcon, CheckIcon, MinusIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CATEGORIES = ['patent', 'copyright', 'trademark', 'industrial-design', 'general'];

const EMPTY_QUESTION = {
  questionText: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  explanation: ''
};

const AdminNav = () => (
  <div className="flex gap-2 mb-6 flex-wrap">
    {[
      { to: '/admin/content', label: 'Content' },
      { to: '/admin/quizzes', label: 'Quizzes' },
      { to: '/admin/users', label: 'Users' },
    ].map((item) => (
      <Link key={item.to} to={item.to} className="btn-secondary text-sm">{item.label}</Link>
    ))}
  </div>
);

const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'general', description: '', questions: [{ ...EMPTY_QUESTION }] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getQuizzes()
      .then((res) => setQuizzes(res.data))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', category: 'general', description: '', questions: [{ ...EMPTY_QUESTION, options: ['', '', '', ''] }] });
    setShowModal(true);
  };

  const openEdit = (quiz) => {
    setEditing(quiz._id);
    setForm({
      title: quiz.title,
      category: quiz.category,
      description: quiz.description || '',
      questions: quiz.questions || [{ ...EMPTY_QUESTION, options: ['', '', '', ''] }]
    });
    setShowModal(true);
  };

  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...EMPTY_QUESTION, options: ['', '', '', ''] }]
    }));
  };

  const removeQuestion = (idx) => {
    if (form.questions.length === 1) return toast.error('At least one question required');
    setForm((prev) => ({ ...prev, questions: prev.questions.filter((_, i) => i !== idx) }));
  };

  const updateQuestion = (idx, field, value) => {
    const qs = [...form.questions];
    qs[idx] = { ...qs[idx], [field]: value };
    setForm((prev) => ({ ...prev, questions: qs }));
  };

  const updateOption = (qIdx, oIdx, value) => {
    const qs = [...form.questions];
    const opts = [...qs[qIdx].options];
    opts[oIdx] = value;
    qs[qIdx] = { ...qs[qIdx], options: opts };
    setForm((prev) => ({ ...prev, questions: qs }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const res = await updateQuiz(editing, form);
        setQuizzes((prev) => prev.map((q) => (q._id === editing ? res.data : q)));
        toast.success('Quiz updated');
      } else {
        const res = await createQuiz(form);
        setQuizzes((prev) => [...prev, res.data]);
        toast.success('Quiz created');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this quiz?')) return;
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q._id !== id));
      toast.success('Quiz deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <AdminNav />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Manage Quizzes</h1>
          <p className="page-subtitle">{quizzes.length} quizzes</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <PlusIcon className="h-4 w-4" /> New Quiz
        </button>
      </div>

      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="card flex items-center gap-4">
            <span className={`badge ${quiz.category === 'patent' ? 'badge-patent' : quiz.category === 'copyright' ? 'badge-copyright' : quiz.category === 'trademark' ? 'badge-trademark' : quiz.category === 'industrial-design' ? 'badge-industrial-design' : 'badge-general'} flex-shrink-0`}>
              {quiz.category}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{quiz.title}</p>
              {quiz.description && <p className="text-slate-400 text-xs truncate">{quiz.description}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(quiz)} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <PencilIcon className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(quiz._id)} className="p-2 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)} />
          <div className="relative bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
              <h2 className="text-xl font-bold text-white">{editing ? 'Edit Quiz' : 'New Quiz'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Quiz meta */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Quiz Title</label>
                  <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Quiz title" />
                </div>
                <div>
                  <label className="label">Category</label>
                  <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Description (optional)</label>
                <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief quiz description" />
              </div>

              {/* Questions */}
              <div className="border-t border-slate-700 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">Questions ({form.questions.length})</h3>
                  <button type="button" onClick={addQuestion} className="btn-outline text-sm py-1.5 flex items-center gap-1">
                    <PlusIcon className="h-4 w-4" /> Add Question
                  </button>
                </div>

                <div className="space-y-6">
                  {form.questions.map((q, qIdx) => (
                    <div key={qIdx} className="bg-slate-700/30 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-primary-400">Question {qIdx + 1}</span>
                        <button type="button" onClick={() => removeQuestion(qIdx)} className="p-1 rounded hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors">
                          <MinusIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <input
                        className="input mb-3"
                        value={q.questionText}
                        onChange={(e) => updateQuestion(qIdx, 'questionText', e.target.value)}
                        placeholder="Question text"
                        required
                      />

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="relative">
                            <input
                              className={`input pr-8 text-sm ${q.correctAnswer === oIdx ? 'border-teal-500' : ''}`}
                              value={opt}
                              onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                              placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => updateQuestion(qIdx, 'correctAnswer', oIdx)}
                              className={`absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${q.correctAnswer === oIdx ? 'bg-teal-600 border-teal-500' : 'border-slate-600 hover:border-teal-500'}`}
                              title="Set as correct answer"
                            >
                              {q.correctAnswer === oIdx && <CheckIcon className="h-3 w-3 text-white" />}
                            </button>
                          </div>
                        ))}
                      </div>

                      <input
                        className="input text-sm"
                        value={q.explanation}
                        onChange={(e) => updateQuestion(qIdx, 'explanation', e.target.value)}
                        placeholder="Explanation (shown after answering)"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <CheckIcon className="h-4 w-4" />
                  {saving ? 'Saving...' : editing ? 'Update Quiz' : 'Create Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuizzes;
