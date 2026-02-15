
import React from 'react';
import { User } from '../types';
import { ICONS } from '../constants';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-black uppercase tracking-tight italic">System <span className="text-brand-red">Settings</span></h1>
      <p className="text-brand-muted text-sm font-mono uppercase tracking-[0.2em] -mt-6">Configure your Cyber SaaS engine performance, security protocols, and Intelligence Integration.</p>
      
      <div className="grid lg:grid-cols-12 gap-8 mt-10">
        {/* Navigation Tabs */}
        <div className="lg:col-span-3 space-y-4">
          {[
            { name: 'Profile', active: true, icon: <ICONS.Dashboard className="w-4 h-4" /> },
            { name: 'Password', icon: <ICONS.Settings className="w-4 h-4" /> },
            { name: 'Notifications', icon: <ICONS.History className="w-4 h-4" /> },
            { name: 'API Keys', icon: <ICONS.Link className="w-4 h-4" /> },
            { name: 'Support Center', icon: <ICONS.Rocket className="w-4 h-4" /> },
          ].map((tab, i) => (
            <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              tab.active ? 'bg-brand-red/10 text-brand-red border border-brand-red/30' : 'text-brand-muted hover:text-white hover:bg-white/5'
            }`}>
              {tab.icon} {tab.name}
            </button>
          ))}

          <div className="mt-10 glass-card p-6 rounded-3xl border-l-4 border-l-brand-red">
            <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest mb-4">AI Compute Credits</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-black tracking-tighter">84.2%</span>
              <div className="h-1 flex-1 bg-white/10 rounded-full mb-2">
                <div className="h-full bg-brand-red neon-red w-[84%]" />
              </div>
            </div>
            <p className="text-[8px] text-brand-muted font-mono leading-tight uppercase">System performance is optimized. Upgrade to Ultra Tier for real-time model training.</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-9 space-y-8">
          <div className="glass-card p-10 rounded-[40px]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black uppercase tracking-tight">Profile Information</h3>
              <div className="flex gap-4">
                 <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                   <ICONS.History className="w-4 h-4" /> Documentation
                 </button>
                 <button className="bg-brand-red text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest neon-red">
                   Save Changes
                 </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="relative group shrink-0">
                  <img src={user.avatar || `https://picsum.photos/seed/${user.id}/200/200`} className="w-32 h-32 rounded-3xl border-2 border-brand-red p-1 grayscale group-hover:grayscale-0 transition-all object-cover" />
                  <button className="absolute -bottom-2 -right-2 bg-brand-red p-2 rounded-lg neon-red"><ICONS.Generate className="w-4 h-4 text-white" /></button>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block mb-2">Full Identity</label>
                      <input type="text" defaultValue="Alex Sterling" className="w-full bg-brand-black border border-white/10 rounded-xl p-4 text-sm font-bold focus:border-brand-red outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block mb-2">Network Alias</label>
                      <div className="relative">
                         <ICONS.Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                         <input type="text" defaultValue="asterling_boost" className="w-full bg-brand-black border border-white/10 rounded-xl p-4 pl-12 text-sm font-bold focus:border-brand-red outline-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block mb-2">Communication Protocol (Email)</label>
                    <input type="email" defaultValue={user.email} className="w-full bg-brand-black border border-white/10 rounded-xl p-4 text-sm font-bold focus:border-brand-red outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block mb-2">System Bio</label>
                <textarea rows={3} className="w-full bg-brand-black border border-white/10 rounded-xl p-4 text-sm font-medium focus:border-brand-red outline-none resize-none" placeholder="Enter your mission statement..." defaultValue="Head of Operations at StoreBoost. Specialized in AI logistics and marketplace scaling." />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block mb-2">Intelligence Language</label>
                  <select className="w-full bg-brand-black border border-white/10 rounded-xl p-4 text-sm font-bold focus:border-brand-red outline-none appearance-none cursor-pointer">
                    <option>English (Global)</option>
                    <option>French (Regional)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block mb-2">Timezone Synchronization</label>
                  <select className="w-full bg-brand-black border border-white/10 rounded-xl p-4 text-sm font-bold focus:border-brand-red outline-none appearance-none cursor-pointer">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-brand-red/20 flex items-center justify-between border-dashed">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center neon-red"><ICONS.Rocket className="w-6 h-6 text-white" /></div>
                <div>
                   <p className="font-black text-sm uppercase tracking-tight">Neural Override Mode</p>
                   <p className="text-[10px] text-brand-muted uppercase font-mono tracking-widest">Bypass standard safety checks for 2x faster AI campaign generation.</p>
                </div>
             </div>
             <button className="w-12 h-6 bg-brand-red rounded-full relative shadow-inner p-1">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
             </button>
          </div>

          <div className="glass-card p-10 rounded-[40px]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-4"><ICONS.Link className="w-6 h-6 text-brand-red" /> API Configuration</h3>
               <button className="text-[10px] font-black text-brand-red uppercase tracking-widest hover:underline italic">Full Panel</button>
            </div>
            <div className="space-y-6">
               <div className="bg-brand-dark p-6 rounded-3xl border border-white/5 group">
                  <div className="flex justify-between items-center mb-4">
                     <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Primary Production Key</p>
                     <span className="text-[8px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded uppercase">Active</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex-1 bg-brand-black border border-white/10 rounded-xl p-4 font-mono text-xs text-brand-muted select-none">
                       sb_live_••••••••••••••••••••••••••••••••
                     </div>
                     <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Show</button>
                     <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Copy</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
