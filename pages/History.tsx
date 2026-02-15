
import React from 'react';
import { GenerationRecord } from '../types';
import { ICONS } from '../constants';

interface HistoryProps {
  generations: GenerationRecord[];
}

const History: React.FC<HistoryProps> = ({ generations }) => {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase italic">AI Generation <span className="text-brand-red">History</span></h1>
          <p className="text-brand-muted text-sm font-mono">
            Real-time overview of your AI-powered storefront optimizations. Total entries: <span className="text-brand-red font-bold">{generations.length + 1248}</span>
          </p>
        </div>
        <button className="bg-brand-red hover:bg-brand-glow px-6 py-4 rounded-xl font-black text-sm neon-red transition-all flex items-center gap-3">
          <ICONS.Generate className="w-5 h-5" /> NEW GENERATION
        </button>
      </div>

      <div className="glass-card rounded-[40px] overflow-hidden border border-white/5">
        <div className="p-8 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between bg-white/5">
           <div className="flex-1 min-w-[300px] relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Filter by Product URL, Date, or ID..." className="w-full bg-brand-black border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs focus:border-brand-red transition-all outline-none" />
          </div>
          <div className="flex gap-4">
            <select className="bg-brand-dark border border-white/10 rounded-xl py-2 px-4 text-xs font-bold uppercase tracking-widest appearance-none cursor-pointer">
              <option>All Languages</option>
              <option>English</option>
              <option>French</option>
            </select>
            <select className="bg-brand-dark border border-white/10 rounded-xl py-2 px-4 text-xs font-bold uppercase tracking-widest appearance-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2">
                <th className="p-6 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] pl-10">Product URL</th>
                <th className="p-6 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Date Generated</th>
                <th className="p-6 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Lang</th>
                <th className="p-6 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Status</th>
                <th className="p-6 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {generations.map((gen, idx) => (
                <tr key={gen.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-8 pl-10">
                    <div>
                      <p className="text-sm font-bold text-brand-red hover:underline cursor-pointer truncate max-w-xs">{gen.product_url}</p>
                      <p className="text-[10px] text-brand-muted font-mono mt-1 uppercase tracking-widest">ID: {gen.id}</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <p className="text-xs font-bold">{new Date(gen.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-[10px] text-brand-muted font-mono mt-1">{new Date(gen.created_at).toLocaleTimeString()}</p>
                  </td>
                  <td className="p-8">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-black">{gen.language.substring(0, 2).toUpperCase()}</span>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-brand-red neon-red" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">Live</span>
                    </div>
                  </td>
                  <td className="p-8 pr-10 text-right">
                    <div className="flex justify-end gap-3">
                       <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><ICONS.History className="w-4 h-4" /></button>
                       <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><ICONS.Billing className="w-4 h-4" /></button>
                       <button className="p-3 bg-white/5 hover:bg-brand-red/10 rounded-xl transition-all text-brand-muted hover:text-brand-red"><ICONS.Settings className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Mock placeholder if list is empty or for demo */}
              {[1, 2, 3, 4].map(i => (
                 <tr key={i} className="border-b border-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed group">
                  <td className="p-8 pl-10">
                    <div>
                      <p className="text-sm font-bold text-brand-red truncate max-w-xs">https://mystore.com/products/cyber-shade-{i}</p>
                      <p className="text-[10px] text-brand-muted font-mono mt-1 uppercase tracking-widest">ID: #SB-9823{i}-X</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <p className="text-xs font-bold">Oct {24 - i}, 2023</p>
                    <p className="text-[10px] text-brand-muted font-mono mt-1">14:22:10 GMT</p>
                  </td>
                  <td className="p-8">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-black">{i % 2 === 0 ? 'EN' : 'ES'}</span>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-brand-red' : 'bg-brand-muted'}`} />
                       <span className={`text-[10px] font-black uppercase tracking-widest ${i === 1 ? 'text-brand-red' : 'text-brand-muted'}`}>{i === 1 ? 'LIVE' : 'ARCHIVED'}</span>
                    </div>
                  </td>
                  <td className="p-8 pr-10 text-right">
                    <div className="flex justify-end gap-3">
                       <button className="p-3 bg-white/5 rounded-xl"><ICONS.History className="w-4 h-4" /></button>
                       <button className="p-3 bg-white/5 rounded-xl"><ICONS.Billing className="w-4 h-4" /></button>
                       <button className="p-3 bg-white/5 rounded-xl"><ICONS.Settings className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-brand-dark/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-brand-red rounded-lg"><ICONS.Rocket className="w-4 h-4 text-white" /></div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest">AI Optimizer Engine: Active</p>
               <p className="text-[8px] font-mono text-brand-muted uppercase">v2.4.1 stable - Last system sweep 4 mins ago.</p>
             </div>
          </div>
          <div className="flex gap-2">
             {[1, 2, 3, '...', 312].map((p, i) => (
               <button key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${p === 1 ? 'bg-brand-red text-white neon-red' : 'bg-white/5 text-brand-muted hover:text-white'}`}>
                 {p}
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
