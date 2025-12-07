import { motion } from 'framer-motion';
import { Check, X, Zap, Shield, DollarSign, Globe, MessageSquare, Smartphone, Radio, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ChannelComparison = () => {
  const channels = [
    { 
      name: 'WhatsApp', 
      icon: MessageSquare, 
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30'
    },
    { 
      name: 'SMS', 
      icon: Smartphone, 
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/30'
    },
    { 
      name: 'RCS', 
      icon: Radio, 
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30'
    }
  ];

  const features = [
    {
      category: 'Delivery & Performance',
      icon: Zap,
      items: [
        { feature: 'Delivery Rate', whatsapp: '98%', sms: '99.9%', rcs: '95%' },
        { feature: 'Delivery Time', whatsapp: '< 2 sec', sms: '< 5 sec', rcs: '< 3 sec' },
        { feature: 'Global Reach', whatsapp: '5+ countries', sms: '1+ countries', rcs: '1+ countries' }
      ]
    },
    {
      category: 'Features & Capabilities',
      icon: Shield,
      items: [
        { feature: 'Rich Media', whatsapp: true, sms: false, rcs: true },
        { feature: 'Interactive Buttons', whatsapp: true, sms: false, rcs: true },
        { feature: 'Read Receipts', whatsapp: true, sms: false, rcs: true },
        { feature: 'Character Limit', whatsapp: '1032', sms: '120', rcs: '80' },
        { feature: 'Verified Badge', whatsapp: true, sms: false, rcs: true }
      ]
    },
    {
      category: 'Cost & Compliance',
      icon: DollarSign,
      items: [
        { feature: 'Cost/Message', whatsapp: '₹0.25-1', sms: '₹0.14-0.25', rcs: '₹0.35-0.50' },
        { feature: 'DLT Compliance', whatsapp: true, sms: true, rcs: true },
        { feature: 'Setup Time', whatsapp: '24-48 hrs', sms: 'Instant', rcs: '48-72 hrs' }
      ]
    }
  ];

  const useCases = [
    {
      channel: 'WhatsApp Business',
      subtitle: 'Customer Support & Engagement',
      icon: MessageSquare,
      gradient: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
      border: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500',
      strengths: ['Two-way conversations', 'Rich media sharing', 'High engagement', 'Brand trust'],
      limitations: ['User opt-in required', 'Higher cost', 'Template approval'],
      idealFor: 'E-commerce, customer service, order tracking'
    },
    {
      channel: 'SMS',
      subtitle: 'Critical Notifications & OTPs',
      icon: Smartphone,
      gradient: 'from-primary/20 via-primary/10 to-transparent',
      border: 'border-primary/30',
      iconBg: 'bg-primary',
      strengths: ['Universal reach', 'Highest delivery', 'Instant delivery', 'Cost-effective'],
      limitations: ['No rich media', 'Limited characters', 'No read receipts'],
      idealFor: 'OTPs, alerts, reminders, banking updates'
    },
    {
      channel: 'RCS Messaging',
      subtitle: 'Marketing & Interactive Campaigns',
      icon: Radio,
      gradient: 'from-violet-500/20 via-violet-500/10 to-transparent',
      border: 'border-violet-500/30',
      iconBg: 'bg-violet-500',
      strengths: ['Rich interactive content', 'Branded messaging', 'Carousel layouts', 'Action buttons'],
      limitations: ['Limited device support', 'SMS fallback needed', 'Geographic limits'],
      idealFor: 'Product showcases, promotions, surveys'
    }
  ];

  const decisionGuide = [
    { icon: Globe, title: 'Need Global Reach?', answer: 'Choose SMS', desc: 'Universal coverage in 5+ countries' },
    { icon: Shield, title: 'Want Rich Engagement?', answer: 'WhatsApp or RCS', desc: 'Interactive content & media' },
    { icon: DollarSign, title: 'Budget Conscious?', answer: 'Choose SMS', desc: 'Most cost-effective for bulk' }
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/15">
          <Check className="text-emerald-500" size={16} strokeWidth={3} />
        </div>
      ) : (
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted/80">
          <X className="text-muted-foreground/60" size={16} strokeWidth={2} />
        </div>
      );
    }
    return <span className="text-sm font-semibold text-foreground">{value}</span>;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Channel Comparison</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Choose the Right Channel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compare features, costs, and capabilities to find the perfect messaging solution for your business
          </p>
        </motion.div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="bg-card rounded-3xl border border-border/60 shadow-xl shadow-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-6 font-semibold text-muted-foreground w-[28%]">
                      Feature
                    </th>
                    {channels.map((channel, idx) => (
                      <th key={idx} className="text-center p-6 w-[24%]">
                        <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full ${channel.bg} border ${channel.border}`}>
                          <channel.icon size={18} className={channel.color} />
                          <span className={`font-bold text-sm ${channel.color}`}>{channel.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, catIdx) => (
                    <motion.tr
                      key={`cat-${catIdx}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 }}
                      className="contents"
                    >
                      {/* Render category header as a row group */}
                    </motion.tr>
                  ))}
                  {features.flatMap((category, catIdx) => [
                    // Category Header Row
                    <tr key={`header-${catIdx}`} className="bg-gradient-to-r from-muted/80 to-muted/40">
                      <td colSpan={4} className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                            <category.icon size={18} className="text-primary" />
                          </div>
                          <span className="font-bold text-foreground">{category.category}</span>
                        </div>
                      </td>
                    </tr>,
                    // Category Items Rows
                    ...category.items.map((item, idx) => (
                      <tr 
                        key={`item-${catIdx}-${idx}`}
                        className="border-b border-border/40 hover:bg-muted/20 transition-colors duration-200"
                      >
                        <td className="p-5 text-muted-foreground font-medium">{item.feature}</td>
                        <td className="p-5 text-center">{renderValue(item.whatsapp)}</td>
                        <td className="p-5 text-center">{renderValue(item.sms)}</td>
                        <td className="p-5 text-center">{renderValue(item.rcs)}</td>
                      </tr>
                    ))
                  ])}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Use Case Cards */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Best Use Cases</h3>
            <p className="text-muted-foreground">Find the perfect channel for your specific needs</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`relative bg-card rounded-3xl border ${useCase.border} overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} pointer-events-none`} />
                
                <div className="relative p-7">
                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${useCase.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <useCase.icon size={26} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">{useCase.channel}</h4>
                      <p className="text-sm text-muted-foreground">{useCase.subtitle}</p>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
                      Strengths
                    </p>
                    <ul className="space-y-2.5">
                      {useCase.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-emerald-500" strokeWidth={3} />
                          </div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                  {/* Limitations */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      Considerations
                    </p>
                    <ul className="space-y-2.5">
                      {useCase.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-5 border border-border/50">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                      Ideal For
                    </p>
                    <p className="text-sm text-foreground font-medium">{useCase.idealFor}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Decision Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative bg-card rounded-3xl border border-primary/20 overflow-hidden shadow-xl shadow-primary/5">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pointer-events-none" />
            
            <div className="relative p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Zap size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-primary">Quick Guide</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Not Sure Which to Choose?
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-5 mb-10">
                {decisionGuide.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-border/60 hover:border-primary/40 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                      <item.icon size={26} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-primary font-bold text-lg mb-1">{item.answer}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="text-center">
                <Button asChild size="lg" className="group px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  <Link to="/contact">
                    Get Expert Recommendation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Free consultation • No commitment required
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChannelComparison;
