
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User, SubscriptionPlan, GenerationRecord } from './types';
import { ICONS, COLORS } from './constants';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import History from './pages/History';
import Billing from './pages/Billing';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sb_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [generations, setGenerations] = useState<GenerationRecord[]>(() => {
    const saved = localStorage.getItem('sb_generations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sb_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sb_generations', JSON.stringify(generations));
  }, [generations]);

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => setUser(null);

  const addGeneration = (record: GenerationRecord) => {
    setGenerations(prev => [record, ...prev]);
    if (user) {
      setUser({ ...user, creditsRemaining: Math.max(0, user.creditsRemaining - 1) });
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-brand-black text-white selection:bg-brand-red selection:text-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />

          {/* Protected App Routes */}
          <Route 
            path="/app/*" 
            element={
              user ? (
                <AppLayout user={user} onLogout={handleLogout}>
                  <Routes>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard user={user} generations={generations} />} />
                    <Route path="generate" element={<Generate user={user} onGenerated={addGeneration} />} />
                    <Route path="history" element={<History generations={generations} />} />
                    <Route path="billing" element={<Billing user={user} />} />
                    <Route path="settings" element={<Settings user={user} />} />
                  </Routes>
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

interface AppLayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ user, onLogout, children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: <ICONS.Dashboard className="w-5 h-5" /> },
    { name: 'Generate', path: '/app/generate', icon: <ICONS.Generate className="w-5 h-5" /> },
    { name: 'History', path: '/app/history', icon: <ICONS.History className="w-5 h-5" /> },
    { name: 'Billing', path: '/app/billing', icon: <ICONS.Billing className="w-5 h-5" /> },
    { name: 'Settings', path: '/app/settings', icon: <ICONS.Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark border-r border-white/5 flex flex-col hidden lg:flex">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center neon-red group-hover:scale-110 transition-transform">
              <ICONS.Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">StoreBoost <span className="text-brand-red">AI</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path 
                  ? 'bg-brand-red text-white neon-red' 
                  : 'text-brand-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`${location.pathname === item.path ? 'text-white' : 'text-brand-muted group-hover:text-brand-red'} transition-colors`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass-card rounded-2xl p-4 mb-4 border-l-4 border-brand-red">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Credits Left</span>
              <span className="text-xs font-mono text-brand-red">{user.creditsRemaining}/{user.totalCredits}</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-brand-red h-full rounded-full neon-red transition-all duration-500" 
                style={{ width: `${(user.creditsRemaining / user.totalCredits) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-brand-muted mt-2 leading-tight">
              Upgrade to Pro for unlimited generation credits.
            </p>
          </div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-brand-muted hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <ICONS.Logout className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        
        {/* Mobile Header */}
        <header className="lg:hidden p-4 border-b border-white/5 flex justify-between items-center bg-brand-dark/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
              <ICONS.Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">StoreBoost AI</span>
          </div>
          <button className="p-2 text-brand-muted"><ICONS.Dashboard className="w-6 h-6" /></button>
        </header>

        {/* Top Navbar (Desktop) */}
        <header className="hidden lg:flex h-16 border-b border-white/5 px-8 items-center justify-between bg-brand-dark/30 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-green-500 uppercase tracking-widest">Live Engine Active</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-white/10 pr-6">
              <div className="text-right">
                <p className="text-xs font-bold leading-none">{user.email.split('@')[0]}</p>
                <p className="text-[10px] text-brand-red font-mono uppercase mt-1 tracking-tighter">{user.plan} Access</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-brand-red p-0.5">
                <img src={user.avatar || `https://picsum.photos/seed/${user.id}/100/100`} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <Link to="/app/billing" className="bg-brand-red hover:bg-brand-glow text-white text-xs font-bold px-4 py-2 rounded-lg neon-red transition-all flex items-center gap-2">
              <ICONS.Billing className="w-4 h-4" /> UPGRADE
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 z-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default App;
