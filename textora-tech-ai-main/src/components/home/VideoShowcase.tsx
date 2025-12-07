import { motion } from 'framer-motion';
import { Play, CheckCircle2, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const benefits = [
    {
      icon: TrendingUp,
      title: "300% ROI",
      description: "Average return on investment"
    },
    {
      icon: Users,
      title: "10k+ Users",
      description: "Reached monthly"
    },
    {
      icon: Zap,
      title: "< 2 sec",
      description: "Average delivery time"
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-success rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See NotifyCore.AI in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how leading businesses transform their customer engagement with our platform
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-success/20 group">
              {!isPlaying ? (
                <>
                  {/* Thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-success flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="text-center"
                    >
                      <div className="text-white text-6xl font-bold mb-4">NotifyCore.AI</div>
                      <div className="text-white/80 text-xl"></div>
                    </motion.div>
                  </div>

                  {/* Play Button */}
                  <motion.button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(255, 255, 255, 0.7)",
                          "0 0 0 20px rgba(255, 255, 255, 0)",
                          "0 0 0 0 rgba(255, 255, 255, 0)"
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
                    >
                      <Play className="text-primary ml-1" size={32} fill="currentColor" />
                    </motion.div>
                  </motion.button>
                </>
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="NotifyCore.AI Platform Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* Decorative Border */}
              <div className="absolute inset-0 border-4 border-white/10 rounded-2xl pointer-events-none" />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-2xl border border-border"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Live Demo Available</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div className="p-3 bg-gradient-primary rounded-lg shrink-0">
                    <benefit.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-6"
            >
              <h3 className="text-2xl font-bold mb-4">Why Choose NotifyCore.AI?</h3>
              <ul className="space-y-3">
                {[
                  "Real-time delivery tracking & analytics",
                  "99.9% uptime with enterprise SLA",
                  "Multi-channel messaging from one platform",
                  "24/7 dedicated support team"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <CheckCircle2 className="text-success mt-0.5 shrink-0" size={20} />
                      <span className="text-muted-foreground">{item}</span>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="w-full bg-gradient-primary shadow-glow">
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
