import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ServicePricingCard from './ServicePricingCard';

interface Plan {
  tier: string;
  price: number;
  volume: string;
  features: string[];
  popular?: boolean;
}

interface PlanCategory {
  category: string;
  description: string;
  plans: Plan[];
}

interface ServicePricingSectionProps {
  plans: PlanCategory[];
  categoryColor: string;
}

const ServicePricingSection = ({ plans, categoryColor }: ServicePricingSectionProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {plans.map((planCategory, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="mb-24 last:mb-0"
          >
            {/* Category Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-2 rounded-full mb-4"
              >
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {planCategory.category}
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {planCategory.category}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {planCategory.description}
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {planCategory.plans.map((plan, planIndex) => (
                <ServicePricingCard
                  key={planIndex}
                  plan={plan}
                  categoryColor={categoryColor}
                  index={planIndex}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicePricingSection;
