import { motion } from 'framer-motion';

const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background -z-10">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-transparent"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      
      {/* Radial Gradient */}
      <div 
        className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_100%)"
      />

      {/* Animated Spots */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 5,
        }}
      />
    </div>
  );
};

export default GridBackground;