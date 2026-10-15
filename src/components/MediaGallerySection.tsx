import React, { useState } from 'react';
import { Camera, Film, Image as ImageIcon, MapPin, Play, X } from 'lucide-react';
import { MediaItem } from '../types';
import { useData } from '../context/DataContext';

export const MediaGallerySection: React.FC = () => {
  const { media } = useData();
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const filteredMedia = media.filter((m) => {
    if (filter === 'all') return true;
    return m.type === filter;
  });

  return (
    <section id="media" className="py-16 md:py-24 bg-[#FAF6EE] border-t border-[#E7DCBF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78241C]">
            <Camera className="w-4 h-4 text-amber-700" />
            <span>ದೃಶ್ಯ-ಶ್ರಾವ್ಯ ದಾಖಲೆಗಳು</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-literary text-[#2C1915]">
            ಫೋಟೋ & ವೀಡಿಯೋ ಗ್ಯಾಲರಿ
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-serif">
            ಸಾಹಿತ್ಯ ಸಮ್ಮೇಳನಗಳು, ಉಪನ್ಯಾಸಗಳು, ಪುಸ್ತಕ ಬಿಡುಗಡೆ ಸಮಾರಂಭಗಳು ಹಾಗೂ ಶಾಲಾ ಕಾರ್ಯಕ್ರಮಗಳ
            ವಿಶೇಷ ಕ್ಷಣಚಿತ್ರಗಳು.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-[#EFE6D4] rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-[#78241C] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              ಎಲ್ಲವೂ ({media.length})
            </button>
            <button
              onClick={() => setFilter('photo')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                filter === 'photo'
                  ? 'bg-[#78241C] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              ಫೋಟೋಗಳು
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                filter === 'video'
                  ? 'bg-[#78241C] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              ವೀಡಿಯೋಗಳು
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group cursor-pointer bg-white rounded-xl border border-[#E3D4B6] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-stone-100 overflow-hidden">
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#78241C] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-1 fill-white" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  {item.type === 'video' ? (
                    <>
                      <Film className="w-3 h-3 text-amber-400" />
                      <span>ವೀಡಿಯೋ</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 text-amber-400" />
                      <span>ಫೋಟೋ</span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>{item.date}</span>
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {item.location}
                    </span>
                  )}
                </div>

                <h3 className="font-bold font-literary text-sm text-[#2B1713] group-hover:text-[#78241C] transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-xs text-stone-600 font-serif line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-4xl bg-stone-900 rounded-xl overflow-hidden shadow-2xl border border-stone-800 text-white">
            <div className="p-4 flex items-center justify-between border-b border-stone-800 bg-stone-950">
              <h4 className="font-bold text-sm sm:text-base font-literary truncate">
                {activeMedia.title}
              </h4>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-black flex items-center justify-center min-h-[300px] max-h-[70vh]">
              {activeMedia.type === 'video' ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={activeMedia.url}
                    title={activeMedia.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <img
                  src={activeMedia.url}
                  alt={activeMedia.title}
                  className="max-h-[65vh] w-auto mx-auto object-contain"
                />
              )}
            </div>

            <div className="p-4 bg-stone-950 border-t border-stone-800 text-xs sm:text-sm text-stone-300 space-y-1">
              <p>{activeMedia.description || activeMedia.title}</p>
              <div className="flex items-center gap-4 text-xs text-stone-500">
                <span>ದಿನಾಂಕ: {activeMedia.date}</span>
                {activeMedia.location && <span>ಸ್ಥಳ: {activeMedia.location}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
