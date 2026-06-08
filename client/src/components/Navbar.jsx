import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  LightBulbIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
  ChevronDownIcon,
  MapIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { to: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
  { to: '/learn', icon: BookOpenIcon, label: 'Learning Hub' },
  { to: '/quiz', icon: ClipboardDocumentListIcon, label: 'Quizzes' },
  { to: '/projects', icon: FolderIcon, label: 'My Projects' },
  { to: '/recommend', icon: LightBulbIcon, label: 'IPR Recommender' },
  { to: '/wizard', icon: MapIcon, label: 'IP Wizard' },
];

const toolItems = [
  {
    to: '/vault/certificate',
    icon: '🔐',
    label: 'Vault Certificate',
    desc: 'SHA-256 proof of existence',
  },
  {
    to: '/tools/patent-draft',
    icon: '📄',
    label: 'Patent Draft',
    desc: 'Generate structured patent drafts',
  },
  {
    to: '/tools/prior-art',
    icon: '🔍',
    label: 'Prior Art Simulator',
    desc: 'Scan for conflicting patents',
  },
  {
    to: '/tools/nda',
    icon: '🤝',
    label: 'NDA / Legal Docs',
    desc: 'Generate NDA & IP agreements',
  },
];

const adminItems = [
  { to: '/admin/content', icon: BookOpenIcon, label: 'Manage Content' },
  { to: '/admin/quizzes', icon: ClipboardDocumentListIcon, label: 'Manage Quizzes' },
  { to: '/admin/users', icon: UserCircleIcon, label: 'Manage Users' },
];

const AnimatedLabel = ({ children, active }) => (
  <span className="relative hidden lg:inline-block overflow-hidden h-5">
    <span className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-1/2">
      <span className={active ? 'text-white' : 'text-slate-400'}>{children}</span>
      <span className="text-white font-bold">{children}</span>
    </span>
  </span>
);

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef(null);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  const isToolsActive = toolItems.some(t => isActive(t.to));

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setToolsOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const NavLink = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      onClick={() => setMobileOpen(false)}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-150
        ${isActive(to)
          ? 'text-white bg-white/5 border-l-2 border-primary-500 pl-2.5'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {label}
    </Link>
  );

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/35 backdrop-blur-[20px] border-b border-white/5 h-16 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <ShieldCheckIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg hidden sm:block">
              IPR <span className="text-gradient">Portal</span>
            </span>
          </Link>

          {/* Desktop nav - middle */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border
                  ${isActive(item.to)
                    ? 'text-white bg-white/[0.08] backdrop-blur-md border-white/[0.15] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04] hover:backdrop-blur-md hover:border-white/[0.08] border-transparent'
                  }`}
              >
                <item.icon className="h-4 w-4" />
                <AnimatedLabel active={isActive(item.to)}>{item.label}</AnimatedLabel>
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => setToolsOpen(o => !o)}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border
                  ${isToolsActive || toolsOpen
                    ? 'text-white bg-white/[0.08] backdrop-blur-md border-white/[0.15] shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.08] border-transparent'
                  }`}
              >
                <WrenchScrewdriverIcon className="h-4 w-4" />
                <AnimatedLabel active={isToolsActive}>IP Tools</AnimatedLabel>
                <ChevronDownIcon className={`h-3 w-3 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Panel */}
              {toolsOpen && (
                <div className="absolute top-full mt-2 right-0 w-72 bg-[#0e0e10]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden z-50 animate-slide-up">
                  <div className="px-4 py-2.5 border-b border-white/5">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">IP Tools Suite</p>
                  </div>
                  <div className="p-2">
                    {toolItems.map(tool => (
                      <Link
                        key={tool.to}
                        to={tool.to}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                          ${isActive(tool.to)
                            ? 'bg-primary-500/10 border border-primary-500/20'
                            : 'hover:bg-white/[0.05] border border-transparent'
                          }`}
                      >
                        <span className="text-xl w-8 text-center flex-shrink-0">{tool.icon}</span>
                        <div>
                          <div className={`text-sm font-medium ${isActive(tool.to) ? 'text-primary-300' : 'text-white'}`}>{tool.label}</div>
                          <div className="text-xs text-slate-500">{tool.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin */}
            <Link
              to="/admin/users"
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border
                ${location.pathname.startsWith('/admin')
                  ? 'text-white bg-primary-950/40 backdrop-blur-md border-primary-500/30 shadow-[0_0_15px_rgba(255,183,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)]'
                  : 'text-primary-400 hover:text-white hover:bg-primary-950/20 hover:backdrop-blur-md hover:border hover:border-primary-500/20 border-transparent'
                }`}
            >
              <Squares2X2Icon className="h-4 w-4" />
              <AnimatedLabel active={location.pathname.startsWith('/admin')}>Admin</AnimatedLabel>
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-slate-300 hidden sm:block">{user.name}</span>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 text-slate-400"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <nav className="absolute left-0 top-16 bottom-0 w-72 bg-surface/90 backdrop-blur-2xl border-r border-white/5 p-4 overflow-y-auto shadow-2xl">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink key={item.to} {...item} />
              ))}

              <div className="pt-4 pb-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3">IP Tools</p>
              </div>
              {toolItems.map(tool => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                    ${isActive(tool.to)
                      ? 'text-white bg-primary-500/10 border-l-2 border-primary-500'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span>{tool.icon}</span>
                  {tool.label}
                </Link>
              ))}

              <div className="pt-4 pb-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3">Admin</p>
              </div>
              {adminItems.map((item) => (
                <NavLink key={item.to} {...item} />
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
