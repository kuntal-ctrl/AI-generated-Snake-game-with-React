import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Activity } from 'lucide-react';
import { motion } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "NEURAL_NOISE_01",
    artist: "VOID_ENGINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/glitch1/300/300"
  },
  {
    id: 2,
    title: "DATA_CORRUPTION",
    artist: "BIT_CRUSHER",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://picsum.photos/seed/glitch2/300/300"
  },
  {
    id: 3,
    title: "STATIC_DREAM",
    artist: "NULL_POINTER",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    cover: "https://picsum.photos/seed/glitch3/300/300"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="w-full max-w-md bg-black pixel-border p-6 font-pixel">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
      />

      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <motion.div 
            key={currentTrack.id}
            className="relative w-24 h-24 border-2 border-magenta overflow-hidden grayscale contrast-150"
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-cyan/20 flex items-center justify-center">
                <Activity className="text-cyan animate-pulse" size={32} />
              </div>
            )}
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-cyan truncate glitch-text" data-text={currentTrack.title}>{currentTrack.title}</h3>
            <p className="text-sm text-magenta truncate tracking-widest">SOURCE: {currentTrack.artist}</p>
            
            <div className="mt-4 flex items-center gap-4">
              <button onClick={skipBackward} className="text-cyan hover:text-magenta transition-colors">
                <SkipBack size={24} />
              </button>
              <button 
                onClick={togglePlay}
                className="pixel-button p-2"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button onClick={skipForward} className="text-cyan hover:text-magenta transition-colors">
                <SkipForward size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-magenta/20 border border-magenta/40 relative overflow-hidden">
            <motion.div 
              className="h-full bg-cyan"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white mix-blend-difference">
              DECODING_BITSTREAM... {Math.round(progress)}%
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-cyan/50 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Music size={12} />
              AUDIO_LINK_ESTABLISHED
            </div>
            <div>
              {currentTrackIndex + 1} // {TRACKS.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
