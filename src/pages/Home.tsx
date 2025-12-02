import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, Award, ArrowRight } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { Helmet } from 'react-helmet-async';

/* ---- tiny reveal-on-scroll hook ---- */
const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.unobserve(el); // reveal once
        }
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
};

/* ---- wrapper that applies the reveal animation ---- */
const RevealSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out will-change-transform
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </div>
  );
};

const ReadMore: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = React.useState(false);
  const limit = 300; // characters before cutting off (change as needed)

  if (text.length <= limit) return <p>"{text}"</p>;

  return (
    <div>
      <p>
        "{expanded ? text : text.slice(0, limit) + '...'}"
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-[#6a4c69] font-medium mt-2 underline"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};



const Home: React.FC = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Star className="h-8 w-8 text-[#6a4c69]" />,
      title: 'Premium Treatments',
      description: 'State-of-the-art equipment and professional-grade products for optimal results.'
    },
    {
      icon: <Clock className="h-8 w-8 text-[#6a4c69]" />,
      title: 'Flexible Hours',
      description: 'Open Monday to Friday from 11AM – 7PM and weekends from 12PM – 5PM to fit your schedule.'
    },
    {
      icon: <Users className="h-8 w-8 text-[#6a4c69]" />,
      title: 'All Ages Welcome',
      description: 'Treatments suitable for teenagers to mature adults, customized for your needs.'
    },
    {
      icon: <Award className="h-8 w-8 text-[#6a4c69]" />,
      title: 'Expert Care',
      description: 'Professional aestheticians dedicated to helping you achieve your skin goals.'
    }
  ];

  const testimonials = [
    {
      name: 'Renata J.',
      text: 'I had a wonderful experience at Lalalu Skin & Laser for my Morpheus8 RF Microneedling treatment. Asia was extremely knowledgeable and made me feel comfortable throughout the entire appointment. She explained every step clearly and even offered helpful advice for my hair concerns. I really appreciated the extra massage she provided, such a thoughtful touch that made the experience even better. The salon is beautiful and clean, and I loved that there was easy, convenient parking available, which made the visit stress-free. I will definitely be coming back, and I highly recommend Asia to my friends!',
      rating: 5
    },
    {
      name: 'Mariya Z.',
      text: 'I had an absolutely exceptional HydraFacial experience! From start to finish, the expert was not only incredibly skilled but also took the time to explain each step of the process in detail. Every product used was introduced with a clear explanation of its purpose and benefits, which made me feel both informed and confident in the treatment. What really stood out was the depth of knowledge shared about skin health — I learned so much about my own skin type, common issues, and practical ways to improve it. It felt more like a personalized skin consultation than just a facial, and I left feeling refreshed, educated, and glowing! Highly recommend if youre looking for results, professionalism, and a truly knowledgeable skincare expert. Will definitely be returning!',
      rating: 5
    },
    {
      name: 'Verified Client.',
      text: 'Hats off to the details on the body and face slimming treatment by Asia! She is so kind and gentle, plus explains every procedure along the journey! I have had 7 sessions for my stomach and 2 for face slimming. She has the best discounts on body contouring. Asia has deep knowledge of the treatment and uses gentle heat energy and ultrasound cavitation with radio frequency to break down the fat cells build over the years. I have lost almost 4 kgs since we started the treatment and 3 inches of my hanging belly! Overall very happy customer and will try to get my love handles slimming treatment done next.',
      rating: 5

    }
  ];

  return (
    <>
      <Helmet>
        <title>Lalalu Skin & Laser – Relax, Rejuvenate, Renew</title>
        <meta
          name="description"
          content="HydraFacials, microneedling (RF), laser skin treatments, and premium facials in Calgary. Book online at Lalalu Skin & Laser."
        />
        <link rel="canonical" href="https://lalaluskinlaser.com/" />
        <meta name="robots" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lalalu Skin & Laser" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:title" content="Lalalu Skin & Laser – Relax, Rejuvenate, Renew" />
        <meta property="og:description" content="HydraFacials, microneedling (RF), laser skin treatments, and premium facials in Calgary. Book online at Lalalu Skin & Laser." />
        <meta property="og:url" content="https://lalaluskinlaser.com/" />
        <meta property="og:image" content="https://lalaluskinlaser.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Lalalu Skin & Laser — Calgary" />
        <meta property="og:image:secure_url" content="https://lalaluskinlaser.com/og-image.jpg" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Hreflang */}
        <link rel="alternate" href="https://lalaluskinlaser.com/" hrefLang="en-CA" />
        <link rel="alternate" href="https://lalaluskinlaser.com/" hrefLang="x-default" />

        {/* Organization JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Lalalu Skin & Laser",
          "url": "https://lalaluskinlaser.com/",
          "logo": "https://lalaluskinlaser.com/logo.png"
        })}</script>
      </Helmet>


      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#6a4c69] via-[#b085b9] to-[#e4d2ec] bg-[length:200%_200%] bg-[position:0%_50%] bg-no-repeat py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg')] bg-cover bg-center opacity-10"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Relax, Rejuvenate, <span className="text-white">Renew</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto animate-slide-up">
              Experience professional skin care and laser treatments in a luxurious, relaxing environment designed for your ultimate wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/book">
                <Button
                  size="lg"
                  className="px-8 py-3.5 text-lg w-full sm:w-auto"
                >
                  <span className="inline-flex items-center">
                    Book Your Treatment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outlineWhite" 
                  size="lg"
                  className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-[#6a4c66] w-full sm:w-auto"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </section>


        {/* Special Offers */}
        <section className="py-16 bg-gradient-to-r from-[#6a4c69] to-[#a085b4] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Limited Time Offers</h2>
              <p className="text-xl opacity-90">Take advantage of these exclusive deals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">BOGO 20% Off</h3>
                <p className="mb-4">Buy one service, get the second 20% off</p>
                <div className="text-2xl font-bold">All Services</div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">B2GO 50% Off</h3>
                <p className="mb-4">Buy two services, get the third 50% off</p>
                <div className="text-2xl font-bold">All Services</div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">B3GO Free</h3>
                <p className="mb-4">Buy three services, get the fourth one free</p>
                <div className="text-2xl font-bold">All Services</div>
                
              </Card> */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Special</h3>
                <p className="mb-4">HydraFacial + Microneedling</p>
                <div className="text-2xl font-bold">$150</div>
                <p className="mt-2 text-sm opacity-90"><a href="/book" className="underline">Book Now</a></p>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">BOGO</h3>
                <p className="mb-4">Buy one service, get the second 20% off when booked together as a package</p>
                <p className="mt-2 text-sm opacity-90">Package Deal • <a href="/book" className="underline">Book Now</a></p>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">B2GO</h3>
                <p className="mb-4">Buy two services, get the third 50% off when booked together as a package</p>
                <p className="mt-2 text-sm opacity-90">Package Deal • <a href="/book" className="underline">Book Now</a></p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Free Add-On</h3>
                <p className="mb-4">Complimentary Dermaplaning or Face Cupping add-on</p>
                <div className="text-2xl font-bold">With Any Facial</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <RevealSection>
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose Lalalu?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  We're committed to providing exceptional care in a welcoming environment
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Popular Services */}
        <RevealSection>
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Popular Treatments
                </h2>
                <p className="text-xl text-gray-600">
                  Our most loved services for radiant, healthy skin
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card hover className="overflow-hidden">
                  <img 
                    src="/ServicePhotos/microneedling.png" 
                    alt="Microneedling" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Morpheus8 RF Microneedling</h3>
                    <p className="text-gray-600 mb-4">Tighten skin and smooth texture with RF-powered microneedling.</p>
                    <div className="flex justify-between items-center">
                      <Link to="/book">
                        <Button size="sm">Book Now</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
                
                <Card hover className="overflow-hidden">
                  <img 
                    src="/ServicePhotos/microdermabrasion.png"  
                    alt="Microdermabrasion" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Microdermabrasion</h3>
                    <p className="text-gray-600 mb-4">Gentle exfoliation for smoother, more radiant skin.</p>
                    <div className="flex justify-between items-center">
                      <Link to="/book">
                        <Button size="sm">Book Now</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
                
                <Card hover className="overflow-hidden">
                  <img 
                    src="/Circadia/mask-2.jpg" 
                    alt="Hydrafacial" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">HydraFacial</h3>
                    <p className="text-gray-600 mb-4">Deeply cleanses, exfoliate, and hydrates in one gentle treatment.</p>
                    <div className="flex justify-between items-center">
                      <Link to="/book">
                        <Button size="sm">Book Now</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="text-center mt-12">
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    <span className="inline-flex items-center">
                      View All Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* Testimonials */}
        <RevealSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Real experiences from our valued clients
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-gray-600 mb-4 italic">
                    <ReadMore text={testimonial.text} />
                  </div>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        </RevealSection>

        {/* Circadia Feature — photo background + overlay + logo + product shot */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl">
              {/* Background image with brand gradient overlay */}
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: "url('/Circadia/PreProFacial10.jpg')", // use any hero-y Circadia photo here
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3D]/85 via-[#2E3F73]/70 to-[#6a4c69]/60" />

              {/* Content */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 md:p-12">
                {/* Left: logo + copy */}
                <div className="text-white">
                  <img
                    src="/Circadia/circadia-logo-white.png"
                    alt="Circadia Professional Skincare"
                    className="h-10 md:h-12 mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                    loading="lazy"
                  />
                  <h3 className="text-2xl md:text-3xl font-bold">We partner with Circadia®</h3>
                  <p className="text-white/90 mt-3 max-w-xl">
                    Clinical, professional-only formulations rooted in chronobiology, designed to respect the skin barrier 
                    while delivering visible, lasting results.
                  </p>
                  <ul className="mt-5 space-y-2">
                    <li className="flex items-start">
                      <span className="mt-0.5 mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">✓</span>
                      Science-backed ingredients
                    </li>
                    <li className="flex items-start">
                      <span className="mt-0.5 mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">✓</span>
                      Barrier-friendly, gentle actives
                    </li>
                    <li className="flex items-start">
                      <span className="mt-0.5 mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">✓</span>
                      Professional-only protocols & home-care
                    </li>
                  </ul>

                  <div className="mt-6">
                    <Link to="/products">
                      <Button size="lg" className="bg-white !text-[#0F1E3D] hover:bg-gray-100">
                        Learn about Circadia
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: foreground product photo on glassy card */}
                <div className="flex justify-center md:justify-end">
                  <Card className="bg-white/90 rounded-2xl shadow-2xl p-3 md:p-4 max-w-md w-full">
                    <div className="relative w-full aspect-[4/3]">
                      <img
                        src="/Circadia/products-1.jpg"
                        alt="Circadia products"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#6a4c69] to-[#a085b4] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book your appointment today and experience the difference professional care makes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
              <Button
                size="lg"
                className="px-8 py-3.5 w-full sm:w-auto"
              >
                <span className="inline-flex items-center">
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>


              </Link>
              <Link to="/contact">
                <Button
                  variant="outlineWhite"
                  size="lg"
                  className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-[#6a4c66] w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;