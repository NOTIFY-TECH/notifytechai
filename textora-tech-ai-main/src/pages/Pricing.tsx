import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Smartphone, Phone } from 'lucide-react';
import PricingHero from './pricing/components/PricingHero';
import ServicePricingSection from './pricing/components/ServicePricingSection';
import ComparisonTable from './pricing/components/ComparisonTable';
import FAQ from './pricing/components/FAQ';
import CTASection from './pricing/components/CTASection';

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState('sms');

  const categories = [
    { id: 'sms', label: 'Bulk SMS', icon: Send, color: 'from-blue-500 to-cyan-500' },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'from-green-500 to-emerald-500' },
    { id: 'rcs', label: 'RCS', icon: Smartphone, color: 'from-purple-500 to-pink-500' },
    { id: 'voice', label: 'Voice Call', icon: Phone, color: 'from-orange-500 to-red-500' }
  ];

  const smsPlans = [
    {
      category: 'Promotional SMS',
      description: 'Marketing, offers, and brand awareness campaigns',
      plans: [
        {
          tier: 'Silver',
          price: 2000,
          volume: '10,000 SMS',
          features: [
            'Numeric Sender ID',
            'Delivery 10 AM–9 PM',
            'Web Panel + Excel Upload',
            'Campaign Tracking',
            'Scheduled Messaging',
            'Unlimited Validity'
          ]
        },
        {
          tier: 'Gold',
          price: 5000,
          volume: '50,000 SMS',
          features: [
            'All Silver Features',
            'Faster Delivery Routes',
            'Multiple Sender IDs',
            'Advanced Analytics',
            'Priority Support'
          ],
          popular: true
        },
        {
          tier: 'Platinum',
          price: 9000,
          volume: '100,000 SMS',
          features: [
            'All Gold Features',
            'High-Volume Sending',
            'Premium Routes',
            'Dedicated Account Manager',
            'Custom Integration Support'
          ]
        }
      ]
    },
    {
      category: 'Transactional / OTP SMS',
      description: 'Alerts, OTPs, order updates, and critical notifications',
      plans: [
        {
          tier: 'Silver',
          price: 2500,
          volume: '10,000 SMS',
          features: [
            'Alphabetic Sender ID',
            '24×7 Delivery',
            'DND Allowed',
            'High-Speed OTP (1-5 sec)',
            'Real-Time Reports',
            'Secure Encryption'
          ]
        },
        {
          tier: 'Gold',
          price: 7000,
          volume: '50,000 SMS',
          features: [
            'All Silver Features',
            'API Access (JSON/XML)',
            'Priority OTP Routes',
            'Multi-Channel Fallback',
            'Advanced Delivery Reports'
          ],
          popular: true
        },
        {
          tier: 'Platinum',
          price: 12000,
          volume: '100,000 SMS',
          features: [
            'All Gold Features',
            'Enterprise Reliability',
            'Custom API Solutions',
            'Dedicated Infrastructure',
            '99.9% Uptime SLA'
          ]
        }
      ]
    },
    {
      category: 'Virtual ID SMS',
      description: 'Cost-effective mass campaigns with virtual sender numbers',
      plans: [
        {
          tier: 'Silver',
          price: 2000,
          volume: '10,000 SMS',
          features: [
            'Virtual Number Sender ID',
            'No Approval Required',
            'Better Delivery Rates',
            'Marketing + Info SMS',
            'High Throughput'
          ]
        },
        {
          tier: 'Gold',
          price: 5000,
          volume: '50,000 SMS',
          features: [
            'All Silver Features',
            'Higher Throughput',
            'Short Link Support',
            'CTA Buttons',
            'Campaign Analytics'
          ]
        },
        {
          tier: 'Platinum',
          price: 9000,
          volume: '100,000 SMS',
          features: [
            'All Gold Features',
            'Marketing Optimized Routes',
            'Bulk Import Tools',
            'Advanced Scheduling',
            'Priority Delivery'
          ]
        }
      ]
    },
    {
      category: 'SMS API / Reseller',
      description: 'Perfect for developers, SaaS owners, and agencies',
      plans: [
        {
          tier: 'Silver',
          price: 2000,
          volume: '10,000 SMS',
          features: [
            'Full API Access',
            'Unlimited Validity',
            'JSON/XML/PHP Support',
            'API Key Management',
            'Delivery Reports'
          ]
        },
        {
          tier: 'Gold',
          price: 9000,
          volume: '50,000 SMS',
          features: [
            'All Silver Features',
            'Reseller Dashboard',
            'Create Sub-Users',
            'Set Custom Margins',
            'White-Label Panel'
          ],
          popular: true
        },
        {
          tier: 'Platinum',
          price: 40000,
          volume: '100,000+ SMS',
          features: [
            'All Gold Features',
            'Enterprise Volume',
            'Custom Branding',
            'Dedicated Support',
            'Premium Routes'
          ]
        }
      ]
    }
  ];

  const whatsappPlans = [
    {
      category: 'Bulk WhatsApp',
      description: 'Mass broadcasts and marketing messages',
      plans: [
        {
          tier: 'Silver',
          price: 2500,
          volume: '10,000 Messages',
          features: [
            'Images, PDFs, Videos',
            'Web Panel Access',
            'Personalized Templates',
            'Scheduling',
            'Delivery Receipts',
            'Anti-Blocking System'
          ]
        },
        {
          tier: 'Gold',
          price: 6000,
          volume: '50,000 Messages',
          features: [
            'All Silver Features',
            'Buttons & Quick Replies',
            'Link Previews',
            'Multi-Agent Access',
            'Advanced Analytics'
          ],
          popular: true
        },
        {
          tier: 'Platinum',
          price: 9000,
          volume: '100,000 Messages',
          features: [
            'All Gold Features',
            'Unlimited Campaigns',
            'Automation Workflows',
            'Priority Delivery',
            'Dedicated Support'
          ]
        }
      ]
    },
    {
      category: 'WhatsApp Business API (Marketing)',
      description: 'Promotional conversations & customer acquisition',
      plans: [
        {
          tier: 'Silver',
          price: 7900,
          volume: '10,000 Conversations',
          features: [
            'Meta-Approved API',
            'Green Tick Support',
            'Unlimited Agents',
            'Chatbot + Drip Campaigns',
            'Template Messaging',
            'CRM Integration'
          ]
        },
        {
          tier: 'Gold',
          price: 36000,
          volume: '50,000 Conversations',
          features: [
            'All Silver Features',
            'Advanced Automation',
            'Multi-Agent Inbox',
            'Campaign Builder',
            'Real-Time Analytics'
          ],
          popular: true
        },
        {
          tier: 'Platinum',
          price: 70000,
          volume: '100,000 Conversations',
          features: [
            'All Gold Features',
            'Enterprise Features',
            'Custom Integrations',
            'Dedicated Manager',
            'Priority Support'
          ]
        }
      ]
    },
    {
      category: 'WhatsApp Business API (Utility)',
      description: 'OTPs, alerts, reminders & notifications',
      plans: [
        {
          tier: 'Silver',
          price: 7900,
          volume: '10,000 Conversations',
          features: [
            'Pay-Per-Conversation',
            '24×7 Instant Delivery',
            'Template Notifications',
            'High-Speed OTP',
            'Secure API',
            'Multi-Language Support'
          ]
        },
        {
          tier: 'Gold',
          price: 36000,
          volume: '50,000 Conversations',
          features: [
            'All Silver Features',
            'Auto-Fallback (SMS)',
            'Delivery Tracking',
            'Unlimited Team Members',
            'SaaS/ERP Integration'
          ],
          popular: true
        },
        {
          tier: 'Platinum',
          price: 70000,
          volume: '100,000 Conversations',
          features: [
            'All Gold Features',
            'Premium Utility Routes',
            'Custom Workflows',
            'Advanced Analytics',
            'Enterprise SLA'
          ]
        }
      ]
    }
  ];

  const rcsPlans = [
    {
      category: 'RCS Messaging',
      description: 'Rich Communication Services with branded experiences',
      plans: [
        {
          tier: 'Silver',
          price: 3000,
          volume: '10,000 Messages',
          features: [
            'Rich Cards + Branding',
            'Images, Buttons, Carousels',
            'Verified Sender ID',
            'Fallback SMS',
            'Read Receipts',
            'Delivery Analytics'
          ]
        },
        {
          tier: 'Gold',
          price: 12000,
          volume: '50,000 Messages',
          features: [
            'All Silver Features',
            'Verified Sender Badge',
            'QR Code Support',
            'Location Sharing',
            'CTA Buttons',
            'Enhanced Analytics'
          ],
          popular: true
        },
        {
          tier: 'Platinum',
          price: 20000,
          volume: '100,000 Messages',
          features: [
            'All Gold Features',
            'Chatbot Integration',
            'Rich UI Buttons',
            'Custom Branded Layout',
            'Automated Flows',
            'Enterprise Support'
          ]
        }
      ]
    }
  ];

  const voicePlans = [
    {
      category: 'Voice Call Broadcasting',
      description: 'Automated voice messaging and IVR campaigns',
      plans: [
        {
          tier: 'Silver',
          price: 2000,
          volume: '10,000 Calls',
          features: [
            '30-sec Recording',
            'No DND Restriction',
            'Text-to-Speech',
            'MP3 Upload',
            'Real-Time Reports',
            'Campaign Scheduling'
          ]
        },
        {
          tier: 'Gold',
          price: 7000,
          volume: '50,000 Calls',
          features: [
            'All Silver Features',
            'Retry on No-Answer',
            'IVR Integration',
            'Call Analytics Dashboard',
            'Multi-Channel Support'
          ],
          popular: true
        },
        {
          tier: 'Platinum',
          price: 12000,
          volume: '100,000 Calls',
          features: [
            'All Gold Features',
            'Detailed Analytics',
            'High-Volume Broadcasting',
            'Priority Routes',
            'Dedicated Support'
          ]
        }
      ]
    }
  ];

  const allPlans = {
    sms: smsPlans,
    whatsapp: whatsappPlans,
    rcs: rcsPlans,
    voice: voicePlans
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <PricingHero />

      {/* Category Tabs */}
      <section className="py-12 sticky top-20 bg-background/95 backdrop-blur-lg z-40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Sections */}
      <ServicePricingSection
        plans={allPlans[activeCategory as keyof typeof allPlans]}
        categoryColor={categories.find(c => c.id === activeCategory)?.color || ''}
      />

      <ComparisonTable />
      <FAQ />
      <CTASection />
    </div>
  );
};

export default Pricing;
