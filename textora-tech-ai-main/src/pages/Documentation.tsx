import { motion } from 'framer-motion';
import { FileText, Download, BookOpen, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Documentation = () => {
  const documents = [
    {
      category: 'Technical Specifications',
      files: [
        {
          title: 'WhatsApp Business API Specifications',
          description: 'Complete technical documentation for WhatsApp Business API integration',
          size: '2.4 MB',
          format: 'PDF',
        },
        {
          title: 'SMS Gateway API Documentation',
          description: 'Detailed REST API specifications for SMS integration',
          size: '1.8 MB',
          format: 'PDF',
        },
        {
          title: 'RCS Messaging Protocol Guide',
          description: 'Rich Communication Services implementation guide',
          size: '3.1 MB',
          format: 'PDF',
        },
      ],
    },
    {
      category: 'Compliance & Security',
      files: [
        {
          title: 'DLT Compliance Guidelines',
          description: 'Complete guide to Distributed Ledger Technology compliance in India',
          size: '1.5 MB',
          format: 'PDF',
        },
        {
          title: 'GDPR & Data Protection Policy',
          description: 'Our commitment to data privacy and GDPR compliance',
          size: '890 KB',
          format: 'PDF',
        },
        {
          title: 'ISO 27001 Certificate',
          description: 'Information security management system certification',
          size: '450 KB',
          format: 'PDF',
        },
        {
          title: 'SOC 2 Type II Report',
          description: 'Independent audit report on security controls',
          size: '1.2 MB',
          format: 'PDF',
        },
      ],
    },
    {
      category: 'Integration Guides',
      files: [
        {
          title: 'Quick Start Guide',
          description: 'Get started with NotifyCore.AI in under 10 minutes',
          size: '650 KB',
          format: 'PDF',
        },
        {
          title: 'Node.js SDK Documentation',
          description: 'Complete Node.js library documentation with examples',
          size: '980 KB',
          format: 'PDF',
        },
        {
          title: 'PHP Integration Examples',
          description: 'Sample code and best practices for PHP integration',
          size: '720 KB',
          format: 'PDF',
        },
        {
          title: 'Python SDK Guide',
          description: 'Python library documentation with advanced use cases',
          size: '1.1 MB',
          format: 'PDF',
        },
      ],
    },
    {
      category: 'Best Practices',
      files: [
        {
          title: 'Message Optimization Guide',
          description: 'Tips for improving delivery rates and engagement',
          size: '540 KB',
          format: 'PDF',
        },
        {
          title: 'Security Best Practices',
          description: 'Recommended security configurations and practices',
          size: '780 KB',
          format: 'PDF',
        },
        {
          title: 'Rate Limiting & Throttling',
          description: 'Understanding and optimizing API rate limits',
          size: '420 KB',
          format: 'PDF',
        },
      ],
    },
  ];

  const requirements = [
    {
      title: 'System Requirements',
      items: [
        'HTTPS-enabled domain for webhooks',
        'Server with SSL/TLS certificate',
        'PHP 7.4+ / Node.js 14+ / Python 3.7+',
        'Database: MySQL 5.7+ / PostgreSQL 10+ / MongoDB 4.0+',
      ],
    },
    {
      title: 'WhatsApp Business Requirements',
      items: [
        'Verified business profile',
        'Facebook Business Manager account',
        'Valid business documents',
        'Approved message templates',
      ],
    },
    {
      title: 'SMS DLT Requirements (India)',
      items: [
        'Registered Principal Entity (PE) ID',
        'Approved sender ID / header',
        'Pre-registered message templates',
        'Valid consent records',
      ],
    },
    {
      title: 'API Access Requirements',
      items: [
        'Active NotifyCore.AI account',
        'API key & secret key',
        'IP whitelisting (optional)',
        'Webhook URL configured',
      ],
    },
  ];

  const technicalSpecs = [
    {
      title: 'API Performance',
      specs: [
        { label: 'Response Time', value: '< 200ms average' },
        { label: 'Uptime SLA', value: '99.9%' },
        { label: 'Rate Limit', value: '1000 requests/minute' },
        { label: 'Max Message Length', value: '4096 characters' },
      ],
    },
    {
      title: 'WhatsApp Business API',
      specs: [
        { label: 'Message Types', value: 'Text, Image, Video, Document, Location' },
        { label: 'Media Size Limit', value: '16 MB' },
        { label: 'Session Window', value: '24 hours' },
        { label: 'Supported Languages', value: '60+' },
      ],
    },
    {
      title: 'SMS Gateway',
      specs: [
        { label: 'Delivery Speed', value: '< 3 seconds' },
        { label: 'Character Limit', value: '160 (GSM) / 70 (Unicode)' },
        { label: 'Concatenation', value: 'Up to 10 parts' },
        { label: 'Global Coverage', value: '200+ countries' },
      ],
    },
    {
      title: 'Security',
      specs: [
        { label: 'Encryption', value: 'AES-256' },
        { label: 'Authentication', value: 'OAuth 2.0, API Keys' },
        { label: 'Data Retention', value: 'Configurable (7-90 days)' },
        { label: 'Compliance', value: 'GDPR, ISO 27001, SOC 2' },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <BookOpen size={20} />
              <span className="font-semibold">Documentation Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Comprehensive Technical Documentation
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to successfully integrate and scale with NotifyCore.AI.
              Detailed specifications, compliance documents, and implementation guides.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Integration Requirements</h2>
            <p className="text-xl text-muted-foreground">
              Prerequisites and requirements for seamless integration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {requirements.map((req, index) => (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="text-success" size={24} />
                  <h3 className="text-xl font-bold">{req.title}</h3>
                </div>
                <ul className="space-y-3">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-xl text-muted-foreground">
              Detailed technical capabilities and performance metrics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {technicalSpecs.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-lg"
              >
                <h3 className="text-lg font-bold mb-4 text-primary">{section.title}</h3>
                <div className="space-y-3">
                  {section.specs.map((spec, idx) => (
                    <div key={idx}>
                      <div className="text-xs text-muted-foreground mb-1">
                        {spec.label}
                      </div>
                      <div className="text-sm font-semibold">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Library */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Download Documentation</h2>
            <p className="text-xl text-muted-foreground">
              Access our complete library of technical documents and guides
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="technical" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                {documents.map((doc) => (
                  <TabsTrigger key={doc.category} value={doc.category.toLowerCase().replace(/\s+/g, '-')}>
                    {doc.category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {documents.map((doc) => (
                <TabsContent
                  key={doc.category}
                  value={doc.category.toLowerCase().replace(/\s+/g, '-')}
                  className="space-y-4"
                >
                  {doc.files.map((file, index) => (
                    <motion.div
                      key={file.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-glow hover:border-primary/50 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <FileText className="text-primary" size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">{file.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {file.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="bg-muted px-2 py-1 rounded">
                                {file.format}
                              </span>
                              <span>{file.size}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          <Download size={16} className="mr-2" />
                          Download
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-card rounded-2xl p-12 border border-border shadow-glow">
              <Shield className="mx-auto mb-6 text-primary" size={48} />
              <h2 className="text-3xl font-bold mb-4">
                Need Additional Documentation?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our technical team is available 24/7 to provide custom documentation,
                integration support, and compliance guidance tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-primary shadow-glow">
                  Contact Technical Support
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
