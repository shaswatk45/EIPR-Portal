import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import LearningHub from './pages/learning/LearningHub';
import LearningDetail from './pages/learning/LearningDetail';
import QuizList from './pages/quiz/QuizList';
import TakeQuiz from './pages/quiz/TakeQuiz';
import QuizResults from './pages/quiz/QuizResults';
import MyProjects from './pages/projects/MyProjects';
import SubmitProject from './pages/projects/SubmitProject';
import Recommend from './pages/recommend/Recommend';
import Dashboard from './pages/dashboard/Dashboard';
import AdminContent from './pages/admin/AdminContent';
import AdminQuizzes from './pages/admin/AdminQuizzes';
import AdminUsers from './pages/admin/AdminUsers';

// New Feature Pages
import VaultCertificate from './pages/vault/VaultCertificate';
import IPWizard from './pages/wizard/IPWizard';
import PatentDraft from './pages/tools/PatentDraft';
import PriorArt from './pages/tools/PriorArt';
import NDAGenerator from './pages/tools/NDAGenerator';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-900">
          <Navbar />
          <main>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />

              {/* Student Pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/learn" element={<LearningHub />} />
              <Route path="/learn/:id" element={<LearningDetail />} />
              <Route path="/quiz" element={<QuizList />} />
              <Route path="/quiz/results" element={<QuizResults />} />
              <Route path="/quiz/:id" element={<TakeQuiz />} />
              <Route path="/projects" element={<MyProjects />} />
              <Route path="/projects/new" element={<SubmitProject />} />
              <Route path="/recommend" element={<Recommend />} />

              {/* New Feature Pages */}
              <Route path="/vault/certificate" element={<VaultCertificate />} />
              <Route path="/wizard" element={<IPWizard />} />
              <Route path="/tools/patent-draft" element={<PatentDraft />} />
              <Route path="/tools/prior-art" element={<PriorArt />} />
              <Route path="/tools/nda" element={<NDAGenerator />} />

              {/* Admin Pages */}
              <Route path="/admin/content" element={<AdminContent />} />
              <Route path="/admin/quizzes" element={<AdminQuizzes />} />
              <Route path="/admin/users" element={<AdminUsers />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#14b8a6', secondary: '#0f172a' } },
            error: { iconTheme: { primary: '#f87171', secondary: '#0f172a' } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
