import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { ArrowLeft, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Inline pill beside price: show first custom badge if present, else "Sale" when discounted
const InlinePill = ({
  badges,
  discounted,
}: {
  badges?: { text: string; color?: 'red' | 'lavender' | 'green' | 'gray' }[];
  discounted: boolean;
}) => {
  const b = badges?.[0];
  if (!b && !discounted) return null;

  const colorClass =
    b?.color === 'lavender'
      ? 'bg-purple-50 text-purple-700'
      : b?.color === 'green'
      ? 'bg-green-50 text-green-700'
      : b?.color === 'gray'
      ? 'bg-gray-100 text-gray-600'
      : 'bg-red-50 text-red-600';

  return (
    <span className={`ml-2 inline-block rounded-full text-[10px] font-semibold px-1.5 py-0.5 ${colorClass}`}>
      {b?.text ?? 'Sale'}
    </span>
  );
};

type Aftercare =
  | string[]
  | {
      body?: string[];
      face?: string[];
      general?: string[];
      sun?: string[];
      activities?: string[];
      whenToSeekHelp?: string[];
      contraindications?: string[];
    };

const aftercareById: Record<string, Aftercare> = {
  microneedling: [
    'Expect mild redness & swelling for 1-3 days, possibly light flaking.',
    'Avoid direct sun exposure & heat (saunas, workouts) for at least 48-72 hours.',
    'Do not apply makeup for 24–48 hours.',
    'Use a gentle, hydrating cleanser & moisturizer; avoid actives such as retinol, glycolic, and salicylic acid for at least 7 days before and after the appointment.',
    'Apply SPF 50 daily and avoid direct sun exposure — your skin is extra sensitive to the sun.',
    'Do not pick or peel flaking skin.',
    'Complete healing generally takes 2-3 weeks.'
  ],
  microdermabrasion: [
    'Expect slight pinkness; will subside in a few hours.',
    'Avoid makeup for 12-24 hours.',
    'No exfoliation or strong actives for 5-7 days.',
    'Keep skin well-hydrated & use sunscreen daily.',
    'Avoid swimming pools or hot tubs for 48 hours.'
  ],
  hydrafacial: [
    'Avoid makeup for 12-24 hours.',
    'No exfoliating products (AHAs/BHAs) for 48 hours.',
    'Drink plenty of water to boost results.',
    'Apply SPF 30+ daily to protect that new glow.',
    'Avoid vigorous workouts, saunas, or steam for 24 hours.'
  ],
  'bb-glow': [
    'No makeup or face washing for 24 hours.',
    'Avoid heavy sweating, saunas, and sun exposure for 48 hours.',
    'Use only gentle, hydrating skincare for 5-7 days.',
    'Minor dryness & flaking is normal — do not pick or scrub.',
    'Always wear SPF 50 daily to maintain your even glow.'
  ],
  'chemical-peels': {
    general: [
      'Mild redness, tightness, and peeling or flaking may occur over 3–7 days, depending on the peel strength.',
      'Do not pick, peel, or scrub flaking skin — allow it to shed naturally.',
      'Avoid makeup for 24–48 hours until the skin calms.',
      'Keep the skin well-hydrated with a gentle moisturizer 2–3 times daily.',
      'Use a gentle, non-active cleanser for 7-10 days.',
      'Avoid exfoliants, retinol, AHAs/BHAs, scrubs, or strong actives for 7-10 days, or until the skin has fully healed.',
    ],
    sun: [
      'Apply SPF 50 every morning — this is mandatory after chemical peels.',
      'Avoid direct sun exposure for at least 1 week.',
      'Reapply sunscreen every 2–3 hours if outdoors.',
    ],
    activities: [
      'Avoid sweating, strenuous exercise, saunas, and steam rooms for at least 48 hours.',
      'Avoid swimming pools or hot tubs for at least 48 hours to prevent irritation and bacteria exposure.',
      'Do not wax, thread, or shave the area for at least 7-14 days.',
      'Avoid hot showers touching the treated area for at least 24-72 hours, and potentially up to a week. Use lukewarm water.',
    ],
    whenToSeekHelp: [
      'Contact us if you experience excessive redness, significant swelling, unusual discomfort, or signs of a reaction.',
      'Very light peeling is normal — but blistering is not. Reach out immediately if this occurs.',
    ]
  },
  'diamond-glow': [
    'Mild redness, tightness, or warmth may occur and typically resolves within a few hours.',
    'Avoid makeup for 24 hours to allow the skin to fully recover.',
    'Do not exfoliate or use active ingredients (retinol, AHAs, BHAs, benzoyl peroxide) for at least 48h - 1 week.',
    'Use a gentle cleanser and hydrating moisturizer only for the first few days.',
    'Avoid heat exposure such as saunas, steam rooms, hot yoga, or intense workouts for 24–48 hours.',
    'Apply broad-spectrum SPF 30–50 daily, as freshly exfoliated skin is more sun-sensitive.',
    'Avoid direct sun exposure and tanning beds for at least 48 hours.',
    'Keep skin well hydrated and drink plenty of water to support healing and glow.'
  ],
  dermaplaning: [
    'Your skin may feel extra smooth & sensitive.',
    'Avoid exfoliants & active ingredients (retinol, acids) for 3-5 days.',
    'Wear SPF daily as skin is more prone to UV damage.',
    'Avoid makeup for 12-24 hours to prevent clogging.',
    'Avoid waxing/threading for 7 days'
  ],
  'skin-brightening': [
    'Avoid heavy makeup for 12 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Avoid exfoliating products (retinols, AHAs, scrubs) for 3-5 days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'vitamin-c-facial': [
    'Avoid heavy makeup for 12 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'classic-facial': [
    'Avoid heavy makeup for 12 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'glow-facial': [
    'Avoid heavy makeup for 12 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'deep-cleansing': [
    'Avoid heavy makeup for 12 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'c2o2-oxygen-facial': {
    general: [
      'Skin may appear flushed or feel warm immediately after the treatment — this is normal and typically subsides within a few hours.',
      'Avoid heavy makeup for 12–24 hours to allow the skin to fully benefit from the oxygenation process.',
      'Use only gentle, hydrating skincare products for the first 24–48 hours.',
      'Avoid active ingredients such as retinol, AHAs, BHAs, benzoyl peroxide, and exfoliants for at least 48 hours.',
      'Avoid saunas, steam rooms, hot yoga, and intense workouts for 24 hours.',
      'Apply broad-spectrum SPF 30–50 daily, as oxygenated skin may be more sensitive to sun exposure.',
      'Stay well hydrated to support circulation and prolong your glow.',
      'Mild tingling or tightness may occur and is temporary.',
      'Frequency depends on the severity of acne or congestion, typically recommended every 1–4 weeks.',
    ],

    contraindications: [
      'Allergies or sensitivities to citrus, pineapple, papaya, or cocoa.',
      'Use of Accutane (isotretinoin) within the last 12 months.',
      'Highly inflamed, compromised, or overly sensitized skin.',
      'Recent chemical peel within the last 2 weeks or recent aggressive laser treatments.',
      'Pregnant or nursing clients — some components of intensive oxygen treatments may not be recommended.',
      'Active skin infections, including cold sores (herpes simplex) or bacterial/fungal infections.',
    ],
  },
  'acne-treatment': [
    'Avoid heavy makeup for 12-24 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'customized-back-facial': [
    'Avoid tight clothing or friction on the treated area for 24–48 hours to prevent irritation.',
    'Do not work out, sweat excessively, or use saunas/steam rooms for 24 hours after treatment.',
    'Avoid sun exposure and tanning for at least 48 hours; apply SPF 30–50 if skin will be exposed.',
    'Use a gentle, fragrance-free cleanser and keep the area hydrated with a non-comedogenic moisturizer.',
    'Avoid exfoliating products, scrubs, retinol, or acids for 5–7 days, especially if you had an enzyme peel or microdermabrasion add-on.',
    'Do not pick, scratch, or squeeze any areas that may purge or feel bumpy — allow the skin to heal naturally.',
    'Shower after 12–24 hours with lukewarm water and mild soap (no body scrubs or loofahs).',
    'Change into clean, loose-fitting clothes after your treatment to avoid bacteria transfer from fabric or sweat.',
    'Drink plenty of water to support detoxification and skin healing.',
    'If irritation, redness, or dryness occurs, apply a soothing, unscented lotion or aloe gel and avoid active ingredients until skin feels calm.'
  ],
  'led-facial': [
    'Avoid heavy makeup for 12 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'oxygen-facial': [
    'Avoid heavy makeup for 12 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'gold-facial': [
    'Avoid heavy makeup for 12 hours to let your skin breathe.',
    'Avoid hot showers, saunas, or steam rooms for 24 hours.',
    'Use gentle cleansers and moisturizers.',
    'Always apply broad-spectrum SPF 30+ daily, even on cloudy days.',
    'Stay hydrated to maintain that fresh glow!'
  ],
  'slimming-treatment': {
    body: [
      'Do not eat for 1 hour after the session.',
      'Shower after 4–6 hours (avoid very hot water).',
      'Drink at least 1.5L of water within the day to support lymphatic drainage.',
      'Avoid alcohol for 48 hours.',
      'No sauna, hot springs, steam rooms, or strenuous exercise for 3 days.',
      'Avoid cold or very spicy foods; follow a low-fat, low-starch, low-sugar diet for the next 48–72 hours.',
      'Do at least 20 minutes of light–moderate exercise (e.g., brisk walking) on the same day to stimulate lymph detox.',
    ],
    face: [
      'Avoid washing face with overheated water for 3 days',
      'Keep skin hydrated',
      'Apply broad-spectrum SPF 30–50 daily; avoid direct sun exposure.',
      'Avoid sauna steaming, hot springs, or other strenuous exercises for 7 days',
      'It is better not to use alcohol, AHA, or other exfoliating products within 3 days',
      'Use a gentle, hydrating cleanser for the next 24–48 hours',
      'Avoid facial waxing, threading, or laser on the area for 7 days',
      'Stay well hydrated and avoid alcohol for 48 hours',
    ],
    general: [
      'Typical result range: ~1–2.5 inches loss per area within ~4 weeks (results vary by individual and treatment plan).',
      'For lasting results, maintain a balanced diet and regular exercise; follow your customized session plan (often a series of 10–12 sessions).',
    ],
    contraindications: [
      'Pregnant or breastfeeding.',
      'Heart disease or implanted heart pacemaker.',
      'Unhealed surgical wounds or currently in post-op recovery (including cosmetic surgery).',
      'Epilepsy.',
      'Severe diabetes.',
      'Hyperthyroidism.',
      'Malignant tumours.',
    ],
  },
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams();
  const service = services.find(s => s.id === serviceId);
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Service not found.</p>
      </div>
    );
  }

  const [currentMedia, setCurrentMedia] = React.useState(0);
  const media = service.media ?? [];

  const next = () =>
    setCurrentMedia((prev) => (prev + 1) % media.length);

  const prev = () =>
    setCurrentMedia((prev) => (prev - 1 + media.length) % media.length);

  // Get the aftercare entry
  const entry = aftercareById[service.id];

  // Fallback for legacy array aftercare
  const fallbackArray =
    (!entry || Array.isArray(entry)) ? (entry as string[] | undefined) : undefined;

  // right above `return (<>`
  const BASE = 'https://lalaluskinlaser.com';
  const url = `${BASE}/services/${service.id}`;

  // choose a share image (fallback to site OG)
  const ogImage = `${BASE}/og-image.jpg`;

  // derive a price for previews / schema
  const tierPrices = Array.isArray(service.tiers) ? service.tiers.map(t => Number(t.price)).filter(Boolean) : [];
  const lowestPrice = tierPrices.length ? Math.min(...tierPrices) : Number(service.price);
  type Tier = { name: string; price: number; originalPrice?: number; description?: string; badges?: {text: string; color?: 'red' | 'lavender' | 'green' | 'gray'}[] };
  const tiers: Tier[] = Array.isArray(service.tiers) ? service.tiers as Tier[] : [];
  const hasTiers = tiers.length > 0;

  const sectionedAftercare =
  entry && typeof entry === 'object' && !Array.isArray(entry)
    ? entry
    : null;


  // used to make videos loop on mute
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.6 } // plays when ~60% visible
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [currentMedia]);



  return (
    <>
      {/* ===================== HEAD ===================== */}
      <Helmet>
        <title>{service.name} | Lalalu Skin & Laser</title>
        <meta name="description" content={`Discover the benefits of ${service.name} at Lalalu Skin & Laser. ${service.description}`} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${service.name} | Lalalu Skin & Laser`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />

        {Number.isFinite(lowestPrice) && (
          <>
            <meta property="product:price:amount" content={String(lowestPrice)} />
            <meta property="product:price:currency" content="CAD" />
          </>
        )}
      </Helmet>

      {/* ===================== PAGE ===================== */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Back */}
          <Link to="/services" className="inline-flex items-center text-sm text-[#6a4c69] hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Services
          </Link>

          {/* ===================== SERVICE CARD ===================== */}
          <Card className="p-8">
            <div
              className={`grid gap-10 items-start ${
                media.length > 0 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {/* ---------- LEFT: TEXT ---------- */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h1>

                <p className="text-gray-600 mb-6">
                  {service.duration} minutes
                </p>

                <p className="text-gray-700 mb-6">
                  {service.description}
                </p>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 text-[#6a4c69] mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                {hasTiers ? (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Packages & Pricing
                    </h3>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <div className="divide-y divide-gray-100">
                        {tiers.map((tier) => {
                          const discounted =
                            typeof tier.originalPrice === 'number' &&
                            tier.originalPrice > tier.price;

                          return (
                            <div key={tier.name} className="px-4 py-4">
                              <div className="flex items-baseline justify-between">
                                <span className="font-medium">{tier.name}</span>
                                <span className="flex items-baseline gap-2">
                                  {discounted && (
                                    <span className="line-through text-gray-400">
                                      ${tier.originalPrice}
                                    </span>
                                  )}
                                  <span className={`font-semibold ${discounted ? 'text-red-500' : 'text-[#6a4c69]'}`}>
                                    ${tier.price}
                                  </span>
                                  <InlinePill badges={tier.badges} discounted={discounted} />
                                </span>
                              </div>

                              {tier.description && (
                                <p className="mt-2 text-sm text-gray-600">
                                  {tier.description}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-bold text-[#6a4c69]">
                      ${service.price}
                    </span>
                  </div>
                )}

                <Link to="/book">
                  <Button className="mt-6">Book Now</Button>
                </Link>
              </div>

              {/* ---------- RIGHT: MEDIA ---------- */}
              {media.length > 0 && (
                <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                  <div className="aspect-[9/16] bg-black rounded-xl overflow-hidden">
                    {media[currentMedia].type === 'image' ? (
                      <img
                        src={media[currentMedia].src}
                        alt={media[currentMedia].alt || service.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        src={media[currentMedia].src}
                        muted
                        autoPlay
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  {media.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
                      >
                        ‹
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
                      >
                        ›
                      </button>
                    </>
                  )}

                  {media.length > 1 && (
                    <div className="flex justify-center gap-2 mt-3">
                      {media.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentMedia(idx)}
                          className={`h-2 w-2 rounded-full ${
                            idx === currentMedia ? 'bg-[#6a4c69]' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* ===================== AFTERCARE ===================== */}
          <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Aftercare Instructions
          </h2>

          {sectionedAftercare ? (
            <>
              {/* Body */}
              {sectionedAftercare.body && sectionedAftercare.body.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Body Aftercare
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {sectionedAftercare.body.map((tip, idx) => (
                      <li key={`body-${idx}`}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Face */}
              {sectionedAftercare.face && sectionedAftercare.face.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Face Aftercare
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {sectionedAftercare.face.map((tip, idx) => (
                      <li key={`face-${idx}`}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* General */}
              {sectionedAftercare.general && sectionedAftercare.general.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    General Tips
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {sectionedAftercare.general.map((tip, idx) => (
                      <li key={`general-${idx}`}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sun */}
              {sectionedAftercare.sun && sectionedAftercare.sun.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Sun Protection
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {sectionedAftercare.sun.map((tip, idx) => (
                      <li key={`sun-${idx}`}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Activities */}
              {sectionedAftercare.activities && sectionedAftercare.activities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Activities to Avoid
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {sectionedAftercare.activities.map((tip, idx) => (
                      <li key={`activities-${idx}`}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* When to Seek Help */}
              {sectionedAftercare.whenToSeekHelp &&
                sectionedAftercare.whenToSeekHelp.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      When to Seek Help
                    </h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                      {sectionedAftercare.whenToSeekHelp.map((tip, idx) => (
                        <li key={`help-${idx}`}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Contraindications */}
              {sectionedAftercare.contraindications &&
                sectionedAftercare.contraindications.length > 0 && (
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Who Should Not Use This Treatment
                    </h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                      {sectionedAftercare.contraindications.map((tip, idx) => (
                        <li key={`contra-${idx}`}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </>
          ) : (
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {(fallbackArray ?? [
                'Avoid heavy makeup for 12–24 hours.',
                'Use SPF daily to protect your skin.',
                'Avoid saunas and intense heat for 24 hours.',
                'Use gentle skincare products.',
              ]).map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          )}
        </Card>


        </div>
      </div>
    </>
  );
};

export default ServiceDetail;