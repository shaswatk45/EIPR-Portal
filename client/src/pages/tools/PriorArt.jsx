import { useState, useRef } from 'react';
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DOMAINS = [
  { id: 'software', label: 'Software & AI' },
  { id: 'mechanical', label: 'Mechanical Engineering' },
  { id: 'electrical', label: 'Electronics & Circuits' },
  { id: 'biotech', label: 'Biotechnology' },
  { id: 'chemical', label: 'Chemistry & Materials' },
  { id: 'medical', label: 'Medical Devices' },
  { id: 'environmental', label: 'Environmental Tech' },
  { id: 'aerospace', label: 'Aerospace' },
];

const TITLES = [
  'System and Method for', 'Apparatus Enabling', 'Improved Method of',
  'Device for Automated', 'Distributed Framework for', 'Adaptive System for',
  'Neural Network-Based Approach to', 'Efficient Algorithm for',
];
const SUFFIXES = [
  'in Real-Time Environments', 'Using Heterogeneous Data Sources',
  'with Low Latency Processing', 'via Multi-Layer Abstraction',
  'through Intelligent Optimization', 'for Resource-Constrained Systems',
];

function seededRandom(seed) {
  let x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateResults(keywords, domain) {
  if (!keywords.length) return [];
  const kw = keywords.join(' ');
  const seed = kw.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = 3 + Math.floor(seededRandom(seed) * 3);

  return Array.from({ length: count }, (_, i) => {
    const r1 = seededRandom(seed + i * 7);
    const r2 = seededRandom(seed + i * 13);
    const r3 = seededRandom(seed + i * 19);
    const r4 = seededRandom(seed + i * 31);

    const kw1 = keywords[Math.floor(r1 * keywords.length)];
    const kw2 = keywords[Math.floor(r2 * keywords.length)];
    const title = `${TITLES[Math.floor(r3 * TITLES.length)]} ${kw1.charAt(0).toUpperCase() + kw1.slice(1)}${kw2 ? ` and ${kw2}` : ''} ${SUFFIXES[Math.floor(r4 * SUFFIXES.length)]}`;

    const year = 1995 + Math.floor(seededRandom(seed + i * 41) * 28);
    const month = 1 + Math.floor(seededRandom(seed + i * 43) * 12);
    const day = 1 + Math.floor(seededRandom(seed + i * 47) * 28);
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const similarity = Math.round(20 + seededRandom(seed + i * 53) * 65);

    return { id: i, title, date: dateStr, similarity, domain };
  });
}

function getVerdict(results) {
  if (!results.length) return null;
  const avg = results.reduce((s, r) => s + r.similarity, 0) / results.length;
  if (avg < 40) return { label: 'Likely Novel', color: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/10', icon: '✅', detail: 'Low average similarity. Your concept appears novel. Still recommended to do a formal search.' };
  if (avg < 70) return { label: 'Investigate Further', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', icon: '⚠️', detail: 'Moderate similarity found. Review the closest matches and differentiate your claims.' };
  return { label: 'High Conflict Risk', color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10', icon: '🚨', detail: 'High similarity detected. Significant prior art may exist. Strongly recommend a professional patent search.' };
}

const PriorArt = () => {
  const [keywords, setKeywords] = useState([]);
  const [kInput, setKInput] = useState('');
  const [domain, setDomain] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const intervalRef = useRef(null);

  const addKeyword = () => {
    const trimmed = kInput.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed)) setKeywords(k => [...k, trimmed]);
    setKInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addKeyword(); }
  };

  const removeKw = (kw) => setKeywords(k => k.filter(x => x !== kw));

  const handleScan = () => {
    if (!keywords.length || !domain) return;
    setScanning(true);
    setProgress(0);
    setResults(null);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          setScanning(false);
          setResults(generateResults(keywords, domain));
          return 100;
        }
        return p + 4;
      });
    }, 80);
  };

  const verdict = results ? getVerdict(results) : null;

  const getSimilarityColor = (s) => {
    if (s < 40) return 'from-green-500 to-green-400';
    if (s < 70) return 'from-amber-500 to-orange-400';
    return 'from-red-500 to-orange-500';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,183,0,0.3)]">
          <MagnifyingGlassIcon className="h-9 w-9 text-white" />
        </div>
        <h1 className="page-title">Prior Art Simulator</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Enter keywords describing your invention and scan for conceptually similar prior patents. Simulated results link to real Google Patent searches.
        </p>
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-xs font-mono">
          ⚡ Simulation — Results link to real Google Patents
        </div>
      </div>

      {/* Input Form */}
      <div className="glass-card p-6 space-y-5 mb-8">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5 pb-3">Search Parameters</h2>

        <div>
          <label className="label">Technical Domain *</label>
          <select value={domain} onChange={e => setDomain(e.target.value)} className="input">
            <option value="">Select domain…</option>
            {DOMAINS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </div>

        <div>
          <label className="label">Keywords (press Enter to add) *</label>
          <div className="flex gap-2 mb-2">
            <input
              value={kInput}
              onChange={e => setKInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input flex-1"
              placeholder="e.g. neural network, compression, adaptive…"
            />
            <button onClick={addKeyword} className="btn-secondary px-4 flex items-center gap-1 flex-shrink-0">
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map(kw => (
                <span key={kw} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-xs font-mono">
                  {kw}
                  <button onClick={() => removeKw(kw)} className="text-primary-500 hover:text-red-400 transition-colors">
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleScan}
          disabled={scanning || !keywords.length || !domain}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          {scanning ? 'Scanning Patent Databases…' : 'Scan for Prior Art'}
        </button>

        {/* Scan progress */}
        {scanning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>Analyzing patent corpus…</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-slate-600 font-mono animate-pulse">
              {progress < 30 ? '→ Indexing domain keywords…'
                : progress < 60 ? '→ Querying patent database…'
                : progress < 85 ? '→ Computing similarity scores…'
                : '→ Generating report…'}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {results && verdict && (
        <div className="space-y-5 animate-slide-up">
          {/* Verdict Banner */}
          <div className={`glass-card border ${verdict.border} ${verdict.bg} p-5 flex items-center gap-4`}>
            <div className="text-3xl">{verdict.icon}</div>
            <div>
              <h3 className={`font-bold text-lg ${verdict.color}`}>{verdict.label}</h3>
              <p className="text-slate-400 text-sm">{verdict.detail}</p>
            </div>
          </div>

          {/* Result List */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <MagnifyingGlassIcon className="h-4 w-4" />
              {results.length} Prior Art References Found
            </h3>
            <div className="space-y-4">
              {results.map((r, i) => (
                <div key={r.id} className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-slate-500 font-mono flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white leading-snug mb-1">{r.title}</p>
                    <p className="text-xs text-slate-500 font-mono mb-3">Filed: {r.date}</p>
                    {/* Similarity bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Conceptual Similarity</span>
                        <span className={r.similarity >= 70 ? 'text-red-400' : r.similarity >= 40 ? 'text-amber-400' : 'text-green-400'}>
                          {r.similarity}%
                        </span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${getSimilarityColor(r.similarity)} transition-all duration-700`}
                          style={{ width: `${r.similarity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://patents.google.com/?q=${encodeURIComponent(r.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    View ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorArt;
