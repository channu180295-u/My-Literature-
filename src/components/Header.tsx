import React, { useState } from 'react';
import { BookOpen, Feather, Mail, Menu, ShieldCheck, X } from 'lucide-react';
import { useData } from '../context/DataContext';

interface HeaderProps {
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmin,
  activeSection,
  setActiveSection,
}) => {
  const { authorProfile, isAdminLoggedIn } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'ಮುಖಪುಟ' },
    { id: 'writings', label: 'ಸಾಹಿತ್ಯ & ಲೇಖನಗಳು' },
    { id: 'books', label: 'ಪುಸ್ತಕ ಮಳಿಗೆ' },
    { id: 'recommended', label: 'ಶಿಫಾರಸು ಕೃತಿಗಳು' },
    { id: 'external', label: 'ಪತ್ರಿಕಾ ಬರಹಗಳು' },
    { id: 'media', label: 'ಚಿತ್ರ-ವೀಡಿಯೋ' },
    { id: 'about', label: 'ಲೇಖಕರ ಪರಿಚಯ' },
    { id: 'contact', label: 'ಸಂಪರ್ಕ' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E7DCBF] shadow-xs">
      {/* Top Banner Notice - Literary Welcome */}
      <div className="bg-[#78241C] text-[#FBEED7] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold">ಅಕ್ಷರ ತಪಸ್ವಿ:</span>
            <span className="truncate">{authorProfile.literaryMotto}</span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-[11px]">
            <a
              href={`mailto:${authorProfile.email}`}
              className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>ಇಮೇಲ್: {authorProfile.email}</span>
            </a>
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 bg-amber-400 text-stone-900 font-semibold px-2 py-0.5 rounded-sm hover:bg-amber-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ಅಡ್ಮಿನ್ ಸಕ್ರಿಯ</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="text-amber-200 hover:text-white underline underline-offset-2"
              >
                ಅಡ್ಮಿನ್ ಪ್ರವೇಶ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Writer Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group"
          >
            <div className="w-12 h-12 rounded-lg bg-[#78241C] text-[#F9EED4] flex items-center justify-center shadow-md group-hover:bg-[#8D2B22] transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold font-literary tracking-tight text-[#341F1A]">
                  ಅಕ್ಷರ ಸಿಂಧು
                </span>
                <span className="text-xs text-[#8D2B22] font-medium hidden sm:inline">
                  ಸಾಹಿತ್ಯ ಲೋಕ
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                {authorProfile.name} ·{' '}
                <span className="text-amber-900 font-normal">
                  {authorProfile.qualification} · {authorProfile.designation}
                </span>
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors py-1 ${
                  activeSection === item.id
                    ? 'text-[#78241C] font-semibold border-b-2 border-[#78241C]'
                    : 'text-stone-700 hover:text-[#78241C]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('books')}
              className="px-4 py-2 text-xs font-semibold rounded-md bg-[#78241C] text-[#FAF2E6] hover:bg-[#8E2C22] shadow-xs transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>ಪುಸ್ತಕ ಖರೀದಿಸಿ</span>
            </button>

            <button
              onClick={onOpenAdmin}
              title="ಅಡ್ಮಿನ್ ನಿರ್ವಹಣೆ"
              className="p-2 text-stone-600 hover:text-[#78241C] hover:bg-stone-100 rounded-md transition-colors"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => handleNavClick('books')}
              className="px-3 py-1.5 text-xs font-semibold rounded bg-[#78241C] text-white"
            >
              ಪುಸ್ತಕಗಳು
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 hover:text-[#78241C] hover:bg-stone-100"
              aria-label="ಮುಖ್ಯ ಮೆನು"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF6EE] border-b border-[#E7DCBF] px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-[#78241C] text-white font-semibold'
                  : 'text-stone-800 hover:bg-[#EFE8D8]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#E3D6B5] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md border border-[#78241C] text-[#78241C] hover:bg-[#F3ECE0]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್ (ಲಾಗಿನ್ / ನಿರ್ವಹಣೆ)</span>
            </button>
            <a
              href={`mailto:${authorProfile.email}`}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md bg-[#78241C] text-white hover:bg-[#8D2C22]"
            >
              <Mail className="w-4 h-4" />
              <span>ಇಮೇಲ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
