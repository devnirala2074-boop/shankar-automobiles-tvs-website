import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Home, Search } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#090C12] px-4 py-16">
      <SEOHead 
        title="404 Page Not Found | Shankar Automobiles Sitapur" 
        description="The page you requested could not be found. Explore TVS motorcycles and scooters at Shankar Automobiles, Sitapur."
      />

      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-xl shadow-red-950/20">
          <Bike className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Track Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
            The page you're trying to reach doesn't exist or has moved. Return to our showroom homepage or browse the TVS vehicle collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-950/40 transition"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/vehicles"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/10 transition"
          >
            <Search className="w-4 h-4" />
            <span>Browse Vehicles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
