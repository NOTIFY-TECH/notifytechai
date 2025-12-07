import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const clients = [
  { name: 'TechCorp', initial: 'TC', color: 'from-primary to-primary-light' },
  { name: 'InnovateLab', initial: 'IL', color: 'from-success to-success-light' },
  { name: 'DataFlow', initial: 'DF', color: 'from-accent to-primary' },
  { name: 'CloudSync', initial: 'CS', color: 'from-primary to-success' },
  { name: 'SmartSys', initial: 'SS', color: 'from-success to-accent' },
  { name: 'DigitalEdge', initial: 'DE', color: 'from-primary-light to-primary' },
  { name: 'NetWorks', initial: 'NW', color: 'from-accent to-success' },
  { name: 'FutureTech', initial: 'FT', color: 'from-success to-primary' },
];

const ClientLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Duplicate for seamless loop
  const allClients = [...clients, ...clients, ...clients];

  return (
    <section ref={ref} className="py-20 bg-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4"
          >
            Trusted By Industry Leaders
          </motion.span>
          <h3 className="text-2xl md:text-3xl font-bold">
            Powering <span className="text-primary">5,000+</span> Businesses
          </h3>
        </motion.div>
      </div>

      {/* First Marquee - Left to Right */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-8 py-4"
          animate={{
            x: [0, -50 * clients.length * 4],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {allClients.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}-1`}
              className="flex-shrink-0 group"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="w-40 h-20 rounded-2xl bg-card border border-border flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-glow relative overflow-hidden">
                {/* Hover gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <span className={`text-3xl font-bold bg-gradient-to-r ${client.color} bg-clip-text text-transparent`}>
                  {client.initial}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second Marquee - Right to Left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-8 py-4"
          animate={{
            x: [-50 * clients.length * 4, 0],
          }}
          transition={{
            x: {
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {[...allClients].reverse().map((client, index) => (
            <motion.div
              key={`${client.name}-${index}-2`}
              className="flex-shrink-0 group"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="w-40 h-20 rounded-2xl bg-card border border-border flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-glow relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <span className={`text-3xl font-bold bg-gradient-to-r ${client.color} bg-clip-text text-transparent`}>
                  {client.initial}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="container mx-auto px-4 mt-16"
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '50k+', label: 'Messages/Day' },
            { value: '5+', label: 'Countries' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ClientLogos;
