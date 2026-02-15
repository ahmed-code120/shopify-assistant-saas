
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, SubscriptionPlan } from '../types';
import { ICONS } from '../constants';

interface SignupProps {
  onLogin: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email: email || 'new-user@storeboost.ai',
      plan: SubscriptionPlan.FREE,
      creditsRemaining: 10,
      totalCredits: 10,
      role: 'user'
    };
    onLogin(mockUser);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 flex-col justify-center px-20 relative bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-20 group">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center neon-red group-hover:scale-110 transition-transform">
              <ICONS.Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl">StoreBoost <span className="text-brand-red">AI</span></span>
          </Link>
          <h1 className="text-6xl font-black leading-[1.1] mb-8 tracking-tighter">Scale Your Store to the <span className="text-brand-red neon-text-red">Edge</span> of Intelligence.</h1>
          <p className="text-lg text-brand-muted max-w-lg mb-12">Harness AI-driven analytics and automated growth tools to outperform the competition. Join 10,000+ merchants scaling with neural insights.</p>
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <ICONS.Check className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <ICONS.Check className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">7-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <ICONS.Check className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-brand-black">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black mb-2 tracking-tighter">Create your account</h2>
            <p className="text-brand-muted">Experience the future of e-commerce automation.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 px-6 focus:border-brand-red transition-colors outline-none font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="Min. 8 characters"
                className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 px-6 focus:border-brand-red transition-colors outline-none font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Repeat your password"
                className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 px-6 focus:border-brand-red transition-colors outline-none font-medium"
                required
              />
            </div>

            <button type="submit" className="w-full bg-brand-red hover:bg-brand-glow text-white font-black py-5 rounded-2xl neon-red transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
              Launch Your Growth <ICONS.Rocket className="w-6 h-6" />
            </button>
          </form>

          <p className="text-center mt-10 text-xs text-brand-muted">
            Already have an account? <Link to="/login" className="text-brand-red font-bold hover:underline">Log In.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
