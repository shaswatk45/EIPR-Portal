import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  FolderOpenIcon,
  LightBulbIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import FlowArt, { FlowSection } from '../components/ui/story-scroll.jsx';

const iprTypes = [
  { name: 'Patent', desc: 'Protect structural & process inventions', emoji: '⚙️' },
  { name: 'Copyright', desc: 'Protect source code & creative expressions', emoji: '©' },
  { name: 'Trademark', desc: 'Protect brand identities & logos', emoji: '™' },
  { name: 'Industrial Design', desc: 'Protect layout aesthetics & geometry', emoji: '🎨' },
];

const features = [
  {
    icon: AcademicCapIcon,
    title: 'Learning Hub',
    description: 'Comprehensive guides on Patents, Copyrights, Trademarks, and Industrial Designs with technical blueprints.',
    link: '/learn',
    index: '01'
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Quiz Module',
    description: 'Test your IPR integrity with secure MCQ audits, track your scores, and verify completions.',
    link: '/quiz',
    index: '02'
  },
  {
    icon: FolderOpenIcon,
    title: 'Project Submission',
    description: 'Archive your engineering prototypes and get them catalogued with corresponding protection suggestions.',
    link: '/projects',
    index: '03'
  },
  {
    icon: LightBulbIcon,
    title: 'IPR Recommender',
    description: 'Feed in project specifications to instantly generate rule-based suggestions on which patent/copyright to pursue.',
    link: '/recommend',
    index: '04'
  }
];

const mockProjects = [
  {
    title: 'AeroFold Drone',
    desc: 'Variable geometry folding mechanism for high-altitude delivery systems. Patent pending #2024-X45.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWf2BMWLO4_ucIL_3NZQ-8MLHchZCoR5218AcI7_j_TC3jiLYT3c0zDbBSaXWb51J4a-gNqx-0cuWL7VowpYcMDImwRcdWxXcGnF5yX1Sp7RLGveY7vyquyjGq2pV7zMqw8wac2y31-AoqlwMiFOwOYTvJev_CFohu2vh7G-GdYuiSKwBBPzS6tdoSuD1ormWf53yXM4mIddyW-yPbM_XdgvmdeogPA-sBpC_r154I0eYbwVL-AlDkAC2-oEsbmyO3kmbdaq_zxjCT',
    tags: ['Aeronautics', 'Robotics'],
    score: '98/100',
    status: 'PATENT PENDING',
  },
  {
    title: 'NeuroLink Interface',
    desc: 'Low-latency non-invasive BCI for controlling assistive robotics in medical environments.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtdOpe7jfFCHpeQM4wtRxoPoZ6ofwnFY4udNybytd2PEFffLe7CNAzIqjg1Ympp3UQPBmvwrtxPz1dp-xd8al4dp3DXdF68sm_fqkoyuG6EQU23fAmcxLqb56FSEFo3Kwy9hDEt4Bq_vLzWP3ROwqzG5ZBJdkluHNEYgZQrT8EmIfQihczfHClfX4N_P0mztw6v_L4btJUXjGdFAIZ4OvYT4pmZGLzq7KnkgMtHZWkwHL9r8rOmxRwlVCzTOW7yHI0QLMNc17c2WXa',
    tags: ['Bio-Tech', 'Medical'],
    score: '62/100',
    status: 'IN REVIEW',
  },
  {
    title: 'Quantum Guard Protocol',
    desc: 'Post-quantum encryption protocol for small-scale IoT devices using lattice-based cryptography.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAVHlXU6YFnrl2_pTpiZSR1ze95PU-qrOU8cLh2m1FBeKOEYGN-DTJffdFURZPqHpZTCow9Vprjo2k0Mtr--Xf1x-uEOI_o3x1C1Qk3rNBJ4ZyUhrU75ngJ_mB7TgbjUBJH4YEFkFGU_zRdIc4x1DV4w3nZEHmABxqR3aoywhiypahLqU4IbHdgv2V_Ee0dr9tjb5t42C__ay0PeLKkyGrdmymejjhOOhZ_aIkIXEE1jumMAX3vmTxDJqZVB3hPnOweJKlz1HDVO2g',
    tags: ['Security', 'Quantum'],
    score: '12/100',
    status: 'DRAFT',
  }
];

const Home = () => {
  return (
    <FlowArt aria-label="EIPR Portal Overview">
      {/* Blueprint Corner Accents */}
      <div className="fixed top-2 left-2 blueprint-corner corner-tl z-[60]">+</div>
      <div className="fixed top-2 right-2 blueprint-corner corner-tr z-[60]">+</div>
      <div className="fixed bottom-2 left-2 blueprint-corner corner-bl z-[60]">+</div>
      <div className="fixed bottom-2 right-2 blueprint-corner corner-br z-[60]">+</div>

      {/* Section 1: Hero */}
      <FlowSection aria-label="Home Hero" style={{ backgroundColor: '#ff6b00', color: '#fff' }}>
        <div className="flex justify-between items-center w-full">
          <p className="text-xs font-bold uppercase tracking-[0.2em] font-mono-sm text-white/90">01 — Protect Your Innovation</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/25 border border-white/10 rounded-full text-white text-xs font-medium tracking-wide">
            <ShieldCheckIcon className="h-3.5 w-3.5 text-white" />
            <span className="font-mono-sm text-[10px] tracking-widest uppercase">SYS_ACTIVE // NODE_VERIFIED</span>
          </div>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/20" />
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-8">
            <h1 className="text-[clamp(2.5rem,7.5vw,8.5rem)] font-extrabold leading-[0.85] uppercase tracking-tighter">
              Protect
              <br />
              Your
              <br />
              Innovation
            </h1>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-sans">
              Access decentralized learning paths, evaluate patent readiness, take academic IPR audits, and catalog your engineering projects within a secure academic vault.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/dashboard" className="px-6 py-3 bg-white text-[#ff6b00] font-bold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg flex items-center gap-2 text-sm">
                Enter Dashboard <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link to="/learn" className="px-6 py-3 border border-white/30 hover:border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-sm">
                Initialize Curriculum
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/20" />
        <div className="grid grid-cols-3 gap-6 pt-4 max-w-lg">
          {[
            ['8+', 'IPR Guides', '01'],
            ['20+', 'Audit Quizzes', '02'],
            ['4', 'Core IP Protections', '03']
          ].map(([num, label, idx]) => (
            <div key={label} className="border-l-2 border-white/30 pl-4 space-y-1 relative">
              <span className="absolute right-0 top-0 font-mono-sm text-[9px] text-white/40">{idx}</span>
              <div className="text-2xl font-bold">{num}</div>
              <div className="text-white/60 font-mono-sm text-[10px] uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </FlowSection>

      {/* Section 2: Core Framework */}
      <FlowSection aria-label="Core Framework" style={{ backgroundColor: '#08080a', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] font-mono-sm text-[#ff6b00]">02 — Core Framework</p>
        <hr className="my-[1.5vw] border-none border-t border-white/10" />
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2.5rem,7.5vw,8.5rem)] font-extrabold leading-[0.85] uppercase tracking-tighter text-white">
              4 Core
              <br />
              Domains
            </h2>
          </div>
          <div className="lg:col-span-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {iprTypes.map((type) => (
                <div key={type.name} className="p-5 border border-white/10 bg-white/[0.02] rounded-xl hover:border-[#ff6b00]/40 transition-all duration-300 relative group">
                  <div className="absolute top-2 right-2 font-mono-sm text-[8px] text-white/20">PROT_NODE</div>
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{type.emoji}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{type.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/10" />
        <p className="max-w-[60ch] text-slate-400 text-sm">
          Understanding the difference between patents, trademarks, copyrights, and industrial designs is crucial for secure commercialization.
        </p>
      </FlowSection>

      {/* Section 3: IP Shield */}
      <FlowSection aria-label="Active Modules" style={{ backgroundColor: '#140e0a', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] font-mono-sm text-[#ffb700]">03 — Active Modules</p>
        <hr className="my-[1.5vw] border-none border-t border-white/10" />
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(2.5rem,7.5vw,8.5rem)] font-extrabold leading-[0.85] uppercase tracking-tighter text-white">
              IP
              <br />
              Shield
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feat) => (
                <div key={feat.title} className="p-5 border border-white/10 bg-white/[0.02] rounded-xl flex flex-col justify-between h-48 hover:border-[#ffb700]/40 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10">
                      <feat.icon className="h-4 w-4 text-[#ffb700]" />
                    </div>
                    <span className="font-mono-sm text-[9px] text-white/20">{feat.index}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{feat.title}</h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">{feat.description}</p>
                  </div>
                  <Link to={feat.link} className="flex items-center gap-1 text-[#ffb700] text-xs font-semibold hover:underline mt-2">
                    Initialize Module <ArrowRightIcon className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/10" />
        <p className="max-w-[60ch] text-slate-400 text-sm">
          Decentralized tools designed to provide custom legal, technical, and academic support throughout your product development cycle.
        </p>
      </FlowSection>

      {/* Section 4: Vault Records */}
      <FlowSection aria-label="Active Vault" style={{ backgroundColor: '#08080a', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] font-mono-sm text-[#ff6b00]">04 — Vault Records</p>
        <hr className="my-[1.5vw] border-none border-t border-white/10" />
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(2.5rem,7.5vw,8.5rem)] font-extrabold leading-[0.85] uppercase tracking-tighter text-white">
              Active
              <br />
              Vault
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-3 gap-4">
              {mockProjects.map((project) => (
                <div key={project.title} className="border border-white/10 bg-white/[0.02] rounded-xl overflow-hidden group hover:border-[#ff6b00]/40 transition-all duration-300">
                  <div className="h-28 overflow-hidden relative">
                    <img
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={project.image}
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded font-mono-sm text-[8px] bg-black/60 text-white border border-white/10">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-white text-sm truncate">{project.title}</h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2 min-h-[2.5rem]">{project.desc}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] text-slate-500 font-mono-sm uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/10" />
        <p className="max-w-[60ch] text-slate-400 text-sm">
          Active secure ledger entries showing academic prototypes linked with real-time audit indices.
        </p>
      </FlowSection>

      {/* Section 5: CTA */}
      <FlowSection aria-label="Join Us" style={{ backgroundColor: '#ff6b00', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] font-mono-sm text-white/90">05 — Join Us</p>
        <hr className="my-[1.5vw] border-none border-t border-white/20" />
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-8">
            <h2 className="text-[clamp(2.5rem,7.5vw,8.5rem)] font-extrabold leading-[0.85] uppercase tracking-tighter text-white">
              Ready
              <br />
              To
              <br />
              Begin?
            </h2>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-sans">
              Take control of your creative journey. Log in, request audit reviews, catalog your innovations, and explore prior art databases instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/wizard" className="px-6 py-3 bg-white text-[#ff6b00] font-bold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg flex items-center gap-2 text-sm">
                Run IP Wizard <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="px-6 py-3 border border-white/30 hover:border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-sm">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-[1.5vw] border-none border-t border-white/20" />
        <footer className="w-full flex justify-between items-center text-white/40 text-[9px] font-mono-sm tracking-widest uppercase">
          <span>© 2026 Innovation Vault Portal</span>
          <span>SECURE NODE // SYSTEM_ACTIVE</span>
        </footer>
      </FlowSection>
    </FlowArt>
  );
};

export default Home;
