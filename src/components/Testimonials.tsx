import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  savings: string;
  stars: number;
  avatar: string;
  verified: boolean;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    quote: "AutoLenis saved me over $3,000. The process was so easy and there was zero pressure. I did the entire transaction from my kitchen table.",
    name: "Sarah M.",
    location: "Austin, TX",
    savings: "$3,450 Saved",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true
  },
  {
    id: 2,
    quote: "The dealers actually competed for my business! Instead of visiting 3 dealerships, they sent private offers directly to my dashboard. Best deal on my RX 350h.",
    name: "James T.",
    location: "Plano, TX",
    savings: "$4,200 Saved",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true
  },
  {
    id: 3,
    quote: "Finally, a platform that puts buyers first. Contract Shield flagged a $590 dealer documentation adder on an offer, which they deleted instantly. Highly recommend AutoLenis!",
    name: "Amanda R.",
    location: "Frisco, TX",
    savings: "$2,890 Saved",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-24 bg-white" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-100/50 rounded-full px-4 py-1 mb-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#1352cf] font-mono">
              Real Buyer Stories
            </span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Hear from our smarter car buyers.
          </h2>
          <p className="text-slate-500 text-base mt-4 leading-relaxed max-w-l">
            Thousands bypassed traditional dealership tables and sales loops. Here is what they experienced.
          </p>
        </div>

        {/* Carousel Block */}
        <div className="relative max-w-4xl mx-auto border border-slate-200/50 rounded-[32px] p-8 sm:p-14 shadow-[0_24px_64px_rgba(30,41,59,0.02)] bg-[#fafbfe]" id="reviews-carousel">
          
          <div className="absolute top-10 right-10 text-slate-200/80">
            <Quote className="w-16 h-16 fill-current opacity-25" />
          </div>

          <div className="min-h-[200px] flex flex-col justify-between">
            {/* Stars */}
            <div>
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(current.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-800 text-base sm:text-[19px] font-medium leading-relaxed italic"
                >
                  "{current.quote}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Profile info footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-10 pt-8 border-t border-slate-200/60">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md ring-4 ring-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    {current.name}
                    {current.verified && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-200/50">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                        Verified Purchase
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">{current.location}</p>
                </div>
              </div>

              {/* Savings Highlight Badge */}
              <div className="bg-[#1352cf] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center justify-center shadow-lg shadow-blue-500/10">
                {current.savings}
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 sm:bottom-14 right-8 sm:right-14 flex items-center gap-2.5">
            <button
              onClick={prev}
              className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-250 text-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-250 text-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Small sub info for Trust */}
        <div className="mt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.16em]">
          Average Customer Rating: ★ 4.9/5 from 1,200+ verified car orders.
        </div>

      </div>
    </section>
  );
}
