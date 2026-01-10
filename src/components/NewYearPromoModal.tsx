import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'lalalu_new_year_2026_seen';

// Auto-disables after Jan 31 — safe to delete after campaign
const PROMO_END_DATE = new Date('2026-01-31T23:59:59');

const NewYearPromoModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
        const now = new Date();
        if (now <= PROMO_END_DATE && !sessionStorage.getItem(STORAGE_KEY)) {
            setOpen(true);
        }
    }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.45)] overflow-hidden">

        {/* SCROLL CONTAINER WITH BACKGROUND */}
        <div className="
          relative h-full max-h-[90vh] overflow-y-auto
          bg-gradient-to-br from-[#f7f2e8] via-[#efe4cc] to-[#e6d8f2]
          rounded-[2.5rem]
        ">

          {/* Sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            <span className="sparkle sparkle-1" />
            <span className="sparkle sparkle-2" />
            <span className="sparkle sparkle-3" />
            <span className="sparkle sparkle-4" />
          </div>

          {/* Fireworks */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="firework firework-1" />
            <div className="firework firework-2" />
            <div className="firework firework-3" />
          </div>

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 z-20 rounded-full bg-white/80 p-2 hover:bg-white transition"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>

          {/* CONTENT */}
          <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 md:p-14">
            <div className="text-center max-w-2xl mx-auto">

              <div className="flex justify-center mb-4">
                <Sparkles className="h-7 w-7 text-[#c6a85e]" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-wide text-gray-900 mb-4">
                New Year, New Glow
              </h2>

              <p className="text-lg text-gray-700 mb-8">
                If you’ve been thinking about addressing your skin concerns,
                <span className="font-semibold"> this is your sign.</span>
                <br />
                <span className="text-sm block mt-2 text-gray-600">
                  January-only treatments designed for visible results.
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="offer-card">
                  <p className="offer-title">Cocoa Enzyme + HydraFacial</p>
                  <p className="offer-price">$80</p>
                  <p className="offer-desc">
                    Deeply exfoliates, hydrates & boosts radiance for an instant glow
                  </p>
                </div>

                <div className="offer-card">
                  <p className="offer-title">C202 Acne Treatment</p>
                  <p className="offer-price">$100</p>
                  <p className="offer-desc">
                    A powerful oxygenating treatment by Circadia to clarify pores and improve acne-prone skin
                  </p>
                </div>

                <div className="offer-card">
                  <p className="offer-title">Morpheus8 + PDRN + Jelly Mask</p>
                  <p className="offer-price">$200</p>
                  <p className="offer-desc">
                    Advanced RF microneedling for firming, texture & collagen repair
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                + Dermaplaning add-on — $20
              </p>

              <Link
                to="/book"
                onClick={close}
                className="inline-flex items-center justify-center
                  bg-[#6a4c69] text-white
                  px-8 py-3 sm:px-10 sm:py-4
                  text-base sm:text-lg
                  rounded-full font-semibold
                  hover:bg-[#a085b4] transition"
              >
                Book Your January Glow
              </Link>

              <p className="text-xs text-gray-500 mt-4">
                Or call <span className="font-medium">403-607-1443</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewYearPromoModal;
