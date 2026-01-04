import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, MessageCircle, ShoppingCart, CreditCard, Shield, Share2, Mail } from 'lucide-react';
import { useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import GridBackground from './GridBackground';

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
    { end: 10000, suffix: '+', label: 'Businesses on WhatsApp' },
    { end: 99.9, suffix: '%', label: 'WhatsApp API Uptime' },
    { end: 10, suffix: 'M+', label: 'Messages Sent' },
    { end: 70, suffix: '+', label: 'Languages Supported' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <GridBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center max-w-7xl mx-auto w-full">
          <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-6"
          >
            <motion.span
              className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Trusted by over 10,000+ businesses
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight break-words"
          >
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              className="bg-gradient-to-r from-primary via-success to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Build conversations. Convert faster. Support smarter
            </motion.span>
            {" "}— on WhatsApp.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto break-words"
          >
            One platform to engage customers, sell products, and resolve issues inside WhatsApp — securely, at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-primary shadow-glow hover:shadow-glow-green text-lg px-8 transition-all" asChild>
                <Link to="/contact">
                  Start building flows
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:bg-primary/10 hover:border-primary transition-all" onClick={() => setShowVideo(true)}>
                View live demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-12"
          >
            <Button 
              variant="link" 
              className="text-muted-foreground hover:text-primary transition-all"
              onClick={() => setShowVideo(true)}
            >
              <Play className="mr-2" size={16} />
              Watch a 2-min Demo
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm text-muted-foreground"
          >
            Green tick verified · End-to-end encrypted · 70+ languages
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50"
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

          {/* Node-Based Flow UI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block relative"
          >
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600">
              <motion.line
                x1="200" y1="100" x2="200" y2="300"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <motion.line
                x1="200" y1="300" x2="200" y2="500"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
              />
            </svg>

            {/* Nodes */}
            <div className="relative z-10 space-y-8">
              {/* Engage Node */}
              <motion.div
                className="bg-gradient-to-br from-blue-500 to-teal-500 p-6 rounded-xl shadow-lg text-white relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute top-2 right-2 text-2xl opacity-50"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💬
                </motion.div>
                <MessageCircle className="w-8 h-8 mb-2" />
                <h3 className="text-lg font-semibold">Engage</h3>
                <p className="text-sm opacity-90 mb-2">Start conversations</p>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <p className="text-xs opacity-75 mb-2">Turn messages into conversations customers actually reply to.</p>
                  <ul className="text-xs opacity-75 space-y-1">
                    <li>• Two-way WhatsApp messaging</li>
                    <li>• Rich media, carousels, buttons, and CTAs</li>
                    <li>• WhatsApp Flows for guided journeys</li>
                    <li>• Limited-time offers and coupon reminders</li>
                  </ul>
                </motion.div>
              </motion.div>

              {/* Convert Node */}
              <motion.div
                className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-xl shadow-lg text-white relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex space-x-1 mb-2">
                  <motion.div className="w-4 h-4 bg-white/20 rounded" animate={{ x: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                  <motion.div className="w-4 h-4 bg-white/20 rounded" animate={{ x: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
                  <motion.div className="w-4 h-4 bg-white/20 rounded" animate={{ x: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                </div>
                <ShoppingCart className="w-8 h-8 mb-2" />
                <h3 className="text-lg font-semibold">Convert</h3>
                <p className="text-sm opacity-90 mb-2">Sell inside chat</p>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <p className="text-xs opacity-75 mb-2">From product discovery to payment — without leaving WhatsApp.</p>
                  <ul className="text-xs opacity-75 space-y-1">
                    <li>• Product catalogue with add-to-cart</li>
                    <li>• Multi-product messages (up to 30 items)</li>
                    <li>• Guided flows for ordering or booking</li>
                    <li>• WhatsApp Payments for in-chat checkout</li>
                  </ul>
                </motion.div>
              </motion.div>

              {/* Support Node */}
              <motion.div
                className="bg-gradient-to-br from-slate-800 to-purple-900 p-6 rounded-xl shadow-lg text-white relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-2">
                  <Shield className="w-6 h-6" />
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="ml-2 text-green-400"
                  >
                    ✓
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold">Support & Secure</h3>
                <p className="text-sm opacity-90 mb-2">Resolve at scale</p>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <p className="text-xs opacity-75 mb-2">Always delivered. Always trusted. Always compliant.</p>
                  <ul className="text-xs opacity-75 space-y-1">
                    <li>• AI-powered chatbots for instant resolution</li>
                    <li>• WhatsApp Business Calling for complex issues</li>
                    <li>• Read & delivery receipts for transparency</li>
                    <li>• Green tick verification for brand trust</li>
                    <li>• End-to-end encryption</li>
                    <li>• GDPR, HIPAA, DLT compliance</li>
                    <li>• Omnichannel failover to SMS or Email</li>
                  </ul>
                </motion.div>
                <div className="flex justify-between mt-4 text-xs opacity-75">
                  <span>Delivered</span>
                  <span>Verified</span>
                  <span>Encrypted</span>
                </div>
              </motion.div>
            </div>
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
              src="https://www.youtube.com/embed/j1fssgJ28MU?autoplay=1"
              title="Textora Demo"
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
