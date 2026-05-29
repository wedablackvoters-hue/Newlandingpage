import React from 'react';
import { motion } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';

interface ComparisonRow {
  traditional: string;
  smart: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    traditional: "You visit multiple physical dealerships",
    smart: "Dealers come to you in your private dashboard"
  },
  {
    traditional: "High-pressure, hours-long negotiations",
    smart: "Dealers compete privately with structured bids"
  },
  {
    traditional: "Opaque fees and limited transparency",
    smart: "See verified out-the-door pricing up front"
  },
  {
    traditional: "Wasted weekends dealing with sales managers",
    smart: "Save hours and complete everything online"
  },
  {
    traditional: "Dealership controls the process and terms",
    smart: "You stay in complete control from end-to-end"
  }
];

export default function ComparisonTable() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-150 relative overflow-hidden" id="comparison-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Under Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            The Difference
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mt-3.5 tracking-tight">
            Two Experiences. One Smarter Choice.
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Compare how traditional dealerships stack up against the patented buyer-first AutoLenis process.
          </p>
        </div>

        {/* Floating Side Car Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: White car representing traditional dealership layout struggle */}
          <div className="lg:col-span-3 flex flex-col items-center text-center">
            <motion.div 
              animate={{ 
                y: [2, -2, 2],
                rotate: [0, -0.5, 0.5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5, 
                ease: "easeInOut" 
              }}
              whileHover={{ 
                scale: 0.98, // Sinks/shrinks slightly under pressure/weight
                y: 4, 
                rotate: -2, // slightly unstable tilt
                transition: { duration: 0.3 }
              }}
              className="relative p-2 cursor-pointer transition-shadow"
            >
              <img
                src="/src/assets/images/comp_car_white_1780007472064.png"
                alt="Traditional Dealership Experience Vehicle"
                className="max-h-[160px] object-contain filter drop-shadow-lg opacity-85 hover:opacity-100 transition-opacity"
                aria-hidden="true"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="mt-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                Traditional Way
              </span>
              <p className="text-slate-600 text-sm mt-2 font-medium px-4">
                Exhausting salesperson pressure and surprise fees.
              </p>
            </div>
          </div>

          {/* Center Column: Direct Comparison Table */}
          <div className="lg:col-span-6 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden" id="comparison-table-core">
            
            {/* Table Header */}
            <div className="grid grid-cols-2 text-center text-xs font-bold uppercase tracking-wider border-b border-slate-100 font-display">
              <div className="bg-slate-50 text-slate-500 py-4 border-r border-slate-100">
                Traditional Dealership
              </div>
              <div className="bg-blue-600 text-white py-4 relative">
                AutoLenis Private Auction
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600" />
              </div>
            </div>

            {/* Rows list */}
            <div className="divide-y divide-slate-100 text-xs sm:text-sm font-sans">
              {COMPARISON_ROWS.map((row, index) => (
                <div key={index} className="grid grid-cols-2 hover:bg-slate-50/50 transition-colors">
                  
                  {/* Traditional column */}
                  <div className="p-4 sm:p-5 text-slate-500 flex items-start gap-2 border-r border-slate-100">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>

                  {/* Smart column */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.03, 
                      backgroundColor: "rgba(219, 234, 254, 0.35)", 
                      boxShadow: "0 12px 30px -5px rgba(37, 99, 235, 0.08), 0 8px 16px -6px rgba(37, 99, 235, 0.08)"
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="p-4 sm:p-5 text-slate-800 font-semibold flex items-start gap-2 bg-blue-50/15 cursor-pointer z-10 relative origin-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
                      className="flex-shrink-0"
                    >
                      <Check className="w-4.5 h-4.5 text-blue-600 mt-0.5" />
                    </motion.div>
                    <span>{row.smart}</span>
                  </motion.div>

                </div>
              ))}
            </div>

            <div className="bg-slate-50 py-4 text-center border-t border-slate-150">
              <a 
                href="#lead-form-card" 
                className="text-xs text-blue-600 font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:underline"
              >
                <span>Unlock Smarter Buying</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Side: Black luxury SUV representing winning AutoLenis solution */}
          <div className="lg:col-span-3 flex flex-col items-center text-center">
            <motion.div 
              animate={{ 
                y: [-6, 6, -6],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3.5, 
                ease: "easeInOut" 
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -14, // Elevates effortlessly upwards
                transition: { type: "spring", stiffness: 350, damping: 14 } 
              }}
              className="relative p-2 cursor-pointer transition-all duration-300 hover:drop-shadow-[0_20px_25px_rgba(37,99,235,0.3)]"
            >
              <img
                src="/src/assets/images/comp_car_black_1780007492259.png"
                alt="AutoLenis Intelligent Bid Experience SUV"
                className="max-h-[160px] object-contain filter drop-shadow-xl"
                aria-hidden="true"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="mt-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                AutoLenis Way
              </span>
              <p className="text-slate-800 text-sm mt-1.5 font-bold px-4">
                Private digital auctions with 0% pressure structure.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
