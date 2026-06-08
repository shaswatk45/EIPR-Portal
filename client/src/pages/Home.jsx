import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  FolderOpenIcon,
  LightBulbIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: AcademicCapIcon,
    title: 'Learning Hub',
    description: 'Comprehensive guides on Patents, Copyrights, Trademarks, and Industrial Designs with technical blueprints.',
    color: 'from-primary-500 to-primary-600',
    link: '/learn',
    index: '01'
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Quiz Module',
    description: 'Test your IPR integrity with secure MCQ audits, track your scores, and verify past completions.',
    color: 'from-secondary-500 to-secondary-600',
    link: '/quiz',
    index: '02'
  },
  {
    icon: FolderOpenIcon,
    title: 'Project Submission',
    description: 'Archive your engineering prototypes and get them catalogued with corresponding protection suggestions.',
    color: 'from-primary-400 to-secondary-500',
    link: '/projects',
    index: '03'
  },
  {
    icon: LightBulbIcon,
    title: 'IPR Recommender',
    description: 'Feed in project specifications to instantly generate rule-based suggestions on which patent/copyright to pursue.',
    color: 'from-secondary-600 to-primary-600',
    link: '/recommend',
    index: '04'
  }
];

const iprTypes = [
  { name: 'Patent', desc: 'Protect structural & process inventions', emoji: '⚙️', color: 'border-primary-500/20 bg-primary-500/5' },
  { name: 'Copyright', desc: 'Protect source code & creative expressions', emoji: '©', color: 'border-secondary-500/20 bg-secondary-500/5' },
  { name: 'Trademark', desc: 'Protect brand identities & logos', emoji: '™', color: 'border-primary-400/20 bg-primary-400/5' },
  { name: 'Industrial Design', desc: 'Protect layout aesthetics & product geometry', emoji: '🎨', color: 'border-secondary-400/20 bg-secondary-400/5' },
];

const mockProjects = [
  {
    title: 'AeroFold Drone',
    desc: 'Variable geometry folding mechanism for high-altitude delivery systems. Patent pending #2024-X45.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWf2BMWLO4_ucIL_3NZQ-8MLHchZCoR5218AcI7_j_TC3jiLYT3c0zDbBSaXWb51J4a-gNqx-0cuWL7VowpYcMDImwRcdWxXcGnF5yX1Sp7RLGveY7vyquyjGq2pV7zMqw8wac2y31-AoqlwMiFOwOYTvJev_CFohu2vh7G-GdYuiSKwBBPzS6tdoSuD1ormWf53yXM4mIddyW-yPbM_XdgvmdeogPA-sBpC_r154I0eYbwVL-AlDkAC2-oEsbmyO3kmbdaq_zxjCT',
    tags: ['Aeronautics', 'Robotics'],
    score: '98/100',
    status: 'PATENT PENDING',
    statusColor: 'bg-primary-500/10 text-primary-300 border border-primary-500/20',
    scoreColor: 'text-primary'
  },
  {
    title: 'NeuroLink Interface',
    desc: 'Low-latency non-invasive BCI for controlling assistive robotics in medical environments.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtdOpe7jfFCHpeQM4wtRxoPoZ6ofwnFY4udNybytd2PEFffLe7CNAzIqjg1Ympp3UQPBmvwrtxPz1dp-xd8al4dp3DXdF68sm_fqkoyuG6EQU23fAmcxLqb56FSEFo3Kwy9hDEt4Bq_vLzWP3ROwqzG5ZBJdkluHNEYgZQrT8EmIfQihczfHClfX4N_P0mztw6v_L4btJUXjGdFAIZ4OvYT4pmZGLzq7KnkgMtHZWkwHL9r8rOmxRwlVCzTOW7yHI0QLMNc17c2WXa',
    tags: ['Bio-Tech', 'Medical'],
    score: '62/100',
    status: 'IN REVIEW',
    statusColor: 'bg-secondary-500/10 text-secondary-300 border border-secondary-500/20',
    scoreColor: 'text-secondary'
  },
  {
    title: 'Quantum Guard Protocol',
    desc: 'Post-quantum encryption protocol for small-scale IoT devices using lattice-based cryptography.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAVHlXU6YFnrl2_pTpiZSR1ze95PU-qrOU8cLh2m1FBeKOEYGN-DTJffdFURZPqHpZTCow9Vprjo2k0Mtr--Xf1x-uEOI_o3x1C1Qk3rNBJ4ZyUhrU75ngJ_mB7TgbjUBJH4YEFkFGU_zRdIc4x1DV4w3nZEHmABxqR3aoywhiypahLqU4IbHdgv2V_Ee0dr9tjb5t42C__ay0PeLKkyGrdmymejjhOOhZ_aIkIXEE1jumMAX3vmTxDJqZVB3hPnOweJKlz1HDVO2g',
    tags: ['Security', 'Quantum'],
    score: '12/100',
    status: 'DRAFT',
    statusColor: 'bg-white/5 text-slate-300 border border-white/10',
    scoreColor: 'text-white'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Blueprint Corner Accents */}
      <div className="fixed top-2 left-2 blueprint-corner corner-tl z-[60]">+</div>
      <div className="fixed top-2 right-2 blueprint-corner corner-tr z-[60]">+</div>
      <div className="fixed bottom-2 left-2 blueprint-corner corner-bl z-[60]">+</div>
      <div className="fixed bottom-2 right-2 blueprint-corner corner-br z-[60]">+</div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        {/* Background glow */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-20 right-1/4 w-[600px] h-[400px] bg-secondary-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

        {/* Left: Text & Action */}
        <div className="md:col-span-7 space-y-8 animate-fade-in relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-sm font-medium tracking-wide">
            <ShieldCheckIcon className="h-4 w-4 text-primary" />
            <span className="font-mono-sm text-xs tracking-widest uppercase">NODE VERIFIED // SYSTEM ACTIVE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15]">
            Protect Your <span className="text-gradient">Innovation.</span>
            <br />
            Secure Your IP Vault.
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
            Access decentralized learning paths, evaluate patent readiness, take academic IPR audits, 
            and catalog your engineering projects within a secure academic vault.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/dashboard" className="btn-primary text-sm px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded flex items-center gap-2 transition-all">
              Enter Dashboard <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link to="/learn" className="btn-outline text-sm px-6 py-3 border border-white/10 hover:border-primary-500/30 hover:bg-primary-500/5 text-slate-300 rounded transition-all">
              Initialize Curriculum
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 pt-6 max-w-md">
            {[
              ['8+', 'IPR Guides', '01'],
              ['20+', 'Audit Quizzes', '02'],
              ['4', 'Core IP Protections', '03']
            ].map(([num, label, idx]) => (
              <div key={label} className="border-l border-primary-500/20 pl-4 space-y-1 relative">
                <span className="absolute right-0 top-0 font-mono-sm text-[9px] text-primary-500/30">{idx}</span>
                <div className="text-2xl font-bold text-gradient">{num}</div>
                <div className="text-slate-500 font-mono-sm text-[11px] uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Security Vault Graphic */}
        <div className="md:col-span-5 relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500/20 to-secondary-500/10 blur-2xl rounded-2xl opacity-50 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none" />
          
          <div className="glass-card rounded-xl overflow-hidden shadow-2xl relative z-10 border border-white/10 scanline-container">
            <div className="scanline-beam"></div>
            {/* Corner symbols */}
            <div className="absolute top-2 left-2 font-mono-sm text-[9px] text-primary/40">SYS_INIT_01</div>
            <div className="absolute bottom-2 right-2 font-mono-sm text-[9px] text-secondary/40">IP_PROTOCOL_v4.2</div>
            
            <img
              alt="Innovation Safe Vault"
              className="w-full h-auto object-cover opacity-85 group-hover:scale-102 transition-transform duration-700 mix-blend-lighten"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1toP6VZbQN-dK-vZLPeSZCLmF5oxATtdfBx3Yo7XGnTBt0oT0G_hHeIdMol8iWiPHbrD__vSu4pm7NjapT9D_EnK7epsx1XXpg43eteJ5WPoCh1a7ojcr1BBQtsx4x8feSZO9yC6lFrvNnTQ9qedJqWNv7JPTayRfE_S1DRZRjqKgNjBtasrpoBULM6USPcSTSvoNa-avUgwqjdkvInV_J7kXGp7xksCUr7xSJaPdMJGaRnPxKzLvn1Ir-wG6fRaJWA8s5Kw75hDq"
            />
          </div>
        </div>
      </section>

      {/* 4 Types of Intellectual Property */}
      <section className="px-4 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="max-w-xl mb-12">
          <p className="font-mono-sm text-xs text-primary uppercase tracking-[0.2em] mb-2">Core Framework</p>
          <h2 className="text-3xl font-bold text-white">4 Domains of Intellectual Property</h2>
          <p className="text-slate-400 mt-2 text-sm">Critical pillars for engineering students to commercialize research.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {iprTypes.map((type, idx) => (
            <div 
              key={type.name} 
              className={`glass-card p-6 border ${type.color} group hover:shadow-primary-500/5 transition-all duration-300 animate-float`}
              style={{ animationDelay: `${idx * 0.4}s` }}
            >
              <div className="absolute top-2 right-2 font-mono-sm text-[10px] text-white/10 uppercase">PROT_NODE</div>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{type.emoji}</div>
              <h3 className="text-lg font-bold text-white mb-1">{type.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{type.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="px-4 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="max-w-xl mb-12">
          <p className="font-mono-sm text-xs text-secondary uppercase tracking-[0.2em] mb-2">Active Modules</p>
          <h2 className="text-3xl font-bold text-white">Comprehensive IP Protection Shield</h2>
          <p className="text-slate-400 mt-2 text-sm">Engineered tools providing guidance for every development phase.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card p-6 flex flex-col justify-between h-72 group hover:shadow-secondary-500/5 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-115 transition-transform duration-300">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-mono-sm text-[10px] text-white/20">{feature.index}</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{feature.description}</p>
              </div>

              <Link to={feature.link} className="flex items-center gap-1 text-primary text-xs font-semibold hover:underline mt-4">
                Initialize Module <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Active Project Mockup Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="max-w-xl mb-12">
          <p className="font-mono-sm text-xs text-primary uppercase tracking-[0.2em] mb-2">Portfolio Previews</p>
          <h2 className="text-3xl font-bold text-white">Active Vault Records</h2>
          <p className="text-slate-400 mt-2 text-sm">Example student prototypes with active security evaluations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-gutter">
          {mockProjects.map((project, idx) => (
            <div 
              key={project.title} 
              className="glass-card overflow-hidden group hover:shadow-primary-500/5 transition-all duration-500 animate-float"
              style={{ animationDelay: `${idx * 0.6}s` }}
            >
              <div className="h-44 overflow-hidden relative scanline-container">
                <div className="scanline-beam"></div>
                <img
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={project.image}
                />
                <div className={`absolute top-3 right-3 px-2 py-0.5 rounded font-mono-sm text-[9px] uppercase tracking-wider ${project.statusColor}`}>
                  {project.status}
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-base">{project.title}</h4>
                  <div className="text-right">
                    <div className="text-[9px] font-mono-sm text-slate-500">PROTECT_INDEX</div>
                    <div className={`font-mono-sm text-xs font-semibold ${project.scoreColor}`}>{project.score}</div>
                  </div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed min-h-12">{project.desc}</p>
                
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-slate-500 font-mono-sm uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why IPR Matters */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent to-surface-container-lowest/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 relative overflow-hidden">
          {/* Blueprint markings */}
          <div className="absolute top-2 left-2 font-mono-sm text-[9px] text-primary/30">ALIGN_MARK_A</div>
          <div className="absolute bottom-2 right-2 font-mono-sm text-[9px] text-secondary/30">REF_VAL_771</div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Why Engineers Need IPR Strategy</h2>
          <p className="text-slate-400 text-center text-sm max-w-2xl mx-auto mb-12 leading-relaxed">
            Every line of code you commit, every circuit schematic you compile, and every physical model 
            you render represents key intellectual equity. A robust IP strategy enables:
          </p>

          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {[
              ['Prevent Plagiarism', 'Secure first-to-file status and block unauthorized third-party replication.', '01'],
              ['Monetize Research', 'Leverage patent portfolios to license technology, secure startup seed funding, or attract sponsorships.', '02'],
              ['Industry Credibility', 'Differentiate yourself in engineering roles by demonstrating advanced regulatory and IP compliance.', '03']
            ].map(([title, desc, idx]) => (
              <div key={title} className="space-y-2 relative pl-2">
                <span className="font-mono-sm text-[10px] text-primary absolute left-0 top-0 opacity-40">{idx}</span>
                <div className="pl-6">
                  <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8 text-center text-slate-600 text-xs font-mono-sm tracking-widest uppercase">
        © 2026 Innovation Vault Portal · SECURE NODE // MULTI-JURISDICTIONAL SYSTEM
      </footer>
    </div>
  );
};

export default Home;
