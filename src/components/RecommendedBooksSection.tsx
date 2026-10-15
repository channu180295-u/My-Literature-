import React, { useState } from 'react';
import { BookMarked, ExternalLink, Library, Star } from 'lucide-react';
import { Book } from '../types';
import { useData } from '../context/DataContext';
import { BookSampleModal } from './BookSampleModal';

export const RecommendedBooksSection: React.FC = () => {
  const { books } = useData();
  const [selectedBookForSample, setSelectedBookForSample] = useState<Book | null>(null);

  // Filter books recommended by other authors
  const recommendedBooks = books.filter((b) => !b.isAuthorBook);

  if (recommendedBooks.length === 0) return null;

  return (
    <section id="recommended" className="py-16 md:py-24 bg-[#F5EEDF] border-t border-[#E5D7B7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78241C]">
            <Library className="w-4 h-4 text-amber-800" />
            <span>ವಾಚನಾಲಯ ಶಿಫಾರಸುಗಳು</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-literary text-[#2C1915]">
            ಒಳ್ಳೊಳ್ಳೆ ಲೇಖಕರ ಅಮೂಲ್ಯ ಪುಸ್ತಕಗಳು
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-serif">
            ಕನ್ನಡ ಸಾಹಿತ್ಯ ಲೋಕದ ದಿಗ್ಗಜರ ಶ್ರೇಷ್ಠ ಕೃತಿಗಳನ್ನು ಓದುಗರಿಗೆ ಪರಿಚಯಿಸುವ ಮತ್ತು ವಾಚನಾಭಿರುಚಿ
            ಬೆಳೆಸುವ ಸತ್ಸಂಕಲ್ಪ. ಈ ಪುಸ್ತಕಗಳನ್ನು ಪ್ರತಿಯೊಬ್ಬ ಸಾಹಿತ್ಯಾಸಕ್ತರೂ ಓದಲೇಬೇಕು.
          </p>
        </div>

        {/* Recommended Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl border border-[#DBC9A8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-4 bg-[#FAF7F0] border-b border-[#EAE0CA] flex gap-3 items-center">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-22 object-cover rounded shadow-xs shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-[11px] font-semibold text-amber-900 truncate">
                    ಲೇಖಕರು: {book.author}
                  </div>
                  <h3 className="font-bold font-literary text-base text-[#2E1814] truncate">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-amber-700 mt-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>ಶಿಫಾರಸು ಕೃತಿ</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-stone-600 font-serif line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="text-[11px] text-stone-500 space-y-0.5 pt-1">
                    <div><strong>ವರ್ಗ:</strong> {book.genre}</div>
                    {book.publisher && <div><strong>ಪ್ರಕಾಶನ:</strong> {book.publisher}</div>}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedBookForSample(book)}
                    className="text-xs font-semibold text-[#78241C] hover:underline flex items-center gap-1"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>ವಿವರ ಓದಿ</span>
                  </button>

                  {book.buyUrl ? (
                    <a
                      href={book.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-medium rounded bg-[#78241C] text-white hover:bg-[#8F2E23] transition-colors flex items-center gap-1"
                    >
                      <span>ಖರೀದಿ ಲಿಂಕ್</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-stone-500">
                      ಸಮೀಪದ ಪುಸ್ತಕದಂಗಡಿಯಲ್ಲಿ ಲಭ್ಯ
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Excerpt Modal */}
      {selectedBookForSample && (
        <BookSampleModal
          book={selectedBookForSample}
          onClose={() => setSelectedBookForSample(null)}
          onOrderNow={() => {
            if (selectedBookForSample.buyUrl) {
              window.open(selectedBookForSample.buyUrl, '_blank');
            } else {
              alert('ಈ ಕೃತಿಯು ಎಲ್ಲಾ ಪ್ರಮುಖ ಪುಸ್ತಕ ಮಳಿಗೆಗಳು ಹಾಗೂ ಸಪ್ನ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಲಭ್ಯವಿದೆ.');
            }
          }}
        />
      )}
    </section>
  );
};
