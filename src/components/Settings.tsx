import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Check,
  Layout,
  Star,
  Type,
  Globe,
  Plus,
  X
} from 'lucide-react';
import { useApp, Theme } from '../context';

export default function Settings() {
  const { 
    theme, setTheme, 
    fontFamily, setFontFamily, 
    fontSize, setFontSize,
    accentColor, setAccentColor,
    glassmorphism, setGlassmorphism,
    activeLanguages, setActiveLanguages
  } = useApp();

  const [newLang, setNewLang] = React.useState('');

  const themes: { id: Theme; name: string; colors: string[]; desc: string }[] = [
    { 
      id: 'siprum', 
      name: 'Šiprum Default', 
      colors: ['#0c0e11', '#cec6b5'], 
      desc: 'The original archeological aesthetic.' 
    },
    { 
      id: 'catppuccin', 
      name: 'Catppuccin Macchiato', 
      colors: ['#24273a', '#8aadf4'], 
      desc: 'Soothing dark pastel palette.' 
    },
    { 
      id: 'github', 
      name: 'GitHub Deep Dark', 
      colors: ['#010409', '#58a6ff'], 
      desc: 'High-contrast developer immersion.' 
    },
    { 
      id: 'ocean', 
      name: 'JetBrains Ocean', 
      colors: ['#001219', '#ee9b00'], 
      desc: 'Deep maritime professional theme.' 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <header className="mb-16 border-b border-outline-variant/10 pb-8">
        <h1 className="text-6xl font-headline italic mb-2 text-on-surface">Hub Configuration</h1>
        <p className="text-outline uppercase tracking-[0.3em] text-[10px]">Aesthetic &amp; Interface Parameters</p>
      </header>

      <div className="space-y-16">
        {/* Theme Selection */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <Palette className="text-primary" size={24} />
             <h2 className="text-2xl font-headline italic">Chromatic Presets</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex flex-col p-8 border text-left transition-all group relative ${
                  theme === t.id 
                    ? 'bg-primary/5 border-primary shadow-2xl' 
                    : 'bg-surface-container-low border-outline-variant/10 hover:border-primary/40'
                }`}
              >
                {theme === t.id && (
                  <div className="absolute top-4 right-4 bg-primary text-on-primary p-1">
                    <Check size={14} />
                  </div>
                )}
                <div className="flex gap-2 mb-6">
                  {t.colors.map((c) => (
                    <div key={c} className="w-8 h-8" style={{ backgroundColor: c }}></div>
                  ))}
                </div>
                <h3 className="font-headline text-2xl italic mb-2">{t.name}</h3>
                <p className="text-xs text-outline font-body leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                  {t.desc}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Icon Set Selection */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <Star className="text-secondary" size={24} />
             <h2 className="text-2xl font-headline italic">Symbolic Lexicon</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'lucide', name: 'Precision', desc: 'Sharp, clinical vectors.' },
              { id: 'minimalist', name: 'Minimalist', desc: 'Abstract, reducing noise.' },
              { id: 'archeological', name: 'Antique', desc: 'Stylized for research.' },
            ].map((s) => (
              <div 
                key={s.id}
                className="p-6 border border-outline-variant/10 bg-surface-container-low cursor-pointer hover:border-secondary/40 transition-all opacity-80 hover:opacity-100"
              >
                <h4 className="font-headline text-lg italic mb-2">{s.name}</h4>
                <p className="text-[10px] text-outline uppercase tracking-wider">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography & Scaling */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <Type className="text-primary" size={24} />
             <h2 className="text-2xl font-headline italic">Typography & Scaling</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {(['newsreader', 'inter', 'mono'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFontFamily(f)}
                className={`p-6 border text-left transition-all ${
                  fontFamily === f 
                    ? 'bg-primary/5 border-primary' 
                    : 'bg-surface-container-low border-outline-variant/10 hover:border-primary/40'
                }`}
              >
                <span className={`text-xl block mb-2 ${
                  f === 'newsreader' ? 'font-serif' : ''
                }${
                  f === 'inter' ? 'font-sans' : ''
                }${
                  f === 'mono' ? 'font-mono' : ''
                }`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </span>
                <p className="text-[10px] text-outline uppercase tracking-wider">
                  {f === 'newsreader' ? 'Scholarly & Elegant' : ''}
                  {f === 'inter' ? 'Modern & Clean' : ''}
                  {f === 'mono' ? 'Technical & Precise' : ''}
                </p>
              </button>
            ))}
          </div>

          <div className="bg-surface-container-low p-8 border border-outline-variant/10">
            <div className="flex items-center justify-between gap-8">
              <div className="flex-1">
                <h4 className="font-headline text-lg italic mb-1">Global Scale</h4>
                <p className="text-[10px] text-outline uppercase tracking-widest">Adjust base font size across all apps</p>
              </div>
              <div className="flex items-center gap-6 flex-1">
                <input 
                  type="range" 
                  min="12" 
                  max="24" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1 accent-primary" 
                />
                <span className="font-label text-xl text-primary w-12 text-right">{fontSize}px</span>
              </div>
            </div>
          </div>
        </section>

        {/* Global UI Toggles */}
        <section className="bg-surface-container p-10 border border-outline-variant/10">
           <div className="flex items-center gap-4 mb-10 border-b border-outline-variant/10 pb-4">
              <Layout className="text-primary" size={24} />
              <h2 className="text-2xl font-headline italic">Interface Behavior</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex justify-between items-center group">
                 <div>
                    <h4 className="font-headline text-lg italic">Glassmorphism</h4>
                    <p className="text-[10px] text-outline uppercase tracking-widest mt-1">Enable transparency and blur effects</p>
                 </div>
                 <button 
                   aria-label="Toggle Glassmorphism"
                   onClick={() => setGlassmorphism(!glassmorphism)}
                   className={`w-12 h-6 p-1 flex items-center cursor-pointer transition-colors border-none outline-none ${glassmorphism ? 'bg-primary/40 justify-end' : 'bg-outline/20 justify-start'}`}
                 >
                    <div className={`w-4 h-4 ${glassmorphism ? 'bg-primary' : 'bg-outline'}`}></div>
                 </button>
              </div>
              <div className="flex justify-between items-center group">
                 <div>
                    <h4 className="font-headline text-lg italic">Custom Accent</h4>
                    <p className="text-[10px] text-outline uppercase tracking-widest mt-1">Define your own primary color</p>
                 </div>
                 <input 
                   type="color" 
                   value={accentColor || '#cec6b5'} 
                   onChange={(e) => setAccentColor(e.target.value)}
                   className="w-8 h-8 bg-transparent cursor-pointer border-none"
                 />
              </div>
           </div>
        </section>

        {/* Language Management */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <Globe className="text-primary" size={24} />
             <h2 className="text-2xl font-headline italic">Linguistic Manifest</h2>
          </div>
          
          <div className="bg-surface-container-low p-8 border border-outline-variant/10">
            <div className="flex flex-wrap gap-3 mb-8">
              {activeLanguages.map((lang) => (
                <div key={lang} className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-label">
                  <span>{lang}</span>
                  <button 
                    onClick={() => setActiveLanguages(activeLanguages.filter(l => l !== lang))}
                    className="hover:text-error transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <input 
                type="text" 
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                placeholder="Declare new language..."
                className="flex-1 bg-surface border border-outline-variant/20 px-6 py-3 font-label focus:outline-none focus:border-primary transition-colors text-on-surface"
              />
              <button 
                onClick={async () => {
                  if (newLang && !activeLanguages.includes(newLang)) {
                    setActiveLanguages([...activeLanguages, newLang]);
                    try {
                      await (globalThis as any).electronAPI.createLanguageProfile(newLang);
                    } catch (e) {
                      console.error("Failed to create profile:", e);
                    }
                    setNewLang('');
                  }
                }}
                className="bg-primary text-on-primary px-8 py-3 font-label flex items-center gap-2 hover:brightness-110 transition-all"
              >
                <Plus size={18} />
                Register
              </button>
            </div>
          </div>
        </section>

        <section className="text-center py-12 border-t border-outline-variant/10">
           <p className="text-[10px] font-label text-outline uppercase tracking-[0.4em] italic mb-2">System Version 2.1.0-Flash</p>
           <p className="text-[10px] font-label text-primary uppercase tracking-[0.2em]">Synchronized with Gemini-2.0 Neural Engine</p>
        </section>
      </div>
    </motion.div>
  );
}
