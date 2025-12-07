import { motion } from 'framer-motion';

const PricingHero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingHero;
