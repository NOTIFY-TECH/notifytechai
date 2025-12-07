import { motion } from 'framer-motion';
import { Check, Crown, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Plan {
  tier: string;
  price: number;
  volume: string;
  features: string[];
  popular?: boolean;
}

interface ServicePricingCardProps {
  plan: Plan;
  categoryColor: string;
  index: number;
}

const tierIcons = {
  Silver: Star,
  Gold: Award,
  Platinum: Crown
};

const ServicePricingCard = ({ plan, categoryColor, index }: ServicePricingCardProps) => {
  const TierIcon = tierIcons[plan.tier as keyof typeof tierIcons] || Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: plan.popular ? 1.02 : 1 }}
      className={`relative bg-card rounded-2xl border overflow-hidden group ${
        plan.popular
          ? `border-primary shadow-glow-green ${plan.tier === 'Gold' ? 'md:scale-105' : ''}`
          : 'border-border shadow-lg hover:border-primary/50'
      } transition-all duration-300`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className={`absolute top-0 left-0 right-0 bg-gradient-to-r ${categoryColor} text-white text-center py-2 text-sm font-semibold`}>
          ⭐ Most Popular
        </div>
      )}

      {/* Tier Badge */}
      <div className={`absolute top-4 right-4 ${plan.popular ? 'top-12' : ''}`}>
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${categoryColor} flex items-center justify-center shadow-lg`}>
          <TierIcon className="text-white" size={24} />
        </div>
      </div>

      <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
        {/* Tier Name */}
        <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
        <p className="text-muted-foreground text-sm mb-6">{plan.volume}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
            <span className="text-muted-foreground">/plan</span>
          </div>
          <p className="text-sm text-success mt-1">One-time payment • Unlimited validity</p>
        </div>

        {/* CTA Button */}
        <Button
          className={`w-full mb-6 group-hover:scale-105 transition-transform ${
            plan.popular ? `bg-gradient-to-r ${categoryColor} text-white hover:opacity-90` : ''
          }`}
          variant={plan.popular ? 'default' : 'outline'}
          size="lg"
          asChild
        >
          <Link to="/contact">
            Get Started
          </Link>
        </Button>

        {/* Features */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground mb-3">What's included:</p>
          {plan.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${categoryColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Check size={12} className="text-white" />
              </div>
              <span className="text-sm text-foreground leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 bg-gradient-to-t ${categoryColor} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
    </motion.div>
  );
};

export default ServicePricingCard;
