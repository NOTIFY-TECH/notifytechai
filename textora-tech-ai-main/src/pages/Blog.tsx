import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'WhatsApp Business API: Complete Guide for Indian Businesses',
      excerpt: 'Learn how to leverage WhatsApp Business API for customer engagement, automated workflows, and verified messaging in India.',
      category: 'WhatsApp',
      date: '2025-01-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    },
    {
      id: 2,
      title: 'DLT Compliance Made Simple: SMS Regulations in India',
      excerpt: 'Everything you need to know about TRAI DLT compliance, template registration, and avoiding message delivery failures.',
      category: 'SMS',
      date: '2025-01-12',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80',
    },
    {
      id: 3,
      title: 'RCS vs SMS: The Future of Business Messaging',
      excerpt: 'Compare RCS and SMS messaging, understand the benefits of rich media, and decide which is right for your business.',
      category: 'RCS',
      date: '2025-01-10',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    },
    {
      id: 4,
      title: '10 WhatsApp Marketing Strategies That Actually Work',
      excerpt: 'Proven tactics to boost customer engagement, increase conversions, and build lasting relationships through WhatsApp.',
      category: 'Marketing',
      date: '2025-01-08',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80',
    },
    {
      id: 5,
      title: 'API Integration Guide: WhatsApp & SMS in 30 Minutes',
      excerpt: 'Step-by-step tutorial to integrate NotifyCore.AI APIs into your application with code examples and best practices.',
      category: 'Developer',
      date: '2025-01-05',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    },
    {
      id: 6,
      title: 'E-commerce Communication: Best Practices for 2025',
      excerpt: 'How online stores can use WhatsApp and SMS to reduce cart abandonment, send order updates, and drive repeat purchases.',
      category: 'E-commerce',
      date: '2025-01-03',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80',
    },
  ];

  const categories = ['All', 'WhatsApp', 'SMS', 'RCS', 'Marketing', 'Developer', 'E-commerce'];

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
              NotifyCore.AI Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, guides, and updates on business communication, messaging APIs, and digital engagement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-glow transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <Button variant="ghost" size="sm" className="group/btn p-0 h-auto hover:bg-transparent">
                    Read More
                    <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline">
              Load More Articles
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest insights, guides, and updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="bg-gradient-primary">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
