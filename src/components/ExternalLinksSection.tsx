import React from 'react';
import { ExternalLink, Globe, Newspaper } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ExternalLinksSection: React.FC = () => {
  const { externalLinks } = useData();

  if (!externalLinks || externalLinks.length === 0) return null;

  return (
    <section id="external" className="py-16 md:py-24 bg-[#FBF8F3] border-t border-[#E8DDCA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78241C]">
            <Newspaper className="w-4 h-4 text-amber-700" />
            <span>ಪತ್ರಿಕೆಗಳು & ಅಂತರ್ಜಾಲ ಬರಹಗಳು</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-literary text-[#2C1915]">
            ವಿವಿಧ ಪತ್ರಿಕೆಗಳಲ್ಲಿ ಪ್ರಕಟವಾದ ಲೇಖನಗಳ ಲಿಂಕ್‌ಗಳು
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-serif">
            ರಾಜ್ಯ ಮಟ್ಟದ ಪ್ರಮುಖ ದಿನಪತ್ರಿಕೆಗಳು, ಶಿಕ್ಷಣ ನಿಯತಕಾಲಿಕೆಗಳು ಮತ್ತು ಆನ್‌ಲೈನ್ ಪೋರ್ಟಲ್‌ಗಳಲ್ಲಿ
            ಪ್ರಕಟಗೊಂಡ ಲೇಖನಗಳ ನೇರ ಕೊಂಡಿಗಳು.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {externalLinks.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#E3D4B6] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Unboxed Metadata (Zero-pill compliant) */}
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-[#78241C]">
                    {item.publicationName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.category}</span>
                </div>

                <h3 className="text-lg font-bold font-literary text-[#2B1713] group-hover:text-[#78241C] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-stone-600 font-serif leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-stone-400" />
                  ಅಧಿಕೃತ ಕೊಂಡಿ
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded bg-[#F4ECDE] text-[#341F1A] hover:bg-[#78241C] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>ಲೇಖನ ಓದಲು ಕ್ಲಿಕ್ ಮಾಡಿ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
