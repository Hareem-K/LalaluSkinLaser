import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';


const BookNow: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Book an Appointment | Lalalu Skin & Laser</title>
        <meta
          name="description"
          content="Book your treatment, Hydro Glow Facial, microneedling, or and more online. Choose a time that works for you."
        />
        <link rel="canonical" href="https://lalaluskinlaser.com/book" />
        <meta name="robots" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lalalu Skin & Laser" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:title" content="Book an Appointment | Lalalu Skin & Laser" />
        <meta property="og:description" content="Reserve your skin treatment online in minutes." />
        <meta property="og:url" content="https://lalaluskinlaser.com/book" />
        <meta property="og:image" content="https://lalaluskinlaser.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Lalalu Skin & Laser — Calgary" />
        <meta property="og:locale" content="en_CA" />

        {/* Performance hints for the booking embed */}
        <link rel="preconnect" href="https://app.acuityscheduling.com" />
        <link rel="preconnect" href="https://embed.acuityscheduling.com" />
        <link rel="dns-prefetch" href="https://app.acuityscheduling.com" />
        <link rel="dns-prefetch" href="https://embed.acuityscheduling.com" />

        {/* Breadcrumbs JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lalaluskinlaser.com/" },
            { "@type": "ListItem", "position": 2, "name": "Book", "item": "https://lalaluskinlaser.com/book" }
          ]
        })}</script>
      </Helmet>


      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="relative py-20 bg-gradient-to-br from-[#d2b9e3] via-[#b7a0c7] to-[#6a4c69] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-wave.png')] opacity-10 mix-blend-soft-light bg-repeat"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
              The Experience Your Skin Has Been Waiting For
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Book now and thank yourself later
            </p>
          </div>
        </section>

        {/* Main Booking Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-2 text-[#6a4c69]">Hours</h2>
                <p className="text-gray-600">Monday – Friday</p>
                <p className="text-gray-600">11:00 AM – 7:00 PM</p>
                <p className="text-gray-600">Saturday – Sunday</p>
                <p className="text-gray-600">12:00 PM – 5:00 PM</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-2 text-[#6a4c69]">Before You Book</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Please arrive with clean skin</li>
                  <li>24-hour cancellation notice required</li>
                  <li>Late arrivals may reduce treatment time</li>
                </ul>
              </div>
            </div>

            {/* Booking Iframe */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden shadow">
                <iframe src="https://app.acuityscheduling.com/schedule.php?owner=36118242&ref=embedded_csp" title="Schedule Appointment" width="100%" height="800" frameBorder="0"></iframe>
                <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookNow;