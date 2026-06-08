import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getLearningContent, createContent, updateContent, deleteContent
} from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CATEGORIES = ['patent', 'copyright', 'trademark', 'industrial-design'];

const EMPTY_FORM = {
  title: '',
  category: 'patent',
  content: '',
  examples: '',
  keyPoints: '',
  order: 0
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

const AdminContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getLearningContent()
      .then((res) => setContent(res.data))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setForm({
      title: item.title,
      category: item.category,
      content: item.content,
      examples: (item.examples || []).join('\n'),
      keyPoints: (item.keyPoints || []).join('\n'),
      order: item.order || 0
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      examples: form.examples.split('\n').filter(Boolean),
      keyPoints: form.keyPoints.split('\n').filter(Boolean),
    };
    try {
      if (editing) {
        const res = await updateContent(editing, payload);
        setContent((prev) => prev.map((c) => (c._id === editing ? { ...res.data, completed: c.completed } : c)));
        toast.success('Content updated');
      } else {
        const res = await createContent(payload);
        setContent((prev) => [...prev, res.data]);
        toast.success('Content created');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this content?')) return;
    try {
      await deleteContent(id);
      setContent((prev) => prev.filter((c) => c._id !== id));
      toast.success('Content deleted');
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
          <h1 className="page-title">Manage Learning Content</h1>
          <p className="page-subtitle">{content.length} articles</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <PlusIcon className="h-4 w-4" /> New Article
        </button>
      </div>

      <div className="space-y-3">
        {content.map((item) => (
          <div key={item._id} className="card flex items-center gap-4">
            <span className={`badge ${item.category === 'patent' ? 'badge-patent' : item.category === 'copyright' ? 'badge-copyright' : item.category === 'trademark' ? 'badge-trademark' : 'badge-industrial-design'} flex-shrink-0`}>
              {item.category}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{item.title}</p>
              <p className="text-slate-400 text-xs">{item.content.substring(0, 80)}...</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <PencilIcon className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors">
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
          <div className="relative bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
              <h2 className="text-xl font-bold text-white">{editing ? 'Edit Article' : 'New Article'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="label">Title</label>
                <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Article title" />
              </div>
              <div>
                <label className="label">Category</label>
                <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Content</label>
                <textarea className="input resize-none" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required placeholder="Main content (use **bold** for emphasis, blank lines for paragraphs)" />
              </div>
              <div>
                <label className="label">Key Points (one per line)</label>
                <textarea className="input resize-none" rows={4} value={form.keyPoints} onChange={(e) => setForm({ ...form, keyPoints: e.target.value })} placeholder="Enter each key point on a new line" />
              </div>
              <div>
                <label className="label">Examples (one per line)</label>
                <textarea className="input resize-none" rows={4} value={form.examples} onChange={(e) => setForm({ ...form, examples: e.target.value })} placeholder="Enter each example on a new line" />
              </div>
              <div>
                <label className="label">Order (for sorting)</label>
                <input type="number" className="input" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <CheckIcon className="h-4 w-4" />
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
