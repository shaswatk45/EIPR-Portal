import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyProjects, deleteProject } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FolderOpenIcon, TrashIcon, PlusIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const categoryColors = {
  'Software / App': 'badge bg-blue-900/50 text-blue-300 border border-blue-700/50',
  'Mechanical Device': 'badge bg-amber-900/50 text-amber-300 border border-amber-700/50',
  'Logo / Brand Name': 'badge bg-purple-900/50 text-purple-300 border border-purple-700/50',
  'Artwork / Writing': 'badge bg-pink-900/50 text-pink-300 border border-pink-700/50',
  'Circuit / Electronics': 'badge bg-cyan-900/50 text-cyan-300 border border-cyan-700/50',
  'Product Design': 'badge bg-teal-900/50 text-teal-300 border border-teal-700/50',
  'Business Method': 'badge bg-green-900/50 text-green-300 border border-green-700/50',
  'Music / Media': 'badge bg-rose-900/50 text-rose-300 border border-rose-700/50',
  'Other': 'badge bg-slate-700/50 text-slate-300 border border-slate-600/50',
};

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProjects()
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success('Project deleted');
    } catch {
      toast.error('Failed to delete project');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">My Projects</h1>
          <p className="page-subtitle">Your submitted projects and their IPR recommendations</p>
        </div>
        <Link to="/projects/new" className="btn-primary flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Submit Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <FolderOpenIcon className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-slate-400 mb-6">Submit your first project to get IPR recommendations.</p>
          <Link to="/projects/new" className="btn-primary">Submit a Project</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div key={project._id} className="card group">
              <div className="flex items-start justify-between mb-3">
                <span className={categoryColors[project.category] || 'badge badge-general'}>
                  {project.category}
                </span>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

              {project.iprSuggestion && (
                <div className="flex items-start gap-2 p-3 bg-primary-500/5 border border-primary-500/20 rounded-lg">
                  <LightBulbIcon className="h-4 w-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-primary-400 mb-0.5">IPR Suggestion</p>
                    <p className="text-slate-300 text-xs">{project.iprSuggestion}</p>
                  </div>
                </div>
              )}

              <p className="text-slate-600 text-xs mt-3">
                Submitted {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;
