
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full h-20 border-b border-white/5 bg-brand-black/80 backdrop-blur-xl z-50 px-6 lg:px-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center neon-red">
            <ICONS.Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tighter">STOREBOOST <span className="text-brand-red">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-bold text-brand-muted tracking-widest uppercase">
          <a href="#how" className="hover:text-brand-red transition-colors">How it works</a>
          <a href="#features" className="hover:text-brand-red transition-colors">Features</a>
          <a href="#pricing" className="hover:text-brand-red transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold hover:text-brand-red transition-colors">LOG IN</Link>
          <Link to="/signup" className="bg-brand-red hover:bg-brand-glow text-white px-6 py-3 rounded-xl font-bold text-sm neon-red transition-all">START FREE TRIAL</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest">New: Shopify 2.0 Optimized</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tighter">
              Turn Any Shopify Product Into a <span className="text-brand-red neon-text-red">High-Converting</span> Sales Machine
            </h1>
            <p className="text-lg text-brand-muted mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Optimize your Shopify store with AI-driven SEO and persuasive copy that converts visitors into customers instantly. No more guessing, just growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/signup" className="w-full sm:w-auto bg-brand-red hover:bg-brand-glow text-white px-10 py-5 rounded-2xl font-black text-lg neon-red transition-all flex items-center justify-center gap-3">
                START FREE TRIAL <ICONS.Generate className="w-6 h-6" />
              </Link>
              <button className="w-full sm:w-auto glass-card px-10 py-5 rounded-2xl font-black text-lg hover:border-brand-red/50 transition-all flex items-center justify-center gap-3">
                SEE HOW IT WORKS <ICONS.History className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start grayscale opacity-50">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-brand-black" alt="user" />
                ))}
              </div>
              <p className="text-xs font-bold text-brand-muted">Joined by 2,000+ Shopify merchants</p>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-red to-brand-glow rounded-3xl blur opacity-20" />
              <div className="glass-card rounded-3xl p-4 border border-white/5 relative">
                <img src="https://picsum.photos/seed/dashboard/1200/800" className="rounded-2xl w-full grayscale contrast-125 brightness-75 border border-white/5" alt="dashboard" />
                <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl neon-red border-brand-red/50">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-muted uppercase">Conversion Rate</p>
                        <p className="text-2xl font-black">+127%</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Dark Aggressive Style */}
      <section className="py-20 bg-brand-dark px-6 lg:px-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 tracking-tighter">The Conversion Killers Holding You Back</h2>
            <p className="text-brand-muted">Stop losing sales to these common Shopify mistakes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Slow Copywriting", desc: "Manually writing high-converting product descriptions for 100+ items takes weeks. Your business can't wait that long to scale." },
              { title: "Invisible SEO", desc: "Without optimized metadata and structured keywords, your products stay buried on page 10 of search results." },
              { title: "High Bounce Rates", desc: "Generic, uninspired product pages fail to build trust. Visitors leave within seconds without ever considering a purchase." }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-10 rounded-3xl border-l-4 border-l-brand-red hover:translate-y-[-5px] transition-transform">
                <div className="w-12 h-12 bg-brand-red/10 rounded-2xl flex items-center justify-center mb-8">
                  {idx === 0 && <ICONS.Generate className="w-6 h-6 text-brand-red" />}
                  {idx === 1 && <ICONS.Link className="w-6 h-6 text-brand-red" />}
                  {idx === 2 && <ICONS.Dashboard className="w-6 h-6 text-brand-red" />}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-brand-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 px-6 border-t border-white/5 text-center">
        <p className="text-xs text-brand-muted font-mono tracking-widest uppercase">© 2024 StoreBoost AI - System Version 2.0.4</p>
      </footer>
    </div>
  );
};

export default Landing;
