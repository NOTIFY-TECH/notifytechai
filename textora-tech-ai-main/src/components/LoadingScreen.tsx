import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => onLoadingComplete(), 300);
  };

  // Memoize particle positions to prevent SSR issues
  const particlePositions = useMemo(() => {
    return [...Array(20)].map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      scale: Math.random() * 0.5 + 0.5,
    }));
  }, []);

  useEffect(() => {
    const duration = 1200;
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 100);
          setTimeout(() => onLoadingComplete(), 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const words = ['Innovate', 'Connect', 'Grow'];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -50,
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          }}
        >
          {/* Skip button */}
          <motion.button
            onClick={handleSkip}
            className="absolute top-6 right-6 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            aria-label="Skip loading animation"
          >
            Skip
          </motion.button>

          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-hero opacity-30" />
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particlePositions.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/30"
                style={{ left: `${particle.x}%` }}
                initial={{ 
                  y: '100vh',
                  scale: particle.scale
                }}
                animate={{ 
                  y: '-10vh',
                  transition: {
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: 'linear'
                  }
                }}
              />
            ))}
          </div>

          {/* Logo container */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Logo */}
            <motion.div
              className="relative mb-8"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-glow">
                <span className="text-4xl font-bold text-primary-foreground">T</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>

            {/* Brand name with letter animation */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {'NotifyCore.AI'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
              <span className="text-primary"> Technologies</span>
            </motion.h1>

            {/* Staggered words */}
            <div className="flex gap-4 mb-12">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  className="text-lg text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                >
                  {word}
                  {i < words.length - 1 && <span className="ml-4 text-primary">•</span>}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-primary/80 to-success rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <motion.p
              className="mt-3 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
