import { motion } from 'framer-motion';
import { MessageSquare, Smartphone, Radio, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ComparisonTable = () => {
  const tiers = [
    { name: 'Silver', volume: '10K', color: 'text-slate-500', bg: 'bg-slate-500/10' },
    { name: 'Gold', volume: '50K', color: 'text-amber-500', bg: 'bg-amber-500/10', popular: true },
    { name: 'Platinum', volume: '100K', color: 'text-violet-500', bg: 'bg-violet-500/10' }
  ];

  const services = [
    {
      category: 'Bulk SMS',
      icon: Smartphone,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      items: [
        { name: 'Promotional SMS', silver: '₹2,000', gold: '₹5,000', platinum: '₹9,000' },
        { name: 'Transactional/OTP', silver: '₹2,500', gold: '₹7,000', platinum: '₹12,000' },
        { name: 'Virtual ID SMS', silver: '₹2,000', gold: '₹5,000', platinum: '₹9,000' },
        { name: 'SMS API/Reseller', silver: '₹2,000', gold: '₹9,000', platinum: '₹40,000' }
      ]
    },
    {
      category: 'WhatsApp Messages',
      icon: MessageSquare,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
      items: [
        { name: 'Bulk WhatsApp', silver: '₹2,500', gold: '₹6,000', platinum: '₹9,000' },
        { name: 'Business API (Marketing)', silver: '₹7,900', gold: '₹36,000', platinum: '₹70,000' },
        { name: 'Business API (Utility)', silver: '₹7,900', gold: '₹36,000', platinum: '₹70,000' }
      ]
    },
    {
      category: 'RCS Messaging',
      icon: Radio,
      iconBg: 'bg-violet-500/10',
      iconColor: 'text-violet-500',
      items: [
        { name: 'RCS Messages', silver: '₹3,000', gold: '₹12,000', platinum: '₹20,000' }
      ]
    },
    {
      category: 'Voice Call',
      icon: Phone,
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
      items: [
        { name: 'Voice Broadcasting', silver: '₹2,000', gold: '₹7,000', platinum: '₹12,000' }
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Price Comparison
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Quick Price Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare pricing across all services at a glance
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-5 border-b border-border bg-muted/30">
            <div className="text-sm font-semibold text-muted-foreground">
              Service Type
            </div>
            {tiers.map((tier, idx) => (
              <div key={idx} className="text-center">
                <div className={`inline-flex flex-col items-center gap-1 px-4 py-2 rounded-xl ${tier.bg} relative`}>
                  {tier.popular && (
                    <span className="absolute -top-2 -right-2">
                      <Sparkles size={14} className="text-amber-500" />
                    </span>
                  )}
                  <span className={`font-bold text-sm ${tier.color}`}>{tier.name}</span>
                  <span className="text-xs text-muted-foreground">{tier.volume} msgs</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {/* Desktop Table */}
            <div className="hidden md:block">
              {services.map((service, serviceIdx) => (
                <motion.div
                  key={serviceIdx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: serviceIdx * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                        <service.icon size={18} className={service.iconColor} />
                      </div>
                      <span className="font-semibold text-foreground">{service.category}</span>
                    </div>
                  </div>

                  {/* Service Items */}
                  {service.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="grid grid-cols-4 gap-4 p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="text-sm text-muted-foreground pl-12">
                        {item.name}
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-medium text-foreground">{item.silver}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                          {item.gold}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-medium text-foreground">{item.platinum}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {services.map((service, serviceIdx) => (
                <motion.div
                  key={serviceIdx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: serviceIdx * 0.1 }}
                  className="p-4"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                      <service.icon size={20} className={service.iconColor} />
                    </div>
                    <span className="font-semibold text-foreground text-lg">{service.category}</span>
                  </div>

                  {/* Service Items */}
                  {service.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="mb-4 p-3 bg-muted/30 rounded-lg">
                      <div className="font-medium text-foreground mb-2">{item.name}</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">Silver</div>
                          <span className="font-medium">{item.silver}</span>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">Gold</div>
                          <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full text-xs">
                            {item.gold}
                          </span>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">Platinum</div>
                          <span className="font-medium">{item.platinum}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notes & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          {/* Notes */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              One-time payments, unlimited validity
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Enterprise solutions for higher volumes
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="group">
              <Link to="/contact">
                Request Custom Quote
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
