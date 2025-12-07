import { motion } from 'framer-motion';
import { Target, Eye, Users, Award } from 'lucide-react';
import teamImage from '@/assets/team-collaboration.jpg';
import { useCountUp } from '@/hooks/useCountUp';
import LiquidBackground from '@/components/LiquidBackground';

const AnimatedStat = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { ref, formattedCount } = useCountUp({ end, suffix, duration: 2000 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center text-white"
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">{formattedCount}</div>
      <div className="text-white/80">{label}</div>
    </motion.div>
  );
};

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To democratize enterprise communication by making verified messaging solutions accessible and affordable for businesses of all sizes.',
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'To become the most trusted communication platform in India, enabling millions of businesses to engage their customers effectively.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Every decision we make is driven by the desire to deliver exceptional value and service to our customers.',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge technology to stay ahead of market needs.',
    },
  ];

  const timeline = [
    { year: '2024', event: 'NotifyCore.AI founded with a vision to revolutionize business communication' },
    { year: '2024', event: 'Became official WhatsApp Business API partner' },
    { year: '2024', event: 'Crossed 1,000 active businesses milestone' },
    { year: '2024', event: 'Launched RCS messaging and expanded to 10+ countries' },
    { year: '2025', event: 'Achieved 10k customers and 50k messages per month' },
  ];

  const stats = [
    { end: 10000, suffix: '+', label: 'Active Businesses' },
    { end: 50, suffix: 'k+', label: 'Messages Delivered Monthly' },
    { end: 99.9, suffix: '%', label: 'Platform Uptime' },
    { end: 24, suffix: '/7', label: 'Customer Support' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle relative overflow-hidden">
        <LiquidBackground variant="primary" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Powering Global Communication
            </h1>
            <p className="text-xl text-muted-foreground">
              Securely & Seamlessly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2024, NotifyCore.AI emerged from a simple observation: businesses were struggling with fragmented communication tools and complex pricing models that didn't align with their actual needs.
                </p>
                <p>
                  We set out to change this by building a unified platform that combines WhatsApp Business API, SMS, and RCS messaging under one roof - with transparent pricing and no hidden charges.
                </p>
                <p>
                  Today, we're proud to serve over 2,000 businesses across India and beyond, delivering 50k messages every month. Our commitment to innovation, reliability, and customer success drives everything we do.
                </p>
                <p>
                  From startups to enterprises, e-commerce to healthcare, our platform empowers businesses to engage their customers at scale, building meaningful relationships that drive growth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <img
                src={teamImage}
                alt="NotifyCore.AI Team"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-subtle relative overflow-hidden">
        <LiquidBackground variant="secondary" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-lg hover:shadow-glow transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <value.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Milestones that shaped NotifyCore.AI
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {item.year}
                  </motion.div>
                </div>
                <motion.div 
                  className="flex-1 bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <p className="text-foreground">{item.event}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
