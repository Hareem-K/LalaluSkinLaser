// src/components/blog/PostRenderer.tsx
import React from 'react';
import Card from '../UI/Card';
import InstagramEmbed from './InstagramEmbed';
import type { BlogBlock } from '../../data/blog';

const H2: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24">{children}</h2>
);
const H3: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-3 scroll-mt-24">{children}</h3>
);

const PostRenderer: React.FC<{ blocks: BlogBlock[] }> = ({ blocks }) => {
  return (
    <article className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'heading':
            return b.level === 3 ? <H3 key={i}>{b.text}</H3> : <H2 key={i}>{b.text}</H2>;
          case 'paragraph':
            return <p key={i} className="text-gray-700 leading-8">{b.text}</p>;
          case 'image': {
            const sizeClasses = {
              small: 'max-w-md mx-auto',
              medium: 'max-w-2xl mx-auto',
              large: 'w-full'
            };

            return (
              <figure key={i} className={`my-8 ${sizeClasses[b.size || 'large']}`}>
                <Card className="overflow-hidden">
                  <img
                    src={b.src}
                    alt={b.alt}
                    className={`w-full ${b.aspect === 'square' ? 'aspect-square object-cover' : 'object-cover'}`}
                  />
                </Card>
                {b.caption && (
                  <figcaption className="text-sm text-gray-500 mt-2 text-center">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          case 'quote':
            return (
              <blockquote key={i} className="border-l-4 border-[#6a4c69] pl-4 italic text-gray-800 my-6">
                {b.text}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={i} className="list-disc pl-6 text-gray-700 space-y-1">
                {b.items.map((it, idx) => <li key={idx}>{it}</li>)}
              </ul>
            );
          case 'instagram':
            return <InstagramEmbed key={i} url={b.url} title={b.title} />;
          default:
            return null;
        }
      })}
    </article>
  );
};

export default PostRenderer;
