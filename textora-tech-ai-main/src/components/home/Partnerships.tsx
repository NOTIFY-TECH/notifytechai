import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Handshake, TrendingUp, Users, Award } from 'lucide-react';

const Partnerships = () => {
  const partners = [
    {
      name: 'Aisnsy',
      description: 'AI-powered social media management platform',
      icon: '🤖',
      type: 'Technology Partner'
    },
    {
      name: 'Watti',
      description: 'Versatile messaging and communication platform',
      icon: '💬',
      type: 'Integration Partner'
    },
    {
      name: 'Gupshup',
      description: 'Leading conversational messaging solutions',
      icon: '📱',
      type: 'Strategic Partner'
    }
  ];

  const benefits = [
    {
      icon: <Handshake className="w-6 h-6" />,
      title: 'Strategic Alliances',
      description: 'Access to complementary technologies and expanded market reach'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Accelerated Expansion',
      description: 'Leverage partner networks for faster business growth'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Building',
      description: 'Build trust through industry-leading partnerships'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Market Credibility',
      description: 'Gain recognition through association with established brands'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-success/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Strategic Partnerships
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Growing Together with Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strategic collaborations that drive innovation, expand reach, and accelerate growth in the AI communication space.
          </p>
        </motion.div>

        {/* Partner Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{partner.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                <p className="text-muted-foreground mb-3">{partner.description}</p>
                <Badge variant="outline">{partner.type}</Badge>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
