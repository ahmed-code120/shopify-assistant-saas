
import React from 'react';
import { User, SubscriptionPlan } from '../types';
import { ICONS } from '../constants';

interface BillingProps {
  user: User;
}

const Billing: React.FC<BillingProps> = ({ user }) => {
  const plans = [
    { name: SubscriptionPlan.STARTER, price: '$49', credits: '1,000', model: 'Basic', features: ['Analytics (24h)', 'Standard Support'] },
    { name: SubscriptionPlan.GROWTH, price: '$199', credits: '5,000', model: 'Advanced Neural', features: ['Real-time Analytics', 'Priority Feed', 'API Access', 'Dedicated Support'], active: true },
    { name: SubscriptionPlan.PRO, price: '$599', credits: 'Unlimited', model: 'Custom Training', features: ['Enterprise Scale', 'White Label Options', 'Team Management'] },
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-5xl font-black uppercase tracking-tight italic mb-2">Cyber Command <span className="text-brand-red">Center</span></h1>
        <p className="text-brand-muted font-mono uppercase tracking-[0.4em] text-xs">Manage Subscription & Resource Allocation</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-[40px] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-4 right-6 bg-brand-red/10 text-brand-red text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Active</div>
          <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] mb-4">Current Status</p>
          <h3 className="text-3xl font-black tracking-tighter mb-1 uppercase italic">Growth Plan</h3>
          <p className="text-xs text-brand-muted uppercase font-bold tracking-widest mb-6">Cybernetic enhancement active</p>
          <p className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">Next Cycle: Oct 24, 2023</p>
        </div>

        <div className="glass-card p-8 rounded-[40px] border border-white/5 flex flex-col justify-between">
           <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">Neural Credits</p>
              <p className="text-[10px] font-mono text-brand-red">{user.creditsRemaining.toLocaleString()} / {user.totalCredits.toLocaleString()}</p>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-brand-red h-full rounded-full neon-red" style={{ width: '72%' }} />
            </div>
            <p className="text-[8px] font-mono text-brand-muted uppercase tracking-widest">Resets in 12 days</p>
           </div>
           <button className="w-full mt-6 text-[10px] font-bold text-brand-red uppercase tracking-widest hover:underline text-left">Buy More Credits →</button>
        </div>

        <div className="glass-card p-8 rounded-[40px] border border-white/5 relative bg-brand-red overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-4 relative z-10">Unleash the full potential of your AI with Enterprise access.</p>
          <button className="bg-white text-brand-red font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest relative z-10 shadow-2xl hover:scale-105 transition-transform">
            UPGRADE TO ENTERPRISE
          </button>
        </div>
      </div>

      <div className="glass-card p-10 rounded-[40px] border border-white/5">
        <h3 className="text-2xl font-black mb-10 flex items-center gap-4 uppercase italic tracking-tight">
          <ICONS.History className="w-8 h-8 text-brand-red" /> Plan Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">Feature Matrix</th>
                {plans.map(p => (
                  <th key={p.name} className="py-6 text-center">
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-1">{p.name}</p>
                    <p className={`text-xl font-black tracking-tighter ${p.active ? 'text-brand-red' : ''}`}>{p.price}<span className="text-[10px] font-bold text-brand-muted">/mo</span></p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm font-bold">
              {[
                { name: 'Monthly Credits', starter: '1,000', growth: '5,000', pro: 'Unlimited' },
                { name: 'AI Model Access', starter: 'Basic', growth: 'Advanced Neural', pro: 'Custom Training', highlight: true },
                { name: 'Analytics Refresh', starter: '24 Hours', growth: 'Real-time', pro: 'Priority Feed' },
                { name: 'API Access', starter: false, growth: true, pro: true },
                { name: 'Dedicated Support', starter: false, growth: true, pro: true },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 group hover:bg-white/2 transition-colors">
                  <td className="py-6 text-brand-muted uppercase tracking-widest text-xs">{row.name}</td>
                  <td className="py-6 text-center">{typeof row.starter === 'boolean' ? (row.starter ? <ICONS.Check className="w-5 h-5 mx-auto text-green-500" /> : <svg className="w-5 h-5 mx-auto text-brand-muted/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>) : row.starter}</td>
                  <td className={`py-6 text-center ${row.highlight ? 'text-brand-red italic' : ''}`}>{typeof row.growth === 'boolean' ? (row.growth ? <ICONS.Check className="w-5 h-5 mx-auto text-green-500" /> : 'X') : row.growth}</td>
                  <td className="py-6 text-center">{typeof row.pro === 'boolean' ? (row.pro ? <ICONS.Check className="w-5 h-5 mx-auto text-green-500" /> : 'X') : row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[40px] border border-white/5">
          <h3 className="text-xl font-black mb-8 flex items-center gap-4 uppercase italic tracking-tight">
             <ICONS.Billing className="w-6 h-6 text-brand-red" /> Payment Method
          </h3>
          <div className="p-6 bg-brand-dark rounded-3xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-brand-black border border-white/10 rounded-md flex items-center justify-center font-bold italic text-xs">VISA</div>
              <div>
                <p className="font-bold text-sm tracking-tight">VISA Ending in 4242</p>
                <p className="text-[10px] text-brand-muted uppercase font-mono mt-1">Expires 12/26</p>
              </div>
            </div>
            <button className="text-[10px] font-black text-brand-red uppercase tracking-widest hover:underline">Edit</button>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[40px] border border-white/5">
          <h3 className="text-xl font-black mb-8 flex items-center gap-4 uppercase italic tracking-tight">
             <ICONS.History className="w-6 h-6 text-brand-red" /> Recent Invoices
          </h3>
          <div className="space-y-4">
            {[
              { id: '#8829', date: 'Sep 24, 2023', amount: '$199.00' },
              { id: '#8712', date: 'Aug 24, 2023', amount: '$199.00' },
            ].map(inv => (
              <div key={inv.id} className="flex justify-between items-center py-3 border-b border-white/5 group hover:bg-white/2 px-2 transition-all cursor-pointer">
                <div>
                  <p className="text-xs font-bold tracking-tight">Inv {inv.id} - {inv.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-brand-red">{inv.amount}</span>
                  <ICONS.History className="w-4 h-4 text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center py-10 border-t border-white/5 space-y-4">
        <p className="text-[10px] text-brand-muted font-mono tracking-widest uppercase">© 2023 StoreBoost AI - System Version 4.0.2</p>
        <div className="flex justify-center gap-8 text-[10px] font-black text-brand-muted uppercase tracking-widest">
           <button className="hover:text-white transition-colors">Download Terms of Service</button>
           <button className="text-brand-red hover:underline">Cancel Subscription</button>
        </div>
      </footer>
    </div>
  );
};

export default Billing;
