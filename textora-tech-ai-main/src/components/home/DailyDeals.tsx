import { motion, useInView } from 'framer-motion';
import { Clock, Sparkles, TrendingUp, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const DailyDeals = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      icon: Gift,
      title: 'WhatsApp API Launch Offer',
      description: '50% off setup fees + 10,000 free messages',
      originalPrice: '₹20,000',
      dealPrice: '₹10,000',
      badge: 'LIMITED TIME',
      gradient: 'from-success via-success-light to-success',
    },
    {
      icon: TrendingUp,
      title: 'SMS Bundle Deal',
      description: '1 Lakh SMS with lifetime validity',
      originalPrice: '₹18,000',
      dealPrice: '₹14,000',
      badge: 'BEST VALUE',
      gradient: 'from-primary via-primary-light to-primary',
    },
    {
      icon: Sparkles,
      title: 'RCS Premium Launch',
      description: 'Early access with 25% discount forever',
      originalPrice: '₹30,000',
      dealPrice: '₹22,500',
      badge: 'EXCLUSIVE',
      gradient: 'from-accent via-primary to-success',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -60, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Flip timer digit component
  const FlipDigit = ({ value, label }: { value: number; label: string }) => {
    const [prevValue, setPrevValue] = useState(value);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
      if (value !== prevValue) {
        setIsFlipping(true);
        const timeout = setTimeout(() => {
          setPrevValue(value);
          setIsFlipping(false);
        }, 300);
        return () => clearTimeout(timeout);
      }
    }, [value, prevValue]);

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-24 perspective-1000">
          <div className={`flip-card-vertical ${isFlipping ? 'flipping' : ''}`}>
            <motion.div
              className="w-full h-full bg-card border border-border rounded-xl shadow-lg flex items-center justify-center overflow-hidden"
              animate={isFlipping ? { rotateX: [-90, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl font-bold text-primary">
                {String(value).padStart(2, '0')}
              </span>
            </motion.div>
          </div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-xl pointer-events-none" />
        </div>
        <span className="text-xs text-muted-foreground mt-2 font-medium">{label}</span>
      </div>
    );
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6"
          >
            <Clock className="animate-pulse" size={20} />
            <span className="font-semibold">Flash Sale - Ending Soon!</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Today's <span className="animate-gradient-text">Exclusive</span> Deals
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Limited-time offers to supercharge your messaging capabilities
          </p>

          {/* Flip Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mb-12"
          >
            <FlipDigit value={timeLeft.hours} label="HOURS" />
            <div className="flex items-center text-3xl font-bold text-primary">:</div>
            <FlipDigit value={timeLeft.minutes} label="MINUTES" />
            <div className="flex items-center text-3xl font-bold text-primary">:</div>
            <FlipDigit value={timeLeft.seconds} label="SECONDS" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {deals.map((deal, index) => (
            <motion.div
              key={deal.title}
              variants={cardVariants}
              className="group"
            >
              <motion.div
                className="relative h-full bg-card rounded-3xl p-8 border border-border shadow-lg overflow-hidden"
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${deal.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Badge with pulse */}
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className={`bg-gradient-to-r ${deal.gradient} text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}>
                    {deal.badge}
                  </span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${deal.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <deal.icon className="text-primary-foreground" size={28} />
                </motion.div>

                <h3 className="text-2xl font-bold mb-3">{deal.title}</h3>
                <p className="text-muted-foreground mb-6">{deal.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    <motion.span
                      className="text-4xl font-bold text-primary"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {deal.dealPrice}
                    </motion.span>
                    <span className="text-lg text-muted-foreground line-through">
                      {deal.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-success mt-2 font-medium">
                    Save {Math.round(((parseInt(deal.originalPrice.replace(/[^0-9]/g, '')) - parseInt(deal.dealPrice.replace(/[^0-9]/g, ''))) / parseInt(deal.originalPrice.replace(/[^0-9]/g, ''))) * 100)}% Today
                  </p>
                </div>

                <Button
                  size="lg"
                  className={`w-full bg-gradient-to-r ${deal.gradient} shadow-lg hover:shadow-glow group/btn`}
                  asChild
                >
                  <Link to="/contact" className="flex items-center justify-center gap-2">
                    Claim Offer
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          * Offers valid for today only. Terms and conditions apply.
        </motion.p>
      </div>
    </section>
  );
};

export default DailyDeals;
