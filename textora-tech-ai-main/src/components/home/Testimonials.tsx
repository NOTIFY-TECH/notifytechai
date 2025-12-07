import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  author_company: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    author_name: 'Rajes Kumar',
    author_company: 'TechShop India',
    author_role: 'CMO',
    content: 'NotifyCore.AI transformed our communication. The WhatsApp API integration is seamless, and the lifetime validity model saves us thousands monthly.',
    rating: 5,
    avatar_url: null,
  },
  {
    id: '2',
    author_name: 'Priya Sharma',
    author_company: 'EduLearn Platform',
    author_role: 'Marketing Head',
    content: 'Best SMS service we\'ve used. DLT compliance was instant, delivery rates consistently above 99%. Highly recommended!',
    rating: 5,
    avatar_url: null,
  },
  {
    id: '3',
    author_name: 'Amit Patel',
    author_company: 'FinanceGrow',
    author_role: 'CTO',
    content: 'API documentation is excellent, integration smooth, and support is responsive. Perfect for fintech apps.',
    rating: 5,
    avatar_url: null,
  },
  {
    id: '4',
    author_name: 'Sneha Reddy',
    author_company: 'HealthCare Plus',
    author_role: 'Operations Director',
    content: 'We switched to NotifyCore.AI for appointment reminders. Patient no-shows dropped by 40%.',
    rating: 5,
    avatar_url: null,
  },
  {
    id: '5',
    author_name: 'Vikram Singh',
    author_company: 'RetailMax',
    author_role: 'Digital Marketing Manager',
    content: 'Campaign analytics and real-time tracking gave us insights we never had before. ROI doubled.',
    rating: 5,
    avatar_url: null,
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [activeIndex, testimonials]);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, author_name, author_role, author_company, content, rating, avatar_url')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      if (data && data.length > 0) setTestimonials(data);
    } catch (err) {
      console.error(err);
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
    }),
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-24 bg-gradient-subtle overflow-hidden relative">
      <div className="container mx-auto px-4 text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-semibold mb-6">
          <Star className="w-4 h-4 fill-success" />
          Customer Stories
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          What Our Clients <span className="animate-gradient-text">Say</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Trusted by businesses across India and beyond
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="perspective-1000 h-[400px] md:h-[350px] relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0 flex items-center justify-center px-4 cursor-grab"
            >
              <div className="glass-strong w-full max-w-3xl p-8 md:p-12 rounded-3xl relative shadow-xl hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                  <Quote className="text-primary-foreground w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 mb-6 justify-center">
                  {[...Array(current.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star size={24} className="fill-success text-success" />
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
                >
                  "{current.content}"
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 justify-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                    {current.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{current.author_name}</p>
                    <p className="text-muted-foreground">
                      {current.author_role}
                      {current.author_company && `, ${current.author_company}`}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 rounded-full border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-lg w-12 h-12"
          onClick={() => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
          }}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 rounded-full border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-lg w-12 h-12"
          onClick={() => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
          }}
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        {testimonials.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              stopAutoSlide();
              setActiveIndex(idx);
              startAutoSlide();
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
