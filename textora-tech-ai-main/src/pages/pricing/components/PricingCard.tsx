import { motion } from 'framer-motion';
import { Check, X, Rocket, Briefcase, Building, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  plan: {
    name: string;
    icon: string;
    description: string;
    price: number | string;
    features: { text: string; included: boolean }[];
    limits: { type: string; value: string }[];
    additionalInfo: string;
  };
  isAnnual: boolean;
  isPopular?: boolean;
}

const iconMap = {
  Rocket,
  Briefcase,
  Building,
  Crown,
};

const PricingCard = ({ plan, isAnnual, isPopular }: PricingCardProps) => {
  const Icon = iconMap[plan.icon as keyof typeof iconMap] || Rocket;
  
  const getPrice = () => {
    if (typeof plan.price === 'string') return plan.price;
    if (plan.price === 0) return 'Free';
    const price = isAnnual ? Math.floor(plan.price * 0.8) : plan.price;
    return `₹${price.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative bg-card rounded-2xl border ${
        isPopular 
          ? 'border-primary shadow-glow-green scale-105' 
          : 'border-border shadow-lg'
      } overflow-hidden hover:shadow-2xl transition-all duration-300`}
    >
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-white text-center py-2 text-sm font-semibold">
          Most Popular
        </div>
      )}
      
      <div className={`p-8 ${isPopular ? 'pt-14' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="text-primary" size={24} />
          </div>
          <h3 className="text-2xl font-bold">{plan.name}</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">{plan.description}</p>
        
        <div className="mb-6">
          <div className="text-4xl font-bold mb-2">
            {getPrice()}
            {typeof plan.price === 'number' && plan.price > 0 && (
              <span className="text-lg text-muted-foreground font-normal">/month</span>
            )}
          </div>
          {isAnnual && typeof plan.price === 'number' && plan.price > 0 && (
            <p className="text-sm text-success">Billed annually - Save 20%</p>
          )}
        </div>

        <Button 
          className={`w-full mb-6 ${isPopular ? 'bg-gradient-primary' : ''}`}
          variant={isPopular ? 'default' : 'outline'}
          asChild
        >
          <Link to="/contact">
            {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
          </Link>
        </Button>

        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              {feature.included ? (
                <Check size={20} className="text-success flex-shrink-0 mt-0.5" />
              ) : (
                <X size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border">
          <p className="text-sm font-semibold mb-3">Usage Limits:</p>
          <div className="space-y-2">
            {plan.limits.map((limit, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{limit.type}</span>
                <span className="font-medium">{limit.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            {plan.additionalInfo}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingCard;
