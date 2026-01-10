import React, { useEffect, useState } from 'react';
import { Clock, Link, Star } from 'lucide-react';
import { services } from '../data/services';
import Card from '../components/UI/Card';
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
    <span
      className={`ml-1 inline-block rounded-full text-[10px] font-semibold px-1.5 py-0.5 ${colorClass}`}
    >
      {b?.text ?? 'Sale'}
    </span>
  );
};

const Services: React.FC = () => {
  useEffect(() => {
      // Scroll to the top when the component mounts
      window.scrollTo(0, 0);
  }, []);
    
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'facial', name: 'Facials' },
    { id: 'laser', name: 'Laser Treatments' },
    { id: 'treatment', name: 'Specialty Treatments' },
    { id: 'slimming', name: 'Body Slimming' },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Put any special full-width service IDs here
  const specialServiceIds = new Set(['slimming-treatment']);
  const normalServices = filteredServices.filter(
    (s) => !specialServiceIds.has(s.id)
  );
  const specialServices = filteredServices.filter((s) =>
    specialServiceIds.has(s.id)
  );

  return (
    <>
      <Helmet>
        <title>Services & Pricing | Lalalu Skin & Laser</title>
        <meta
          name="description"
          content="Explore facials, HydraFacials, RF microneedling, BB Glow, and advanced laser treatments. Transparent pricing and easy online booking."
        />
        <link rel="canonical" href="https://lalaluskinlaser.com/services" />
        <meta name="robots" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lalalu Skin & Laser" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:title" content="Services & Pricing | Lalalu Skin & Laser" />
        <meta property="og:description" content="Facials, HydraFacials, RF microneedling, BB Glow, and laser. Transparent pricing." />
        <meta property="og:url" content="https://lalaluskinlaser.com/services" />
        <meta property="og:image" content="https://lalaluskinlaser.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Lalalu Skin & Laser — Calgary" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD: breadcrumbs */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lalaluskinlaser.com/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://lalaluskinlaser.com/services" }
          ]
        })}</script>

        {/* JSON-LD: list of services (name + URL + lowest price if available) */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": services.map((s, idx) => {
            // compute a lowest price for tiers if present
            const tierPrices = Array.isArray(s.tiers) ? s.tiers.map(t => Number(t.price)).filter(Number.isFinite) : [];
            const lowest = tierPrices.length ? Math.min(...tierPrices) : (Number.isFinite(Number(s.price)) ? Number(s.price) : undefined);

            const serviceJson: any = {
              "@type": "Service",
              "name": s.name,
              "url": `https://lalaluskinlaser.com/services/${s.id}`
            };
            if (lowest != null) {
              serviceJson.offers = {
                "@type": "Offer",
                "price": lowest,
                "priceCurrency": "CAD",
                "availability": "https://schema.org/InStock",
                "url": "https://lalaluskinlaser.com/book"
              };
            }
            return {
              "@type": "ListItem",
              "position": idx + 1,
              "item": serviceJson
            };
          })
        })}</script>
      </Helmet>


      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#d2b9e3] via-[#b4a1d3] to-lavender-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Professional treatments designed to help you achieve your skin
              goals
            </p>
          </div>
        </section>

        {/* Special Offers Banner */}
        <section className="bg-gradient-to-r from-[#6a4c69] to-[#a085b4] text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              {/* <div>
                <p className="font-semibold">💫 BOGO 20% Off</p>
                <p className="text-sm opacity-90">
                  Buy one service, get second 20% off
                </p>
              </div>
              <div>
                <p className="font-semibold">✨ B2GO 50% off</p>
                <p className="text-sm opacity-90">
                  Buy two services, get the third 50% off
                </p>
              </div>
              <div>
                <p className="font-semibold">💫 B3GO free</p>
                <p className="text-sm opacity-90">
                  Buy three services, get the fourth free
                </p>
              </div> */}
              <div>
                <p className="font-semibold">💫 Special</p>
                <p className="text-sm opacity-90">
                  HydraFacial + Microneedling - $150
                </p>
              </div>
              <div>
                <p className="font-semibold">💫 BOGO</p>
                <p className="text-sm opacity-90">
                  Buy one service, get the second 20% off when booked together as a package
                </p>
              </div>
              <div>
                <p className="font-semibold">💫 B2GO</p>
                <p className="text-sm opacity-90">
                  Buy two services, get the third 50% off when booked together as a package
                </p>
              </div>
              <div>
                <p className="font-semibold">✨ Add Dermaplaning or Face Cupping</p>
                <p className="text-sm opacity-90">To any facial for just $20</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search + Category Filters */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md mx-auto block mb-6 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#6a4c69] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-[#d2b9e3] hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
            {normalServices.map((service) => (
              <Card key={service.id} hover className="overflow-hidden h-full flex flex-col">
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 flex-1">
                        {service.name}
                      </h3>
                      <div className="text-right ml-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration} min
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 text-[#6a4c69] mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                    <p className="text-sm text-[#a085b4] font-medium">
                      View availability on the{' '}
                      <a href="/book" className="underline">
                        booking page
                      </a>
                    </p>

                    {service.tiers && service.tiers.length > 0 ? (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          {service.tiers.map((tier) => (
                            <div key={tier.name} className="flex items-baseline justify-between text-sm">
                              <span className="text-gray-700">{tier.name}</span>
                              <span className="flex items-baseline gap-2">
                                {typeof tier.originalPrice === 'number' &&
                                  tier.originalPrice > tier.price && (
                                    <span className="text-gray-400 line-through">
                                      ${tier.originalPrice}
                                    </span>
                                  )}
                                <span
                                  className={`font-semibold ${
                                    typeof tier.originalPrice === 'number' &&
                                    tier.originalPrice > tier.price
                                      ? 'text-red-500'
                                      : 'text-[#6a4c69]'
                                  }`}
                                >
                                  ${tier.price}
                                </span>
                                <InlinePill
                                  badges={tier.badges}
                                  discounted={
                                    typeof tier.originalPrice === 'number' &&
                                    tier.originalPrice > tier.price
                                  }
                                />
                              </span>
                            </div>
                          ))}
                        </div>

                        <a
                          href={`/services/${service.id}`}
                          className="inline-flex items-center px-4 py-2 border border-[#6a4c69] text-[#6a4c69] rounded-full font-semibold text-sm hover:bg-[#6a4c69] hover:text-white transition-colors duration-200"
                        >
                          <Link className="h-4 w-4 mr-2" />
                          More Details
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <a
                          href={`/services/${service.id}`}
                          className="inline-flex items-center px-4 py-2 border border-[#6a4c69] text-[#6a4c69] rounded-full font-semibold text-sm hover:bg-[#6a4c69] hover:text-white transition-colors duration-200"
                        >
                          <Link className="h-4 w-4 mr-2" />
                          More Details
                        </a>

                        <div className="flex items-baseline gap-2">
                          {typeof service.originalPrice === 'number' &&
                            service.originalPrice > service.price && (
                              <span className="text-sm text-gray-400 line-through">
                                ${service.originalPrice}
                              </span>
                            )}
                          <span
                            className={`text-lg font-bold ${
                              typeof service.originalPrice === 'number' &&
                              service.originalPrice > service.price
                                ? 'text-red-500'
                                : 'text-[#6a4c69]'
                            }`}
                          >
                            ${service.price}
                          </span>
                          <InlinePill
                            badges={service.badges}
                            discounted={
                              typeof service.originalPrice === 'number' &&
                              service.originalPrice > service.price
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Special full-width section (e.g., Body & Face Slimming) */}
        {specialServices.length > 0 && (
          <section className="pb-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {specialServices.map((service) => (
                <Card
                  key={service.id}
                  hover
                  className="overflow-hidden w-full border-2 border-[#6a4c69]/20 bg-gradient-to-r from-white via-[#f8f5fb] to-white"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {service.name}
                        </h2>
                        <p className="text-gray-600 max-w-3xl">{service.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center justify-end text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration} min
                        </div>
                      </div>
                    </div>

                    {service.benefits?.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {service.benefits.map((b, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-700">
                              <Star className="h-3 w-3 text-[#6a4c69] mr-2 mt-1" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.tiers && service.tiers.length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Packages & Pricing
                        </h3>
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                          <div className="divide-y divide-gray-100">
                            {service.tiers.map((tier) => (
                              <div
                                key={tier.name}
                                className="flex items-center justify-between px-4 py-3"
                              >
                                <span className="text-gray-800">{tier.name}</span>
                                <span className="flex items-baseline gap-2">
                                  {typeof tier.originalPrice === 'number' &&
                                    tier.originalPrice > tier.price && (
                                      <span className="text-gray-400 line-through">
                                        ${tier.originalPrice}
                                      </span>
                                    )}
                                  <span
                                    className={`font-semibold ${
                                      typeof tier.originalPrice === 'number' &&
                                      tier.originalPrice > tier.price
                                        ? 'text-red-500'
                                        : 'text-[#6a4c69]'
                                    }`}
                                  >
                                    ${tier.price}
                                  </span>
                                  <InlinePill
                                    badges={tier.badges}
                                    discounted={
                                      typeof tier.originalPrice === 'number' &&
                                      tier.originalPrice > tier.price
                                    }
                                  />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`/services/${service.id}`}
                        className="inline-flex items-center px-5 py-2.5 border border-[#6a4c69] text-[#6a4c69] rounded-full font-semibold text-sm hover:bg-[#6a4c69] hover:text-white transition-colors duration-200"
                      >
                        <Link className="h-4 w-4 mr-2" />
                        More Details
                      </a>
                      <a
                        href="/book"
                        className="inline-flex items-center px-5 py-2.5 bg-[#6a4c69] text-white rounded-full font-semibold text-sm hover:brightness-110 transition-colors duration-200"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Services;
