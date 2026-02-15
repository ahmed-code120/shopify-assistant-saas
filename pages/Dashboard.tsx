
import React from 'react';
import { User, GenerationRecord } from '../types';
import { ICONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  user: User;
  generations: GenerationRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, generations }) => {
  const data = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 },
  ];

  const stats = [
    { label: 'Total Generations', value: (generations.length + 14205).toLocaleString(), change: '+12.5%', icon: <ICONS.Generate /> },
    { label: 'Success Rate', value: '98.4%', change: 'Stable', icon: <ICONS.Check /> },
    { label: 'Active Campaigns', value: '12', change: '-2', icon: <ICONS.Rocket /> },
    { label: 'Peak Load', value: '2.4k', change: '+0.8%', icon: <ICONS.Dashboard /> },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Performance <span className="text-brand-red italic">Terminal</span></h1>
          <p className="text-brand-muted text-sm font-mono flex items-center gap-2">
            Operational status: <span className="text-green-500 font-bold uppercase tracking-wider">Optimal</span>. All systems running.
          </p>
        </div>
        <button className="bg-brand-red hover:bg-brand-glow px-6 py-4 rounded-xl font-black text-sm neon-red transition-all flex items-center gap-3">
          <ICONS.Generate className="w-5 h-5" /> GENERATE NEW CONTENT
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border-t-2 border-t-brand-red/20 group hover:border-t-brand-red transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">{stat.label}</span>
              <div className="p-2 bg-brand-red/10 rounded-lg text-brand-red group-hover:scale-110 transition-transform">
                {/* Fixed Type Error: Explicitly cast to React.ReactElement<any> to allow passing className during cloning */}
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black tracking-tighter">{stat.value}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-brand-red/10 text-brand-red'}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-red neon-red w-2/3" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Stats Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">Generation Velocity</h3>
              <p className="text-[10px] text-brand-muted font-mono uppercase tracking-[0.2em] mt-1">Operational Throughput (7 Days)</p>
            </div>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold px-3 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-widest">Week</button>
              <button className="text-[10px] font-bold px-3 py-1 rounded-md text-brand-muted hover:text-white uppercase tracking-widest">Month</button>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 30, 60, 0.05)' }}
                  contentStyle={{ backgroundColor: '#111116', border: '1px solid rgba(255, 30, 60, 0.2)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#FF1E3C' : 'rgba(255, 30, 60, 0.3)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 text-[120px] font-black text-brand-red whitespace-nowrap overflow-hidden italic select-none uppercase tracking-tighter">
            PEAK PERFORMANCE
          </div>
        </div>

        {/* Engine Insights */}
        <div className="glass-card p-8 rounded-3xl flex flex-col">
          <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Engine Insights</h3>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Copywriting Engine', sub: '4,120 generations today', icon: <ICONS.Generate className="w-5 h-5" />, color: 'text-brand-red', bg: 'bg-brand-red/10' },
              { label: 'Visual Synthesis', sub: '850 assets generated', icon: <ICONS.Dashboard className="w-5 h-5" />, color: 'text-green-500', bg: 'bg-green-500/10' },
              { label: 'Ad Optimizer', sub: '12 ongoing optimizations', icon: <ICONS.Link className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight uppercase">{item.label}</p>
                  <p className="text-[10px] text-brand-muted font-mono">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-auto py-4 text-[10px] font-bold text-brand-red uppercase tracking-[0.2em] border border-brand-red/20 rounded-xl hover:bg-brand-red/10 transition-colors flex items-center justify-center gap-2 group">
            View Full Breakdown <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>

      {/* Recent Generations Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-black uppercase tracking-tight">Recent Generations</h3>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search logs..." className="bg-brand-dark border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:border-brand-red transition-all outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest pl-8">Output ID</th>
                <th className="p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest">Type</th>
                <th className="p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest">Engine</th>
                <th className="p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest">Timestamp</th>
                <th className="p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest">Status</th>
                <th className="p-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#SB-9482-AD', type: 'Facebook Ad Copy', engine: 'Llama-3-Store', time: '2 mins ago', status: 'Completed' },
                { id: '#SB-9481-IM', type: 'Product Hero Banner', engine: 'SDXL-Custom', time: '14 mins ago', status: 'Completed' },
                { id: '#SB-9480-TX', type: 'Email Campaign Seq', engine: 'GPT-4-Boost', time: '1 hour ago', status: 'Archived' },
                { id: '#SB-9479-AD', type: 'Landing Page Copy', engine: 'Llama-3-Store', time: 'Processing', status: 'Pending' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-6 pl-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${row.status === 'Pending' ? 'bg-orange-500 animate-pulse' : 'bg-brand-red'}`} />
                      <span className="font-mono text-xs font-bold">{row.id}</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-medium">{row.type}</td>
                  <td className="p-6">
                    <span className="text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-1 rounded uppercase tracking-widest text-brand-muted">{row.engine}</span>
                  </td>
                  <td className="p-6 text-xs text-brand-muted font-mono">{row.time}</td>
                  <td className="p-6">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                      row.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                      row.status === 'Archived' ? 'bg-brand-muted/10 text-brand-muted' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-6 pr-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-brand-muted hover:text-white"><ICONS.History className="w-4 h-4" /></button>
                      <button className="p-2 text-brand-muted hover:text-brand-red"><ICONS.Billing className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-white/5 flex justify-between items-center text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] px-8">
          <span>Showing top 4 entries</span>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Prev</button>
            <button className="text-brand-red">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
