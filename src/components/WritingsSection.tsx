import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  Search,
  Share2,
  Sparkles,
} from 'lucide-react';
import { ContentCategory, WritingItem } from '../types';
import { useData } from '../context/DataContext';
import { ArticleReaderModal } from './ArticleReaderModal';

export const WritingsSection: React.FC = () => {
  const { writings, likeWriting } = useData();
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWriting, setSelectedWriting] = useState<WritingItem | null>(null);

  const categories: { id: ContentCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'ಎಲ್ಲಾ ಬರಹಗಳು' },
    { id: 'story', label: 'ಕಥೆಗಳು' },
    { id: 'article', label: 'ಲೇಖನಗಳು' },
    { id: 'novel', label: 'ಕಾದಂಬರಿಗಳು' },
    { id: 'poem', label: 'ಕವನಗಳು' },
  ];

  const filteredWritings = useMemo(() => {
    return writings.filter((w) => {
      const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [writings, selectedCategory, searchQuery]);

  const handleShare = (w: WritingItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `*${w.title}* - ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅವರ ಬರಹ:\n\n"${w.excerpt}"\n\nಅಕ್ಷರ ಸಿಂಧು ತಾಣದಲ್ಲಿ ಓದಿ: ${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="writings" className="py-16 md:py-24 bg-[#FBF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78241C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ಸ್ವರಚಿತ ಕೃತಿ ವಿಭಾಗ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-literary text-[#2C1915]">
            ಕಥೆ, ಲೇಖನ & ಕಾದಂಬರಿಗಳ ಸಂಗ್ರಹ
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-serif">
            ಗ್ರಾಮೀಣ ಸೊಗಡಿನ ಕಥೆಗಳು, ಶಿಕ್ಷಣ ಚಿಂತನೆಯ ಲೇಖನಗಳು ಮತ್ತು ನೈಜ ಮಣ್ಣಿನ ಸಂವೇದನೆಯ ಬರಹಗಳನ್ನು ಓದಿ ಆನಂದಿಸಿ.
          </p>
        </div>

        {/* Filter Toolbar (Segmented Buttons + Search) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E7DCBF]">
          {/* Functional Button Segmented Category Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0E6D2] rounded-lg w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#78241C] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ಬರಹಗಳನ್ನು ಹುಡುಕಿ..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#D8C7A5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#78241C] text-stone-900"
            />
          </div>
        </div>

        {/* Writings Grid */}
        {filteredWritings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWritings.map((writing) => (
              <article
                key={writing.id}
                onClick={() => setSelectedWriting(writing)}
                className="group cursor-pointer bg-white rounded-xl border border-[#E3D4B6] hover:border-[#78241C]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Optional Image */}
                {writing.coverImage && (
                  <div className="h-48 overflow-hidden bg-stone-100 relative">
                    <img
                      src={writing.coverImage}
                      alt={writing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Unboxed Metadata (Zero-pill compliant) */}
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-[#78241C]">
                        {writing.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {writing.date}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {writing.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-literary text-[#2B1713] group-hover:text-[#78241C] transition-colors leading-snug">
                      {writing.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-stone-600 font-serif line-clamp-3 leading-relaxed">
                      {writing.excerpt}
                    </p>
                  </div>

                  {/* Card Bottom: Engagement & Action */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          likeWriting(writing.id);
                        }}
                        className="flex items-center gap-1 hover:text-rose-600 transition-colors"
                        title="ಮೆಚ್ಚುಗೆ"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>{writing.likes}</span>
                      </button>

                      <span className="flex items-center gap-1" title="ಅನಿಸಿಕೆಗಳು">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{writing.comments?.length || 0}</span>
                      </span>

                      <button
                        onClick={(e) => handleShare(writing, e)}
                        className="p-1 hover:text-emerald-700 transition-colors"
                        title="ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-semibold text-[#78241C] group-hover:underline flex items-center gap-1">
                      <span>ಸಂಪೂರ್ಣ ಓದಿ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/70 rounded-xl border border-dashed border-[#D5C2A4] p-8">
            <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">ಯಾವುದೇ ಬರಹ ಕಂಡುಬಂದಿಲ್ಲ</h3>
            <p className="text-xs text-stone-600 mt-1">
              ಬೇರೆ ಹುಡುಕು ಪದಗಳನ್ನು ಬಳಸಿ ಅಥವಾ ಎಲ್ಲಾ ವರ್ಗಗಳನ್ನು ವೀಕ್ಷಿಸಿ.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-semibold bg-[#78241C] text-white rounded hover:bg-[#8D2C22]"
            >
              ಎಲ್ಲಾ ಬರಹಗಳನ್ನು ತೋರಿಸಿ
            </button>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {selectedWriting && (
        <ArticleReaderModal
          writing={selectedWriting}
          onClose={() => setSelectedWriting(null)}
        />
      )}
    </section>
  );
};
