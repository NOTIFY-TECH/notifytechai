import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'What happens if I exceed my monthly message limit?',
      answer: 'You can purchase additional messages at competitive pay-as-you-go rates: ₹0.35 per WhatsApp message, ₹0.25 per SMS, and ₹0.45 per RCS message. No service interruption occurs.',
    },
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate any charges or credits accordingly.',
    },
    {
      question: 'Do you offer custom enterprise plans?',
      answer: 'Absolutely. Our Enterprise plan is fully customizable based on your specific needs, including custom message volumes, dedicated infrastructure, and SLA guarantees. Contact our sales team for details.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! Our Starter plan is completely free with 1,000 WhatsApp messages and 500 SMS messages per month. No credit card required to get started.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, UPI, net banking, and bank transfers. For enterprise plans, we also offer invoice-based billing.',
    },
    {
      question: 'Are there any setup fees or hidden charges?',
      answer: 'No hidden fees ever. What you see is what you pay. All our plans include setup, onboarding, and ongoing support at no additional cost.',
    },
    {
      question: 'How does the annual billing discount work?',
      answer: 'When you choose annual billing, you save 20% on all paid plans. You pay for 12 months upfront and get approximately 2.4 months free compared to monthly billing.',
    },
    {
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all annual plans. If you\'re not completely satisfied, contact us within 30 days for a full refund.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our pricing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
