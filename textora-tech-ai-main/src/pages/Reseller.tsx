import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, HeadphonesIcon, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Reseller = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'High Profit Margins',
      description: 'Earn up to 40% margins on every transaction. White-label pricing control.',
    },
    {
      icon: Zap,
      title: 'Instant Activation',
      description: 'Get your reseller account activated within 24 hours. No waiting period.',
    },
    {
      icon: Shield,
      title: 'Lifetime Validity',
      description: 'Offer the same lifetime validity model to your customers without expiry concerns.',
    },
    {
      icon: Users,
      title: 'Partner Dashboard',
      description: 'Comprehensive dashboard to manage customers, transactions, and commission.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Dedicated Support',
      description: 'Priority technical and sales support for you and your customers.',
    },
    {
      icon: TrendingUp,
      title: 'Marketing Materials',
      description: 'Access to branded marketing collateral, case studies, and sales resources.',
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Resellers' },
    { value: '40%', label: 'Average Margins' },
    { value: '24h', label: 'Account Activation' },
    { value: '99.9%', label: 'Uptime SLA' },
  ];

  const steps = [
    {
      step: '1',
      title: 'Apply Online',
      description: 'Fill out the simple reseller application form with your business details.',
    },
    {
      step: '2',
      title: 'Verification',
      description: 'Our team reviews your application and verifies your business credentials.',
    },
    {
      step: '3',
      title: 'Account Setup',
      description: 'Get access to partner dashboard, API keys, and white-label resources.',
    },
    {
      step: '4',
      title: 'Start Selling',
      description: 'Begin offering NotifyCore.AI services to your customers and earn commissions.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Grow Your Business as a NotifyCore.AI Partner
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join 500+ successful resellers earning high margins with our verified messaging platform
            </p>
            <Button size="lg" variant="secondary" className="bg-white hover:bg-white/90" asChild>
              <Link to="/contact">Apply Now - Partner Dashboard Access</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Partner Benefits</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to succeed as a reseller
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-lg hover:shadow-glow transition-all"
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">How to Become a Partner</h2>
            <p className="text-xl text-muted-foreground">
              Simple 4-step process to start earning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card p-6 rounded-2xl border border-border shadow-lg h-full">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Commission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card p-8 md:p-12 rounded-2xl border border-border shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Pricing & Commission Structure</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-subtle rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-2">30-40%</div>
                  <div className="text-sm text-muted-foreground">Commission Range</div>
                </div>
                <div className="text-center p-6 bg-gradient-subtle rounded-xl">
                  <div className="text-3xl font-bold text-success mb-2">Lifetime</div>
                  <div className="text-sm text-muted-foreground">Credit Validity</div>
                </div>
                <div className="text-center p-6 bg-gradient-subtle rounded-xl">
                  <div className="text-3xl font-bold text-accent mb-2">White Label</div>
                  <div className="text-sm text-muted-foreground">Your Brand</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <p><strong>Volume-based tiers:</strong> Higher volumes = better margins</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <p><strong>Set your own pricing:</strong> Complete control over customer pricing</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <p><strong>Instant settlements:</strong> Commission credited to your account immediately</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <p><strong>No hidden fees:</strong> Transparent pricing with zero surprises</p>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-gradient-primary" asChild>
                  <Link to="/contact">Apply for Reseller Program</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Partner With Us?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of successful resellers and start earning today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white hover:bg-white/90" asChild>
                <Link to="/contact">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Reseller;
