import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CAR_MODELS } from '../data';
import { CarModel } from '../types';

interface LeadFormProps {
  onStartAuction: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: string;
    car: CarModel;
  }) => void;
  defaultCarId?: string;
  isModal?: boolean;
}

export default function LeadForm({ onStartAuction, defaultCarId = 'bmw-x5', isModal = false }: LeadFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedCarId] = useState(defaultCarId);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!firstName.trim()) tempErrors.firstName = 'First name is required';
    if (!lastName.trim()) tempErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!zipCode.trim()) {
      tempErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(zipCode)) {
      tempErrors.zipCode = 'Please enter a 5-digit ZIP code';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const selectedCar = CAR_MODELS.find(c => c.id === selectedCarId) || CAR_MODELS[0];
      onStartAuction({
        firstName,
        lastName,
        email,
        phone,
        zipCode,
        car: selectedCar,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* First & Last Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col text-left">
          <label className="text-sm font-semibold text-slate-800 mb-1.5 flex items-center">
            First name <span className="text-[#1352cf] font-bold ml-1">*</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full bg-white border ${
              errors.firstName 
                ? 'border-red-500 ring-2 ring-red-100/50' 
                : 'border-slate-200 focus:border-[#1352cf] focus:ring-2 focus:ring-[#1352cf]/10'
            } text-slate-900 text-[15px] font-sans font-medium rounded-xl h-14 px-4.5 outline-none transition-all`}
            id="input-firstName"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.firstName}</p>
          )}
        </div>

        <div className="flex flex-col text-left">
          <label className="text-sm font-semibold text-slate-800 mb-1.5 flex items-center">
            Last name <span className="text-[#1352cf] font-bold ml-1">*</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full bg-white border ${
              errors.lastName 
                ? 'border-red-500 ring-2 ring-red-100/50' 
                : 'border-slate-200 focus:border-[#1352cf] focus:ring-2 focus:ring-[#1352cf]/10'
            } text-slate-900 text-[15px] font-sans font-medium rounded-xl h-14 px-4.5 outline-none transition-all`}
            id="input-lastName"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email Address */}
      <div className="flex flex-col text-left">
        <label className="text-sm font-semibold text-slate-800 mb-1.5 flex items-center">
          Email <span className="text-[#1352cf] font-bold ml-1">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full bg-white border ${
            errors.email 
              ? 'border-red-500 ring-2 ring-red-100/50' 
              : 'border-slate-200 focus:border-[#1352cf] focus:ring-2 focus:ring-[#1352cf]/10'
          } text-slate-900 text-[15px] font-sans font-medium rounded-xl h-14 px-4.5 outline-none transition-all`}
          id="input-email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col text-left">
        <label className="text-sm font-semibold text-slate-800 mb-1.5 flex items-center">
          Phone (optional)
        </label>
        <input
          type="tel"
          placeholder="(555) 555-5555"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white border border-slate-200 focus:border-[#1352cf] focus:ring-2 focus:ring-[#1352cf]/10 text-slate-900 text-[15px] font-sans font-medium rounded-xl h-14 px-4.5 outline-none transition-all placeholder:text-slate-405"
          id="input-phone"
        />
      </div>

      {/* ZIP Code */}
      <div className="flex flex-col text-left">
        <label className="text-sm font-semibold text-slate-800 mb-1.5 flex items-center">
          ZIP code <span className="text-[#1352cf] font-bold ml-1">*</span>
        </label>
        <input
          type="text"
          maxLength={5}
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className={`w-full bg-white border ${
            errors.zipCode 
              ? 'border-red-500 ring-2 ring-red-100/50' 
              : 'border-slate-200 focus:border-[#1352cf] focus:ring-2 focus:ring-[#1352cf]/10'
          } text-slate-900 text-[15px] font-sans font-medium rounded-xl h-14 px-4.5 outline-none transition-all`}
          id="input-zipcode"
        />
        {errors.zipCode && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.zipCode}</p>
        )}
      </div>

      {/* Submit button */}
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full h-14 bg-[#1352cf] hover:bg-[#1146b3] text-white font-sans font-bold rounded-xl text-base flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-[#1352cf]/10 mt-6"
        id="btn-submit"
      >
        <span>Continue</span>
        <ArrowRight className="w-5 h-5 text-white" strokeWidth={2.5} />
      </motion.button>
    </form>
  );
}
