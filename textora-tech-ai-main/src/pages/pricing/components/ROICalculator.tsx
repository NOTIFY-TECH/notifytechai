import { motion } from 'framer-motion';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { TrendingUp } from 'lucide-react';

const ROICalculator = () => {
  const [messages, setMessages] = useState(10000);
  
  const calculateROI = () => {
    // Using average credit cost of 0.16 (Bulk WhatsApp) for Texora
    const ourCredits = messages * 0.16;
    // Competitor average at 0.25 credits equivalent
    const competitorCredits = messages * 0.25;
    const savings = competitorCredits - ourCredits;
    const savingsPercent = ((savings / competitorCredits) * 100).toFixed(0);
    
    return { ourCredits, competitorCredits, savings, savingsPercent };
  };

  const roi = calculateROI();

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Calculate Your Savings
          </h2>
          <p className="text-xl text-muted-foreground">
            See how much you can save with Texora Technologies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl border border-border shadow-xl p-8"
        >
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4">
              Number of messages per month: {messages.toLocaleString()}
            </label>
            <Slider
              value={[messages]}
              onValueChange={(value) => setMessages(value[0])}
              min={1000}
              max={100000}
              step={1000}
              className="w-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background rounded-xl p-6 text-center">
              <div className="text-sm text-muted-foreground mb-2">Texora Technologies</div>
              <div className="text-3xl font-bold text-primary">
                {roi.ourCredits.toLocaleString()} credits
              </div>
            </div>
            
            <div className="bg-background rounded-xl p-6 text-center">
              <div className="text-sm text-muted-foreground mb-2">Competitors</div>
              <div className="text-3xl font-bold text-destructive">
                {roi.competitorCredits.toLocaleString()} credits
              </div>
            </div>
            
            <div className="bg-success/10 rounded-xl p-6 text-center border border-success/20">
              <div className="text-sm text-success mb-2 flex items-center justify-center gap-2">
                <TrendingUp size={16} />
                Your Savings
              </div>
              <div className="text-3xl font-bold text-success">
                {roi.savings.toLocaleString()} credits
              </div>
              <div className="text-sm text-success/80 mt-1">
                {roi.savingsPercent}% cheaper
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
