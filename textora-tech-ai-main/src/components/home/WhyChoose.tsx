import { motion, useInView } from 'framer-motion';
import { Clock, Shield, BarChart3, Headphones, ArrowRight, CheckCircle } from 'lucide-react';
import { useRef, useState } from 'react';

const WhyChoose = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Clock,
      title: 'Lifetime Validity',
      description: 'No expiry on your credits. Pay once and use forever with our revolutionary lifetime validity model.',
      backContent: ['No hidden fees', 'Credits never expire', 'Flexible usage', 'Cost-effective'],
      gradient: 'from-primary to-primary-light',
    },
    {
      icon: Shield,
      title: 'DLT Compliance',
      description: 'Fully compliant with TRAI DLT regulations. Pre-approved templates for instant deployment.',
      backContent: ['TRAI certified', 'Pre-approved templates', 'Instant activation', 'Legal compliance'],
      gradient: 'from-success to-success-light',
    },
    {
      icon: BarChart3,
      title: 'Feature-rich Dashboard',
      description: 'Real-time analytics, delivery reports, and comprehensive insights at your fingertips.',
      backContent: ['Real-time analytics', 'Custom reports', 'Delivery tracking', 'API metrics'],
      gradient: 'from-accent to-primary',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated technical support team available round the clock to ensure smooth operations.',
      backContent: ['Round the clock', 'Expert team', 'Quick resolution', 'Priority support'],
      gradient: 'from-primary to-success',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-success/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Why Choose Us
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">Why Choose</span>
            <span className="animate-gradient-text">NotifyCore.AI?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Industry-leading features that set us apart from the competition
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group perspective-1000"
            >
              <div className="flip-card min-h-[320px]">
                <div className="flip-card-inner">
                  {/* Front of card */}
                  <div className="flip-card-front">
                    <div className="h-full bg-card p-8 rounded-2xl border border-border shadow-lg group-hover:shadow-glow transition-shadow duration-300 flex flex-col">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <feature.icon size={32} className="text-primary-foreground" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground flex-grow">{feature.description}</p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium">
                        <span>Hover to learn more</span>
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flip-card-back">
                    <div className={`h-full bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl shadow-lg flex flex-col justify-center`}>
                      <h3 className="text-xl font-bold text-primary-foreground mb-6">{feature.title}</h3>
                      <ul className="space-y-3">
                        {feature.backContent.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-primary-foreground">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary-foreground" />
                              <span className="font-medium">{item}</span>
                            </motion.div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
