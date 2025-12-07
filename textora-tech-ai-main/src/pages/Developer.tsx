import { motion } from 'framer-motion';
import { Code, BookOpen, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import apiImage from '@/assets/api-visualization.jpg';

const Developer = () => {
  const codeExamples = {
    nodejs: `const axios = require('axios');

// Send WhatsApp Message
const sendWhatsApp = async () => {
  const response = await axios.post(
    'https://api.texora.com/v1/whatsapp/send',
    {
      to: '+919876543210',
      template: 'welcome_message',
      parameters: {
        name: 'John Doe',
        code: 'WELCOME50'
      }
    },
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    }
  );
  console.log(response.data);
};`,
    python: `import requests

# Send SMS
def send_sms():
    url = "https://api.texora.com/v1/sms/send"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    payload = {
        "to": "+919876543210",
        "message": "Your OTP is 123456",
        "sender_id": "OMNIID"
    }
    response = requests.post(url, json=payload, headers=headers)
    print(response.json())`,
    php: `<?php
// Send RCS Message
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.texora.com/v1/rcs/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer YOUR_API_KEY",
    "Content-Type: application/json"
  ],
  CURLOPT_POSTFIELDS => json_encode([
    "to" => "+919876543210",
    "content" => [
      "text" => "Check out our new products",
      "suggestions" => [
        ["text" => "View Catalog", "url" => "https://store.com"]
      ]
    ]
  ])
]);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
?>`,
  };

  const features = [
    {
      icon: Code,
      title: 'RESTful API',
      description: 'Simple, intuitive REST API with comprehensive documentation and examples.',
    },
    {
      icon: Zap,
      title: 'Fast Integration',
      description: 'Get up and running in minutes with our quick start guides and SDKs.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime SLA and redundant infrastructure.',
    },
    {
      icon: BookOpen,
      title: 'Complete Docs',
      description: 'Detailed API reference, tutorials, and code samples for all use cases.',
    },
  ];

  const integrations = [
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'PHP', icon: '🐘' },
    { name: 'Java', icon: '☕' },
    { name: 'Ruby', icon: '💎' },
    { name: '.NET', icon: '🔷' },
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
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Plug & Play APIs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Powerful, developer-friendly APIs for WhatsApp, SMS, and RCS messaging
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-primary" asChild>
                <Link to="/contact">Get API Keys</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#docs">View Documentation</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-glow transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section id="docs" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Quick Start Examples</h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our simple API
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(codeExamples).map(([lang, code], index) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <div className="bg-primary/10 px-4 py-3 border-b border-border">
                  <span className="font-semibold capitalize">{lang}</span>
                </div>
                <div className="max-h-[400px] overflow-auto">
                  <SyntaxHighlighter
                    language={lang === 'nodejs' ? 'javascript' : lang}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: 'transparent',
                      fontSize: '0.85rem',
                    }}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Logos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Works With Your Tech Stack</h2>
            <p className="text-xl text-muted-foreground">
              SDKs and libraries for all major programming languages
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 bg-card px-6 py-4 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl">{integration.icon}</span>
                <span className="font-semibold text-lg">{integration.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Visualization */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h2 className="text-4xl font-bold mb-4">
                Enterprise-Grade Infrastructure
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Built for scale, reliability, and performance
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '99.9% uptime SLA guarantee',
                  'Global CDN for low latency',
                  'Auto-scaling infrastructure',
                  'Real-time webhook notifications',
                  'Comprehensive error handling',
                  'Rate limiting & throttling',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-gradient-primary" asChild>
                <Link to="/contact">Start Building Today</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <img
                src={apiImage}
                alt="API Infrastructure"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developer;
