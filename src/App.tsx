import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Activity } from 'lucide-react';

export default function App() {
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(2450);
  const [isBooted, setIsBooted] = React.useState(false);
  const [logs, setLogs] = React.useState<string[]>([
    'INITIALIZING_NEURAL_LINK...',
    'BUFFER_OVERFLOW_DETECTED',
    'BYPASSING_FIREWALL_01',
    'ACCESS_GRANTED'
  ]);

  const handleScoreUpdate = React.useCallback((newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
  }, [highScore]);

  const handleGameOver = React.useCallback(() => {
    setLogs(prev => [...prev.slice(-5), `FATAL_ERROR: SECTOR_7_COLLAPSE`, `RECOVERY_FAILED_AT_${Date.now()}`]);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-y-auto crt-flicker">
      <div className="scanline-overlay" />

      <AnimatePresence>
        {!isBooted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-4"
          >
            <div className="pixel-border p-12 bg-black flex flex-col items-center gap-8 max-w-md w-full">
              <Terminal className="text-magenta animate-pulse" size={64} />
              <div className="text-center">
                <h2 className="text-4xl font-bold text-cyan glitch-text mb-4" data-text="BOOT_SEQUENCE">BOOT_SEQUENCE</h2>
                <p className="text-magenta/60 text-sm uppercase tracking-widest leading-relaxed">
                  [WARNING]: UNAUTHORIZED ACCESS DETECTED. <br />
                  INITIALIZING NEURAL INTERFACE... <br />
                  ENABLE AUDIO FOR FULL SYNCHRONIZATION.
                </p>
              </div>
              <button 
                onClick={() => setIsBooted(true)}
                className="pixel-button text-3xl w-full py-4"
              >
                INITIALIZE_SYSTEM
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 border-b-2 border-cyan/30">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4"
        >
          <Terminal className="text-magenta animate-pulse" size={32} />
          <div>
            <h1 className="text-3xl font-bold tracking-widest text-cyan glitch-text" data-text="SYSTEM_OVERRIDE">
              SYSTEM_OVERRIDE
            </h1>
            <p className="text-xs text-magenta/70 tracking-widest uppercase">Kernel: v0.9.4-BETA // [UNAUTHORIZED_ACCESS]</p>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.3em] text-cyan/50">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-magenta" /> CPU_LOAD: 88%
          </div>
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-magenta" /> UPTIME: 00:42:11
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center gap-12 w-full max-w-6xl px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column - Data Stream */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-3 hidden lg:flex flex-col gap-6"
          >
            <div className="pixel-border p-4 bg-black/80">
              <h2 className="text-xs font-bold text-magenta uppercase mb-4 tracking-widest border-b border-magenta/30 pb-2">LOG_STREAM</h2>
              <div className="space-y-2 text-[10px] font-mono text-cyan/60">
                {logs.map((log, i) => (
                  <p key={i} className={log.includes('ERROR') ? 'text-magenta' : ''}>
                    &gt; {log}
                  </p>
                ))}
              </div>
            </div>

            <div className="pixel-border p-4 bg-black/80">
              <h2 className="text-xs font-bold text-magenta uppercase mb-2 tracking-widest">USER_STATS</h2>
              <div className="flex justify-between text-xl">
                <span>SCORE:</span>
                <span className="text-magenta">{score.toString().padStart(4, '0')}</span>
              </div>
              <div className="flex justify-between text-[10px] mt-2 text-cyan/40">
                <span>HI_SCORE:</span>
                <span>{highScore.toString().padStart(4, '0')}</span>
              </div>
            </div>
          </motion.div>

          {/* Center Column - The Matrix (Game) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            <div className="relative p-2 bg-magenta/20 pixel-border">
              <SnakeGame onScoreChange={handleScoreUpdate} onGameOver={handleGameOver} />
            </div>
          </motion.div>

          {/* Right Column - Audio Processor */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-3 flex flex-col items-center lg:items-end gap-8"
          >
            <MusicPlayer />
            
            <div className="hidden lg:block text-right w-full">
              <div className="pixel-border p-4 bg-black/80 text-left">
                <h3 className="text-xs font-bold text-magenta uppercase mb-4 tracking-widest border-b border-magenta/30 pb-2">CMD_INPUTS</h3>
                <ul className="space-y-3 text-[11px] text-cyan/80 uppercase">
                  <li className="flex justify-between"><span>MOVE:</span> <span className="text-magenta">[ARROWS]</span></li>
                  <li className="flex justify-between"><span>HALT:</span> <span className="text-magenta">[SPACE]</span></li>
                  <li className="flex justify-between"><span>RESET:</span> <span className="text-magenta">[R]</span></li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-center text-[10px] text-cyan/30 font-bold uppercase tracking-[0.5em] z-20 border-t-2 border-cyan/30">
        <div>[ID: 0x7F3A9] // MACHINE_INTERFACE_V1</div>
        <div className="flex gap-8">
          <span className="animate-pulse">STATUS: NOMINAL</span>
          <span className="text-magenta">ENCRYPTION: ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}
