import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../../api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  ShieldCheckIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CommandLineIcon,
  CpuChipIcon,
  BeakerIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  if (!data) return null;

  const { learning, quiz, projects } = data;

  // Compute a premium "Innovation Health Score" based on course progress, projects, and quiz activity.
  const healthScore = Math.min(
    100,
    Math.round(
      (learning.percentage * 0.5) + 
      (projects.total > 0 ? 30 : 5) + 
      (quiz.totalAttempts > 0 ? 20 : 5)
    )
  );

  // Dynamic project icon selector to match engineering style
  const getProjectIcon = (category, suggestion) => {
    const text = (category + ' ' + (suggestion || '')).toLowerCase();
    if (text.includes('software') || text.includes('code') || text.includes('program') || text.includes('copyright')) {
      return CommandLineIcon;
    }
    if (text.includes('patent') || text.includes('mechanic') || text.includes('device') || text.includes('hardware')) {
      return CpuChipIcon;
    }
    if (text.includes('chemical') || text.includes('desalination') || text.includes('bio') || text.includes('filter')) {
      return BeakerIcon;
    }
    return FolderIcon;
  };

  // Helper to determine status tag
  const getProjectStatus = (suggestion) => {
    const text = (suggestion || '').toLowerCase();
    if (text.includes('patent')) return 'Patent Pending';
    if (text.includes('copyright')) return 'Copyright';
    if (text.includes('trademark')) return 'Trademark';
    return 'Trade Secret';
  };

  // Helper to color project category tags
  const getProjectStatusColor = (suggestion) => {
    const text = (suggestion || '').toLowerCase();
    if (text.includes('patent')) return 'bg-primary-500/10 text-primary-300 border border-primary-500/20';
    if (text.includes('copyright')) return 'bg-secondary-500/10 text-secondary-300 border border-secondary-500/20';
    return 'bg-white/5 text-slate-300 border border-white/10';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in space-y-12">
      {/* Header Shell */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <p className="font-mono-sm text-primary uppercase tracking-[0.2em] mb-1.5">Authenticated System Access</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Innovator'}</span>.
          </h1>
        </div>
        <div className="text-left md:text-right">
          <p className="text-xl font-bold text-slate-300" id="current-date">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
          </p>
          <p className="font-mono-sm text-xs text-slate-500 uppercase tracking-wider">SECURE NODE: 771-B</p>
        </div>
      </header>

      {/* Top Row: Metrics & Active Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Metric Card 1: Health Score */}
        <div className="md:col-span-5 glass-card p-6 relative overflow-hidden group animate-float" style={{ animationDelay: '0s' }}>
          <div className="absolute top-2 right-2 font-mono-sm text-[9px] text-white/10">01 // METRIC</div>
          <h3 className="font-mono-sm text-xs text-slate-500 uppercase tracking-widest mb-6">Innovation Health Score</h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-white/5" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="6"></circle>
                <circle 
                  className="text-primary progress-ring-circle animate-pulse" 
                  cx="50" 
                  cy="50" 
                  fill="transparent" 
                  r="42" 
                  stroke="currentColor" 
                  strokeDasharray="264" 
                  strokeDashoffset={264 - (264 * healthScore) / 100}
                  strokeLinecap="round" 
                  strokeWidth="6"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                    transition: 'stroke-dashoffset 0.5s ease'
                  }}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-primary text-3xl">
                {healthScore}<span className="text-xs ml-0.5">%</span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${healthScore >= 70 ? 'bg-primary' : 'bg-secondary'}`}></span>
                <p className="text-sm font-semibold text-white">
                  IP Portfolio Integrity: <span className={healthScore >= 70 ? 'text-primary' : 'text-secondary'}>
                    {healthScore >= 80 ? 'Exceptional' : healthScore >= 50 ? 'Stable' : 'Unprotected'}
                  </span>
                </p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your portfolio health accounts for course milestones, project counts, and audit evaluations.
              </p>
            </div>
          </div>

          {/* Decorator */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            <div className="w-1.5 h-1.5 bg-primary/20"></div>
            <div className="w-1.5 h-1.5 bg-primary/20"></div>
          </div>
        </div>

        {/* Metric Card 2: Protection Recommendations */}
        <div className="md:col-span-7 glass-card p-6 relative group flex flex-col justify-between animate-float" style={{ animationDelay: '0.4s' }}>
          <div className="absolute top-2 right-2 font-mono-sm text-[9px] text-white/10">02 // ALERTS</div>
          <div>
            <h3 className="font-mono-sm text-xs text-slate-500 uppercase tracking-widest mb-4">Protection Recommendations</h3>
            
            {projects.recentProjects.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 border border-primary-500/20 bg-primary-500/5 rounded-lg hover:border-primary-500/30 transition-colors">
                  <ShieldCheckIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">
                      Action required for "{projects.recentProjects[0].title}"
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Your project suggestion is set to <strong>{projects.recentProjects[0].iprSuggestion || 'Generic IP'}</strong>. 
                      Ensure your claims specify technical block diagrams and functional equations before official cataloguing.
                    </p>
                    <Link to="/projects" className="inline-flex items-center gap-1 mt-2 font-mono-sm text-xs text-primary hover:underline">
                      Verify Claims <ArrowRightIcon className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 p-4 border border-white/5 bg-white/5 rounded-lg">
                <ShieldCheckIcon className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">IP Audit: Standby State</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    No active projects detected. Submit your engineering design report to run the rule-based IPR auditor.
                  </p>
                  <Link to="/projects/new" className="inline-flex items-center gap-1 mt-2 font-mono-sm text-xs text-primary hover:underline">
                    Submit Project <ArrowRightIcon className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono-sm mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System status: Live connection to decentralized legal databases.
          </div>
        </div>
      </div>

      {/* Middle Row: Active Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DocumentDuplicateIcon className="h-5 w-5 text-primary" />
            Active Vault Records
          </h2>
          <div className="flex items-center gap-3">
            <Link to="/projects/new" className="btn-primary text-xs py-1.5 px-3 bg-primary-500 hover:bg-primary-600 rounded text-white font-medium">
              + New Submission
            </Link>
            <Link to="/projects" className="btn-outline text-xs py-1.5 px-3 border border-white/10 hover:bg-white/5 rounded text-slate-400 hover:text-white">
              View All
            </Link>
          </div>
        </div>

        {projects.recentProjects.length === 0 ? (
          <div className="glass-panel py-12 text-center">
            <FolderIcon className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-sm text-slate-400">No project records found in this vault.</p>
            <Link to="/projects/new" className="btn-primary mt-4 text-xs inline-block">
              Archive First Prototype
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {projects.recentProjects.map((project, idx) => {
              const ProjectIcon = getProjectIcon(project.category, project.iprSuggestion);
              const progressPct = Math.min(100, 35 + ((project.title.length * 7) % 65));
              return (
                <div 
                  key={project._id} 
                  className="glass-card p-5 hover:shadow-primary-500/5 transition-all duration-300 relative group animate-float"
                  style={{ animationDelay: `${idx * 0.5}s` }}
                >
                  {/* Corner marks */}
                  <div className="absolute top-2 left-2 font-mono-sm text-[8px] text-white/10">REC_0{idx + 1}</div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center border border-white/10">
                      <ProjectIcon className="h-5 w-5 text-primary" />
                    </div>
                    <span className={`px-2 py-0.5 rounded font-mono-sm text-[9px] uppercase tracking-wider ${getProjectStatusColor(project.iprSuggestion)}`}>
                      {getProjectStatus(project.iprSuggestion)}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-1 truncate">{project.title}</h3>
                  <p className="text-xs text-slate-500 font-mono-sm uppercase mb-4 truncate">{project.category}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between font-mono-sm text-[10px] text-slate-400">
                      <span>AUDIT COMPLETION: {progressPct}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-500" 
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom Row: Curriculum & Visual Env */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
        {/* Learning Curriculum Progress */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between animate-float" style={{ animationDelay: '0.8s' }}>
          <div>
            <h3 className="font-mono-sm text-xs text-slate-500 uppercase tracking-widest mb-6">Curriculum Progress</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                  <span>IP Fundamentals</span>
                  <span className="font-mono-sm text-primary">{learning.percentage}%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-500" style={{ width: `${learning.percentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                  <span>Patent Law for Engineers</span>
                  <span className="font-mono-sm text-secondary">
                    {learning.percentage >= 50 ? Math.round((learning.percentage - 50) * 2) : 0}%
                  </span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-secondary h-full transition-all duration-500" 
                    style={{ width: `${learning.percentage >= 50 ? (learning.percentage - 50) * 2 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>Commercialization 101</span>
                  <span className="font-mono-sm tracking-wider uppercase text-[10px]">
                    {learning.percentage < 85 ? 'LOCKED' : 'READY'}
                  </span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden opacity-30">
                  <div 
                    className="bg-white/40 h-full transition-all duration-500" 
                    style={{ width: `${learning.percentage >= 85 ? 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <Link to="/learn" className="btn-outline w-full py-2 border border-white/10 hover:border-primary-500/30 text-center text-xs text-slate-300 rounded hover:text-white mt-8 transition-colors">
            Continue Curriculum
          </Link>
        </div>

        {/* High-Tech Visual Banner */}
        <div className="lg:col-span-7 glass-panel relative overflow-hidden group min-h-64 rounded-xl flex flex-col justify-end p-8 border border-white/10 scanline-container">
          <div className="scanline-beam"></div>
          <img 
            alt="Secure IP Vault Environment" 
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-102 transition-transform duration-1000 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWf2BMWLO4_ucIL_3NZQ-8MLHchZCoR5218AcI7_j_TC3jiLYT3c0zDbBSaXWb51J4a-gNqx-0cuWL7VowpYcMDImwRcdWxXcGnF5yX1Sp7RLGveY7vyquyjGq2pV7zMqw8wac2y31-AoqlwMiFOwOYTvJev_CFohu2vh7G-GdYuiSKwBBPzS6tdoSuD1ormWf53yXM4mIddyW-yPbM_XdgvmdeogPA-sBpC_r154I0eYbwVL-AlDkAC2-oEsbmyO3kmbdaq_zxjCT"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          
          <div className="relative z-10 space-y-2 max-w-md">
            <p className="font-mono-sm text-xs text-primary uppercase tracking-[0.25em] animate-pulse">
              ENCRYPTION ACTIVE: AES-256-GCM
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Your Innovation, <br />Globally Protected.
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every prototype uploaded is hashed and indexed in our database, preparing claim details for legal validation.
            </p>
          </div>

          {/* Coordinate overlay */}
          <div className="absolute top-4 right-4 flex flex-col items-end font-mono-sm text-[9px] text-primary/30">
            <span>LAT: 37.7749° N</span>
            <span>LON: 122.4194° W</span>
            <span>ALT: 12.4M</span>
          </div>
        </div>
      </div>

      {/* Recent Quizzes Bento Grid */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 glass-card p-6 relative">
          <div className="absolute top-2 right-2 font-mono-sm text-[9px] text-white/10">03 // HISTORY</div>
          
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ClipboardDocumentListIcon className="h-5 w-5 text-secondary" />
              Recent Quiz Evaluations
            </h2>
            <Link to="/quiz/results" className="text-xs text-secondary hover:underline flex items-center gap-1 font-semibold">
              All Results <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>

          {quiz.recentAttempts.length === 0 ? (
            <div className="text-center py-8">
              <ClipboardDocumentListIcon className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400 mb-4">No audit evaluations compiled yet.</p>
              <Link to="/quiz" className="btn-primary text-xs py-1.5 px-4 bg-secondary-500 hover:bg-secondary-600 rounded text-white">
                Initialize First Audit
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quiz.recentAttempts.map((attempt) => (
                <div key={attempt._id} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-lg">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono-sm text-sm font-bold flex-shrink-0 ${attempt.percentage >= 60 ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary/10 text-secondary border border-secondary/20'}`}>
                    {attempt.percentage}%
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold truncate">{attempt.quizTitle}</p>
                    <p className="text-slate-500 font-mono-sm text-[10px] uppercase mt-0.5">
                      Score: {attempt.score}/{attempt.totalQuestions} · {new Date(attempt.attemptedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="w-20 flex-shrink-0">
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${attempt.percentage >= 60 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: `${attempt.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
