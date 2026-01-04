import { lazy, Suspense } from 'react';
import Hero from '@/components/home/Hero';
import WhyChoose from '@/components/home/WhyChoose';
import Services from '@/components/home/Services';
import DailyDeals from '@/components/home/DailyDeals';

// Lazy load heavy components for better performance
const AdvancedFeatures = lazy(() => import('@/components/home/AdvancedFeatures'));
const LiveDemo = lazy(() => import('@/components/home/LiveDemo'));
const VideoShowcase = lazy(() => import('@/components/home/VideoShowcase'));
const ChannelComparison = lazy(() => import('@/components/home/ChannelComparison'));
const Partnerships = lazy(() => import('@/components/home/Partnerships'));
const Testimonials = lazy(() => import('@/components/home/Testimonials'));
const ClientLogos = lazy(() => import('@/components/home/ClientLogos'));
const FinalCTA = lazy(() => import('@/components/home/FinalCTA'));

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DailyDeals />
      <WhyChoose />
      <Services />
      <VideoShowcase />
      <LiveDemo />
      <ChannelComparison />
      <AdvancedFeatures />
      <Partnerships />
      <Testimonials />
      <ClientLogos />
      <FinalCTA />
    </div>
  );
};

export default Home;
