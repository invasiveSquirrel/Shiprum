import React, { useEffect, useState, useRef } from 'react';

interface AppEmbedProps {
  appName: string;
  port: number;
}

export default function AppEmbed({ appName, port }: Readonly<AppEmbedProps>) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const webviewRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await globalThis.electronAPI.startApp(appName);
        if (mounted) setIsReady(true);
      } catch (err: any) {
        if (mounted) setError(err.message);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [appName]);

  useEffect(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    const handleDomReady = async () => {
      try {
        // Using a relative path that should resolve from the project root in the main process
        const cssContent = await globalThis.electronAPI.readFile('src/styles/shiprum-guest.css');
        await webview.insertCSS(cssContent);
        console.log(`Injected Shiprum theme into ${appName}`);
      } catch (err) {
        console.error('Failed to inject guest CSS:', err);
      }
    };

    webview.addEventListener('dom-ready', handleDomReady);
    return () => {
      webview.removeEventListener('dom-ready', handleDomReady);
    };
  }, [isReady, appName]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-surface-container rounded-xl border border-outline-variant/20 p-8 text-center">
        <div className="max-w-md">
          <h2 className="text-xl font-headline text-error mb-2">Connection Error</h2>
          <p className="text-on-surface-variant opacity-70 mb-4">{error}</p>
          <button 
            onClick={() => globalThis.location.reload()}
            className="px-6 py-2 bg-primary text-on-primary rounded-full font-label tracking-wide"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-surface-container rounded-xl border border-outline-variant/20 animate-pulse">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant opacity-70 font-label tracking-widest uppercase">Initializing {appName}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-160px)] rounded-xl overflow-hidden border border-outline-variant/20 bg-black shadow-2xl">
      <webview 
        ref={webviewRef}
        src={`http://localhost:${port}`} 
        className="w-full h-full"
        {...{ allowpopups: "true" } as any} 
        style={{ border: 'none' }}
      />
    </div>
  );
}
