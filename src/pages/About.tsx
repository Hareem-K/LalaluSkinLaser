import React, { useEffect } from 'react';
import { Heart, Users, Award, Clock, Home } from 'lucide-react';
import Card from '../components/UI/Card';
import { Helmet } from 'react-helmet-async';


const About: React.FC = () => {
  useEffect(() => {
      // Scroll to the top when the component mounts
      window.scrollTo(0, 0);
  }, []);
    

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-[#6a4c69]" />,
      title: 'Personalized Care',
      description: 'Every treatment is thoughtfully tailored to your unique skin goals and concerns.'
    },
    {
      icon: <Users className="h-8 w-8 text-[#6a4c69]" />,
      title: 'Inclusive Approach',
      description: 'All ages and skin types are welcome. Everyone deserves to feel confident in their skin.'
    },
    {
      icon: <Award className="h-8 w-8 text-[#6a4c69]" />,
      title: 'Professional Standards',
      description: 'Only trusted techniques and high-quality products are used to ensure great results.'
    },
    {
      icon: <Clock className="h-8 w-8 text-[#6a4c69]" />,
      title: 'Convenient Hours',
      description: 'Open Monday to Friday from 11AM – 7PM and weekends from 12PM – 5PM to fit treatments into your schedule.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About | Lalalu Skin & Laser</title>
        <meta
          name="description"
          content="We deliver expert aesthetic care with premium products and modern equipment. Inclusive, professional, and results-driven."
        />
        <link rel="canonical" href="https://lalaluskinlaser.com/about" />

        {/* Open Graph (page-specific) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lalalu Skin & Laser" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:title" content="About Lalalu Skin & Laser" />
        <meta property="og:description" content="Inclusive, professional, and results-driven aesthetic care in Calgary." />
        <meta property="og:url" content="https://lalaluskinlaser.com/about" />
        <meta property="og:image" content="https://lalaluskinlaser.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Lalalu Skin & Laser — Calgary" />

        {/* Breadcrumbs */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lalaluskinlaser.com/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://lalaluskinlaser.com/about" }
          ]
        })}</script>

        {/* Optional: declare this as an About page */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Lalalu Skin & Laser",
          "url": "https://lalaluskinlaser.com/about",
          "description": "We deliver expert aesthetic care with premium products and modern equipment. Inclusive, professional, and results-driven."
        })}</script>

      </Helmet>

    
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#d2b9e3] via-[#b4a1d3] to-[#ece7f6] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                About Lalalu
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Your destination for professional skin care and laser treatments, 
                where relaxation meets rejuvenation
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    Lalalu Skin & Laser was founded with a simple mission: to provide a place where 
                    people can have fun, relax, and achieve their skin goals in a welcoming environment.
                  </p>
                  <p>
                    I believe that everyone deserves to feel confident in their own skin. Whether 
                    you're a teenager dealing with acne, someone looking to combat signs of aging, 
                    or simply wanting to maintain healthy, glowing skin, I am here to help.
                  </p>
                  <p>
                    With advanced equipment and high-quality products, I take pride in offering treatments 
                    that are both effective and tailored to your unique needs—always with care and attention.
                  </p>
                </div>
              </div>
              <div className="relative flex justify-center">
                <img 
                  // src="https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg"
                  src="/ServicePhotos/room1.png" 
                  alt="Spa treatment room" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#6a4c69] text-white p-6 rounded-xl shadow-lg">
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-sm opacity-90">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
            <p className="text-gray-600 mt-6">
              Curious what we use in-clinic? We trust <span className="font-medium">Circadia</span>.{' '}
              <a href="/products" className="text-[#6a4c69] hover:text-[#b4a1d3] underline">See our products</a>.
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg" 
                  alt="Facial treatment" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What We Offer
                </h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    Our comprehensive menu of services addresses a wide range of skin concerns:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#6a4c69] rounded-full mr-3"></div>
                      <span><strong>Anti-aging treatments</strong> to reduce fine lines and wrinkles</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#6a4c69] rounded-full mr-3"></div>
                      <span><strong>Acne treatments</strong> for clearer, healthier skin</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#6a4c69] rounded-full mr-3"></div>
                      <span><strong>Face contouring</strong> and skin tightening</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#6a4c69] rounded-full mr-3"></div>
                      <span><strong>Relaxing facials</strong> for maintenance and self-care</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#6a4c69] rounded-full mr-3"></div>
                      <span><strong>Advanced laser treatments</strong> for dramatic results</span>
                    </li>
                  </ul>
                  <p>
                    Services are tailored specifically for <strong>women</strong>, with a focus on comfort, care, and results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Owner Section */}
        <section className="py-20 bg-gradient-to-br from-[#b4a1d3] via-[#a085b4] to-[#6a4c69] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the Owner
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Passionate about skincare and committed to providing professional, personalized treatments from the comfort of a home-based studio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white/10 backdrop-blur-md border border-white/30 text-white p-6">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certified Expertise</h3>
                <p className="opacity-90">Professionally trained and licensed to deliver safe and effective treatments.</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border border-white/30 text-white p-6">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">One-on-One Care</h3>
                <p className="opacity-90">Each session is tailored to your unique skin goals and concerns.</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border border-white/30 text-white p-6">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Appointments</h3>
                <p className="opacity-90">Evening and weekend slots available to fit your schedule.</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border border-white/30 text-white p-6">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Home className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comfortable Environment</h3>
                <p className="opacity-90">Enjoy treatments in a calm, private, and welcoming home studio.</p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;