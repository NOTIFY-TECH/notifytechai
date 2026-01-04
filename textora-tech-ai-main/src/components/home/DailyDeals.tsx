import { motion, useInView } from "framer-motion";
import {
  Clock,
  Sparkles,
  TrendingUp,
  Gift,
  ArrowRight,
  ShoppingBag,
  X,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

// Add rainbow animation CSS
const rainbowStyle = `
  .rainbow-text {
    background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rainbow 3s ease-in-out infinite;
  }

  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const initialTime = { hours: 23, minutes: 59, seconds: 59 };

type Deal = {
  icon: LucideIcon;
  title: string;
  description: string;
  originalPrice: string;
  dealPrice: string;
  badge: string;
  gradient: string;
  origNum?: number;
  dealNum?: number;
  savePercent?: number;
};

const DailyDeals = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useInView(ref, { once: true, margin: "-100px" });

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // deterministic countdown that stops at 0
  useEffect(() => {
    const getTotalSeconds = (t: typeof initialTime) =>
      t.hours * 3600 + t.minutes * 60 + t.seconds;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const total = getTotalSeconds(prev);
        if (total <= 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        const next = total - 1;
        const hours = Math.floor(next / 3600);
        const minutes = Math.floor((next % 3600) / 60);
        const seconds = next % 60;
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // precompute numeric values and save percent
  const computedDeals = useMemo(() => {
    const deals: Deal[] = [
      {
        icon: Gift,
        title: "WhatsApp API Launch Offer",
        description: "50% off setup fees + 10,000 free messages",
        originalPrice: "₹20,000",
        dealPrice: "₹10,000",
        badge: "LIMITED TIME",
        gradient: "from-success via-success-light to-success",
      },
      {
        icon: TrendingUp,
        title: "SMS Bundle Deal",
        description: "1 Lakh SMS with lifetime validity",
        originalPrice: "₹18,000",
        dealPrice: "₹14,000",
        badge: "BEST VALUE",
        gradient: "from-primary via-primary-light to-primary",
      },
      {
        icon: Sparkles,
        title: "RCS Premium Launch",
        description: "Early access with 25% discount forever",
        originalPrice: "₹30,000",
        dealPrice: "₹22,500",
        badge: "EXCLUSIVE",
        gradient: "from-accent via-primary to-success",
      },
    ];

    return deals.map((d) => {
      const origNum = parseInt(d.originalPrice.replace(/[^0-9]/g, ""), 10);
      const dealNum = parseInt(d.dealPrice.replace(/[^0-9]/g, ""), 10);
      const savePercent = origNum > 0 ? Math.round(((origNum - dealNum) / origNum) * 100) : 0;
      return { ...d, origNum, dealNum, savePercent };
    });
  }, []);

  // motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20, rotateY: -6 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { type: ("spring" as const), stiffness: 120, damping: 16 },
    },
  };

  // Sheet entrance variants
  const sheetHeaderVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const timerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const dealsContainerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  // Particle burst component
  const ParticleBurst = () => {
    const particles = Array.from({ length: 8 }, (_, i) => i);

    return (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: Math.cos((particle / particles.length) * 2 * Math.PI) * 60,
              y: Math.sin((particle / particles.length) * 2 * Math.PI) * 60,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 0.1 * particle,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Flip timer digit component (uses inline perspective style)
  const FlipDigit = ({ value, label }: { value: number; label: string }) => {
    const [prevValue, setPrevValue] = useState(value);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
      if (value !== prevValue) {
        setIsFlipping(true);
        const t = setTimeout(() => {
          setPrevValue(value);
          setIsFlipping(false);
        }, 300);
        return () => clearTimeout(t);
      }
    }, [value, prevValue]);

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-24 perspective-1000">
          <div className={`flip-card-vertical ${isFlipping ? "flipping" : ""}`}>
            <motion.div
              className="w-full h-full bg-card border border-border rounded-xl shadow-lg flex items-center justify-center overflow-hidden"
              animate={isFlipping ? { rotateX: [-90, 0] } : {}}
              transition={{ duration: 0.28 }}
            >
              <span className="text-4xl font-bold text-primary">
                {String(value).padStart(2, "0")}
              </span>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-xl pointer-events-none" />
        </div>
        <span className="text-xs text-muted-foreground mt-2 font-medium">{label}</span>
      </div>
    );
  };

  // render expanded deal detail inside sheet
  const renderExpanded = (d: Deal) => {
    return (
      <div className="w-full bg-gradient-to-r from-indigo-500/6 to-emerald-500/4 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <div className={`w-14 h-14 flex items-center justify-center rounded-lg ${d.gradient} shadow`}>
            <d.icon className="text-primary-foreground" size={30} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">{d.title}</h3>
              <span className="text-[12px] font-semibold px-2 py-1 rounded-full text-primary-foreground bg-white/6">{d.badge}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{d.description}</p>

            <div className="mt-3 flex items-center gap-4">
              <div>
                <div className="text-2xl font-extrabold text-primary">{d.dealPrice}</div>
                <div className="text-sm text-muted-foreground line-through">{d.originalPrice}</div>
                <div className="text-sm text-success mt-1 font-medium">Save {d.savePercent}% Today</div>
              </div>

              <div className="ml-auto flex gap-2">
                <Button size="sm" className="px-4" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Claim Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedDeal(null)}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: rainbowStyle }} />
      {/* Floating Trigger Button - left side with stacked icon + "Daily Deals" label */}
      <motion.div
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-[9999]"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Sheet>
          <SheetTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                aria-label="Open Daily Deals"
                className="
                  bg-gradient-to-r from-primary to-primary-light
                  hover:from-primary-light hover:to-primary
                  shadow-xl shadow-primary/50 rounded-full
                  p-4 flex flex-col items-center gap-1
                  border-2 border-white/40
                  backdrop-blur-sm
                  relative z-10
                "
              >
                {/* 🔥 SUPER VISIBLE ICON — 55px */}
                <ShoppingBag
                  className="text-white drop-shadow-lg"
                  size={80}
                  strokeWidth={2.7}
                />

                {/* Clear readable labels */}
                <div className="text-[13px] text-white font-bold leading-none text-center tracking-wide">
                  Daily
                </div>
                <div className="text-[12px] text-white/90 -mt-[2px] tracking-wide">
                  Deals
                </div>

                <span className="sr-only">Open Daily Deals</span>
              </Button>
            </motion.div>
          </SheetTrigger>

          {/* SheetContent - compact popup */}
          <SheetContent
            side="left"
            className="
              w-screen sm:max-w-md sm:mx-auto
              max-h-[82vh] sm:max-h-[72vh]
              p-0 overflow-y-auto rounded-lg sm:rounded-2xl shadow-2xl
            "
            aria-label="Daily deals popup"
          >
            <div ref={ref} className="relative bg-gradient-subtle min-h-[120px]">
              {/* Close button top-right */}
              <div className="absolute top-3 right-3 z-20">
                <SheetClose asChild>
                  <Button size="sm" variant="ghost" aria-label="Close Daily Deals" className="p-2">
                    <X className="w-4 h-4" />
                  </Button>
                </SheetClose>
              </div>

              {/* header / hero area */}
              <div className="relative z-10 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full">
                    <Clock className="animate-pulse" size={14} />
                    <span className="font-medium text-sm">Flash Sale</span>
                  </div>

                  {/* show selectedDeal quick label if open */}
                  {selectedDeal ? (
                    <div className="text-xs text-muted-foreground">Viewing: <span className="font-semibold">{selectedDeal.title}</span></div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Today's Exclusive Deals</div>
                  )}
                </div>

                <motion.div variants={sheetHeaderVariants} initial="hidden" animate="visible" className="relative">
                  <ParticleBurst />
                  <h2 className="text-2xl md:text-3xl font-bold mb-1">
                    Daily{" "}
                    <span className="rainbow-text animate-rainbow">Deals</span>
                  </h2>
                </motion.div>
                <p className="text-sm text-muted-foreground mb-4 max-w-[28rem]">Click any offer to view details. Offers update daily — grab them before they're gone!</p>

                {/* Timer row */}
                <motion.div variants={timerVariants} initial="hidden" animate="visible" transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} className="flex items-center gap-3">
                  <div className="flex justify-center gap-2">
                    <FlipDigit value={timeLeft.hours} label="HOURS" />
                    <div className="flex items-center text-2xl font-bold text-primary">:</div>
                    <FlipDigit value={timeLeft.minutes} label="MINUTES" />
                    <div className="flex items-center text-2xl font-bold text-primary">:</div>
                    <FlipDigit value={timeLeft.seconds} label="SECONDS" />
                  </div>
                </motion.div>
              </div>

              {/* If a deal is selected, show expanded detail panel */}
              <div className="relative z-10 p-4 sm:p-6 space-y-4">
                {selectedDeal && renderExpanded(selectedDeal)}

                {/* deals list */}
                <motion.div
                  variants={dealsContainerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                  >
                    {computedDeals.map((deal) => (
                      <motion.div key={deal.title} variants={cardVariants} className="group">
                        <motion.button
                          onClick={() => setSelectedDeal(deal)}
                          // using button so it's keyboard accessible; style resets applied via classes
                          className="w-full text-left relative bg-card rounded-xl p-3 sm:p-4 border border-border shadow-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/30"
                          whileHover={!prefersReducedMotion ? { y: -6 } : {}}
                          transition={{ type: "spring", stiffness: 280 }}
                        >
                          {/* gradient accent stripe */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-gradient-to-b from-indigo-500/90 to-emerald-500/90" />

                          <div className="relative ml-3 pl-4">
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${deal.gradient} rounded-lg flex items-center justify-center shadow`}>
                                <deal.icon className="text-primary-foreground" size={30} />
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <h3 className="text-md font-semibold mb-0">{deal.title}</h3>
                                  <span className="text-[11px] rounded-full px-2 py-0.5 font-semibold text-primary-foreground bg-white/4">
                                    {deal.badge}
                                  </span>
                                </div>

                                <p className="text-xs text-muted-foreground mb-2">{deal.description}</p>

                                <div className="flex items-baseline gap-3">
                                  <div className="text-lg font-bold text-primary">{deal.dealPrice}</div>
                                  <div className="text-sm text-muted-foreground line-through">{deal.originalPrice}</div>
                                  <div className="text-xs text-success ml-2 font-medium">Save {deal.savePercent}%</div>
                                </div>
                              </div>
                            </div>

                            {/* subtle arrow on the right */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>

                  <p className="text-center text-xs text-muted-foreground mt-1">* Offers valid for today only. Terms and conditions apply.</p>
                </motion.div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
};

export default DailyDeals;
