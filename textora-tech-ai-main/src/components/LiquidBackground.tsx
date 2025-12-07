import { motion } from 'framer-motion';

interface LiquidBackgroundProps {
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const LiquidBackground = ({ variant = 'primary', className = '' }: LiquidBackgroundProps) => {
  const colors = {
    primary: ['hsl(var(--primary) / 0.15)', 'hsl(var(--primary) / 0.1)'],
    secondary: ['hsl(var(--secondary) / 0.2)', 'hsl(var(--secondary) / 0.15)'],
    accent: ['hsl(var(--success) / 0.15)', 'hsl(var(--success) / 0.1)'],
  };

  const [color1, color2] = colors[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: color1 }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, 90, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Blob 2 */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full blur-3xl"
        style={{ backgroundColor: color2 }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, -60, -120, 0],
          scale: [1, 0.8, 1.1, 1],
          rotate: [360, 270, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1/3 h-1/3 rounded-full blur-2xl"
        style={{ backgroundColor: color1 }}
        animate={{
          x: [-50, 50, -30, -50],
          y: [-50, 30, -80, -50],
          scale: [0.8, 1.2, 1, 0.8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default LiquidBackground;
