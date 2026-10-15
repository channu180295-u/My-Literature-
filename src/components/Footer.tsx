import React from 'react';
import { BookOpen, ExternalLink, Heart, Shield, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

interface FooterProps {
  onOpenAdmin: () => void;
  setActiveSection: (sec: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, setActiveSection }) => {
  const { authorProfile } = useData();

  const handleLink = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241310] text-[#EADBCC] pt-16 pb-12 border-t-4 border-[#78241C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded bg-[#78241C] text-amber-200 flex items-center justify-center font-bold font-literary">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-literary text-white">
                ಅಕ್ಷರ ಸಿಂಧು
              </span>
            </div>
            <p className="text-xs text-stone-400 font-serif leading-relaxed">
              ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ (ಪದವೀಧರ ಪ್ರಾಥಮಿಕ ಶಿಕ್ಷಕರು) ಅವರ ಸ್ವರಚಿತ ಕಥೆ, ಲೇಖನ, ಕಾದಂಬರಿಗಳು ಹಾಗೂ
              ಕನ್ನಡ ಸಾಹಿತ್ಯಿಕ ವಿಚಾರಗಳ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ವೇದಿಕೆ.
            </p>
            <div className="text-xs text-amber-300/80 font-serif italic">
              "{authorProfile.literaryMotto}"
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-literary text-amber-200 uppercase tracking-wide">
              ಮುಖ್ಯ ವಿಭಾಗಗಳು
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleLink('writings')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ಕಥೆಗಳು & ಲೇಖನಗಳು
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('books')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ಪ್ರಕಟಿತ ಪುಸ್ತಕ ಮಳಿಗೆ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('recommended')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ಇತರ ಶ್ರೇಷ್ಠ ಲೇಖಕರ ಪುಸ್ತಕಗಳು
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('external')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆಗಳು
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('media')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ಫೋಟೋ & ವೀಡಿಯೋ ಸಂಗ್ರಹ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Books for Sale */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-literary text-amber-200 uppercase tracking-wide">
              ಜನಪ್ರಿಯ ಪುಸ್ತಕಗಳು
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleLink('books')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ಅಕ್ಷರ ತಪಸ್ವಿ (ಕಥಾಸಂಕಲನ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('books')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ತರಗತಿಯ ನೆರಳು-ಬೆಳಕು (ಶಿಕ್ಷಣ ಲೇಖನಗಳು)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('books')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ಮಣ್ಣಿನ ಮಗನ ಸಂಕಲ್ಪ (ಕಾದಂಬರಿ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('books')}
                  className="hover:text-amber-300 transition-colors"
                >
                  ಹಳ್ಳಿಯ ಹಾಡು ಮತ್ತು ಇತರ ಕಥೆಗಳು
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-literary text-amber-200 uppercase tracking-wide">
              ಸಂಪರ್ಕ & ನಿರ್ವಹಣೆ
            </h4>
            <p className="text-xs text-stone-400">
              ಸಂಪರ್ಕ ಇಮೇಲ್: <a href={`mailto:${authorProfile.email}`} className="text-amber-300 hover:underline">{authorProfile.email}</a>
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-800 text-amber-300 text-xs hover:bg-stone-700 transition-colors border border-stone-700"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>ಅಡ್ಮಿನ್ ನಿರ್ವಹಣಾ ಪ್ಯಾನೆಲ್</span>
              </button>
            </div>
            <div className="text-[11px] text-stone-500">
              ವೆಬ್‌ಸೈಟ್‌ನ ಎಲ್ಲಾ ಅಂಶಗಳನ್ನು ಅಡ್ಮಿನ್‌ನಲ್ಲಿ ಸುಲಭವಾಗಿ ಬದಲಾಯಿಸಬಹುದು.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} ಅಕ್ಷರ ಸಿಂಧು · ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅವರ ಅಧಿಕೃತ ಸಾಹಿತ್ಯಿಕ ತಾಣ.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>ಕನ್ನಡ ನಾಡು-ನುಡಿಯ ಪ್ರೀತಿಯೊಂದಿಗೆ ರಚಿತ</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
