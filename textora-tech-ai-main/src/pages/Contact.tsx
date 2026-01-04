import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

// Zod validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().max(20, 'Phone number is too long').optional().or(z.literal('')),
  company: z.string().trim().max(100, 'Company name is too long').optional().or(z.literal('')),
  queryType: z.enum(['general', 'sales', 'support', 'reseller', 'partnership']),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    queryType: 'general',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validateField = (name: keyof ContactFormData, value: string) => {
    try {
      const fieldSchema = contactSchema.shape[name];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0]?.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate all fields
      const validatedData = contactSchema.parse(formData);

      // Submit to database
      const { error } = await supabase.from('leads').insert({
        full_name: validatedData.name,
        email: validatedData.email,
        mobile_number: validatedData.phone || null,
        business_name: validatedData.company || null,
        service_interested: validatedData.queryType,
        status: 'new',
      });

      if (error) throw error;

      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        queryType: 'general',
        message: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof ContactFormData;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        toast({
          title: 'Validation Error',
          description: 'Please check the form and fix the errors.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Submission Failed',
          description: 'Something went wrong. Please try again later.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation on blur or after first error
    if (errors[name as keyof ContactFormData]) {
      validateField(name as keyof ContactFormData, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof ContactFormData, value);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['Cyber City, Gurugram', 'Haryana - 122002, India'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 98765 43210', 'Mon-Sat: 9 AM - 7 PM IST'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@texora.com', 'sales@texora.com'],
    },
  ];

  const inputClasses = (fieldName: keyof ContactFormData) => `
    w-full px-4 py-3 rounded-lg border bg-background 
    focus:outline-none focus:ring-2 focus:ring-primary transition-colors
    ${errors[fieldName] ? 'border-destructive focus:ring-destructive' : 'border-border'}
  `;

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
              Let's Connect & Build Together
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We're here to help. Reach out to our team for support, sales inquiries, or partnership opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-2xl border border-border shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <info.icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}

              {/* Live Chat Widget Placeholder */}
              <div className="bg-gradient-hero text-white p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-2">Need Instant Help?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Chat with our support team in real-time
                </p>
                <Button variant="secondary" size="sm" className="bg-white text-foreground hover:bg-white/90">
                  Start Live Chat
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClasses('name')}
                      placeholder="John Doe"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClasses('email')}
                      placeholder="john@company.com"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClasses('phone')}
                      placeholder="+91 98765 43210"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClasses('company')}
                      placeholder="Your Company"
                      disabled={isSubmitting}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive mt-1">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="queryType" className="block text-sm font-medium mb-2">
                    Query Type
                  </label>
                  <select
                    id="queryType"
                    name="queryType"
                    value={formData.queryType}
                    onChange={handleChange}
                    className={inputClasses('queryType')}
                    disabled={isSubmitting}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="reseller">Reseller Program</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    className={`${inputClasses('message')} resize-none`}
                    placeholder="Tell us about your requirements..."
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{formData.message.length}/1000 characters</p>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-primary shadow-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2" size={20} />
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground mt-4 text-center">
                  We typically respond within 24 hours
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Visit Our Office</h2>
            <div className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.542697653507!2d77.08769931508236!3d28.459497882476946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f3b4f2e7e9%3A0x2eb9c9e5c6f88d16!2sCyber%20City%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1639982888888!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
