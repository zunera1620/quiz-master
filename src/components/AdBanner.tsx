import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  placement: 'home' | 'result';
  className?: string;
}

/**
 * AdBanner Component
 * Clearly reserved, non-intrusive advertisement slot designed for future
 * integration with Google AdSense or another supported ad network.
 * Adheres strictly to guidelines:
 * - No fake ads or misleading earning claims.
 * - Non-intrusive placement away from questions, timer, and controls.
 * - Standard responsive container with data-ad-slot attributes.
 */
export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  return (
    <div
      className={`w-full max-w-3xl mx-auto my-6 px-4 ${className}`}
      id={`ad-container-${placement}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-100/60 p-4 text-center transition-colors hover:bg-slate-100">
        {/* Subtle label indicating ad slot */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Advertisement
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-slate-600">
            <ShieldCheck className="w-3 h-3 text-slate-600" />
            AdSense Ready
          </span>
        </div>

        {/* Responsive standard ad container slot */}
        <div
          id={`ad-slot-${placement}`}
          data-ad-placement={placement}
          data-ad-format="auto"
          data-ad-status="reserved"
          className="flex min-h-[90px] w-full flex-col items-center justify-center rounded-xl bg-white/70 border border-slate-200/80 px-4 py-3"
        >
          {/* Ad tag placeholder ready for `<ins className="adsbygoogle" ... />` */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-600">
              Reserved Ad Space ({placement === 'home' ? 'Home Feed Banner' : 'Results Banner'})
            </p>
            <p className="text-[11px] text-slate-600">
              Google AdSense &amp; ad network slot integration area
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
