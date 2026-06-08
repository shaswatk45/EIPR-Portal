import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, updateUserRole, deleteUser, getAdminStats } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  UserCircleIcon, TrashIcon, ShieldCheckIcon,
  UsersIcon, ClipboardDocumentListIcon,
  BookOpenIcon, FolderIcon, ChartBarIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

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

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUsers(), getAdminStats()])
      .then(([uRes, sRes]) => {
        setUsers(uRes.data);
        setStats(sRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRoleToggle = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change ${user.name}'s role to ${newRole}?`)) return;
    try {
      const res = await updateUserRole(user._id, newRole);
      setUsers((prev) => prev.map((u) => (u._id === user._id ? res.data : u)));
      toast.success('Role updated');
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success('User deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <AdminNav />

      <h1 className="page-title mb-2">Admin Panel</h1>
      <p className="page-subtitle">Manage users and view platform statistics</p>

      {/* Stats Overview */}
      {stats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Users', value: stats.userCount, icon: UsersIcon, color: 'text-blue-400' },
            { label: 'Content', value: stats.contentCount, icon: BookOpenIcon, color: 'text-green-400' },
            { label: 'Quizzes', value: stats.quizCount, icon: ClipboardDocumentListIcon, color: 'text-purple-400' },
            { label: 'Attempts', value: stats.attemptCount, icon: ChartBarIcon, color: 'text-amber-400' },
            { label: 'Projects', value: stats.projectCount, icon: FolderIcon, color: 'text-teal-400' },
          ].map((stat) => (
            <div key={stat.label} className="card text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Users Table */}
      <div className="card overflow-hidden !p-0">
        <div className="p-4 border-b border-slate-700">
          <h2 className="font-bold text-white">All Users ({users.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Joined</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-sm">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${user.role === 'admin' ? 'bg-amber-900/50 text-amber-300 border border-amber-700/50' : 'bg-slate-700/50 text-slate-300 border border-slate-600/50'}`}>
                      {user.role === 'admin' && <ShieldCheckIcon className="h-3 w-3 mr-1 inline" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleRoleToggle(user)}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                      >
                        {user.role === 'admin' ? '→ User' : '→ Admin'}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-1.5 rounded-lg hover:bg-red-900/30 text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
