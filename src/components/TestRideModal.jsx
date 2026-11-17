import React, { useState, useEffect, useCallback } from 'react';
import { X, Calendar, User, Phone, Bike, ShieldCheck, CheckCircle2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useModal } from '../context/ModalContext';
import { VEHICLES } from '../data/vehicles';
import { buildWhatsAppUrl, getTestRideMessage, isValidIndianPhone } from '../utils/whatsapp';
import { DEALERSHIP } from '../data/dealership';

export default function TestRideModal() {
  const { testRideOpen, closeTestRide, selectedVehicle } = useModal();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    preferredDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setError('');
    setFormData((prev) => ({ ...prev, vehicle: '' }));
    closeTestRide();
  }, [closeTestRide]);

  useEffect(() => {
    if (!testRideOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testRideOpen, handleClose]);

  if (!testRideOpen) return null;

  const activeModel = formData.vehicle || selectedVehicle || VEHICLES[0]?.name || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your full name and mobile number.');
      return;
    }
    if (!isValidIndianPhone(formData.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setError('');
    const waText = getTestRideMessage({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      vehicle: activeModel,
    });
    const url = buildWhatsAppUrl(waText);
    
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#121722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171E2C]">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Book a TVS Test Ride
            </h3>
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-white">Request Prepared!</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              We have formatted your test ride request and opened WhatsApp ({DEALERSHIP.contact.phoneDisplay}). Send the message to connect directly with our Sitapur showroom team.
            </p>
            <div className="p-4 rounded-xl bg-white/5 text-xs text-gray-400 border border-white/5 text-left">
              <p className="font-semibold text-gray-300 mb-1">Dealership Note:</p>
              Test rides are subject to model availability and driving license verification at Shankar Automobiles, Sitapur.
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-gray-400">
              Experience the performance at <strong className="text-white">{DEALERSHIP.name}</strong>, Sitapur. Please fill your details below:
            </p>

            {error && (
              <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  maxLength={15}
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Select Vehicle *
                </label>
                <div className="relative">
                  <Bike className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={activeModel}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition appearance-none"
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.name} className="bg-[#121722] text-white">
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Special Requests / Message (Optional)
              </label>
              <textarea
                rows="2"
                placeholder="Preferred timing, questions about on-road pricing or exchange..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-red-500 transition resize-none"
              ></textarea>
            </div>

            <div className="flex items-start space-x-2 text-xs text-gray-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>
                Submitting opens WhatsApp directly with your request details. Valid two-wheeler driving licence required for riding.
              </span>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-1/3 py-2.5 border border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 flex items-center justify-center space-x-2 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-xl text-sm transition shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
