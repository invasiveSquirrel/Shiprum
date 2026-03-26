import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  PlayCircle,
  FolderPlus,
  Zap,
  BookOpen,
  BarChart2,
  Rss,
  FileAudio as TranscriptIcon,
  Languages,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

interface TranscriptWord {
  word: string;
  start_ms: number;
  end_ms: number;
}

export default function Sources() {
  const [library, setLibrary] = useState<Record<string, string[]>>({});
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'text' | 'media'>('all');
  
  // Transcription & Highlight State
  const [transcript, setTranscript] = useState<TranscriptWord[]>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [translation, setTranslation] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const fetchLibrary = async () => {
    try {
      if (globalThis.electronAPI?.listLibrary) {
        const data = await globalThis.electronAPI.listLibrary();
        setLibrary(data || {});
      }
    } catch (err) {
      console.error('Error fetching library:', err);
    }
  };

  const fetchMedia = async () => {
    try {
      if (globalThis.electronAPI?.listMediaFiles) {
        // Standard media path for Shiprum
        const files = await globalThis.electronAPI.listMediaFiles('/home/chris/Shiprum/media');
        setMediaFiles(files || []);
      }
    } catch (err) {
      console.error('Error fetching media:', err);
    }
  };

  useEffect(() => {
    fetchLibrary();
    fetchMedia();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && transcript.length > 0) {
      interval = setInterval(() => {
        if (audioRef.current) {
          setCurrentTimeMs(audioRef.current.currentTime * 1000);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, transcript]);

  const handleRegister = async () => {
    try {
      if (globalThis.electronAPI?.registerSource) {
        const newPath = await globalThis.electronAPI.registerSource();
        if (newPath) fetchLibrary();
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const runAnalysis = async (filePath: string, lang: string) => {
    setAnalysisResults([]);
    try {
      if (globalThis.electronAPI?.runLexicalAnalysis) {
        const results = await globalThis.electronAPI.runLexicalAnalysis({ filePath, lang });
        if (results && !results.error) {
          setAnalysisResults(results);
        }
      }
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  const handleTranscribe = async () => {
    if (!currentFile) return;
    setIsTranscribing(true);
    setTranscript([]);
    setTranslation(null);
    try {
      if (globalThis.electronAPI?.transcribeMedia) {
        // Detect language from file path or default to swedish
        const langCode = currentFile.toLowerCase().includes('gaelic') ? 'ga-IE' : 
                        currentFile.toLowerCase().includes('german') ? 'de-DE' : 'sv-SE';
        const data = await globalThis.electronAPI.transcribeMedia({ filePath: currentFile, lang: langCode });
        if (data && !data.error) {
          setTranscript(data);
        }
      }
    } catch (err) {
      console.error('Transcription failed:', err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleTranslate = async () => {
    if (transcript.length === 0) return;
    setIsTranslating(true);
    try {
      if (globalThis.electronAPI?.translateTranscript) {
        const fullText = transcript.map(w => w.word).join(' ');
        const result = await globalThis.electronAPI.translateTranscript({ text: fullText, lang: 'foreign' });
        setTranslation(result);
        setShowTranslation(true);
      }
    } catch (err) {
      console.error('Translation failed:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const togglePlay = (file?: string) => {
    if (file) {
      // Ensure absolute path if not already
      const fullPath = file.startsWith('/') ? file : `/home/chris/Shiprum/media/${file}`;
      if (currentFile !== fullPath) {
        setCurrentFile(fullPath);
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.src = `file://${fullPath}`;
          audioRef.current.play();
        }
        return;
      }
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-[1400px] mx-auto min-h-[90vh] pb-24"
    >
      <header className="mb-12 border-b border-outline-variant/10 pb-8 flex justify-between items-end">
        <div>
          <h2 className="text-6xl font-headline italic text-on-surface mb-3">Sources: An Integrated Archive</h2>
          <p className="text-outline font-body text-xs uppercase tracking-[0.3em] opacity-60">Universal Records & Media Hub</p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-surface-container-highest/20 border border-outline-variant/10 p-1 rounded-lg">
             {['all', 'text', 'media'].map(mode => (
               <button 
                 key={mode}
                 onClick={() => setViewMode(mode as any)}
                 className={`px-4 py-1.5 text-[10px] uppercase font-label tracking-widest rounded transition-all ${
                   viewMode === mode ? 'bg-primary text-on-primary' : 'text-outline hover:text-primary'
                 }`}
               >
                 {mode}
               </button>
             ))}
          </div>
          <button 
            onClick={handleRegister}
            className="px-6 py-2 bg-primary/10 text-primary border border-primary/20 flex items-center gap-3 hover:bg-primary hover:text-on-primary transition-all font-label text-[10px] uppercase tracking-widest"
          >
            <FolderPlus size={16} /> Register Archive Path
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Universal Search Bar */}
          <div className="bg-surface-container-low p-2 border border-outline-variant/10 flex items-center px-4 rounded-xl shadow-inner">
            <Search size={22} className="text-outline/40" />
            <input 
              type="text" 
              placeholder="Sōkjan in records..."
              className="flex-1 bg-transparent border-none py-4 px-4 text-xl font-body italic focus:outline-none placeholder:text-outline/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Library (Text) Section */}
            {(viewMode === 'all' || viewMode === 'text') && (
              <section>
                <h3 className="text-2xl font-headline italic mb-8 flex items-center gap-3 border-b border-outline-variant/5 pb-4">
                   <BookOpen size={20} className="text-primary" /> Written Archives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(library).map(([lang, files]: [string, any[]]) => (
                    <div key={lang} className="bg-surface-container-low p-8 border border-outline-variant/10 group hover:border-primary/20 transition-all shadow-md">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-headline text-2xl italic text-primary/80">{lang}</h3>
                        <span className="text-[10px] font-label text-outline opacity-40 uppercase tracking-widest">{files.length} Records</span>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-4">
                        {files.filter(f => f.toLowerCase().includes(searchQuery.toLowerCase())).map((file) => (
                          <div key={file} className="flex items-center justify-between group/file py-2 border-b border-outline-variant/5">
                            <div className="flex items-center gap-4 flex-1 truncate">
                              <FileText size={18} className="text-outline/40 group-hover/file:text-primary transition-colors" />
                              <span className="text-sm font-body opacity-70 group-hover/file:opacity-100 truncate">{file}</span>
                            </div>
                            <button 
                              onClick={() => runAnalysis(file, lang)}
                              className="opacity-0 group-hover/file:opacity-100 p-1.5 hover:bg-primary/10 text-primary transition-all rounded"
                              title="Analyze Frequency"
                            >
                              <BarChart2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Audiovisual Section */}
            {(viewMode === 'all' || viewMode === 'media') && (
               <section className="bg-surface-container-low p-10 border border-outline-variant/10 shadow-xl relative">
                 <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Music size={120} />
                 </div>
                 <h3 className="text-2xl font-headline italic mb-8 flex items-center gap-3">
                   <Music className="text-secondary" /> Audiovisual Corpus
                 </h3>
                 
                 <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Integrated Player */}
                    <div className="w-full md:w-1/2 bg-surface-container p-8 border border-outline-variant/10 shadow-inner">
                      <div className="flex flex-col items-center gap-8">
                        <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center relative">
                           <PlayCircle size={64} className="text-primary/20" />
                           {isPlaying && (
                             <motion.div 
                               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                               transition={{ repeat: Infinity, duration: 2 }}
                               className="absolute inset-0 bg-primary/5 rounded-full"
                             />
                           )}
                        </div>
                        <div className="text-center overflow-hidden w-full px-4">
                          <h4 className="font-headline text-lg italic mb-1 truncate">{currentFile ? currentFile.split('/').pop() : "Inactive"}</h4>
                          <span className="text-[9px] font-label text-outline uppercase tracking-widest">Slow Play Enabled</span>
                        </div>
                        <div className="flex items-center gap-8">
                           <button className="text-outline hover:text-primary transition-colors"><SkipBack size={24} /></button>
                           <button 
                             onClick={() => togglePlay()}
                             className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                           >
                             {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                           </button>
                           <button className="text-outline hover:text-primary transition-colors"><SkipForward size={24} /></button>
                        </div>
                        <div className="w-full space-y-4">
                           <div className="flex justify-center gap-1">
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                                <button
                                  key={speed}
                                  onClick={() => setPlaybackSpeed(speed)}
                                  className={`text-[8px] font-bold px-2 py-1 rounded transition-all ${
                                    playbackSpeed === speed ? 'bg-primary text-on-primary' : 'text-outline hover:text-primary'
                                  }`}
                                >
                                  {speed}x
                                </button>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Media List */}
                    <div className="w-full md:w-1/2 space-y-3 max-h-72 overflow-y-auto pr-4 custom-scrollbar">
                       {mediaFiles.filter(m => m.toLowerCase().includes(searchQuery.toLowerCase())).map(m => (
                         <div key={m} onClick={() => togglePlay(m)} className="flex items-center justify-between p-3 bg-surface-container-highest/20 border border-transparent hover:border-primary/20 transition-all cursor-pointer group rounded-lg">
                            <div className="flex items-center gap-4 truncate mr-2">
                               <Music size={14} className="text-outline/40 group-hover:text-primary transition-colors" />
                               <span className="text-xs font-body opacity-60 group-hover:opacity-100 truncate">{m}</span>
                            </div>
                            <Play size={10} className="text-primary opacity-0 group-hover:opacity-100" />
                         </div>
                       ))}
                       {mediaFiles.length === 0 && (
                         <p className="text-[10px] text-outline italic text-center py-8 opacity-40">No media found in ~/Shiprum/media</p>
                       )}
                    </div>
                 </div>

                 {/* Transcription & Highlighting UI */}
                 {currentFile && (
                   <div className="mt-12 border-t border-outline-variant/10 pt-10">
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                           <h3 className="text-xl font-headline italic flex items-center gap-3">
                             <TranscriptIcon size={18} className="text-primary" /> Active Transcript
                           </h3>
                           {isTranscribing && <Loader2 size={16} className="animate-spin text-primary" />}
                        </div>
                        <div className="flex gap-4">
                          {!transcript.length ? (
                            <button 
                              onClick={handleTranscribe}
                              disabled={isTranscribing}
                              className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 text-[9px] uppercase font-label tracking-widest hover:bg-primary hover:text-on-primary transition-all rounded"
                            >
                              Generate Transcript
                            </button>
                          ) : (
                            <div className="flex gap-3">
                              <button 
                                onClick={handleTranslate}
                                disabled={isTranslating}
                                className={`px-4 py-1.5 border text-[9px] uppercase font-label tracking-widest transition-all rounded flex items-center gap-2 ${
                                  showTranslation ? 'bg-secondary text-on-secondary border-secondary' : 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary hover:text-on-secondary'
                                }`}
                              >
                                {isTranslating ? <Loader2 size={12} className="animate-spin" /> : <Languages size={14} />}
                                {showTranslation ? 'Hide Translation' : 'View Side-by-Side Translation'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={`grid gap-8 ${showTranslation && translation ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                        <div className="bg-surface-container-low p-8 border border-outline-variant/10 rounded-xl min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar leading-relaxed">
                           {transcript.length > 0 ? (
                             <div className="flex flex-wrap gap-x-1.5 gap-y-2">
                               {transcript.map((w, i) => {
                                 const isActive = currentTimeMs >= w.start_ms && currentTimeMs < w.end_ms;
                                 return (
                                   <span 
                                     key={i} 
                                     className={`text-lg font-body transition-all duration-150 rounded px-1 ${
                                       isActive ? 'bg-primary text-on-primary scale-110 shadow-lg' : 'opacity-60 hover:opacity-100 hover:bg-primary/5'
                                     }`}
                                   >
                                     {w.word}
                                   </span>
                                 );
                               })}
                             </div>
                           ) : (
                             <div className="flex flex-col items-center justify-center py-12 opacity-30 italic">
                               <TranscriptIcon size={48} className="mb-4" />
                               <p className="text-sm">No transcript active. Click "Generate" to synchronize.</p>
                             </div>
                           )}
                        </div>

                        {showTranslation && translation && (
                          <div className="bg-secondary/5 p-8 border border-secondary/20 rounded-xl max-h-[400px] overflow-y-auto custom-scrollbar text-lg font-body italic leading-relaxed text-secondary-on-container opacity-80 animate-in fade-in slide-in-from-right-4 duration-500">
                             {translation}
                          </div>
                        )}
                      </div>
                   </div>
                 )}
               </section>
            )}
          </div>
        </div>

        {/* Global Context Rail */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-primary/5 p-8 border border-primary/20 relative shadow-inner">
             <h4 className="font-label text-[10px] uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
               <Zap size={14} /> AI Analysis Engine
             </h4>
             <div className="p-4 bg-surface-container-low border border-primary/10 mb-8 border-l-4">
                <p className="text-[11px] italic font-body text-primary-on-container leading-relaxed">
                  "Select a text archive to extract phonetic density and lemma distribution benchmarks."
                </p>
             </div>
             {analysisResults.length > 0 && (
               <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {analysisResults.slice(0, 10).map((r, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] border-b border-outline-variant/5 pb-2">
                       <span className="font-headline italic text-on-surface">{r.word}</span>
                       <span className="text-outline font-label uppercase tracking-widest">{r.count} Occ.</span>
                    </div>
                  ))}
               </div>
             )}
          </div>

          <div className="bg-surface-container-low p-8 border border-outline-variant/10 shadow-md">
            <h4 className="font-label text-[10px] uppercase tracking-[0.3em] text-outline mb-6">Immersion Streams</h4>
            <div className="space-y-4">
               {[
                 { title: 'Sveriges Radio', icon: <Rss size={16} /> },
                 { title: 'Tagesschau', icon: <Rss size={16} /> },
                 { title: 'BBC Gaelic', icon: <Rss size={16} /> }
               ].map(pod => (
                 <div key={pod.title} className="flex items-center gap-4 p-3 bg-surface-container-highest/10 hover:bg-surface-container-highest/30 cursor-pointer transition-all rounded-lg group">
                    <div className="text-primary/40 group-hover:text-primary transition-colors">{pod.icon}</div>
                    <span className="text-[10px] font-label uppercase tracking-widest opacity-60 group-hover:opacity-100">{pod.title}</span>
                 </div>
               ))}
            </div>
          </div>
        </aside>
      </div>

      <audio ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
    </motion.div>
  );
}
