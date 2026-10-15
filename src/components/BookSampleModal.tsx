import React from 'react';
import { BookOpen, Check, X } from 'lucide-react';
import { Book } from '../types';

interface BookSampleModalProps {
  book: Book;
  onClose: () => void;
  onOrderNow: () => void;
}

export const BookSampleModal: React.FC<BookSampleModalProps> = ({
  book,
  onClose,
  onOrderNow,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-xl shadow-2xl border border-[#DBCAB1] overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#FAF5EA] border-b border-[#E3D4B6] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#78241C]" />
            <div>
              <h3 className="font-bold font-literary text-lg text-stone-900">
                {book.title} — ಮಾದರಿ ಓದು
              </h3>
              <p className="text-xs text-stone-500">ಆಯ್ದ ಸಾಲುಗಳು / ಮುನ್ನುಡಿಯ ನೋಟ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-stone-600 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto font-serif">
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start bg-[#FAF5EB] p-4 rounded-lg border border-[#E7DCBF]">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-24 h-32 object-cover rounded shadow-md shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold font-literary text-[#2B1713]">
                {book.title}
              </h4>
              <p className="text-xs text-stone-600 font-sans">{book.subtitle}</p>
              <p className="text-xs text-[#78241C] font-semibold font-sans">
                ಪ್ರಕಾಶನ: {book.publisher} ({book.publishedYear})
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-stone-600 font-sans">
                <span>ಪುಟಗಳು: {book.pages}</span>
                <span>·</span>
                <span>ಬೆಲೆ: ₹{book.price}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-stone-800 leading-relaxed text-base">
            <h5 className="font-sans font-bold text-sm text-[#78241C] uppercase tracking-wider">
              ಆಯ್ದ ಭಾಗದ ಪರಿಚಯ:
            </h5>
            <div className="p-5 rounded-lg bg-white border border-[#E5D7B7] shadow-2xs italic">
              "{book.sampleExcerpt}"
            </div>
            <p>
              {book.description}
            </p>
            <p className="text-stone-700 text-sm">
              ಈ ಪುಸ್ತಕವು ಓದುಗರಲ್ಲಿ ಸಾಹಿತ್ಯಿಕ ಅಭಿರುಚಿಯನ್ನು ಮತ್ತು ಸಾಮಾಜಿಕ ಪ್ರಜ್ಞೆಯನ್ನು ಉದ್ದೀಪನಗೊಳಿಸುವ
              ಉದ್ದೇಶವನ್ನು ಹೊಂದಿದೆ. ಸಂಪೂರ್ಣ ಪುಸ್ತಕವನ್ನು ಓದಲು ಇಂದೇ ಆರ್ಡರ್ ಮಾಡಿ.
            </p>
          </div>

          {book.features && book.features.length > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <h5 className="text-xs font-bold text-stone-900 font-sans mb-2">
                ಈ ಕೃತಿಯ ವಿಶೇಷತೆಗಳು:
              </h5>
              <ul className="space-y-1 text-xs text-stone-600 font-sans">
                {book.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF5EA] border-t border-[#E3D4B6] px-6 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded bg-stone-200 text-stone-700 hover:bg-stone-300"
          >
            ಮುಚ್ಚಿ
          </button>
          <button
            onClick={() => {
              onClose();
              onOrderNow();
            }}
            className="px-5 py-2 text-xs font-semibold rounded bg-[#78241C] text-white hover:bg-[#8E2C22] shadow-xs"
          >
            ಈ ಪುಸ್ತಕವನ್ನು ಖರೀದಿಸಿ (₹{book.price})
          </button>
        </div>
      </div>
    </div>
  );
};
