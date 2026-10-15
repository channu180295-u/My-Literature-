import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useData } from '../context/DataContext';

export const LiteraryQuotes: React.FC = () => {
  const { quotes } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  if (!quotes || quotes.length === 0) return null;

  const currentQuote = quotes[currentIndex] || quotes[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="bg-[#421A15] text-[#FAF4E6] py-5 px-4 border-y border-[#642B23] relative">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          aria-label="ಹಿಂದಿನ ನುಡಿಮುತ್ತು"
          className="p-1.5 rounded text-amber-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-center sm:text-left flex-1 justify-center">
          <Quote className="w-6 h-6 text-amber-400 shrink-0 hidden sm:block opacity-80" />
          <div className="space-y-1 max-w-3xl">
            <p className="text-sm sm:text-base font-serif italic text-amber-100/95 leading-relaxed">
              "{currentQuote.text}"
            </p>
            <p className="text-xs text-amber-300/80 font-medium">
              — {currentQuote.author}
              {currentQuote.source ? ` (${currentQuote.source})` : ''}
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          aria-label="ಮುಂದಿನ ನುಡಿಮುತ್ತು"
          className="p-1.5 rounded text-amber-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Subtle indicator dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {quotes.map((q, idx) => (
          <button
            key={q.id || idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`ನುಡಿಮುತ್ತು ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-amber-900'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
