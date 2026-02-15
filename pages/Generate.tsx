
import React, { useState } from 'react';
import { User, GenerationRecord, GenerationResult } from '../types';
import { ICONS } from '../constants';
import { generateProductCopy } from '../services/geminiService';

interface GenerateProps {
  user: User;
  onGenerated: (record: GenerationRecord) => void;
}

const Generate: React.FC<GenerateProps> = ({ user, onGenerated }) => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('English (US)');
  const [tone, setTone] = useState('Persuasive');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await generateProductCopy(url, language, tone);
      setResult(data);
      
      const newRecord: GenerationRecord = {
        id: `SB-${Math.random().toString(36).substring(7).toUpperCase()}`,
        product_url: url,
        content: data,
        language,
        tone,
        created_at: new Date().toISOString(),
        status: 'completed'
      };
      onGenerated(newRecord);
    } catch (err: any) {
      setError(err.message || "Failed to generate content. Please ensure your API key is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header Form */}
      <div className="glass-card p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
        
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-5">
            <label className="block text-[10px] font-black text-brand-red uppercase tracking-widest mb-4 ml-1">Shopify Product URL</label>
            <div className="relative">
              <ICONS.Link className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-muted" />
              <input 
                type="text" 
                placeholder="https://your-store.myshopify.com/products/..."
                className="w-full bg-brand-black border border-white/10 rounded-2xl py-5 pl-14 pr-4 focus:border-brand-red transition-all outline-none font-medium placeholder:text-brand-muted/40"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[10px] font-black text-brand-muted uppercase tracking-widest mb-4 ml-1">Language</label>
            <select 
              className="w-full bg-brand-black border border-white/10 rounded-2xl py-5 px-6 focus:border-brand-red transition-all outline-none font-bold text-sm appearance-none cursor-pointer"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>French</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[10px] font-black text-brand-muted uppercase tracking-widest mb-4 ml-1">Tone of Voice</label>
            <select 
              className="w-full bg-brand-black border border-white/10 rounded-2xl py-5 px-6 focus:border-brand-red transition-all outline-none font-bold text-sm appearance-none cursor-pointer"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Persuasive</option>
              <option>Direct Response</option>
              <option>Luxury & Elite</option>
              <option>Energetic</option>
              <option>Scientific</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <button 
              onClick={handleGenerate}
              disabled={loading || !url}
              className={`w-full bg-brand-red hover:bg-brand-glow text-white font-black py-5 rounded-2xl neon-red transition-all flex items-center justify-center gap-4 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ICONS.Generate className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} /> 
              {loading ? 'Optimizing...' : 'Generate Content'}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="relative">
             <div className="w-24 h-24 border-4 border-white/5 border-t-brand-red rounded-full animate-spin neon-red" />
             <div className="absolute inset-0 flex items-center justify-center">
                <ICONS.Rocket className="w-8 h-8 text-brand-red animate-pulse" />
             </div>
          </div>
          <div>
            <p className="text-xl font-black uppercase tracking-tight">Analyzing Shopify metadata & optimizing conversion vectors...</p>
            <p className="text-brand-muted text-sm font-mono mt-2 uppercase tracking-widest">Targeting: ${tone} Protocol in ${language}</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-brand-red/10 border border-brand-red/30 p-8 rounded-3xl text-center">
          <p className="text-brand-red font-black uppercase tracking-tight mb-2">Neural Link Failure</p>
          <p className="text-brand-muted text-sm">{error}</p>
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Description */}
            <div className="lg:col-span-8 glass-card p-10 rounded-[40px] relative border-l-4 border-l-brand-red">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <ICONS.History className="w-6 h-6 text-brand-red" />
                  <h3 className="text-xl font-black uppercase tracking-tight">Product Description</h3>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><ICONS.Link className="w-4 h-4" /></button>
                   <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors rotate-180"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                </div>
              </div>

              <h2 className="text-3xl font-black mb-6 tracking-tight leading-tight">{result.headline}</h2>
              <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
                {result.description.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-white/5">
                <h4 className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-6">Key Conversion Benefits</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.bullet_points.map((bp, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-red/30 transition-all">
                      <ICONS.Check className="w-5 h-5 text-brand-red mt-0.5 shrink-0" />
                      <span className="text-sm font-bold tracking-tight">{bp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 p-6 bg-brand-red/10 rounded-2xl border border-brand-red/20 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em] mb-1">Optimized Call to Action</p>
                  <p className="text-lg font-black tracking-tight">{result.cta_line}</p>
                </div>
                <button className="bg-brand-red text-white p-3 rounded-xl neon-red hover:scale-105 transition-transform">
                  <ICONS.Rocket className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* SEO Panel */}
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-card p-8 rounded-[40px]">
                <div className="flex items-center gap-3 mb-6">
                  <ICONS.Link className="w-6 h-6 text-brand-red" />
                  <h3 className="text-xl font-black uppercase tracking-tight">SEO Metadata</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">SEO Title</label>
                      <span className="text-[10px] font-mono text-brand-red">{result.seo_title.length}/60 chars</span>
                    </div>
                    <div className="bg-brand-black p-4 rounded-xl border border-white/5 font-bold text-sm leading-tight text-brand-red">
                      {result.seo_title}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Meta Description</label>
                      <span className="text-[10px] font-mono text-brand-red">{result.meta_description.length}/160 chars</span>
                    </div>
                    <div className="bg-brand-black p-4 rounded-xl border border-white/5 text-xs text-brand-muted leading-relaxed">
                      {result.meta_description}
                    </div>
                  </div>

                  <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                    COPY META DATA
                  </button>
                </div>
              </div>

              <div className="glass-card p-8 rounded-[40px] border border-brand-red/20 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-2 h-full bg-brand-red" />
                 <h4 className="text-sm font-black uppercase tracking-tight mb-2">Pro Optimization Tip</h4>
                 <p className="text-xs text-brand-muted leading-relaxed">This copy is tuned for {tone} psychology. Combine with high-quality lifestyle imagery to maximize the LTV of every visitor.</p>
                 <div className="mt-4 flex gap-2">
                   <span className="px-2 py-1 rounded bg-brand-red/10 text-brand-red text-[8px] font-bold uppercase tracking-widest">Growth+ Verified</span>
                   <span className="px-2 py-1 rounded bg-white/5 text-brand-muted text-[8px] font-bold uppercase tracking-widest">Direct Response</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Generate;
