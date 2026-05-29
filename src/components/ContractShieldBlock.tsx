import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ShieldCheck, BadgeCheck, Lock, Calendar, FileText, CheckCircle, ArrowRight, TrendingUp, Layers, History, Check, ArrowUpRight } from 'lucide-react';

export default function ContractShieldBlock() {
  const [activeTab, setActiveTab] = useState<'fees' | 'finance' | 'addendums' | 'trail'>('fees');

  const tabContents = {
    fees: {
      risk: 'ZERO RISK DETECTABLE',
      grade: 'GRADE A+',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      text: 'Our advanced AI algorithms inspect the dealer invoice item-by-item to isolate hidden preparation, advertising, or regional delivery fees. Only flat-rate state taxes and genuine DMV registration charges are allowed.',
      subText: 'Verified: All itemizations checked against national automotive compliance directories.'
    },
    finance: {
      risk: 'OPTIMAL INTEREST MAPPED',
      grade: 'GRADE A',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      text: 'Ensures promotional APR programs are mapped directly to corresponding manufacturer invoice guidelines. Prevents standard finance markup reserves where auto dealerships inflate lender base rates for kickback commission.',
      subText: 'Verified: Financing parameters matched against active Tier-1 direct-lender databases.'
    },
    addendums: {
      risk: 'SURCHARGE LINE EXCLUSIONS SECURED',
      grade: 'GRADE A+',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      text: 'Guarantees physical dealer-installed add-ons (such as surface paint coatings, VIN etching guards, tire gas tires, or safety pulse lights) are omitted or set to $0.00. Dealers must absorb these pre-installed add-ons.',
      subText: 'Verified: Physical markup parameters excluded or fully credited by AutoLenis policy.'
    },
    trail: {
      risk: '100% PROGRAMMATIC LEDGER AUDITED',
      grade: 'AUDIT SECURE',
      color: 'text-[#0ea5e9] bg-[#f0f9ff] border-[#bae6fd]',
      text: 'Programmatic tracking records live bids iterations under immutable serial ledger. Every revision history of itemized costs is verified sequentially before generating a compliance secure dashboard lock.',
      subText: 'Verified: Interactive audit timeline cryptographically sealed under the CS-48992-TX report hash.'
    }
  };

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200/60" id="contract-shield-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono font-black tracking-widest text-blue-600 bg-blue-100/60 border border-blue-200/40 px-3.5 py-1.5 rounded-full inline-block">
            Contract Shield™ Security
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-900 mt-4 tracking-tight leading-none">
            Protection Beyond The Purchase
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            Our patented Contract Shield™ system automatically parses dealer contracts to flag hidden documents, dealership markups, and unfair finance clauses before you sign.
          </p>
        </div>

        {/* Master Column/Grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Description Column (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 flex-shrink-0">
                <ShieldCheck className="w-6 h-6 animate-pulse-ring" />
              </div>
              <div>
                <h3 className="font-display font-black text-xl text-slate-900 tracking-tight leading-none">
                  Automated Smart-Contract Auditing
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-1 font-mono">How we sweep dealer terms clean.</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed font-normal">
              Dealerships often tuck hidden secondary costs into heavy, fine-printed contracts. Contract Shield™ instantly compares proposed itemized sheets against our nationwide buyer protection database to ensure total transparency.
            </p>

            {/* Smart Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Increased Transparency', desc: 'See every sub-fee itemized clearly without acronym confusion.' },
                { title: 'Better Contract Awareness', desc: 'Know exactly what you are signing and understand regional standards.' },
                { title: 'Reduced Surprise Costs', desc: 'Eliminate post-negotiation add-ons at physical handoffs.' },
                { title: 'More Informed Decisions', desc: 'Secure objective comparative insights to pick from.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4.5 h-4.5 text-blue-600 flex-shrink-0" />
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal font-normal">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a 
                href="#pricing-request-form-section" 
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors bg-blue-50/50 border border-blue-100 rounded-lg px-4 py-2.5 shadow-sm"
              >
                <span>Initiate Audit Auction Now</span>
                <ArrowUpRight className="w-4 h-4 text-blue-600" />
              </a>
            </div>
          </div>

          {/* Right Block: High-fidelity Light-themed Interactive Contract Shield Assessment Report Mockup (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-white text-slate-950 rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(30,41,59,0.06)] border border-slate-200/80 relative overflow-hidden transition-all duration-350">
              
              {/* Outer Top Bar (with Window Action Bubbles and Header Logo) */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="text-[10px] text-slate-400 font-bold ml-2 select-none tracking-wider font-mono">AUTOLENIS PORTAL // CS-SHIELD-REPORT</span>
                </div>
                
                {/* Status Badge right top */}
                <div className="bg-[#ecfdf5] border border-emerald-200/50 text-[#059669] px-3 py-1.5 text-[9px] sm:text-[10px] uppercase font-black tracking-widest rounded-lg flex items-center gap-1.5 shadow-sm">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Compliant Shield Locked</span>
                </div>
              </div>

              {/* Assessment Report Main Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                <div className="flex items-start gap-4">
                  {/* Dynamic Gradient Badge Check shield */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25" />
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-50 to-blue-100 border border-blue-200/60 flex items-center justify-center text-blue-600 shadow-md">
                      <Shield className="w-7 h-7" strokeWidth={2} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono font-black tracking-widest text-blue-600 block mb-0.5">
                      CONTRACT SHIELD™
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-slate-950 leading-tight">
                      Assessment Report
                    </h3>
                    <p className="text-slate-500 text-[11px] sm:text-xs mt-1.5 max-w-sm md:max-w-md font-normal leading-normal">
                      Our AI-powered audit scans your contract line-by-line to protect you from hidden fees and dealer markups.
                    </p>
                    
                    {/* Metadata Items with specific typography */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] font-mono font-bold text-slate-500">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>AUDIT NO.</span>
                        <span className="text-blue-600">CS-48992-TX</span>
                      </div>
                      <span className="text-slate-200">|</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>COMPLETED</span>
                        <span className="text-slate-750">May 18, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secure Status Card on Far Right */}
                <div className="bg-[#f8fafc] border border-slate-200/60 p-3 rounded-xl flex items-center gap-3 md:max-w-[200px] self-stretch md:self-auto shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-inner">
                    <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-slate-400 font-black uppercase tracking-wider block">REPORT STATUS</span>
                    <span className="text-xs font-black text-slate-900 block leading-tight">VERIFIED &amp; SECURE</span>
                    <span className="text-[9px] text-slate-500 block font-semibold leading-normal">All systems active</span>
                  </div>
                </div>
              </div>

              {/* Status Metric Grid (4 Cards Row) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Overall Rating', val: 'Low Risk', cap: 'Verified Safe', border: 'border-t-[3px] border-t-blue-500 bg-[#f8fafc]' },
                  { label: 'Security Grade', val: 'A+', cap: 'Exceeds Targets', border: 'border-t-[3px] border-t-emerald-500 bg-[#f8fafc]' },
                  { label: 'Audit Result', val: '$0.00', cap: 'Unapproved Fees', border: 'border-t-[3px] border-t-indigo-500 bg-[#f8fafc]' },
                  { label: 'Contract Status', val: 'COMPLIANT', cap: 'Shield Locked', border: 'border-t-[3px] border-t-[#0ea5e9] bg-[#f8fafc]' }
                ].map((stat, i) => (
                  <div key={i} className={`p-3 rounded-lg border border-slate-200/50 shadow-[0_2px_4px_rgba(0,0,0,0.01)] transition-all hover:shadow-md ${stat.border}`}>
                    <span className="text-[8px] text-slate-400 block uppercase font-mono font-extrabold tracking-wider">{stat.label}</span>
                    <span className="text-sm font-black text-slate-900 block mt-0.5 leading-tight">{stat.val}</span>
                    <span className={`text-[9px] block font-extrabold mt-0.5 ${
                      stat.cap === 'Unapproved Fees' ? 'text-indigo-600' : 'text-[#059669]'
                    }`}>{stat.cap}</span>
                  </div>
                ))}
              </div>

              {/* Tabs Menu Selection (4 tabs) */}
              <div className="flex border-b border-slate-250 mb-5 text-xxs sm:text-xs font-bold font-sans overflow-x-auto whitespace-nowrap scrollbar-none gap-1">
                {[
                  { id: 'fees', label: 'Unapproved Fees', icon: FileText },
                  { id: 'finance', label: 'Finance Review', icon: TrendingUp },
                  { id: 'addendums', label: 'Dealer Add-ons', icon: Layers },
                  { id: 'trail', label: 'Audit Trail', icon: History }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 border-b-2 transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 font-extrabold bg-blue-50/10'
                          : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Active Tab Content */}
              <div className="bg-[#f8fafc] border border-slate-200/80 p-4 sm:p-5 rounded-xl min-h-[145px] flex flex-col justify-between relative overflow-hidden mb-6 shadow-inner">
                {/* Micro clean background design detail */}
                <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none select-none -translate-x-2 translate-y-2">
                  <Shield className="w-48 h-48 text-slate-900" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                      {tabContents[activeTab].risk}
                    </span>
                    <span className="text-[11px] sm:text-xs font-black text-emerald-600 font-mono tracking-wide bg-white px-2 py-0.5 rounded border border-slate-100 shadow-sm">
                      {tabContents[activeTab].grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {tabContents[activeTab].text}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-2 text-[10px] text-emerald-700 bg-white/85 backdrop-blur-sm px-3 py-2 rounded-lg mt-4 border border-emerald-200/20 shadow-sm">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={2.5} />
                  <span className="font-semibold">{tabContents[activeTab].subText}</span>
                </div>
              </div>

              {/* Fee Analysis Summary Header & Counters */}
              <div className="border-t border-slate-100 pt-5 mb-5">
                <span className="text-[9px] uppercase font-mono font-black tracking-widest text-[#94a3b8] block mb-3">
                  FEE ANALYSIS SUMMARY
                </span>
                
                {/* 4 Bottom summary stat counters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50/40 p-1 rounded-xl">
                  {[
                    { label: 'Approved Items', val: '28', desc: 'Compliant with standards', color: 'text-emerald-600' },
                    { label: 'Flagged Items', val: '0', desc: 'No hidden or excessive fees', color: 'text-slate-500' },
                    { label: 'Unapproved Fees', val: '$0.00', desc: 'Pay only what is allowed', color: 'text-slate-500' },
                    { label: 'Total Savings', val: '$3,250', desc: 'Compared to non-compliant', color: 'text-blue-600 font-bold font-sans' }
                  ].map((sumItem, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex flex-col justify-between">
                      <div>
                        {/* Render number indicator or green circle check for items */}
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-base sm:text-lg font-black leading-none ${sumItem.color}`}>{sumItem.val}</span>
                          {index === 1 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-[9px] font-extrabold text-slate-800 leading-tight block">{sumItem.label}</span>
                      </div>
                      <span className="text-[8px] text-slate-400 leading-tight block mt-2 font-medium">{sumItem.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Shield Protection Bottom Action Lock Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-xl p-3.5 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md shadow-blue-500/10">
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0 border border-white/5 shadow-inner">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black tracking-wide uppercase leading-none">Contract Shield™ Protection</h5>
                    <p className="text-[9px] text-white/80 mt-1.5 font-normal leading-none">Your contract is locked and protected by AutoLenis Compliance AI.</p>
                  </div>
                </div>
                
                <a 
                  href="#pricing-request-form-section"
                  className="bg-white text-blue-600 hover:bg-slate-50 active:bg-slate-100 font-black text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>View Full Audit Report</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" strokeWidth={2.5} />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
