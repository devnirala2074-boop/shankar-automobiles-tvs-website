import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import TestRideModal from './components/TestRideModal';
import EnquiryModal from './components/EnquiryModal';
import ServiceBookingModal from './components/ServiceBookingModal';

// Eagerly load Home for fastest initial paint; lazy-load secondary routes for bundle splitting
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Vehicles = lazy(() => import('./pages/Vehicles'));
const VehicleDetails = lazy(() => import('./pages/VehicleDetails'));
const Offers = lazy(() => import('./pages/Offers'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteLoader() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center bg-[#0A0D14]">
      <div className="w-9 h-9 rounded-full border-2 border-white/15 border-t-red-600 animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0D14] text-slate-100 selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Viewport */}
      <main className="flex-grow">
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:slug" element={<VehicleDetails />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Floating Buttons */}
      <WhatsAppFloatingButton />
      <TestRideModal />
      <EnquiryModal />
      <ServiceBookingModal />
    </div>
  );
}
