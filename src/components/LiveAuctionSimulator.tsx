import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Star, 
  TrendingDown, 
  Clock, 
  ShieldAlert,
  ShieldCheck, 
  MessageSquare, 
  Send,
  Loader2, 
  Sparkles, 
  Volume2, 
  VolumeX,
  CheckCircle2, 
  RotateCcw,
  ArrowRight,
  Bell,
  BellOff
} from 'lucide-react';
import { CarModel, Bid } from '../types';
import { SIMULATED_DEALERS } from '../data';
import AutoLenisLogo from './AutoLenisLogo';

interface LiveAuctionSimulatorProps {
  buyerName: string;
  buyerEmail: string;
  zipCode: string;
  selectedCar: CarModel;
  onRestart: () => void;
}

export default function LiveAuctionSimulator({
  buyerName,
  buyerEmail,
  zipCode,
  selectedCar,
  onRestart
}: LiveAuctionSimulatorProps) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [currentTimeSec, setCurrentTimeSec] = useState(120); // 2 minutes countdown
  const [isCompleted, setIsCompleted] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [latestNotification, setLatestNotification] = useState<string | null>(null);
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);

  // Notification Permission State
  const [notificationPermission, setNotificationPermission] = useState<string>(
    typeof window !== 'undefined' ? (Notification?.permission || 'default') : 'default'
  );

  // Track the lowest price received during the active simulation
  const lowestPriceRef = useRef<number>(selectedCar.msrp);

  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        new Notification('🔔 Notifications Enabled!', {
          body: 'You will now receive desktop alerts for new lowest offers on AutoLenis even while this tab is inactive.',
          icon: '/src/assets/images/autolenis_hero_mockup_1780011162788.png',
        });
      }
    } catch (e) {
      console.error('Error requesting notification permission:', e);
    }
  };

  // Attempt non-blocking request after 3s on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        const autoRequestTimer = setTimeout(() => {
          Notification.requestPermission().then((perm) => {
            setNotificationPermission(perm);
            if (perm === 'granted') {
              new Notification('🔔 Notifications Enabled!', {
                body: 'AutoLenis will alert you when a better dealer bid is received.',
                icon: '/src/assets/images/autolenis_hero_mockup_1780011162788.png',
              });
            }
          });
        }, 3000);
        return () => clearTimeout(autoRequestTimer);
      }
    }
  }, []);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'concierge' | 'buyer'; text: string; time: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeReportBidId, setActiveReportBidId] = useState<string | null>(null);

  // Audio Toggle Settings
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const isAudioEnabledRef = useRef(true);

  // Sync state with ref to keep async timer callback updated
  useEffect(() => {
    isAudioEnabledRef.current = isAudioEnabled;
  }, [isAudioEnabled]);

  // Sound play helper (soft synth beeps)
  const playAlertSound = () => {
    if (!isAudioEnabledRef.current) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      // Audio context block by browser security is safe to ignore
    }
  };

  // Timer countdown
  useEffect(() => {
    if (currentTimeSec <= 0) {
      setIsCompleted(true);
      return;
    }
    const timer = setInterval(() => {
      setCurrentTimeSec((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTimeSec]);

  // Simulate Bids Arriving
  useEffect(() => {
    lowestPriceRef.current = selectedCar.msrp;

    const timelines = [
      { delay: 1000, dealerIdx: 0, mult: 0.91 },  // Prestige - 9.0% off
      { delay: 3500, dealerIdx: 1, mult: 0.93 },  // Summit - 7.0% off
      { delay: 6500, dealerIdx: 2, mult: 0.88 },  // DriveOne - 12% off (Best Offer)
      { delay: 9500, dealerIdx: 3, mult: 0.92 },  // Autobahn - 8% off
      { delay: 13000, dealerIdx: 5, mult: 0.94 }, // Vanguard - 6% off
    ];

    const timers = timelines.map((t, stepIdx) => {
      return setTimeout(() => {
        const dealer = SIMULATED_DEALERS[t.dealerIdx];
        const offerAmount = Math.round(selectedCar.msrp * t.mult);
        const savings = selectedCar.msrp - offerAmount;

        // Check if this bid is better than the previous lowest
        const isBetter = offerAmount < lowestPriceRef.current;
        if (isBetter) {
          lowestPriceRef.current = offerAmount;

          // Trigger native OS-level notification if tab is inactive and permissions are granted
          if (document.hidden && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            try {
              new Notification('🔥 Better Deal Received!', {
                body: `${dealer.name} dropped the offer price to $${offerAmount.toLocaleString()}—saving you $${savings.toLocaleString()}!`,
                tag: 'better-deal-bid',
                icon: '/src/assets/images/autolenis_hero_mockup_1780011162788.png',
              });
            } catch (err) {
              console.error('Failed to trigger native notification:', err);
            }
          }
        }
        
        const newBid: Bid = {
          id: `bid-${stepIdx}`,
          dealerName: dealer.name,
          dealerLocation: `${dealer.city}, ${dealer.state}`,
          dealerDistance: dealer.distance,
          offerAmount,
          savings,
          isBestOffer: false, // will recalculate below
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          status: 'submitted',
          rating: dealer.rating,
          reviewsCount: dealer.reviewsCount,
        };

        setBids((prevBids) => {
          const updated = [...prevBids, newBid];
          // Find the lowest bid
          const lowest = Math.min(...updated.map(b => b.offerAmount));
          return updated.map(b => ({
            ...b,
            isBestOffer: b.offerAmount === lowest
          }));
        });

        setSimulationStep(stepIdx + 1);
        playAlertSound();
        setLatestNotification(`New Bid Received: $${offerAmount.toLocaleString()} from ${dealer.name}!`);
        
        // Clear notification after 3 seconds
        setTimeout(() => setLatestNotification(null), 3000);

      }, t.delay);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [selectedCar]);

  // Initial welcome message from Concierge
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatMessages([
        {
          sender: 'concierge',
          text: `Hi ${buyerName}! I'm Alex, your designated AutoLenis Concierge. I have initiated your private dealer auction for the ${selectedCar.year} ${selectedCar.make} ${selectedCar.model}.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);

    const timer2 = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'concierge',
            text: `Dealers in the TX region are actively bidding. As bids arrive, I will audit their contracts using our Contract Shield™ guidelines to verify they exclude hidden fees, dealer add-ons, or inflated document rates. Checking key requirements now...`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsTyping(false);
      }, 1500);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [buyerName, selectedCar]);

  // Trigger automated concierge feedback as bids arrive
  useEffect(() => {
    if (simulationStep === 3) {
      // DriveOne auto bid arrives (Best bid)
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const bestBid = bids.find(b => b.isBestOffer);
          const leaderName = bestBid ? bestBid.dealerName : 'DriveOne Autos';
          const leaderAmount = bestBid ? bestBid.offerAmount : 'a phenomenal rate';
          setChatMessages(prev => [
            ...prev,
            {
              sender: 'concierge',
              text: `🚨 Wow! We just received a major bid update. ${leaderName} is currently winning with an offer of $${(leaderAmount as any).toLocaleString()}, saving you $${((bestBid?.savings || 8000)).toLocaleString()} under MSRP! Let me inspect their fine print for you.`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsTyping(false);
        }, 1200);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [simulationStep, bids]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'buyer' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Automated answers matching standard user questions
    setTimeout(() => {
      let replyText = `I am on it, ${buyerName}. Let me quickly analyze that clause. We ensure our registered dealer partners fulfill all online orders at this locked bid price.`;
      const textLower = textToSend.toLowerCase();
      
      if (textLower.includes('fee') || textLower.includes('hidden') || textLower.includes('charge')) {
        replyText = `Excellent question. Every bid on AutoLenis is certified out-the-door except for standard state taxes and DMV registration. No documentation 'prep fees', mandatory ceramic coating, or nitrogen tires are allowed!`;
      } else if (textLower.includes('deliver') || textLower.includes('home') || textLower.includes('ship')) {
        replyText = `Yes! All participating dealers in our network can coordinate direct home delivery within a 200-mile radius. In most cases, they'll ship the vehicle right to your driveway for free or a small flat rate of under $150.`;
      } else if (textLower.includes('finance') || textLower.includes('lease') || textLower.includes('loan')) {
        replyText = `You are fully in control! You can finance through your current bank, pay cash, or use the dealership's promotional APR rates (like 0.9% for qualify buyers). Once you accept a bid, we'll request a digital credit app tailored precisely to this bid.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'concierge',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAcceptBid = (bid: Bid) => {
    setSelectedBidId(bid.id);
    setIsCompleted(true);
    // Add congrats concierge msg
    setChatMessages(prev => [
      ...prev,
      {
        sender: 'concierge',
        text: `🎉 Spectacular Choice! You've accepted the offer of $${bid.offerAmount.toLocaleString()} from ${bid.dealerName}. This shields you from typical negotiation stress and saves you $${bid.savings.toLocaleString()}! We have notified their General Manager, who will prepare your custom invoice file. I am sending you a secure SMS & Email setup package.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Safe image path checking (defaults to picsum if name typo or dynamic resolution)
  const getCarImageSrc = (imgName: string) => {
    if (imgName.includes('hero_luxury_bmw_1780007425241')) {
      return '/src/assets/images/hero_luxury_bmw_1780007425241.png';
    }
    if (imgName.includes('comp_car_white_1780007472064')) {
      return '/src/assets/images/comp_car_white_1780007472064.png';
    }
    if (imgName.includes('comp_car_black_1780007492259')) {
      return '/src/assets/images/comp_car_black_1780007492259.png';
    }
    return 'https://picsum.photos/seed/bmw/800/600';
  };

  // Best bid currently
  const currentBestBid = bids.reduce((min, b) => b.offerAmount < min.offerAmount ? b : min, bids[0] || null);
  const totalSavings = currentBestBid ? selectedCar.msrp - currentBestBid.offerAmount : 0;

  return (
    <div className="w-full bg-slate-900 text-white min-h-screen pt-4 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800" id="live-auction-workspace">
      {/* Simulation Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
            <button 
              onClick={onRestart}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 px-2.5 py-1 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Exit Arena / Build New Auction</span>
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button 
              onClick={() => {
                const newSetting = !isAudioEnabled;
                setIsAudioEnabled(newSetting);
                // Also trigger a sweet immediate validation sound cue so the user knows they toggled it on
                if (newSetting) {
                  try {
                    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(698.46, audioCtx.currentTime); // F5 note for success cue
                    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                    osc.start();
                    osc.stop(audioCtx.currentTime + 0.2);
                  } catch (e) {}
                }
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 px-2.5 py-1 rounded-lg transition-colors"
              id="toggle-audio-button"
              title="Toggle bid alert ringtone sound"
            >
              {isAudioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Audio Alert: <span className="text-blue-400 font-extrabold font-mono">ON</span></span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span>Audio Alert: <span className="text-slate-500 font-semibold font-mono">MUTED</span></span>
                </>
              )}
            </button>
            
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button 
              onClick={requestNotificationPermission}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 px-2.5 py-1 rounded-lg transition-colors"
              id="toggle-notifications-button"
              title="Request browser notifications for bids"
            >
              {notificationPermission === 'granted' ? (
                <>
                  <Bell className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Browser Alerts: <span className="text-emerald-400 font-extrabold font-mono">ENABLED</span></span>
                </>
              ) : notificationPermission === 'denied' ? (
                <>
                  <BellOff className="w-3.5 h-3.5 text-red-400" />
                  <span>Browser Alerts: <span className="text-red-400 font-extrabold font-mono font-sans capitalize">{notificationPermission}</span></span>
                </>
              ) : (
                <>
                  <Bell className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Browser Alerts: <span className="text-yellow-400 font-bold hover:underline">ENABLE ALERTS</span></span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-100 flex items-center gap-2">
              Private Auction Arena <span className="text-sm font-mono text-slate-400 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">ID: #{Math.floor(Math.random() * 900000) + 100000}</span>
            </h1>
          </div>
        </div>

        {/* Dynamic global tickers */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
            <Clock className="w-4 h-4 text-orange-400" />
            <span>AUCTION ENDS: <b className="text-orange-400 text-sm">{formatTimer(currentTimeSec)}</b></span>
          </div>
          <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>PARTICIPANTS: <b className="text-white">{bids.length} / 6 Dealers</b></span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-green-400" />
            <span>MAX VALUE LOCKED: <b className="text-green-400 font-extrabold">${totalSavings > 0 ? totalSavings.toLocaleString() : '---'}</b></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN (40%): Car Card, Bidding Analytics, Savings line */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Selected Car Showcase */}
          <div className="bg-slate-850/90 rounded-2xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-blue-600 text-[10px] font-bold tracking-widest py-1 px-3 uppercase rounded-bl-xl shadow">
              Private Bid Active
            </div>

            <div>
              <span className="text-xs font-mono text-blue-400 font-semibold tracking-widest uppercase">
                Selected Vehicle Model
              </span>
              <h2 className="text-2xl font-display font-extrabold text-white mt-1">
                {selectedCar.year} {selectedCar.make} {selectedCar.model}
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                {selectedCar.trim} — MSRP: <span className="font-mono text-white text-base">${selectedCar.msrp.toLocaleString()}</span>
              </p>
            </div>

            {/* Display the Generated Image */}
            <div className="my-6 relative flex justify-center py-2 h-44 items-center">
              <motion.img
                key={selectedCar.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                src={getCarImageSrc(selectedCar.image)}
                alt={selectedCar.model}
                className="max-h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] animate-float"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 w-4/5 h-2 bg-black/60 blur-md rounded-full mx-auto" />
            </div>

            {/* Simulated Live Analytics Graph */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-400">Market Price Trajectory</span>
                <span className="text-[10px] font-mono text-green-400 bg-green-950/40 px-2 py-0.5 rounded flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  Saving {totalSavings > 0 ? ((totalSavings / selectedCar.msrp) * 100).toFixed(1) : '0'}%
                </span>
              </div>
              
              {/* SVG Trendline chart */}
              <div className="h-16 w-full flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path
                    d={`M 0 10 
                       Q 25 ${simulationStep >= 1 ? 16 : 10} 
                       Q 50 ${simulationStep >= 3 ? 24 : 10} 
                       Q 75 ${simulationStep >= 4 ? 35 : (simulationStep >= 3 ? 28 : 10)} 
                       Q 100 ${simulationStep >= 5 ? 42 : (simulationStep >= 3 ? 38 : 10)}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    className="transition-all duration-1000"
                  />
                  <polygon
                    d={`M 0 10 
                       Q 25 ${simulationStep >= 1 ? 16 : 10} 
                       Q 50 ${simulationStep >= 3 ? 24 : 10} 
                       Q 75 ${simulationStep >= 4 ? 35 : (simulationStep >= 3 ? 28 : 10)} 
                       Q 100 ${simulationStep >= 5 ? 42 : (simulationStep >= 3 ? 38 : 10)} 
                       L 100 50 L 0 50 Z`}
                    fill="url(#chart-grad)"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                <span>Start ($MSRP)</span>
                <span>Regional Average</span>
                <span>Current Low Bid</span>
              </div>
            </div>
          </div>

          {/* Quick interactive Contract Shield Checklist */}
          <div className="bg-slate-850 rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center gap-2 mb-3.5">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <h3 className="font-display font-bold text-sm text-slate-100">
                Contract Shield™ Integrity Status
              </h3>
            </div>
            
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <div className="p-0.5 bg-blue-950/60 rounded mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div>
                  <b className="text-white">Zero Hidden Charges Audited</b>
                  <p className="text-[11px] text-slate-400">All prices include necessary pre-delivery inspections.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="p-0.5 bg-blue-950/60 rounded mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div>
                  <b className="text-white">Dealer Add-on Protections Active</b>
                  <p className="text-[11px] text-slate-400">No forced warranties, interior coatings, or anti-thefts.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="p-0.5 bg-blue-950/60 rounded mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div>
                  <b className="text-white">Standard Delivery Compliance</b>
                  <p className="text-[11px] text-slate-400">Dealership ensures free drop-shipping or flat state rate.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN (60%): Interactive Bids incoming list, and Live Concierge Chat */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Notifications Toast */}
          <AnimatePresence mode="popLayout">
            {latestNotification && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-blue-600/90 text-white p-3.5 rounded-xl text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-blue-500/10"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>{latestNotification}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Incoming Bids Display Card */}
          <div className="bg-slate-850 rounded-2xl p-5 sm:p-6 border border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-semibold text-lg text-slate-100 flex items-center gap-1.5">
                Private Offers Received
                <span className="text-xs font-sans font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                  ({bids.length} Active Bids)
                </span>
              </h3>
              {bids.length < 5 && (
                <div className="flex items-center gap-1.5 text-xs text-blue-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Waiting for bids...</span>
                </div>
              )}
            </div>

            <div className="space-y-3.5 max-h-[300px] overflow-y-auto scrollbar-thin pr-1">
              <AnimatePresence>
                {bids.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-3" />
                    Connecting to local dealership clusters... Bids beginning shortly.
                  </motion.div>
                ) : (
                  bids
                    // Sort lowest amount to top
                    .sort((a, b) => a.offerAmount - b.offerAmount)
                    .map((bid, index) => (
                      <motion.div
                        key={bid.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`p-4 rounded-xl border relative transition-all ${
                          bid.isBestOffer
                            ? 'bg-blue-950/40 border-blue-500/80 shadow-lg shadow-blue-500/10'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                        id={`dealer-bid-item-${index}`}
                      >
                        {bid.isBestOffer && (
                          <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                            ★ Best Offer Match
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-200">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-white flex items-center gap-1.5 text-sm sm:text-base">
                                {bid.dealerName}
                                <span className="flex items-center text-amber-400 text-xs">
                                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />{' '}
                                  {bid.rating} ({(bid.reviewsCount)})
                                </span>
                              </h4>
                              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                <span>{bid.dealerLocation} • {bid.dealerDistance} mi away</span>
                              </div>
                            </div>
                          </div>

                          {/* Pricing and Action */}
                          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-slate-800">
                            <div>
                              <div className="text-slate-400 text-[10px] font-mono uppercase text-right">
                                Certified Offer
                              </div>
                              <div className="text-xl font-mono font-bold text-slate-100 mt-0.5">
                                ${bid.offerAmount.toLocaleString()}
                              </div>
                              <div className="text-green-400 text-xs font-semibold">
                                Saved ${bid.savings.toLocaleString()}!
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              {/* Contract details report action */}
                              <button
                                onClick={() => setActiveReportBidId(bid.id)}
                                className="text-[10px] text-blue-400 font-semibold uppercase hover:underline cursor-pointer"
                              >
                                View Contract Report
                              </button>
                              
                              <button
                                onClick={() => handleAcceptBid(bid)}
                                disabled={selectedBidId !== null}
                                className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer transition-colors ${
                                  selectedBidId === bid.id
                                    ? 'bg-green-600 text-white'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                                }`}
                              >
                                {selectedBidId === bid.id ? 'Offer Accepted' : 'Accept Offer'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Live Concierge Interactive Chatbox */}
          <div className="bg-slate-850 rounded-2xl flex flex-col h-[340px] border border-slate-800 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center relative font-bold text-white text-sm">
                  AL
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-slate-900"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Alex — Support Representative</h4>
                  <p className="text-[9px] text-slate-400">Assigned Concierge Specialist</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded uppercase">
                Direct Line Live
              </span>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3.5" id="chat-messages-container">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                      msg.sender === 'buyer'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-900 text-slate-300 rounded-tl-none border border-slate-800'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] text-slate-500 block text-right mt-1 font-mono">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 rounded-tl-none text-slate-400 text-xs flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                    <span>Alex is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestion Quick Chips */}
            <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-850 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => handleSendMessage("Are there any extra hidden fees?")}
                className="text-[10px] bg-slate-800 select-none hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/55 cursor-pointer"
              >
                No Hidden Fees?
              </button>
              <button
                onClick={() => handleSendMessage("Do you support direct home delivery?")}
                className="text-[10px] bg-slate-800 select-none hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/55 cursor-pointer"
              >
                Home Delivery?
              </button>
              <button
                onClick={() => handleSendMessage("Can I apply my own pre-approved financing?")}
                className="text-[10px] bg-slate-800 select-none hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/55 cursor-pointer"
              >
                Financing/Leasing?
              </button>
            </div>

            {/* Chat Send Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder="Type your question for Alex..."
                className="flex-grow bg-slate-850 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Report Detail Overlay Modal (Contract Shield Report) */}
      <AnimatePresence>
        {activeReportBidId && (() => {
          const matchingBid = bids.find(b => b.id === activeReportBidId);
          if (!matchingBid) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white relative shadow-2xl"
              >
                {/* Modal close */}
                <button
                  onClick={() => setActiveReportBidId(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm bg-slate-800 px-2.5 py-1 rounded-md"
                >
                  ✕ Close
                </button>

                <div className="flex items-center gap-2.5 mb-4">
                  <ShieldCheck className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="text-lg font-display font-medium text-slate-100">
                      Contract Shield™ Review Report
                    </h3>
                    <p className="text-xs text-slate-400">Auditing dealer order sheet: {matchingBid.dealerName}</p>
                  </div>
                </div>

                <div className="bg-slate-850 p-4 rounded-xl space-y-3 border border-slate-800">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-700">
                    <span className="font-semibold">MSRP Invoice:</span>
                    <span className="font-mono">${selectedCar.msrp.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-700">
                    <span className="font-semibold text-blue-400">Private AutoLenis Offer:</span>
                    <span className="font-mono text-blue-400 font-bold">${matchingBid.offerAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-green-400 font-bold pb-2 border-b border-slate-700">
                    <span>Simulated Locked Savings:</span>
                    <span className="font-mono">${matchingBid.savings.toLocaleString()}</span>
                  </div>
                </div>

                {/* Scorecard checklist matching image scorecard */}
                <div className="my-5 space-y-3 text-xs">
                  <span className="block font-semibold uppercase tracking-wider text-[11px] text-slate-400">
                    Risk Assessment Checklists
                  </span>
                  
                  <div className="flex items-start gap-2.5 bg-green-950/20 border border-green-900/45 p-3 rounded-lg text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white">Fee Analysis: Low Risk (Checked Safe)</b>
                      <p className="text-[11px] font-sans text-slate-400 mt-1">
                        No hidden dealer service actions discovered. Out of State preparation and administrative limits are compliance locked. No mandatory anti-theft addendums discovered.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-green-950/20 border border-green-900/45 p-3 rounded-lg text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <b className="text-white">Promotional Option Compliance Locked</b>
                      <p className="text-[11px] font-sans text-slate-400 mt-1">
                        Any promotional zero APR program qualifies with the current price structure. Lease terms conform to target regional residuals verified by AutoLenis standards.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      handleAcceptBid(matchingBid);
                      setActiveReportBidId(null);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Accept Verified Offer & Close Report
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
