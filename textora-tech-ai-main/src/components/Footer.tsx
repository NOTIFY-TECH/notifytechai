import { Link } from 'react-router-dom';
import { ArrowUp, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'WhatsApp API', path: '/services#whatsapp' },
      { name: 'SMS Services', path: '/services#sms' },
      { name: 'RCS Messaging', path: '/services#rcs' },
      { name: 'Pricing', path: '/pricing' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Reseller Program', path: '/reseller' },
      { name: 'Contact', path: '/contact' },
    ],
    resources: [
      { name: 'Developer Docs', path: '/developer' },
      { name: 'API Reference', path: '/developer#api' },
      { name: 'Integration Guides', path: '/developer#guides' },
      { name: 'Support', path: '/contact' },
    ],
    community: [
      { name: 'Blog', path: '/blog' },
      { name: 'Discord Community', href: 'https://discord.gg/notifytechai' },
      { name: 'GitHub', href: 'https://github.com/notifytechai' },
      { name: 'Newsletter', path: '/newsletter' },
    ],
    legal: [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  return (
    <footer className="bg-card border-t border-border mt-20 relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-8 left-1/4 w-24 h-24 bg-gradient-primary/5 rounded-full animate-float opacity-40"></div>
        <div className="absolute top-16 right-1/3 w-32 h-32 bg-success/10 rounded-full animate-float-rotate opacity-50 animation-delay-1s"></div>
        <div className="absolute bottom-8 left-1/2 w-20 h-20 bg-gradient-primary/8 rounded-full animate-float opacity-60 animation-delay-2s"></div>
        <div className="absolute bottom-16 right-1/4 w-28 h-28 bg-success/5 rounded-full animate-float-rotate opacity-30 animation-delay-0-5s"></div>
      </div>

      {/* Gradient Border on Top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 gradient-border-animated"
      ></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="group inline-flex items-center gap-3 select-none">
              {/* Lettermark Icon */}
              <div
                className="
                  relative h-11 w-11 rounded-xl
                  bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600
                  flex items-center justify-center
                  shadow-xl shadow-purple-600/35
                  transition-all duration-300
                  group-hover:scale-105
                "
              >
                {/* inner glass */}
                <span className="absolute inset-0 rounded-xl bg-white/10" />
            
                {/* NT + AI mark */}
                <svg
                  viewBox="0 0 24 24"
                  className="relative z-10 h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* N */}
                  <path d="M6 17V7l6 10V7" />
            
                  {/* T */}
                  <path d="M14 7h6" />
                  <path d="M17 7v10" />
            
                  {/* AI dot */}
                  <circle cx="17" cy="18" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </div>
            
              {/* Brand Text */}
              <div className="flex flex-col leading-tight">
                <span
                  className="
                    text-xl md:text-2xl font-bold tracking-tight
                    bg-gradient-to-r from-indigo-400 to-purple-500
                    bg-clip-text text-transparent
                  "
                >
                  NotifyTech<span className="font-extrabold">AI</span>
                </span>
            
                <span className="text-xxs uppercase tracking-wide font-semibold text-black dark:text-white">
Innovate • Connect • Grow
</span>

              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm">
              Turbocharge customer engagement with verified WhatsApp Business API and DLT-compliant SMS solutions. Trusted by 5,000+ businesses globally.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 NotifyCore.AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-glow hover:scale-110 transition-all duration-300 animate-pulse-glow group z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="group-hover:animate-bounce" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
