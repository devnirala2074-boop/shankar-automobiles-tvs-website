import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ badge, title, subtitle, breadcrumb }) {
  return (
    <section className="relative py-14 sm:py-20 bg-[#090C12] border-b border-white/10 overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 text-center sm:text-left">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-white transition flex items-center space-x-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-red-400 font-semibold">{breadcrumb || title}</span>
        </div>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-[11px] font-bold tracking-wider uppercase mb-3">
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
