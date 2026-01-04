import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, MessageCircle, Users, Send, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import whatsappBusinessImg from '@/assets/whatsapp-business.jpg';
import transactionalSmsImg from '@/assets/transactional-sms.jpg';
import promotionalSmsImg from '@/assets/promotional-sms.jpg';
import rcsMessagingImg from '@/assets/rcs-messaging.jpg';
import whatsappBulkImg from '@/assets/whatsapp-bulk.jpg';
import { useState, useRef, useEffect } from 'react';

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Magnetic effect
    const magneticX = ((x - centerX) / centerX) * 15;
    const magneticY = ((y - centerY) / centerY) * 15;

    setMousePosition({ x: rotateY, y: rotateX });
    setMagneticPosition({ x: magneticX, y: magneticY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setMagneticPosition({ x: 0, y: 0 });
  };

  const services = [
    {
      icon: MessageSquare,
      title: 'WhatsApp Business API',
      description: 'Verified Green Tick badge, rich media support, automated workflows, and instant customer engagement.',
      image: whatsappBusinessImg,
      color: 'text-success',
      features: ['Verified Green Tick', 'Rich Media Support', 'Automated Workflows', 'Real-time Engagement'],
    },
    {
      icon: Mail,
      title: 'Transactional SMS',
      description: 'OTP delivery, order updates, and critical notifications with 99.9% delivery rate.',
      image: transactionalSmsImg,
      color: 'text-primary',
      features: ['99.9% Delivery Rate', 'Instant OTP Delivery', 'Order Updates', 'Critical Notifications'],
    },
    {
      icon: Mail,
      title: 'Promotional SMS',
      description: 'Bulk campaigns with lifetime validity. DLT-approved templates and instant activation.',
      image: promotionalSmsImg,
      color: 'text-primary',
      features: ['Lifetime Validity', 'DLT-Approved', 'Bulk Campaigns', 'Instant Activation'],
    },
    {
      icon: MessageCircle,
      title: 'RCS Messaging',
      description: 'Next-gen rich messaging with interactive cards, buttons, and carousel layouts.',
      image: rcsMessagingImg,
      color: 'text-accent',
      features: ['Interactive Cards', 'Rich Buttons', 'Carousel Layouts', 'Brand Messaging'],
    },
    {
      icon: Users,
      title: 'Reseller Program',
      description: 'White-label solutions with high margins. Partner dashboard and dedicated support.',
      image: whatsappBusinessImg,
      color: 'text-success',
      features: ['White-Label', 'High Margins', 'Partner Dashboard', 'Dedicated Support'],
    },
    {
      icon: Send,
      title: 'WhatsApp Bulk Message',
      description: 'Send unlimited messages via virtual numbers. No DLT needed, instant delivery with full media support.',
      image: whatsappBulkImg,
      color: 'text-success',
      features: ['No DLT Required', 'Virtual Numbers', 'Unlimited Messages', 'Full Media Support'],
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive communication solutions for every business need
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              ref={(el) => (cardRefs.current[index] = el)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => {
                setHoveredCard(null);
                handleMouseLeave();
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: "1000px",
              }}
            >
              <motion.div
                layout
                animate={
                  hoveredCard === index
                    ? {
                        rotateX: mousePosition.y,
                        rotateY: mousePosition.x,
                        x: magneticPosition.x,
                        y: magneticPosition.y,
                        scale: 1.02,
                      }
                    : {
                        rotateX: 0,
                        rotateY: 0,
                        x: 0,
                        y: 0,
                        scale: 1,
                      }
                }
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  layout: { duration: 0.3 }
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Card className="overflow-hidden group hover:shadow-glow transition-all duration-300 h-full border-2 hover:border-primary/50 relative backdrop-blur-xl bg-background/70">
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/50 to-background/80 backdrop-blur-md" />
                  
                  {/* Animated Background Gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      background: [
                        'radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, hsl(var(--success) / 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 100%, hsl(var(--accent) / 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 0%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Floating Particles */}
                  {hoveredCard === index && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-primary/40 rounded-full z-10"
                          initial={{ 
                            x: Math.random() * 100 + '%', 
                            y: Math.random() * 100 + '%',
                            opacity: 0,
                            scale: 0
                          }}
                          animate={{
                            y: [null, '-20%', '100%'],
                            x: [null, `${Math.random() * 20 - 10}%`],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </>
                  )}

                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredCard === index ? 1.15 : 1,
                      rotate: hoveredCard === index ? 2 : 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0.6,
                    }}
                  />
                  
                  {/* Animated Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: hoveredCard === index
                        ? [
                            'linear-gradient(45deg, transparent 0%, hsl(var(--primary) / 0.2) 50%, transparent 100%)',
                            'linear-gradient(225deg, transparent 0%, hsl(var(--success) / 0.2) 50%, transparent 100%)',
                          ]
                        : 'transparent'
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-4 left-4 flex items-center gap-2 z-10"
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                      y: hoveredCard === index ? -5 : 0,
                    }}
                  >
                    <div className="p-2 bg-white rounded-lg shadow-lg">
                      <service.icon className={service.color} size={24} />
                    </div>
                  </motion.div>
                  {hoveredCard === index && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10"
                    >
                      <Zap size={12} />
                      Popular
                    </motion.div>
                  )}
                </div>

                <div className="p-6 relative z-10">
                  <motion.h3
                    className="text-xl sm:text-2xl font-bold mb-2 break-words"
                    animate={{
                      color: hoveredCard === index ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    }}
                  >
                    {service.title}
                  </motion.h3>
                  <p className="text-muted-foreground mb-4 break-words">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <motion.div
                          initial={{ opacity: 0, x: -20, scale: 0.8 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{
                            delay: 0.1 * idx,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                          }}
                        >
                          <CheckCircle2 className="text-success mt-0.5 flex-shrink-0" size={16} />
                          <span>{feature}</span>
                        </motion.div>
                      </li>
                    ))}
                  </ul>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-primary hover:shadow-glow group" asChild>
                      <Link to="/services">
                        Learn More
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-gradient-primary" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
