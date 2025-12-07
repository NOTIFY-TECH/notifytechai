import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useState, lazy, Suspense } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import LiquidBackground from '@/components/LiquidBackground';

const Hero3DGlobe = lazy(() => import('./Hero3DGlobe'));

const AnimatedStat = ({ end, suffix, label, delay }: { end: number; suffix: string; label: string; delay: number }) => {
  const { ref, formattedCount } = useCountUp({ end, suffix, delay, duration: 2000 });
  
  return (
    <motion.div 
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2 + delay }}
      whileHover={{ scale: 1.1, y: -5 }}
    >
      <motion.div 
        className="text-3xl md:text-4xl font-bold text-gradient mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 + delay }}
      >
        {formattedCount}
      </motion.div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
};

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const stats = [
    { end: 10000, suffix: '+', label: 'Active Businesses' },
    { end: 99.9, suffix: '%', label: 'Uptime SLA' },
    { end: 10, suffix: 'k', label: 'Messages/Month' },
    { end: 24, suffix: '/7', label: 'Support' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Globe Background */}
      <Suspense fallback={null}>
        <Hero3DGlobe />
      </Suspense>

      {/* Liquid Background */}
      <LiquidBackground variant="primary" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />

      {/* Animated Particles - Reduced count for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute w-1.5 h-1.5 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-6"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-primary/20"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="animate-pulse" size={16} />
              Trusted by 5,000+ businesses globally
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              className="bg-gradient-to-r from-primary via-success to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Turbocharge
            </motion.span>
            {" "}Customer Engagement
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Verified <span className="text-success font-semibold">WhatsApp Business API</span> & 
            DLT-Compliant <span className="text-primary font-semibold">SMS Solutions</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-primary shadow-glow hover:shadow-glow-green text-lg px-8 transition-all" asChild>
                <Link to="/contact">
                  Book a Live Demo
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:bg-primary/10 hover:border-primary transition-all" asChild>
                <Link to="/pricing">
                  Start Free Trial
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-2 border-success/50 text-success hover:bg-success/10 hover:border-success transition-all"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2" size={20} />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm text-muted-foreground"
          >
            No credit card required • Lifetime validity • 24/7 support
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50"
          >
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="NotifyCore.AI Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-2 transition-all"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
