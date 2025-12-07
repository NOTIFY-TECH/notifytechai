import { motion } from 'framer-motion';

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: (value: boolean) => void;
}

const PricingToggle = ({ isAnnual, onToggle }: PricingToggleProps) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center bg-card border border-border rounded-full p-1"
      >
        <button
          onClick={() => onToggle(false)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            !isAnnual 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isAnnual 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Annual
          <span className="ml-2 text-xs bg-success text-white px-2 py-0.5 rounded-full">
            Save 20%
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default PricingToggle;
