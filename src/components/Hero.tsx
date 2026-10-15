import React from 'react';
import { ArrowRight, BookOpen, Feather, Mail, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

interface HeroProps {
  onExploreWritings: () => void;
  onExploreBooks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWritings, onExploreBooks }) => {
  const { authorProfile, writings, books } = useData();
  const authorBooksCount = books.filter((b) => b.isAuthorBook).length;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EEDF] via-[#FAF7F0] to-[#FBF8F3] border-b border-[#E7DCBF]">
      {/* Decorative Traditional Border Ornamentation */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700" />

      {/* Subtle literary background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#78241C_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Literary Introduction */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#78241C] uppercase">
              <Feather className="w-4 h-4 text-amber-700" />
              <span>ಸ್ವರಚಿತ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಲೋಕ</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-600 font-normal">{authorProfile.qualification} · {authorProfile.designation}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-literary tracking-tight text-[#2B1713] leading-tight">
              ಅಕ್ಷರದ ಬೆಳಕಿನಲ್ಲಿ <br />
              <span className="text-[#87271E] underline decoration-amber-400/60 decoration-wavy decoration-2">
                ಮಣ್ಣಿನ ಕಂಪು ಮತ್ತು ಮಾನವೀಯ
              </span>{' '}
              ಸಂಬಂಧಗಳ ಪಯಣ
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-serif max-w-2xl">
              ನಮಸ್ಕಾರ! ನಾನು <strong>{authorProfile.name}</strong>, {authorProfile.qualification} ಪದವೀಧರ,
              ವೃತ್ತಿಯಲ್ಲಿ {authorProfile.designation}. ಪ್ರಕೃತಿ, ಭೂಮಿ, ಮುಗ್ಧ ಜನರ ಜೀವನಾನುಭವ ಹಾಗೂ ಸಮಾಜದ
              ನೋವು-ನಲಿವುಗಳನ್ನು ಅಕ್ಷರಗಳಲ್ಲಿ ಹಿಡಿದಿಡುವ ಸಣ್ಣ ಪ್ರಯತ್ನವೇ ನನ್ನ ಕಥೆ, ಲೇಖನ ಮತ್ತು ಕಾದಂಬರಿಗಳು.
            </p>

            {/* Poetic Kicker Banner */}
            <div className="p-4 rounded-lg bg-[#F3EAD5]/80 border-l-4 border-[#78241C] text-sm text-[#46231C] italic font-serif">
              "{authorProfile.literaryMotto}"
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreWritings}
                className="px-5 py-3 rounded-md bg-[#78241C] text-[#FAF2E6] font-semibold text-sm hover:bg-[#8F2E23] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>ಬರಹಗಳನ್ನು ಓದಿ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreBooks}
                className="px-5 py-3 rounded-md bg-[#E8DCBD] text-[#341F1A] font-semibold text-sm hover:bg-[#DDD0AE] border border-[#D5C49C] transition-all flex items-center gap-2"
              >
                <span>ಪ್ರಕಟಿತ ಪುಸ್ತಕಗಳು</span>
              </button>

              <a
                href={`mailto:${authorProfile.email}?subject=${encodeURIComponent('ಸಾಹಿತ್ಯಿಕ ವಿಚಾರಣೆ / ಸಂದೇಶ')}`}
                className="px-4 py-3 rounded-md bg-stone-800 text-white font-medium text-sm hover:bg-stone-900 transition-colors flex items-center gap-2 shadow-xs"
              >
                <Mail className="w-4 h-4 text-amber-300" />
                <span>ಇಮೇಲ್ ಸಂಪರ್ಕ</span>
              </a>
            </div>

            {/* Unboxed Stats Row (Zero-pill rule compliant) */}
            <div className="pt-6 border-t border-[#E3D4B6] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-stone-700">
              <div>
                <strong className="font-bold text-base text-[#78241C]">{authorBooksCount}+</strong>{' '}
                ಪ್ರಕಟಿತ ಕೃತಿಗಳು
              </div>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <div>
                <strong className="font-bold text-base text-[#78241C]">{writings.length}+</strong>{' '}
                ಕಥೆ & ಲೇಖನಗಳು
              </div>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <div>
                <strong className="font-bold text-base text-[#78241C]">ಭೂಗೋಳ & ಪರಿಸರ</strong>{' '}
                ಚಿಂತನೆಗಳು
              </div>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <div>
                <strong className="font-bold text-base text-[#78241C]">ಸ್ವರಚಿತ</strong>{' '}
                ಸಾಹಿತ್ಯ ವೇದಿಕೆ
              </div>
            </div>
          </div>

          {/* Right Column: Author Card with Visual Warmth */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-600/30 to-[#78241C]/30 rounded-2xl transform rotate-2 blur-xs" />
              
              <div className="relative bg-[#FFFDF9] rounded-xl border-2 border-[#D8C7A5] p-5 shadow-xl text-center space-y-4">
                <div className="relative mx-auto w-44 h-44 rounded-full overflow-hidden border-4 border-[#78241C] shadow-md">
                  <img
                    src={authorProfile.profilePhoto}
                    alt={authorProfile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#78241C]/90 text-[10px] text-amber-200 py-1 font-medium">
                    ಕನ್ನಡ ಬರಹಗಾರರು
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-bold font-literary text-[#341F1A]">
                    {authorProfile.name}
                  </h2>
                  <p className="text-xs text-[#78241C] font-semibold">
                    {authorProfile.qualification}
                  </p>
                  <p className="text-xs text-stone-600">
                    {authorProfile.designation}
                  </p>
                </div>

                <div className="text-xs text-stone-600 bg-[#F5EEDF] p-3 rounded-md text-left font-serif leading-relaxed border border-[#E5D7B7]">
                  <p className="line-clamp-3">
                    "ಅಕ್ಷರಗಳ ಆರಾಧನೆ ನನ್ನ ಬದುಕಿನ ಉಸಿರು. ಮಣ್ಣಿನ ಗುಣ, ನಿಸರ್ಗದ ಸೌಂದರ್ಯ ಮತ್ತು ಜನರ ವಾಸ್ತವ ಬದುಕೇ ನನ್ನ ಲೇಖನಿಗೆ ಸ್ಫೂರ್ತಿ..."
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-200">
                  <span className="flex items-center gap-1 text-emerald-800 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    ಪುಸ್ತಕಗಳು ಲಭ್ಯ
                  </span>
                  <button
                    onClick={onExploreBooks}
                    className="text-[#78241C] font-semibold hover:underline"
                  >
                    ವಿವರ ನೋಡಿ →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
