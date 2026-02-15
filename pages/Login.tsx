
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, SubscriptionPlan } from '../types';
import { ICONS } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email: email || 'demo@storeboost.ai',
      plan: SubscriptionPlan.GROWTH,
      creditsRemaining: 84,
      totalCredits: 100,
      role: 'user'
    };
    onLogin(mockUser);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-6">
      <div className="glass-card w-full max-w-md p-10 rounded-[40px] border border-white/5 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-brand-red rounded-3xl neon-red flex items-center justify-center rotate-12">
          <ICONS.Rocket className="w-12 h-12 text-white -rotate-12" />
        </div>
        
        <div className="text-center mt-8 mb-10">
          <h1 className="text-3xl font-black mb-2 tracking-tighter uppercase">StoreBoost <span className="text-brand-red">AI</span></h1>
          <p className="text-brand-muted text-xs font-mono uppercase tracking-[0.2em]">Optimize Your Growth</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <ICONS.Link className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-brand-red transition-colors outline-none font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest">Password</label>
              <button type="button" className="text-[10px] font-bold text-brand-red uppercase tracking-widest hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <ICONS.Settings className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-brand-red transition-colors outline-none font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-red hover:bg-brand-glow text-white font-black py-4 rounded-2xl neon-red transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
            Sign In to Dashboard <ICONS.Dashboard className="w-5 h-5" />
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Or continue with</span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="glass-card py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
            <div className="w-4 h-4 bg-white rounded-sm" /> <span className="text-xs font-bold uppercase tracking-wider">Google</span>
          </button>
          <button className="glass-card py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
             <div className="w-4 h-4 bg-white/50 rounded-sm" /> <span className="text-xs font-bold uppercase tracking-wider">Github</span>
          </button>
        </div>

        <p className="text-center mt-10 text-xs text-brand-muted">
          Don't have an account? <Link to="/signup" className="text-brand-red font-bold hover:underline">Create one for free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
