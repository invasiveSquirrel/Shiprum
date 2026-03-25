import { motion } from 'motion/react';
import { Database, Zap, CheckCircle2, Plus } from 'lucide-react';

export default function Analysis() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-[1400px] mx-auto"
    >
      <div className="mb-12 border-b border-outline-variant/10 pb-12">
        <h2 className="text-6xl font-headline font-extrabold text-on-surface mb-4">Comparative Etymology Engine</h2>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed font-body">
          Analyzing the phonetic drift and semantic shifts of Indo-European roots across the <span className="italic text-primary">Šiprum</span> database. Use the navigation strip to pivot between active modules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Analysis */}
        <section className="lg:col-span-8 bg-surface-container-low p-8 scholarly-shadow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline text-2xl italic">Current Analysis: Proto-Germanic Roots</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-high text-[9px] uppercase tracking-widest text-primary border border-primary/20">Deep Scan</span>
              <span className="px-3 py-1 bg-surface-container-high text-[9px] uppercase tracking-widest text-secondary border border-secondary/20">Verified</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { 
                root: '*wer- (to turn)', 
                conf: '98%', 
                desc: 'Evolutionary path through Old Norse <span class="text-primary italic">verða</span> to Modern English <span class="text-primary italic">worth</span> and German <span class="text-primary italic">werden</span>.' 
              },
              { 
                root: '*bhel- (to bloom)', 
                conf: '84%', 
                desc: 'Mapping phonetic shifts into Greek <span class="text-primary italic">phyllon</span> and Latin <span class="text-primary italic">folium</span>.' 
              },
              { 
                root: '*skei- (to cut)', 
                conf: '92%', 
                desc: 'Direct lineages found in <span class="text-primary italic">science</span>, <span class="text-primary italic">schism</span>, and <span class="text-primary italic">shit</span>.' 
              }
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-surface-container-lowest hover:bg-surface-container-highest transition-colors cursor-pointer border-l-2 border-primary/40">
                <div className="flex justify-between mb-2">
                  <span className="font-headline text-xl text-primary">{item.root}</span>
                  <span className="font-label text-[10px] text-outline italic">Confidence: {item.conf}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </section>

        {/* Database Health */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-primary-container/10 p-8 border border-primary/10">
            <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-6">Database Health</h4>
            <div className="flex flex-col gap-6">
              {[
                { val: '12.4k', label: 'Lexemes Indexed' },
                { val: '89%', label: 'Cross-Reference Accuracy' },
                { val: '4.2s', label: 'Latent Processing Speed' }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-end border-b border-outline-variant/10 pb-2">
                  <span className="text-4xl font-headline font-bold">{stat.val}</span>
                  <span className="text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden scholarly-shadow group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvIB5etwbNJwmjYwWxo_wNYAUKQPMa8-PyT_r7UBJwLMCe4VZu1J-Sa1gv1QUhtM4Ai2G5NY2O-a6qAoNJQ8g-xnNq0IxMImlI0__kCPPBPUjSTiSqwOdWtK5bKEAq8BbldNZCU2vELUnFr8FudV_IgH3obazF52ed-lNAoCTEgIHYtFvfT19pgYQ1tt_O8FruOw3WhxWVjp-byxizfo2d6o0lBLZJnCA8p_2wxNDNkoPjHQIfbEz0_ZEmnQGPriqRHPGGJgTPpt0" 
              alt="Manuscript"
              className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent p-6 flex flex-col justify-end">
              <p className="font-headline italic text-xl text-on-surface leading-snug">
                "The word is a living organism, evolving through the breath of its speakers."
              </p>
            </div>
          </div>
        </aside>
      </div>

      <button className="fixed bottom-12 right-12 w-14 h-14 bg-primary text-on-primary scholarly-shadow flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50">
        <Plus size={24} />
      </button>
    </motion.div>
  );
}
