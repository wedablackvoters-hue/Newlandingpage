import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  TrendingDown, 
  Clock, 
  Play, 
  HelpCircle,
  ShieldCheck, 
  Users, 
  Car, 
  Award,
  Lock,
  Menu,
  ChevronDown,
  ArrowRight,
  Info,
  Bell,
  RefreshCw,
  CheckCircle2,
  DollarSign,
  Star
} from 'lucide-react';

import AutoLenisLogo from './components/AutoLenisLogo';
import LeadForm from './components/LeadForm';
import LiveAuctionSimulator from './components/LiveAuctionSimulator';
import ContractShieldBlock from './components/ContractShieldBlock';
import ComparisonTable from './components/ComparisonTable';
import Testimonials from './components/Testimonials';
import { CarModel, AuctionSession } from './types';

export default function App() {
  // Navigation / Interactive States
  const [activeSession, setActiveSession] = useState<AuctionSession | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quick state for pre-submission BMW mockup values
  const [demoBids, setDemoBids] = useState([
    { name: 'Prestige Motors', city: 'Plano, TX', amount: 51400, best: true },
    { name: 'Summit Auto Group', city: 'Dallas, TX', amount: 52380, best: false },
    { name: 'DriveOne Autos', city: 'Frisco, TX', amount: 49950, best: false }
  ]);

  const handleStartAuction = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: string;
    car: CarModel;
  }) => {
    // Close the lead modal if open
    setIsModalOpen(false);

    // Scroll to top of page cleanly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setActiveSession({
      buyerName: `${data.firstName} ${data.lastName}`,
      buyerEmail: data.email,
      buyerPhone: data.phone,
      zipCode: data.zipCode,
      selectedCar: data.car,
      bids: [],
      status: 'active',
      timeRemainingSec: 120
    });
  };

  const handleRestart = () => {
    setActiveSession(null);
  };

  const faqs = [
    {
      q: "How does the private dealer auction work?",
      a: "When you start an auction, AutoLenis distributes your specific car requests to certified dealers within your region privately. Because dealers don't know who you are and have to compete directly against other bids in real-time, they submit competitive discounts straight to your dashboard."
    },
    {
      q: "Is using AutoLenis completely free for buyers?",
      a: "Yes! AutoLenis is 100% free for car buyers. There are no registration fees, platform charges, or mandatory commitments. Participating dealers cover standard fees directly to list on our marketplace."
    },
    {
      q: "Do I have to visit the dealership to sign papers?",
      a: "Not at all. With AutoLenis, we guide you to complete all necessary details, financing validations, and ID checks 100% online. Your chosen car is delivered straight to your driveway, or prepared for a speedy 10-minute signature pickup."
    },
    {
      q: "What is Contract Shield™?",
      a: "Contract Shield™ is our patented transaction audit system. Once dealers submit private bids, it scans the proposed invoices to verify zero hidden prep fees, anti-theft add-ons, or inflated interest rates have been snuck into your paperwork."
    },
    {
      q: "Will my contact details be shared with dealerships?",
      a: "Never. We protect your privacy at all costs. Dealers are only given your customized vehicle and general ZIP code location so they can bid. Your phone number and email are fully masked until you explicitly choose to accept an offer."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* HEADER / NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <a href="#" className="flex-shrink-0">
            <AutoLenisLogo variant="header" showSubtitle={false} />
          </a>

          {/* Desktop Navigation Links matches layout list */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-slate-650 tracking-wide">
            <a href="#how-it-works-section" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#why-autolenis-section" className="hover:text-blue-600 transition-colors">Why AutoLenis</a>
            <a href="#testimonials-section" className="hover:text-blue-600 transition-colors">Reviews</a>
            <a href="#contract-shield-section" className="hover:text-blue-600 transition-colors">Contract Shield™</a>
            <a href="#faq-section" className="hover:text-blue-600 transition-colors">FAQs</a>
          </div>

          {/* Start Auction trigger header */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (activeSession) {
                  handleRestart();
                } else {
                  setIsModalOpen(true);
                }
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm shadow-slate-900/5 cursor-pointer uppercase tracking-wider font-display border border-slate-900"
              id="header-cta-button"
            >
              <span>{activeSession ? 'Restart Auction Demo' : 'Compare Dealer Offers ➔'}</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-1.5 lg:hidden bg-slate-50 rounded border border-slate-200 cursor-pointer text-slate-700"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-150 p-5 shadow-xl flex flex-col gap-3.5 text-sm font-semibold text-slate-700 lg:hidden"
            >
              <a href="#how-it-works-section" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 py-1.5">How It Works</a>
              <a href="#why-autolenis-section" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 py-1.5">Why AutoLenis</a>
              <a href="#testimonials-section" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 py-1.5">Reviews</a>
              <a href="#contract-shield-section" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 py-1.5">Contract Shield™</a>
              <a href="#faq-section" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 py-1.5">FAQs</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* RENDER ACTIVE LIVE AREMA WORKSPACE CHAT OR STATIC LANDING */}
      {activeSession ? (
        <LiveAuctionSimulator
          buyerName={activeSession.buyerName}
          buyerEmail={activeSession.buyerEmail}
          zipCode={activeSession.zipCode}
          selectedCar={activeSession.selectedCar}
          onRestart={handleRestart}
        />
      ) : (
        <>
          {/* HERO SECTION DESIGN COLUMNS */}
          <header className="relative bg-[#fafbfe] pt-24 pb-28 overflow-hidden" id="hero-marketing-block">
            {/* Elegant luxury ambient gradient spots */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] -z-10" />
            <div className="absolute -left-10 bottom-0 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

            {/* Elite geometric grid background mask */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Main Column Grid representing the beautiful showroom design */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                
                {/* Left Column (lg:col-span-6): Title & Action Content */}
                <div className="lg:col-span-6 space-y-8 text-left z-20">
                  
                  {/* Premium indicator tagline badge */}
                  <div className="inline-flex items-center gap-2 bg-white/80 border border-slate-200/50 rounded-full px-4 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] backdrop-blur-sm">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1352cf] font-mono">
                      WHERE DEALERS COMPETE · YOU WIN
                    </span>
                  </div>

                  {/* Massively stunning Title with beautiful fintech gradient */}
                  <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-display font-extrabold tracking-tight text-slate-900 leading-[1.05] sm:leading-[0.95]">
                    Where <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 font-extrabold pr-1">dealers compete</span> for you.
                  </h1>

                  {/* High fidelity subtitle */}
                  <p className="text-slate-500 text-[16px] sm:text-[18px] leading-relaxed max-w-xl font-normal font-sans">
                    Skip the showroom tricks. Verified regional dealers bid privately on your target vehicle. You compare official terms in 48 hours and choose the winner.
                  </p>

                  {/* High conversion CTA Button styled exactly like the blue action button in picture */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a
                      href="#pricing-request-form-section"
                      className="bg-[#1352cf] hover:bg-[#1146b3] active:bg-[#1146b3] text-white font-bold text-sm sm:text-base px-8 py-4.5 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-blue-500/20 border border-blue-600 cursor-pointer text-center group"
                    >
                      <span className="tracking-wide">Compare Dealer Offers</span>
                      <span className="text-lg group-hover:translate-x-1 transition-transform">➔</span>
                    </a>
                  </div>

                  {/* Horizontal checkmark trust items directly under the main action button */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-[12px] text-slate-600 font-semibold tracking-tight border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-50/80 rounded-lg border border-blue-100 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-[#1352cf]" strokeWidth={2.5} />
                      </div>
                      <span>Verified Franchise Dealers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-50/80 rounded-lg border border-blue-100 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#1352cf]" strokeWidth={2.5} />
                      </div>
                      <span>Zero Dealership Pressure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-50/80 rounded-lg border border-blue-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#1352cf]" strokeWidth={2.5} />
                      </div>
                      <span>100% Secure Digital Process</span>
                    </div>
                  </div>

                </div>

                {/* Right Column (lg:col-span-6): Redesigned beautiful visual mockup containing the requested graphic */}
                <div className="lg:col-span-6 relative w-full flex items-center justify-center mt-6 lg:mt-0">
                  <div className="relative w-full rounded-[32px] overflow-hidden shadow-[0_32px_64px_rgba(30,41,59,0.08)] border border-slate-200/80 bg-white p-2">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white -z-15" />
                    
                    {/* Glow background behind the mockup */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[32px] blur-2xl opacity-10 -z-10" />

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-[24px] border border-slate-100 shadow-inner"
                    >
                      <img
                        src="/src/assets/images/autolenis_hero_mockup_1780011162788.png"
                        alt="Where Dealers Compete - BMW SUV & iPhone Dashboard Mockup"
                        className="w-full h-auto object-cover rounded-[24px]"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>
                </div>

              </div>

              {/* Bottom Premium Logo / Social Proof horizontal card matching the design exactly */}
              <div className="bg-white/80 backdrop-blur-sm rounded-[32px] border border-slate-200/50 shadow-[0_16px_40px_rgba(0,0,0,0.015)] p-6 flex flex-col lg:flex-row items-center justify-between gap-6 mt-20 lg:mt-24">
                
                {/* Left logo component */}
                <div className="flex items-center gap-4 w-full lg:w-auto text-left justify-center lg:justify-start">
                  <div className="flex-shrink-0 lg:border-r lg:border-slate-200/60 lg:pr-6">
                    <AutoLenisLogo variant="dark" showSubtitle={false} className="scale-90" />
                  </div>
                  <div className="hidden lg:block text-slate-400 text-[11px] font-bold tracking-wider uppercase leading-snug">
                    Complete Digital<br />
                    Car Buying Concierge
                  </div>
                </div>

                {/* News logos layout matching client diagram */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-xs font-semibold w-full lg:w-auto">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.18em]">As covered in:</span>
                  
                  {/* Forbes Typography Logo */}
                  <span className="font-serif font-extrabold italic text-base tracking-tight text-slate-500 hover:text-slate-800 transition-colors select-none">
                    Forbes
                  </span>
                  
                  {/* BUSINESS INSIDER Bold Gothic logo style */}
                  <span className="font-sans font-black tracking-tighter uppercase text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-colors select-none">
                    BUSINESS INSIDER
                  </span>
                  
                  {/* Yahoo Finance */}
                  <div className="flex items-baseline gap-1 select-none opacity-80 hover:opacity-100 transition-opacity">
                    <span className="font-sans font-black lowercase text-xs sm:text-sm text-purple-700/80">
                      yahoo<span className="font-light">!</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">finance</span>
                  </div>

                  {/* MarketWatch Custom Elegant Style */}
                  <span className="font-serif font-extrabold tracking-tight text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-colors italic select-none">
                    MarketWatch
                  </span>
                </div>

              </div>

            </div>
          </header>

          {/* STATS HIGHLIGHTS BANNER BAR - Redesigned as an elite dark tech panel */}
          <div className="bg-[#0b0f19] text-white border-y border-slate-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Dark grid background layout */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
              {[
                { label: 'Average Buyer Savings', val: '$2,300+', icon: <TrendingDown className="w-5 h-5 text-blue-400" /> },
                { label: 'Verified Dealer Partners', val: '500+', icon: <Users className="w-5 h-5 text-blue-400" /> },
                { label: 'Vehicles Requested', val: '10,000+', icon: <Car className="w-5 h-5 text-blue-400" /> },
                { label: 'Buyer Satisfaction Rate', val: '4.9 / 5', icon: <Award className="w-5 h-5 text-blue-400" /> }
              ].map((stat, sindex) => (
                <div key={sindex} className="space-y-2 lg:border-r last:border-0 border-slate-800/80 pr-2">
                  <div className="inline-flex items-center justify-center p-2.5 bg-slate-800/40 border border-slate-800/30 rounded-xl mb-1 shadow-inner">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3.5xl font-mono font-bold text-white tracking-tight leading-none block">
                    {stat.val}
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold tracking-[0.12em] block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DEDICATED SECTION FOR THE LEAD FORM */}
          <section id="pricing-request-form-section" className="py-24 bg-[#f8fafc] border-b border-slate-100 relative scroll-mt-20">
            <div className="absolute inset-0 bg-gradient-to-b from-[#f1f5f9]/40 via-transparent to-transparent pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#1352cf] block mb-3 text-center">
                COMPARE DEALER OFFERS
              </span>
              
              <h2 className="font-sans font-extrabold text-3xl sm:text-[42px] text-[#0f172a] tracking-tight leading-tight text-center max-w-xl mx-auto">
                Tell us what you’re looking for.
              </h2>
              
              <p className="text-slate-500 font-sans text-sm sm:text-[15px] text-center mt-3 mb-4 font-normal">
                Step 1 of 2 · Takes about 60 seconds.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2 mb-10 text-[13px] text-slate-500 font-medium select-none">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#1352cf]" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#1352cf]" />
                  <span>No Credit Impact</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1352cf]" />
                  <span>No Obligation</span>
                </div>
              </div>
              
              {/* Card wrapper */}
              <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-slate-200/50 shadow-[0_24px_50px_rgba(0,0,0,0.025)] p-8 sm:p-12 text-left max-w-xl mx-auto relative overflow-hidden">
                <LeadForm onStartAuction={handleStartAuction} />
              </div>

              {/* Disclaimers under card */}
              <div className="mt-8 text-center px-4 max-w-xl mx-auto space-y-4">
                <p className="text-[11px] sm:text-[11.5px] text-slate-400 leading-normal">
                  The $99 Auction Access Fee unlocks your private 48-hour dealer auction. Refundable if AutoLenis is unable to secure a valuable or competitive offer for your requested vehicle. Limited-time pricing — subject to change.
                </p>
                <p className="text-[10px] sm:text-[10.5px] text-slate-400/80 leading-normal">
                  Savings vary based on vehicle, market conditions, dealer participation, and buyer-selected offer. AutoLenis does not guarantee any specific savings outcome.
                </p>
              </div>

              {/* Horizontally stretched statistics highlights banner bar */}
              <div className="w-full border-t border-slate-100 bg-white/40 py-10 px-4 mt-20 rounded-[24px]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  
                  {/* Stat 1 */}
                  <div className="flex items-center gap-4 justify-center sm:justify-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#1352cf] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#dbeafe]">
                      <DollarSign className="w-5 h-5 font-bold" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl sm:text-2xl font-sans font-extrabold text-[#0f172a] leading-none">Thousands</div>
                      <div className="text-[11px] text-slate-400 mt-1.5 font-bold tracking-normal">In Reported Buyer Savings</div>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex items-center gap-4 justify-center sm:justify-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#1352cf] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#dbeafe]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl sm:text-2xl font-sans font-extrabold text-[#0f172a] leading-none">500+</div>
                      <div className="text-[11px] text-slate-400 mt-1.5 font-bold tracking-normal">Dealer Partners</div>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex items-center gap-4 justify-center sm:justify-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#1352cf] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#dbeafe]">
                      <Car className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl sm:text-2xl font-sans font-extrabold text-[#0f172a] leading-none">10,000+</div>
                      <div className="text-[11px] text-slate-400 mt-1.5 font-bold tracking-normal">Vehicles Requested</div>
                    </div>
                  </div>

                  {/* Stat 4 */}
                  <div className="flex items-center gap-4 justify-center sm:justify-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#1352cf] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#dbeafe]">
                      <Star className="w-5 h-5 fill-[#1352cf]" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl sm:text-2xl font-sans font-extrabold text-[#0f172a] leading-none">4.9 / 5</div>
                      <div className="text-[11px] text-slate-400 mt-1.5 font-bold tracking-normal">Buyer Satisfaction</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* SECTION: Finally, a Smarter Way to Buy a Car (Why AutoLenis Exists) */}
          <section className="py-24 bg-white" id="why-autolenis-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                
                {/* Left Side: Content bullet checkmarks */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-100/50 rounded-full px-4 py-1">
                    <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#1352cf] font-mono">
                      Why AutoLenis Exists
                    </span>
                  </div>
                  
                  <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-[1.1]">
                    Finally, a smarter way to buy a vehicle.
                  </h2>
                  <p className="text-slate-500 text-[15px] leading-relaxed">
                    Standard dealership structures control price tags and options privately. AutoLenis completely flips the paradigm—licensed franchise dealers compete for your business privately, giving you verified, unalterable itemizations instantly.
                  </p>

                  <ul className="space-y-5 text-sm text-slate-700 font-semibold">
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-[#1352cf]/10 rounded-lg text-[#1352cf] mt-0.5">
                        <Check className="w-4.5 h-4.5" strokeWidth={3} />
                      </div>
                      <div>
                        <span className="text-slate-900 font-bold block mb-0.5">Watch the private auction unfold</span>
                        <p className="text-[12px] text-slate-400 font-normal leading-relaxed">Watch matching dealers submit real-time itemizations online, cutting profit margins to win your contract.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-[#1352cf]/10 rounded-lg text-[#1352cf] mt-0.5">
                        <Check className="w-4.5 h-4.5" strokeWidth={3} />
                      </div>
                      <div>
                        <span className="text-slate-900 font-bold block mb-0.5">Absolute pricing transparency</span>
                        <p className="text-[12px] text-slate-400 font-normal leading-relaxed">Certified bids ensure no sudden finance rate hikes, forced dealer accessories, or doc fee games.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-[#1352cf]/10 rounded-lg text-[#1352cf] mt-0.5">
                        <Check className="w-4.5 h-4.5" strokeWidth={3} />
                      </div>
                      <div>
                        <span className="text-slate-900 font-bold block mb-0.5">Autonomous Contract Shield™ Audit</span>
                        <p className="text-[12px] text-slate-400 font-normal leading-relaxed">Our advanced parsing framework isolates dealer fee risks before physical paperwork is finalized.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Right Side: Professional overview cinematic picture with play trigger */}
                <div className="lg:col-span-7">
                  <div className="relative bg-slate-900 rounded-[32px] overflow-hidden shadow-[0_24px_50px_rgba(30,41,59,0.08)] group border border-slate-800 p-2 bg-gradient-to-tr from-slate-950 to-slate-900">
                    <div className="relative rounded-[24px] overflow-hidden aspect-video">
                      {/* The Cinematic Showroom Backdrop Image */}
                      <img 
                        src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&h=675&q=80" 
                        alt="Modern car showroom video overview"
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Dark gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                      {/* Centered Video Controls */}
                      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between p-6 sm:p-8">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-white bg-white/10 backdrop-blur px-3.5 py-1.5 rounded-full border border-white/10">
                            90-Second Overview
                          </span>
                        </div>

                        <div className="text-center self-center my-auto">
                          <button 
                            onClick={() => alert("This 90-Second Overview video presentation is simulated. Begin an auction to watch the process live!")}
                            className="w-16 h-16 bg-white hover:bg-white/95 text-[#1352cf] rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer mx-auto"
                            aria-label="Play Overview"
                          >
                            <Play className="w-5 h-5 fill-current ml-1" />
                          </button>
                          <h4 className="text-white font-display font-medium text-xl mt-4 tracking-tight">
                            The Smarter Way to Buy
                          </h4>
                          <p className="text-slate-300 text-xs sm:text-sm mt-1 opacity-95">Better offers. Zero pressure. Total control.</p>
                        </div>

                        <div className="flex justify-between items-center text-slate-400 text-[10px] font-mono border-t border-white/5 pt-3">
                          <span>1:45 MIN PLAYTIME</span>
                          <span>AutoLenis Certified Overview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECURITY TRUST BADGES BAR */}
          <div className="bg-[#fafbfe] border-y border-slate-200/40 py-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#1352cf]" /> SSL Secured 256-Bit</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#1352cf]" /> Contract Shield™ Protection</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1352cf]" /> Verified Franchise Dealers</span>
              <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#1352cf]" /> Safe Secure Payments</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1352cf]" /> Privacy Shield Masked</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1352cf]" /> Buyer-First Platform</span>
            </div>
          </div>

          {/* TWO LAYOUT SECTIONS: The Old Way vs AutoLenis Control (Dashboard) */}
          <section className="py-24 bg-white" id="detailed-paradigm-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Traditional Side: "The Old Way Didn't Work For You" */}
                <div className="bg-[#FAF9F6]/80 rounded-[32px] border border-slate-200/40 p-8 sm:p-10 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.005)]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-red-500 tracking-[0.18em] block mb-3.5">The Old Way</span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-snug mb-6">
                      Dealership constraints designed for retail showrooms—not buyers.
                    </h3>
                    
                    <ul className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium">
                      <li className="flex items-center gap-3">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>Showrooms are heavily incentivized to pack finance charges</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>Opaque, fluid prices that change when you leave the physical floor</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>Forced add-ons (nitrogen tires, ceramic coats) are added automatically</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>Exhaustive pressure techniques in back-room negotiation sessions</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>Hours wasted standing at dealer desks waiting for simple doc reviews</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: Placed our skeptical contract signing image with skepticism thought element */}
                  <div className="mt-10 border border-slate-200/50 rounded-2xl overflow-hidden shadow-lg bg-white p-1 relative">
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src="/src/assets/images/signing_contract_1780009153873.png"
                        alt="Buyer signing a dealer car sales contract with pricing doubts"
                        className="w-full object-cover aspect-video hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-sm p-4 rounded-xl text-xs font-semibold text-white border border-white/5 flex items-center gap-2.5 shadow-xl">
                      <span className="text-base select-none">💡</span>
                      <span className="text-slate-200 leading-relaxed">"Am I getting a competitive interest rate, or did they inflate the lease APR?"</span>
                    </div>
                  </div>
                </div>

                {/* Intelligent Side: "AutoLenis Puts You in Control" */}
                <div className="bg-blue-50/15 border border-blue-100/40 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-[0_8px_32px_rgba(26,54,115,0.01)]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#1352cf] tracking-[0.18em] block mb-3.5">The AutoLenis Solution</span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-snug mb-6">
                      An autonomous system that holds dealers accountable.
                    </h3>
                    
                    <ul className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium">
                      <li className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-[#1352cf] flex-shrink-0" />
                        <span>Licensed franchise dealers buy into our network and compete privately</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-[#1352cf] flex-shrink-0" />
                        <span>Compare exact, itemized out-the-door totals side-by-side</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-[#1352cf] flex-shrink-0" />
                        <span>Total pricing confidence, 100% free of physical salesperson pressure</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-[#1352cf] flex-shrink-0" />
                        <span>Automatic Contract Shield™ sweep flags and removes sneaky add-on fees</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-[#1352cf] flex-shrink-0" />
                        <span>Anonymized client details guard your inbox from dealership catalogs</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: Pristine dashboard laptop and mobile mockups */}
                  <div className="mt-10 border border-blue-100/50 rounded-2xl overflow-hidden shadow-lg bg-white p-1 relative">
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src="/src/assets/images/autolenis_dash_1780009812331.png"
                        alt="AutoLenis premium dashboard laptop under dealer auction"
                        className="w-full object-cover aspect-video hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#1352cf]/95 backdrop-blur-sm p-4 rounded-xl text-xs font-semibold text-white border border-blue-500/10 flex items-center gap-2.5 shadow-xl">
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span>Multiple certified dealer bids analyzed instantly</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION: How It Works ("A Smarter Way to Buy Your Next Car") */}
          <section className="py-24 bg-slate-50 border-t border-slate-200/40" id="how-it-works-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-100/50 rounded-full px-4 py-1 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#1352cf] font-mono">
                    Process Steps
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
                  A Smarter Way to Buy Your Next Car
                </h2>
                <p className="text-slate-500 text-base mt-4 leading-relaxed max-w-l mx-auto">
                  Four simple, secure, and transparent stages from configuration to doorway delivery.
                </p>
              </div>

              {/* Steps grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {[
                  { step: '1', title: 'Tell Us What You Want', desc: 'Specify your target make, model, trim, region, trade-in value, and options safely in our secure configuration builder.' },
                  { step: '2', title: 'Dealers Compete Privately', desc: 'Franchise dealerships enter our secure arena cluster and submit real, competitive, private bids to win your contract.' },
                  { step: '3', title: 'Compare Certified Offers', desc: 'Review bids side-by-side with Contract Shield™ reports showing genuine out-the-door totals without salesman jargon.' },
                  { step: '4', title: 'You Choose, We Deliver', desc: 'Pick the winning bid. Dealership delivers the paperwork and vehicle directly to your door, fully pre-audited.' }
                ].map((step, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[24px] border border-slate-200/50 shadow-[0_8px_24px_rgba(30,41,59,0.015)] relative flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#1352cf] text-white font-mono font-bold flex items-center justify-center text-base mb-6 shadow-md shadow-blue-500/10 group-hover:scale-110 transition-transform">
                        {step.step}
                      </div>
                      <h4 className="font-display font-bold text-slate-900 text-lg mb-3 tracking-tight">{step.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal">{step.desc}</p>
                    </div>

                    {/* Desktop connection lines indicator */}
                    {idx < 3 && (
                      <div className="hidden lg:block absolute top-14 left-[90%] w-[30%] h-[1px] border-t-2 border-dashed border-slate-200/80 z-10" />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* CONTRACT SHIELD SUB MODULE */}
          <ContractShieldBlock />

          {/* TWO EXPERIENCE COMPARISON TABLE MODULE */}
          <ComparisonTable />

          {/* TESTIMONIALS SLIDER SECTION */}
          <Testimonials />

          {/* FAQ SECTON */}
          <section className="py-24 bg-slate-50 border-t border-slate-200/40" id="faq-section">
            <div className="max-w-4xl mx-auto px-4">
              
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-100/50 rounded-full px-4 py-1 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#1352cf] font-mono">
                    Common Questions
                  </span>
                </div>
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                  Frequently Asked Questions
                </h3>
              </div>

              {/* Accordion Lists */}
              <div className="space-y-4">
                {faqs.map((faq, fidx) => (
                  <div 
                    key={fidx} 
                    className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.005)] hover:shadow-md transition-all duration-350"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === fidx ? null : fidx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-800 text-sm sm:text-base cursor-pointer hover:bg-slate-50/20 transition-colors"
                    >
                      <span className="tracking-tight">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openFaqIndex === fidx ? 'transform rotate-180 text-[#1352cf]' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {openFaqIndex === fidx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 font-sans"
                        >
                          {faq.a}
                         </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* BOTTOM PREMIUM CTA BANNER BLOCK */}
          <section className="bg-[#0b0f19] text-white py-24 border-t border-slate-800 relative overflow-hidden">
            {/* Ambient luxury lights */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-700/[0.04] to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
              <h3 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white leading-[1.1]">
                Stop negotiation loops.<br />
                Let dealers compete for you.
              </h3>
              <p className="text-slate-400 text-sm sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
                Join thousands of smart buyers who skip traditional dealer loops and secure raw out-the-door items directly from regional dealerships safely.
              </p>

              {/* Dynamic email input box */}
              <div className="bg-slate-900/90 p-2 rounded-2xl border border-slate-800 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-2 shadow-2xl backdrop-blur-sm">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm px-4 py-3.5 focus:outline-none focus:ring-0"
                  id="cta-email-input"
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-[#1352cf] hover:bg-[#1146b3] text-white font-bold text-xs px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer hover:shadow-lg hover:shadow-blue-500/10 active:scale-98"
                >
                  <span>Compare Dealer Offers ➔</span>
                </button>
              </div>

              {/* Bottom brief assurances and bullet checks */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500 font-bold tracking-wider">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> 100% FREE SERVICE</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> ZERO OBLIGATIONS</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-400" /> SECURE DATA PROTOCOL</span>
              </div>
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="bg-[#07090e] text-white py-20 px-4 border-t border-slate-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Footer Logo and text branding layout left */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <AutoLenisLogo variant="light" showSubtitle={true} />
            <p className="text-[11px] leading-relaxed text-slate-500 mt-2 max-w-sm">
              AutoLenis is an independent, patented client-advocate transaction engine for new vehicle acquisition. We organize regional dealer arenas so you can complete sales safely, supported by our advanced automatic Contract Shield™ pre-signature sweeps.
            </p>
          </div>

          {/* Quick link columns */}
          <div className="lg:col-span-2">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-5">Company</h5>
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              <li><a href="#how-it-works-section" className="hover:text-blue-400 transition-colors">About Our Story</a></li>
              <li><a href="#testimonials-section" className="hover:text-blue-400 transition-colors">Verified Careers</a></li>
              <li><a href="#" className="hover:text-blue-500">Press Releases</a></li>
              <li><a href="#" className="hover:text-blue-500">Brand Resources</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Resources</h5>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#leads-form-card" className="hover:text-blue-500">Start Car Auction</a></li>
              <li><a href="#contract-shield-section" className="hover:text-blue-500">Contract Shield™ Audit</a></li>
              <li><a href="#" className="hover:text-blue-500">Regional MSRP Guides</a></li>
              <li><a href="#" className="hover:text-blue-500">Buyer Safety Standards</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">For Dealers</h5>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#" onClick={() => alert("Please contact franchise operations at partnerships@autolenis-sim.com for regional cluster onboardings.")} className="hover:text-blue-500">Become Partner Dealer</a></li>
              <li><a href="#" className="hover:text-blue-500">Compliance Directives</a></li>
              <li><a href="#" className="hover:text-blue-500">API Bidding Hub</a></li>
              <li><a href="#" className="hover:text-blue-500">Franchise Portal Login</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Legal</h5>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#" className="hover:text-blue-500">Privacy Policy Terms</a></li>
              <li><a href="#" className="hover:text-blue-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500">Arbitration Safeguards</a></li>
              <li><a href="#" className="hover:text-blue-500">Regional Disclaimers</a></li>
            </ul>
          </div>

        </div>

        {/* Copywrite lines and limits */}
        <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} AutoLenis, Inc. All rights reserved. Registered in Cloud Network. Patent Pending.
          </div>
          <div>
            AutoLenis is not a physical dealership entity. All transactions are fulfilled via certified regional dealership partners.
          </div>
        </div>
      </footer>

      {/* BEAUTIFUL POPUP MODAL DIALOG FOR COHESIVE LEAD ENTRY FUNNEL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal frame itself containing form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-1 overflow-visible z-10"
            >
              {/* Close button with circular layout overlay */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 cursor-pointer transition-colors z-30"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>
              
              <LeadForm onStartAuction={handleStartAuction} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
