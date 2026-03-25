import { motion } from 'motion/react';
import { 
  Languages, 
  BookOpen, 
  Mic, 
  Network, 
  Calendar, 
  BookMarked,
  Plus
} from 'lucide-react';

export default function Curriculum() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto"
    >
      <section className="py-12 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="font-headline text-5xl mb-4 text-on-surface">Academic Trajectory</h2>
          <p className="text-on-surface-variant max-w-2xl font-body text-lg leading-relaxed">
            The current semester focuses on <span className="text-primary italic">Proto-Indo-European</span> etymologies and comparative syntax. Your mastery across all linguistics modules is trending 14% higher than the previous quarter.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 flex items-end justify-end">
          <div className="bg-surface-container-low p-6 w-full max-w-xs border-b-2 border-primary/20">
            <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-1">Total Research Time</p>
            <p className="text-4xl font-headline italic text-primary">142h <span className="text-lg text-on-surface-variant">/ 200h</span></p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { icon: <Languages className="text-primary" />, title: 'Panglossia', sub: 'Translation Mastery', progress: 72, next: 'Old Norse Vowels', badge: 'Level 4' },
          { icon: <BookOpen className="text-secondary" />, title: 'Wordhord', sub: 'Lexical Archive', progress: 45, next: 'Germanic Root Shift', badge: '9.2k Lexemes' },
          { icon: <Mic className="text-primary" />, title: 'Fonetik', sub: 'Acoustic Analysis', progress: 88, next: 'Glottal Stop Refinement', badge: 'Active' },
          { icon: <Network className="text-outline" />, title: 'Struktur', sub: 'Syntactic Trees', progress: 12, next: 'Phrase Structure Rules', badge: 'Drafting' },
        ].map((mod, i) => (
          <div key={i} className="bg-surface-container-low p-8 flex flex-col justify-between group hover:bg-surface-container transition-colors duration-300">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-2 bg-surface-container-high">{mod.icon}</div>
                <span className="text-[9px] bg-primary-container text-on-primary-container px-2 py-0.5 tracking-tighter uppercase">{mod.badge}</span>
              </div>
              <h3 className="font-headline text-2xl mb-2">{mod.title}</h3>
              <p className="text-[10px] text-on-surface-variant mb-6 uppercase tracking-widest">{mod.sub}</p>
              <div className="space-y-4">
                <div className="relative h-[1px] w-full bg-surface-container-highest">
                  <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${mod.progress}%` }}></div>
                </div>
                <p className="text-[10px] text-on-surface-variant">{mod.progress}% Completed</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-[10px] font-headline italic text-primary">Next: {mod.next}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-7 bg-surface-container-low p-10">
          <div className="flex justify-between items-baseline mb-12">
            <h4 className="font-headline text-2xl italic">Mastery Progression</h4>
            <span className="text-[10px] tracking-[0.2em] text-on-surface-variant">JUL — DEC 2024</span>
          </div>
          <div className="relative h-64 w-full flex items-end gap-2">
            {[30, 45, 40, 65, 85, 95].map((h, i) => (
              <div key={i} className={`flex-1 relative group transition-all duration-500 ${i === 4 ? 'bg-primary/40 border-t-2 border-primary' : 'bg-primary/10'}`} style={{ height: `${h}%` }}>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {i === 4 && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-[10px] text-primary font-bold italic">Now</div>}
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-8">
            {[
              { label: 'Consistency', val: '98.4%' },
              { label: 'Peer Percentile', val: 'Top 2%' },
              { label: 'Certificates', val: '12 Earned' }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant mb-1">{stat.label}</p>
                <p className="text-xl font-headline">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-8">
          <div>
            <h4 className="font-headline text-2xl italic mb-6">Scholarly Agenda</h4>
            <div className="space-y-1">
              {[
                { time: '09:00', title: 'Morphological Review', sub: 'Struktur Module — Root Identification' },
                { time: '11:30', title: 'Wordhord Expansion', sub: 'Import 200 Greek loanwords' },
                { time: '15:00', title: 'Voice Modulation Lab', sub: 'Fonetik — Recording Session #42' }
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-surface-container-highest transition-colors group cursor-pointer border-l border-transparent hover:border-primary">
                  <span className="text-[10px] font-medium text-primary tracking-widest">{task.time}</span>
                  <div>
                    <p className="text-sm font-semibold">{task.title}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{task.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container p-6 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[9px] uppercase tracking-[0.2em] text-primary mb-2">Research Focus</p>
              <h5 className="text-xl font-headline leading-snug mb-4 italic">"The evolution of the dative case in late-period Gothic scriptures."</h5>
              <button className="bg-primary text-on-primary px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">Open Archives</button>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <BookMarked size={120} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h4 className="font-headline text-3xl">Recent Lexical Acquisitions</h4>
            <p className="text-on-surface-variant text-sm mt-2 font-body italic">New entries added to your private Wordhord in the last 24 hours.</p>
          </div>
          <button className="text-[10px] text-primary hover:underline underline-offset-4 tracking-widest uppercase font-bold">View Archive</button>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6">
          {[
            { lang: 'Old High German', word: 'Himil', desc: 'The sky or heavens. Cognate with English "heaven".', tags: ['Noun', 'Common'] },
            { lang: 'Sanskrit', word: 'Vāk', desc: 'Voice or speech. Personified as a goddess in Vedic texts.', tags: ['Feminine', 'Root'] },
            { lang: 'Proto-Slavic', word: 'Slovo', desc: 'Word or letter. Originally "that which is spoken".', tags: ['Neuter', 'Abstract'] },
            { lang: 'Latin', word: 'Lumen', desc: 'Light, especially as shed by a source; an opening.', tags: ['Third-decl', 'Physics'] }
          ].map((item, i) => (
            <div key={i} className="min-w-[280px] bg-surface-container-low p-6 border-t border-primary/20">
              <p className="text-[10px] font-headline italic text-primary mb-1">{item.lang}</p>
              <h5 className="text-2xl font-bold mb-3 tracking-tight">{item.word}</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4 font-body">{item.desc}</p>
              <div className="flex gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-surface-container-highest text-[9px] uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="fixed bottom-12 right-12 w-14 h-14 bg-primary text-on-primary scholarly-shadow flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50">
        <Plus size={24} />
      </button>
    </motion.div>
  );
}
