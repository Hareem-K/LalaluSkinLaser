// Blog.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import PostRenderer from '../components/blog/PostRenderer';
import { getSortedPosts } from '../data/blog';
import { Helmet } from 'react-helmet-async';

const Blog: React.FC = () => {
  const posts = useMemo(getSortedPosts, []);
  const { slug } = useParams<{ slug?: string }>();

  // pick initial from slug (or newest)
  const initial = slug ? posts.find(p => p.slug === slug) ?? posts[0] : posts[0];
  const [active, setActive] = useState(initial);

  // keep state in sync when slug changes (e.g., user refreshes or clicks a link)
  useEffect(() => {
    setActive(initial);
    // optional: scroll to top on post change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const isActive = (id: string) => active?.id === id;

  // SEO bits (safe fallbacks when no cover image)
  const siteName = 'Lalalu Skin & Laser';
  const baseUrl = 'https://lalaluskinlaser.com';
  const url = `${baseUrl}${active?.slug ? `/blog/${active.slug}` : '/blog'}`;
  const description =
    active?.excerpt ||
    'Expert tips, treatment deep-dives, and real results from Lalalu Skin & Laser in Calgary.';
  const image = active?.coverImage || `${baseUrl}/og-image.jpg`;

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
      ...(active
        ? [{ '@type': 'ListItem', position: 3, name: active.title, item: url }]
        : []),
    ],
  };

  const activePostSchema = active
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: active.title,
        description,
        image,
        datePublished: active.createdAt,
        dateModified: active.updatedAt || active.createdAt,
        author: { '@type': 'Organization', name: siteName },
        mainEntityOfPage: url,
      }
    : null;

  return (
    <>
      <Helmet>
        <title>Lalalu Skin & Laser | lalalu Blog</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />

        {/* Open Graph (match site-wide style) */}
        <meta property="og:type" content={active ? 'article' : 'website'} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:title" content="Lalalu Skin & Laser | lalalu Blog"  />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Lalalu Skin & Laser — Calgary" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lalalu Skin & Laser | lalalu Blog" />


        {/* JSON-LD (light) */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
        {activePostSchema && (
          <script type="application/ld+json">{JSON.stringify(activePostSchema)}</script>
        )}
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-[#6a4c69] via-[#b085b9] to-[#e4d2ec] text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Lalalu Blog</h1>
              <p className="text-white/90">Expert tips, treatment deep-dives, and real results.</p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <Card className="p-4 sticky top-24 bg-white/90 backdrop-blur border border-[#e8d9f1]">
              <div className="h-1 w-full rounded bg-gradient-to-r from-[#6a4c69] via-[#b085b9] to-[#e4d2ec] mb-4" />
              <h3 className="text-lg font-semibold text-[#6a4c69] mb-3">All Posts</h3>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-2 md:max-h-none md:overflow-visible">
                {posts.map(p => (
                  <Link
                    key={p.id}
                    to={`/blog/${p.slug}`}
                    className={[
                      "block w-full text-left p-3 rounded-xl transition-colors ring-1",
                      isActive(p.id)
                        ? "bg-[#f3e9f7] text-[#6a4c69] ring-[#d8c3e8]"
                        : "bg-white hover:bg-[#f7effa] text-gray-700 ring-[#efe4f6]"
                    ].join(" ")}
                  >
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#b085b9]" />
                      {new Date(p.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                      <span className="mx-2">•</span>
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#b085b9]" /> {p.readingMinutes} min
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </aside>

          {/* Post content */}
          <main className="lg:col-span-8 xl:col-span-9">
            <Card className="overflow-hidden border border-[#e8d9f1]">
              {active?.coverImage && (
                <img src={active.coverImage} alt={active.title} className="w-full h-72 object-cover" />
              )}
              <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{active?.title}</h1>
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(active.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" /> {active.readingMinutes} min read
                  {!!active.tags?.length && (
                    <>
                      <span className="mx-2">•</span>
                      <Tag className="w-4 h-4 mr-1" />
                      <span className="space-x-1">
                        {active.tags.map(t => <span key={t} className="inline-block">#{t}</span>)}
                      </span>
                    </>
                  )}
                </div>

                <PostRenderer blocks={active.blocks} />

                <div className="mt-10">
                  <Link to="/book">
                    <Button size="lg" className="px-8 py-3.5 text-lg w-full sm:w-auto">
                      <span className="inline-flex items-center">
                        Book Your Treatment
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
};

export default Blog;
