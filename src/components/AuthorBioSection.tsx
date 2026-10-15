import React from 'react';
import { Award, BookOpen, GraduationCap, Mail, User } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AuthorBioSection: React.FC = () => {
  const { authorProfile } = useData();

  return (
    <section id="about" className="py-16 md:py-24 bg-[#FBF8F3] border-t border-[#E8DDCA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Author Image & Fast Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-2xl overflow-hidden border-4 border-[#78241C] shadow-xl">
                <img
                  src={authorProfile.profilePhoto}
                  alt={authorProfile.name}
                  className="w-full aspect-4/5 object-cover"
                />
              </div>

              <div className="mt-4 p-4 rounded-xl bg-white border border-[#E3D4B6] shadow-2xs space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-stone-700">
                  <GraduationCap className="w-4 h-4 text-[#78241C] shrink-0" />
                  <span><strong>ವಿದ್ಯಾರ್ಹತೆ:</strong> {authorProfile.qualification}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-700">
                  <BookOpen className="w-4 h-4 text-[#78241C] shrink-0" />
                  <span><strong>ವೃತ್ತಿ:</strong> {authorProfile.designation}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-700">
                  <Mail className="w-4 h-4 text-[#78241C] shrink-0" />
                  <span><strong>ಸಂಪರ್ಕ ಇಮೇಲ್:</strong> {authorProfile.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78241C]">
              <User className="w-4 h-4 text-amber-700" />
              <span>ಲೇಖಕರ ಆತ್ಮೀಯ ಪರಿಚಯ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-literary text-[#2B1713] leading-snug">
              {authorProfile.name}
              <span className="block text-lg sm:text-xl font-normal text-amber-900 mt-1 font-serif">
                {authorProfile.qualification} · {authorProfile.designation}
              </span>
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-stone-700 font-serif text-base sm:text-lg leading-relaxed">
              {authorProfile.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Achievements List - Only rendered if author adds any in admin */}
            {authorProfile.achievements && authorProfile.achievements.length > 0 && (
              <div className="pt-4 border-t border-[#E3D4B6] space-y-3">
                <h3 className="text-sm font-bold font-literary text-[#2B1713] uppercase tracking-wide flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>ಸಾಹಿತ್ಯಿಕ & ಶೈಕ್ಷಣಿಕ ಪುರಸ್ಕಾರಗಳು:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {authorProfile.achievements.map((ach, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white border border-[#E7DCBF] text-xs text-stone-800 flex items-start gap-2 shadow-2xs"
                    >
                      <span className="text-[#78241C] font-bold">✓</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Email Connect Button */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={`mailto:${authorProfile.email}`}
                className="px-5 py-2.5 rounded-md bg-[#78241C] text-white text-xs font-semibold hover:bg-[#8D2C22] transition-colors flex items-center gap-2 shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>ಇಮೇಲ್ ಮೂಲಕ ಸಂದೇಶ ಕಳುಹಿಸಿ ({authorProfile.email})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
