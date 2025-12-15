import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type GalleryItem =
  | {
      type: 'image';
      src: string;
      caption?: string;
    }
  | {
      type: 'video';
      src: string;
      poster?: string;
      caption?: string;
    };


interface PhotoGalleryProps {
  items: GalleryItem[];
}


const PhotoGallery: React.FC<PhotoGalleryProps> = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () =>
    setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));

  const next = () =>
    setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  // Mobile swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div
        className="overflow-hidden rounded-2xl shadow-xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
            className="w-full h-[300px] md:h-[420px] flex items-center justify-center bg-[light-grey]"
        >
        {items[current].type === 'image' ? (
            <img
            src={items[current].src}
            alt={`Gallery item ${current + 1}`}
            className="max-w-full max-h-full object-contain transition-all duration-500"
            />
        ) : (
            <video
            src={items[current].src}
            poster={items[current].poster}
            controls
            preload="metadata"
            className="max-w-full max-h-full rounded-xl"
            />
        )}
        </div>

        {/* media caption */}
        {items[current].caption && (
            <p className="mt-4 mb-4 text-center text-sm text-gray-600 max-w-3xl mx-auto">
                {items[current].caption}
            </p>
        )}



      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === current ? 'bg-[#6a4c69]' : 'bg-gray-300'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
