import { useState } from 'react';
import { MapIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const iprResults = {
  patent: {
    type: 'Patent',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/10',
    icon: '⚙️',
    description: 'A patent protects your novel invention — a specific technical process, machine, or method. You have the exclusive right to make, use, and sell it for up to 20 years.',
    steps: ['Document your invention with diagrams and technical specifications', 'Conduct a prior art search (use our Prior Art Simulator)', 'File a provisional patent application to lock in your date', 'Consult a patent attorney for formal submission'],
  },
  copyright: {
    type: 'Copyright',
    color: 'from-orange-500 to-amber-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
    icon: '©',
    description: 'Copyright automatically protects original creative works — source code, written content, music, and art. It lasts the creator\'s lifetime plus 70 years.',
    steps: ['Register your work with your national copyright office for legal proof', 'Add copyright notices to your source files (© Year, Name)', 'Consider a Creative Commons license for open-source projects', 'Keep timestamped backups of your original work'],
  },
  trademark: {
    type: 'Trademark',
    color: 'from-yellow-500 to-primary-500',
    border: 'border-yellow-500/40',
    bg: 'bg-yellow-500/10',
    icon: '™',
    description: 'A trademark protects brand identifiers — names, logos, slogans — that distinguish your goods or services from others in the marketplace.',
    steps: ['Search existing trademarks (USPTO TESS or IP India Trademark Search)', 'Begin using the ™ symbol immediately to claim common law rights', 'File a trademark application with your national IP office', 'Renew your trademark every 10 years to maintain protection'],
  },
  industrial_design: {
    type: 'Industrial Design',
    color: 'from-secondary-500 to-primary-400',
    border: 'border-secondary-500/40',
    bg: 'bg-secondary-500/10',
    icon: '📐',
    description: 'Industrial design rights protect the ornamental or aesthetic features of a product — its shape, texture, color, or visual appearance.',
    steps: ['Document the unique visual appearance with photos and diagrams', 'File an industrial design application with your national IP office', 'Avoid disclosing the design publicly before filing', 'Consider registering internationally via the Hague System'],
  },
  trade_secret: {
    type: 'Trade Secret',
    color: 'from-slate-500 to-slate-700',
    border: 'border-slate-500/40',
    bg: 'bg-slate-500/10',
    icon: '🔒',
    description: 'A trade secret is confidential business information that gives you a competitive advantage. It remains protected as long as it is kept secret.',
    steps: ['Implement strict access controls and NDAs for all collaborators', 'Document what is considered confidential and why it is valuable', 'Use our NDA Generator to create agreements for team members', 'Never publicly disclose the trade secret information'],
  },
};

const TREE = [
  {
    id: 0,
    question: 'Is your creation primarily software, code, or a digital product?',
    hint: 'Apps, websites, algorithms, databases',
    icon: '💻',
    yes: 1,
    no: 2,
  },
  {
    id: 1,
    question: 'Is your software implementing a novel technical process or algorithm (not just standard functionality)?',
    hint: 'e.g. a new compression algorithm, unique ML architecture',
    icon: '⚡',
    yes: 'patent',
    no: 'copyright',
  },
  {
    id: 2,
    question: 'Is it a physical device, machine, or mechanical system?',
    hint: 'Hardware, PCBs, tools, manufactured products',
    icon: '⚙️',
    yes: 3,
    no: 4,
  },
  {
    id: 3,
    question: 'Does it have a unique visual form or aesthetic shape (beyond just functionality)?',
    hint: 'Curved design, ornamental pattern, product silhouette',
    icon: '📐',
    yes: 'industrial_design',
    no: 'patent',
  },
  {
    id: 4,
    question: 'Is it a creative work — writing, art, music, film, or illustration?',
    hint: 'Books, research papers, UI designs, photographs',
    icon: '🎨',
    yes: 'copyright',
    no: 5,
  },
  {
    id: 5,
    question: 'Is it a brand name, logo, or slogan to distinguish your product in the market?',
    hint: 'Company name, product logo, distinctive tagline',
    icon: '™',
    yes: 'trademark',
    no: 6,
  },
  {
    id: 6,
    question: 'Is this information something you want to keep strictly confidential and never publicly disclose?',
    hint: 'Recipes, business methods, source code not distributed',
    icon: '🔐',
    yes: 'trade_secret',
    no: 'patent',
  },
];

const IPWizard = () => {
  const [current, setCurrent] = useState(0);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);

  const progress = history.length / TREE.length;

  const handleAnswer = (direction) => {
    const node = TREE[current];
    const next = direction === 'yes' ? node.yes : node.no;
    setHistory(h => [...h, current]);

    if (typeof next === 'string') {
      setResult(iprResults[next]);
    } else {
      setCurrent(next);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = [...history];
    setCurrent(prev[prev.length - 1]);
    prev.pop();
    setHistory(prev);
    setResult(null);
  };

  const handleReset = () => {
    setCurrent(0);
    setHistory([]);
    setResult(null);
  };

  const node = TREE[current];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,183,0,0.3)]">
          <MapIcon className="h-9 w-9 text-white" />
        </div>
        <h1 className="page-title">IP Protection Wizard</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Answer a few questions and we'll guide you to the right Intellectual Property protection for your project.
        </p>
      </div>

      {/* Progress Bar */}
      {!result && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2 font-mono uppercase tracking-wider">
            <span>Question {history.length + 1} of {TREE.length}</span>
            <span>{Math.round(progress * 100)}% complete</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progress * 100, 5)}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="flex gap-1.5 mt-3 justify-center">
            {TREE.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
                i < history.length ? 'w-6 bg-primary-500' : i === history.length ? 'w-6 bg-primary-500/50 animate-pulse' : 'w-2 bg-white/10'
              }`} />
            ))}
          </div>
        </div>
      )}

      {/* Question Card */}
      {!result && (
        <div className="glass-card border border-white/10 p-8 animate-slide-up">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{node.icon}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">{node.question}</h2>
            <p className="text-sm text-slate-500 italic">{node.hint}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer('yes')}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-primary-500/30 bg-primary-500/5 hover:bg-primary-500/15 hover:border-primary-500/60 transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,183,0,0.15)]"
            >
              <CheckCircleIcon className="h-8 w-8 text-primary-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-bold text-white text-lg">Yes</div>
                <div className="text-slate-500 text-xs">This applies</div>
              </div>
            </button>

            <button
              onClick={() => handleAnswer('no')}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="h-8 w-8 rounded-full border-2 border-slate-600 group-hover:border-slate-400 flex items-center justify-center transition-all">
                <div className="w-3 h-0.5 bg-slate-500 group-hover:bg-slate-300 transition-colors" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">No</div>
                <div className="text-slate-500 text-xs">Doesn't apply</div>
              </div>
            </button>
          </div>

          {history.length > 0 && (
            <button onClick={handleBack} className="mt-6 flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mx-auto">
              <ArrowLeftIcon className="h-4 w-4" />
              Go back
            </button>
          )}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="animate-slide-up space-y-6">
          <div className={`glass-card border ${result.border} p-8`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${result.bg} ${result.border} border text-sm font-semibold mb-6`}>
              <span>{result.icon}</span>
              <span className="text-white">Best Protection: {result.type}</span>
            </div>

            <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${result.color} mb-6`} />

            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheckIcon className="h-6 w-6 text-primary-400" />
              {result.type} Protection
            </h2>

            <p className="text-slate-300 leading-relaxed mb-6">{result.description}</p>

            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">📋 Recommended Next Steps</p>
              <ol className="space-y-2">
                {result.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5`}>
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handleReset} className="btn-secondary flex items-center gap-2 text-sm">
              <ArrowLeftIcon className="h-4 w-4" />
              Start Over
            </button>
            <Link to="/learn" className="btn-primary flex items-center gap-2 text-sm">
              <ArrowRightIcon className="h-4 w-4" />
              Learn About {result.type}
            </Link>
            <Link to="/tools/patent-draft" className="btn-outline flex items-center gap-2 text-sm">
              Draft a Document →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPWizard;
