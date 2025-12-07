import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Mail, MessageCircle, CheckCircle, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import whatsappBusinessImg from '@/assets/whatsapp-business.jpg';
import transactionalSmsImg from '@/assets/transactional-sms.jpg';
import promotionalSmsImg from '@/assets/promotional-sms.jpg';
import rcsMessagingImg from '@/assets/rcs-messaging.jpg';
import whatsappBulkImg from '@/assets/whatsapp-bulk.jpg';
import ChannelComparison from '@/components/home/ChannelComparison';
import LiveDemo from '@/components/home/LiveDemo';

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const services = [
    {
      id: 'whatsapp',
      icon: MessageSquare,
      title: 'WhatsApp Business API',
      subtitle: 'Verified Green Tick Badge',
      description: 'Official WhatsApp Business API partner delivering enterprise-grade messaging solutions.',
      image: whatsappBusinessImg,
      features: [
        'Verified Green Tick badge for brand trust',
        'Send images, videos, documents, and location',
        'Automated chatbots and workflows',
        'Two-way interactive messaging',
        'Template message approval within 24 hours',
        'Real-time delivery reports and analytics',
      ],
      color: 'success',
    },
    {
      id: 'transactional-sms',
      icon: Mail,
      title: 'Transactional SMS',
      subtitle: '99.9% Delivery Rate',
      description: 'Critical notifications delivered instantly with industry-leading reliability.',
      image: transactionalSmsImg,
      features: [
        'OTP and verification codes',
        'Order confirmations and updates',
        'Payment notifications',
        'Account alerts',
        'Instant DLT approval',
        'Priority routing for high delivery',
      ],
      color: 'primary',
    },
    {
      id: 'promotional-sms',
      icon: Mail,
      title: 'Promotional SMS',
      subtitle: 'Lifetime Validity',
      description: 'Bulk SMS campaigns with no expiry. Pay once, use forever.',
      image: promotionalSmsImg,
      features: [
        'Lifetime validity - no expiry ever',
        'Send 1 Lakh SMS from ₹14,000',
        'DLT-approved templates',
        'Scheduled campaigns',
        'Segment-based targeting',
        'Detailed campaign analytics',
      ],
      color: 'primary',
    },
    {
      id: 'rcs',
      icon: MessageCircle,
      title: 'RCS Messaging',
      subtitle: 'Next-Gen Rich Messaging',
      description: 'Transform SMS into interactive experiences with Rich Communication Services.',
      image: rcsMessagingImg,
      features: [
        'Rich media cards with images and videos',
        'Interactive buttons and quick replies',
        'Carousel layouts for product showcases',
        'Read receipts and typing indicators',
        'Location sharing',
        'Branded messaging with logo',
      ],
      color: 'accent',
    },
    {
      id: 'whatsapp-bulk',
      icon: Send,
      title: 'WhatsApp Bulk Message',
      subtitle: 'Virtual Number Solution',
      description: 'Send unlimited WhatsApp messages instantly via web portal using virtual numbers.',
      image: whatsappBulkImg,
      features: [
        'Send unlimited messages instantly via web portal',
        'No limits - send as many messages as you want',
        'Deliver to all active WhatsApp users worldwide',
        'Random 10-digit sender IDs (e.g., 9092929292)',
        'No DLT approval required',
        'Send any text, image, video, or PDF message',
        'Media support: Images <1MB, Videos <3MB, PDFs <1MB',
        'Ideal for marketing, alerts, and promotions',
        'Track message delivery and engagement',
        'Instant real-time delivery',
        'Secure encrypted system',
        'Easy campaign and contact management',
      ],
      color: 'success',
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive communication solutions designed to scale with your business
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => {
        const sectionRef = useRef<HTMLDivElement>(null);
        const { scrollYProgress: sectionProgress } = useScroll({
          target: sectionRef,
          offset: ["start end", "end start"]
        });
        
        const imageY = useTransform(sectionProgress, [0, 1], [50, -50]);
        const contentY = useTransform(sectionProgress, [0, 1], [-30, 30]);
        const iconScale = useTransform(sectionProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
        
        return (
        <section
          key={service.id}
          ref={sectionRef}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-gradient-subtle'} relative overflow-hidden`}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 70%, hsl(var(--success) / 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.05) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating Particles in Background */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 30 - 15, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}

          <div className="container mx-auto px-4 relative z-10">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ y: imageY }}
                className="flex-1"
              >
                <motion.div 
                  layout
                  className="relative rounded-2xl overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Animated gradient overlay on image */}
                  <motion.div
                    className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      background: [
                        'linear-gradient(135deg, transparent 0%, hsl(var(--primary) / 0.2) 50%, transparent 100%)',
                        'linear-gradient(315deg, transparent 0%, hsl(var(--success) / 0.2) 50%, transparent 100%)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  <motion.img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-[400px] object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <div className="absolute top-6 left-6 z-20">
                    <motion.div 
                      className={`w-16 h-16 bg-${service.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      style={{ scale: iconScale }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <service.icon size={32} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Particle effects on hover */}
                  <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                        animate={{
                          y: ['100%', '-20%'],
                          x: [0, `${Math.random() * 40 - 20}px`],
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0]
                        }}
                        transition={{
                          duration: 2.5 + Math.random() * 1.5,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeOut"
                        }}
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ y: contentY }}
                className="flex-1"
              >
                <motion.span 
                  className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 block"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {service.subtitle}
                </motion.span>
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {service.title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-muted-foreground mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {service.description}
                </motion.p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      layout
                      className="flex items-start gap-3 bg-background/50 backdrop-blur-sm p-3 rounded-lg border border-border/50"
                      initial={{ opacity: 0, x: -30, scale: 0.9 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        delay: 0.5 + (idx * 0.08),
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        layout: { duration: 0.3 }
                      }}
                      whileHover={{ 
                        scale: 1.03,
                        x: 8,
                        backgroundColor: "hsl(var(--primary) / 0.05)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <CheckCircle size={20} className="text-success flex-shrink-0 mt-1" />
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <Button size="lg" className="bg-gradient-primary" asChild>
                    <Link to="/contact">
                      Book a Demo
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      )}

      {/* Live Demo Section */}
      <LiveDemo />

      {/* Channel Comparison Section */}
      <ChannelComparison />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/90">
              Choose the perfect plan for your business needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white hover:bg-white/90" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
