import React, { useEffect, useRef, useState, useCallback } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/** ---- tiny reveal-on-scroll hook ---- */
const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
};

/** ---- wrapper to apply reveal animation ---- */
const RevealSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
};


/** ---- Lightbox gallery for ambient brand strip ---- */
const Lightbox: React.FC<{
  images: string[];
  startIndex: number;
  onClose: () => void;
}> = ({ images, startIndex, onClose }) => {
  const [i, setI] = useState(startIndex);
  const clamp = useCallback((n: number) => (n + images.length) % images.length, [images.length]);
  const next = useCallback(() => setI((v) => clamp(v + 1)), [clamp]);
  const prev = useCallback(() => setI((v) => clamp(v - 1)), [clamp]);

  // keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 text-white/90 hover:text-white"
      >
        <X className="h-7 w-7" />
      </button>

      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-4 md:left-8 text-white/90 hover:text-white"
      >
        <ChevronLeft className="h-9 w-9" />
      </button>

      <img
        src={images[i]}
        alt="Circadia gallery"
        className="max-h-[82vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
      />

      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-4 md:right-8 text-white/90 hover:text-white"
      >
        <ChevronRight className="h-9 w-9" />
      </button>
    </div>
  );
};

/** ---- Single-image carousel with arrows, dots, and swipe ---- */
const SingleCarousel: React.FC<{
  slides: { src: string; alt?: string; caption?: string }[];
  autoMs?: number; // optional autoplay
}> = ({ slides, autoMs = 0 }) => {
  const [i, setI] = useState(0);
  const clamp = (n: number) => (n + slides.length) % slides.length;
  const next = () => setI((v) => clamp(v + 1));
  const prev = () => setI((v) => clamp(v - 1));

  // optional autoplay
  useEffect(() => {
    if (!autoMs) return;
    const t = setInterval(next, autoMs);
    return () => clearInterval(t);
  }, [autoMs]); // eslint-disable-line react-hooks/exhaustive-deps

  // swipe for mobile
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    startX.current = null;
  };

  const current = slides[i];

  return (
    <div className="relative max-w-5xl mx-auto" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="flex items-center justify-center">
        <img
            src={current.src}
            alt={current.alt || 'Transformation'}
            className="block max-h-[60vh] md:max-h-[66vh] w-auto max-w-full object-contain"
            loading="lazy"
            decoding="async"
        />
      </div>


      {/* arrows */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2.5 rounded-full transition-all ${idx === i ? 'w-6 bg-[#6a4c69]' : 'w-2.5 bg-gray-300'}`}
          />
        ))}
      </div>

      {current.caption && (
        <p className="text-center text-sm text-gray-600 mt-3">{current.caption}</p>
      )}
    </div>
  );
};


const Products: React.FC = () => {
    // Always start at top on mount/refresh
  useEffect(() => {
    const canControl = 'scrollRestoration' in window.history;
    const prev = canControl ? window.history.scrollRestoration : undefined;

    if (canControl) window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      if (canControl && prev) window.history.scrollRestoration = prev;
      else if (canControl) window.history.scrollRestoration = 'auto';
    };
  }, []);

  const pillars = [
    'Science-backed formulations',
    'Barrier-friendly, gentle actives',
    'Professional-only protocols',
    'Visible, lasting results',
  ];

  // --------- IMAGE PATHS ----------
  const IMG = {
    logo: '/Circadia/logo-circadia.png',
    discover: '/Circadia/discover.png',        // <-- will be used as the top banner inside Discover section
    mask1: '/Circadia/mask-1.jpg',
    mask2: '/Circadia/mask-2.jpg',
    oxygen: '/Circadia/oxygenrx.png',
    p1: '/Circadia/products-1.jpg',
    p2: '/Circadia/products-2.jpg',
    p3: '/Circadia/products-3.jpg',
    p4: '/Circadia/products-4.jpg',
    macro: '/Circadia/CircaShieldWater2.jpg',
    lifestyle: '/Circadia/Aquabiotic-8.jpg',
    cleanser: '/Circadia/cleanser.png',
    serum: '/Circadia/Serum.jpg',
    cocoa: '/Circadia/cocoa.jpg',
    charcoal: '/Circadia/CharcoalApply_12.png',
    mask3: '/Circadia/PreProFacial10.jpg',
    p5: '/Circadia/Aquabiotic-2.jpg',
    logowhite: '/Circadia/circadia-logo-white.png',
    CocoaEnzyme: '/Circadia/Cocoa-Enzyme.jpg',

  };

  const ambientStrip = [IMG.charcoal, IMG.p1, IMG.p3, IMG.mask3, IMG.p5, IMG.cocoa];

  const transformationSlides = [
  { src: '/Circadia/Transformations/acne.png',          caption: 'Acne — 10 weeks' },
  { src: '/Circadia/Transformations/aging.png',         caption: 'Aging — 10 weeks' },
  { src: '/Circadia/Transformations/hyperpigmentation.png', caption: 'Hyperpigmentation — 10 weeks' },
  { src: '/Circadia/Transformations/modality.png',      caption: 'Texture refinement' },
  { src: '/Circadia/Transformations/modality - 2.png',      caption: 'Texture refinement' },
  { src: '/Circadia/Transformations/sensitive.png',     caption: 'Sensitive skin support' },
  { src: '/Circadia/Transformations/transformations.png', caption: 'Real Results' },
];


  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideos, setActiveVideos] = useState<string[]>([]);

  const categories = [
    { title: 'Cleansers', blurb: 'pH-balanced, gentle, effective', img: IMG.cleanser, alt: 'Circadia professional facial cleansers used in clinical skincare treatments', videos: ['/Circadia/Cleansing-Mandelic.mp4', '/Circadia/Vitamin-Veil-Cleanser-Kris-Reel.mp4', '/Circadia/VV1.mp4']},
    { title: 'Serums', blurb: 'Targeted actives for visible change', img: IMG.serum, alt: 'Circadia treatment serums applied to the skin for targeted results', videos: ['/Circadia/VitaminC-Serum.mp4', '/Circadia/Serum-71-2.mp4'] },
    { title: 'Moisturizers + SPF', blurb: 'Barrier support & daily defense', img: IMG.macro, alt: 'Circadia moisturizer and SPF products supporting the skin barrier', videos: ['/Circadia/AquaporinWater.mov'] },
    { title: 'Enzymes', blurb: 'Gentle exfoliation for instant glow', img: IMG.CocoaEnzyme, alt: 'Circadia cocoa enzyme exfoliation treatment applied during a facial', videos: ['/Circadia/Cocoa-Enzyme-Sound.mp4'] },
  ];

  // video pop up for client loved categories
  const VideoCarouselModal: React.FC<{
    videos: string[];
    onClose: () => void;
  }> = ({ videos, onClose }) => {
    const [i, setI] = useState(0);
    const clamp = (n: number) => (n + videos.length) % videos.length;

    const next = () => setI((v) => clamp(v + 1));
    const prev = () => setI((v) => clamp(v - 1));

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
      <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/90 hover:text-white"
          aria-label="Close"
        >
          <X className="h-7 w-7" />
        </button>

        {/* Prev */}
        {videos.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 text-white/90 hover:text-white"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
        )}

        {/* Video */}
        <div className="w-full max-w-4xl">
          <video
            key={videos[i]} // forces reload when switching
            src={videos[i]}
            controls
            autoPlay
            playsInline
            className="w-full max-h-[80vh] rounded-xl shadow-2xl bg-black"
          />
        </div>

        {/* Next */}
        {videos.length > 1 && (
          <button
            onClick={next}
            className="absolute right-4 md:right-8 text-white/90 hover:text-white"
            aria-label="Next video"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        )}
      </div>
    );
  };



  return (
    <>
        <Helmet>
          <title>Circadia Professional Skincare | Lalalu Skin & Laser</title>
          <meta
              name="description"
              content="Learn how Circadia’s science-backed, barrier-friendly skincare pairs with Lalalu treatments. Explore client-loved categories and real transformations."
          />
          <link rel="canonical" href="https://lalaluskinlaser.com/products" />
          <meta name="robots" content="index,follow" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Lalalu Skin & Laser" />
          <meta property="og:locale" content="en_CA" />
          <meta property="og:title" content="Circadia Professional Skincare | Lalalu Skin & Laser" />
          <meta property="og:description" content="Science-backed, barrier-friendly skincare paired with Lalalu treatments." />
          <meta property="og:url" content="https://lalaluskinlaser.com/products" />
          <meta property="og:image" content="https://lalaluskinlaser.com/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Lalalu Skin & Laser — Circadia partnership" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />

          {/* Breadcrumbs JSON-LD */}
          <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lalaluskinlaser.com/" },
              { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://lalaluskinlaser.com/products" }
              ]
          })}</script>

          {/* Optional WebPage JSON-LD */}
          <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Circadia Professional Skincare",
              "url": "https://lalaluskinlaser.com/products",
              "description": "Circadia skincare at Lalalu Skin & Laser in Calgary."
          })}</script>
        </Helmet>

        <div className="min-h-screen">
        {/* HERO: Circadia + Lalalu ombré with soft photo wash */}
        <section className="relative overflow-hidden h-[64vh] md:h-[76vh]">
            <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(120deg, #0F1E3D 0%, #2E3F73 40%, #6a4c69 100%)`,
            }}
            />
            <div
            className="absolute inset-0 opacity-25"
            style={{
                backgroundImage: `url(${IMG.mask2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
            <img src={IMG.logowhite} alt="Circadia" className="h-16 md:h-24 mb-6 drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]" />
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                Circadia Professional Skincare
            </h1>
            <p className="mt-4 max-w-3xl text-white/90 text-lg md:text-2xl">
                Clinical formulas rooted in chronobiology, respecting the skin barrier day and night.
            </p>
            <div className="mt-8">
                <a href="/book">
                <Button size="lg" className="bg-white !text-[#0F1E3D] hover:bg-gray-100">
                    Book Your Appointment
                </Button>
                </a>
            </div>
            </div>
        </section>

        {/* DISCOVER: hero banner with overlaid copy + flowing content below */}
        <RevealSection>
        <section className="bg-white">
            {/* Flowing content — no repeated big title */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start pt-8 md:pt-10 pb-4 md:pb-6">
            <div>
                <div className="text-s font-semibold tracking-wide text-[#6a4c69] uppercase mb-2">
                Why Circadia
                </div>
                <p className="text-gray-700 mb-6">
                Circadia harnesses the skin’s natural circadian rhythms to protect by day and repair by night.
                Pure botanicals, next-gen vitamins, stem cells, and innovative peptides deliver results without compromising the barrier.
                </p>
                <ul className="space-y-2">
                {pillars.map((p) => (
                    <li key={p} className="flex items-start text-gray-800">
                    <span className="mt-0.5 mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#6a4c69]/10 text-[#6a4c69]">
                        ✓
                    </span>
                    {p}
                    </li>
                ))}
                </ul>
            </div>

            {/* supporting photos collage */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="col-span-2 overflow-hidden shadow-lg">
                <img src={IMG.mask1} alt="In-clinic experience" className="w-full h-56 md:h-64 object-cover" />
                </Card>
                <Card className="overflow-hidden">
                <img src={IMG.lifestyle} alt="Formula texture" className="w-full h-40 md:h-48 object-cover" />
                </Card>
                <Card className="overflow-hidden">
                <img src={IMG.p1} alt="Circadia products" className="w-full h-40 md:h-48 object-cover" />
                </Card>
            </div>
            </div>

            {/* Banner with Discover image */}
            {/* Banner with the Discover composite (no crop, no upscaling) */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
            {/* limit the visual width to the image’s native width so it never scales up */}
                <div className="mx-auto rounded-2xl shadow-xl bg-white overflow-visible max-w-[1003px]">
                    <img
                    src={IMG.discover}
                    alt="Discover the Circadia Difference"
                    loading="eager"
                    decoding="async"
                    className="block w-full h-auto object-contain"
                    /* If your image is a different native width, update max-w above to match it. */
                    /* Optional: cap height if you want, e.g. style={{ maxHeight: '820px' }} */
                    />
                </div>
            </div>

        </section>
        </RevealSection>

            


        {/* CATEGORY TILES */}
        <RevealSection>
            <section className="py-16 bg-[#F7F8FC]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-[#0F1E3D] mb-2">
                  Client-Loved Categories
                </h3>
                <p className="text-gray-700 text-sm text-center mb-8">
                  Tap a category to learn more.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
                  {categories.map((c) => (
                    <button
                      key={c.title}
                      onClick={() => {
                        if (c.videos?.length) {
                          setActiveVideos(c.videos);
                          setVideoOpen(true);
                        }
                      }}
                      className="text-left"
                    >
                      <Card className="overflow-hidden hover:scale-[1.01] transition cursor-pointer">
                        <img
                          src={c.img}
                          alt={c.title}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                        />
                        <div className="p-6 text-center">
                          <h4 className="text-xl font-semibold text-[#2d2430]">{c.title}</h4>
                          <p className="text-gray-600">{c.blurb}</p>
                        </div>
                      </Card>
                    </button>
                  ))} 
                </div>
            </div>
            </section>
        </RevealSection>

        {/* AMBIENT BRAND STRIP → lightbox-enabled gallery */}
            <RevealSection>
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {ambientStrip.map((src, i) => {
                    // If there are 6 images (or generally when remainder==2), center the last two.
                    const remainder = ambientStrip.length % 4;
                    const isLastTwo = i >= ambientStrip.length - 2;
                    const centerClass =
                    remainder === 2 && isLastTwo
                        ? (i === ambientStrip.length - 2 ? 'md:col-start-2' : 'md:col-start-3')
                        : '';

                    return (
                    <button
                        key={i}
                        onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                        className={`text-left ${centerClass}`}
                        aria-label="Open image"
                    >
                        <Card className="overflow-hidden hover:scale-[1.01] transition">
                        <img src={src} alt="Circadia ambience" className="w-full h-40 object-cover" loading="lazy" />
                        </Card>
                    </button>
                    );
                })}
                </div>
            </section>
            </RevealSection>


        {/* Lightbox portal */}
        {lightboxOpen && (
            <Lightbox
            images={ambientStrip}
            startIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            />
        )}

        {videoOpen && activeVideos.length > 0 && (
          <VideoCarouselModal
            videos={activeVideos}
            onClose={() => {
              setVideoOpen(false);
              setActiveVideos([]);
            }}
          />
        )}



        {/* TRANSFORMATIONS — single-image carousel */}
            {transformationSlides.length > 0 && (
            <RevealSection>
                <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F1E3D] mb-8">
                    Real Transformations
                    </h3>
                    <SingleCarousel slides={transformationSlides} />
                    <p className="mt-6 text-sm text-gray-500">
                    Real client journeys with consistent home-care and in-clinic support.
                    </p>
                </div>
                </section>
            </RevealSection>
            )}


        {/* Soft CTA with lifestyle image */}
        <section
            className="py-20 text-white relative"
            style={{
            backgroundImage:
                'linear-gradient(120deg, rgba(15,30,61,0.85), rgba(106,76,105,0.85)), url(' + IMG.lifestyle + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to explore Circadia with Lalalu?
            </h2>
            <p className="text-lg mb-8 text-white/95">
                We’ll recommend the right products and protocols for your skin’s rhythm.
            </p>
            <a href="/book">
                <Button size="lg" className="bg-white !text-[#0F1E3D] hover:bg-gray-100">
                Book Your Appointment
                </Button>
            </a>
            </div>
        </section>
        </div>
    </>
  );
};

export default Products;
