import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Shield,
  Zap,
  BarChart3,
  Lock,
  Workflow,
  Globe,
  Bot,
  Database,
  Cloud,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const AdvancedFeatures = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'End-to-end encryption with ISO 27001 compliance',
      specs: ['AES-256 encryption', 'GDPR compliant', 'SOC 2 Type II', 'Security audits'],
      color: 'from-primary to-primary-light',
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Delivery',
      description: 'Sub-second message delivery with 99.9% uptime SLA',
      specs: ['Multi-carrier routing', 'Smart failover', 'Real-time tracking', 'Global CDN'],
      color: 'from-success to-success-light',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time insights with predictive analytics',
      specs: ['Campaign metrics', 'Engagement tracking', 'A/B testing', 'Custom reports'],
      color: 'from-accent to-primary',
    },
    {
      icon: Workflow,
      title: 'Intelligent Automation',
      description: 'AI-powered workflow automation and chatbots',
      specs: ['Smart scheduling', 'Auto-response', 'NLP chatbots', 'Personalization'],
      color: 'from-primary to-success',
    },
    {
      icon: Database,
      title: 'Scalable Infrastructure',
      description: 'Auto-scaling handling millions of messages',
      specs: ['Horizontal scaling', 'Load balancing', 'Queue management', '10M+/hour'],
      color: 'from-success to-accent',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with customers in 200+ countries',
      specs: ['Multi-language', 'Local carriers', 'Regional compliance', 'International formats'],
      color: 'from-primary-light to-primary',
    },
    {
      icon: Bot,
      title: 'AI-Powered Optimization',
      description: 'Machine learning for delivery timing and content',
      specs: ['Send optimization', 'Content AI', 'Sentiment analysis', 'Spam detection'],
      color: 'from-accent to-success',
    },
    {
      icon: Cloud,
      title: 'Hybrid Cloud Architecture',
      description: 'Flexible deployment options for maximum control',
      specs: ['Public cloud', 'Private cloud', 'On-premise', 'Hybrid config'],
      color: 'from-success to-primary',
    },
    {
      icon: Lock,
      title: 'API Security',
      description: 'Robust API protection with intelligent throttling',
      specs: ['OAuth 2.0', 'Key rotation', 'Rate limiting', 'IP whitelisting'],
      color: 'from-primary to-accent',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6"
          >
            <Zap className="w-4 h-4" />
            Advanced Capabilities
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Enterprise-Grade Features
            <br />
            <span className="animate-gradient-text">That Set Us Apart</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for scale, security, and performance. Our platform delivers advanced
            capabilities that enterprise businesses demand.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group"
            >
              <motion.div
                className="h-full bg-card rounded-2xl p-6 border border-border shadow-sm relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.2)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  animate={hoveredIndex === index ? {
                    borderColor: ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--primary))'],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon className="text-primary-foreground" size={24} />
                    </motion.div>
                    <h3 className="text-lg font-bold leading-tight">{feature.title}</h3>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm">{feature.description}</p>

                  {/* Specs with stagger animation */}
                  <div className="grid grid-cols-2 gap-2">
                    {feature.specs.map((spec, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={hoveredIndex === index ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`} />
                        <span className="text-muted-foreground">{spec}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute bottom-6 right-6 text-primary opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    animate={hoveredIndex === index ? { x: 0 } : { x: -10 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button size="lg" className="bg-gradient-primary shadow-glow group" asChild>
            <Link to="/developer" className="flex items-center gap-2">
              View Technical Documentation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;
