import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Developer', path: '/developer' },
    { name: 'Documentation', path: '/documentation' },
    { name: 'About', path: '/about' },
    { name: 'Reseller', path: '/reseller' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-full overflow-hidden ${
        isScrolled ? 'bg-card/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'
      }`}
    >
      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
        <div className="floating-shape floating-shape-5"></div>
      </div>

      {/* Scroll Gradient Border */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 dynamic-gradient-border ${isScrolled ? 'scrolled' : ''}`}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
         {/* Logo */}
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


          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-extrabold transition-all duration-300 hover:scale-105 overflow-hidden ${
                  isActive(link.path)
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
                    : 'text-foreground/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500'
                } ${
                  (link.name === 'Reseller' || link.name === 'Blog') && 'hidden xl:block'
                }`}
              >
                {link.name}
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Book Demo</Link>
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 shadow-glow" asChild>
              <Link to="/pricing">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-white/70 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border shadow-lg z-50"
            >
              <nav className="container mx-auto px-4 py-6 space-y-2 relative z-50">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:scale-105 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="pt-4 space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>Book Demo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    className="w-full bg-gradient-primary group hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link
                      to="/pricing"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 group-hover:animate-bounce" />
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
