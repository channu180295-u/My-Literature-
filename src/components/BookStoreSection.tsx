import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  Eye,
  Gift,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';
import { Book } from '../types';
import { useData } from '../context/DataContext';
import { BookOrderModal } from './BookOrderModal';
import { BookSampleModal } from './BookSampleModal';

export const BookStoreSection: React.FC = () => {
  const { books, authorProfile } = useData();
  const [selectedBookForOrder, setSelectedBookForOrder] = useState<Book | null>(null);
  const [selectedBookForSample, setSelectedBookForSample] = useState<Book | null>(null);

  // Filter only author's own books
  const authorBooks = books.filter((b) => b.isAuthorBook);

  const handleEmailQuickOrder = (book: Book) => {
    const subject = `ಪುಸ್ತಕ ಖರೀದಿ: ${book.title}`;
    const body = `ನಮಸ್ಕಾರ ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅವರೇ,\n\nನಾನು ನಿಮ್ಮ "${book.title}" (ಬೆಲೆ: ₹${book.price}) ಪುಸ್ತಕವನ್ನು ಖರೀದಿಸಲು ಇಷ್ಟಪಡುತ್ತೇನೆ.\nದಯವಿಟ್ಟು ಪಾವತಿ ಹಾಗೂ ಅಂಚೆ ಮೂಲಕ ಕಳುಹಿಸಿಕೊಡುವ ವಿಧಾನ ತಿಳಿಸಿ.\n\nಧನ್ಯವಾದಗಳು.`;
    window.location.href = `mailto:${authorProfile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="books" className="py-16 md:py-24 bg-[#FAF6EE] border-t border-[#E7DCBF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78241C]">
            <ShoppingBag className="w-4 h-4 text-amber-700" />
            <span>ಅಧಿಕೃತ ಪುಸ್ತಕ ಮಾರಾಟ & ಪ್ರಮೋಷನ್</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-literary text-[#2C1915]">
            ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅವರ ಪ್ರಕಟಿತ ಕೃತಿಗಳು
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-serif">
            ಲೇಖಕರಿಂದಲೇ ನೇರವಾಗಿ ಮುದ್ರಿತ ಪುಸ್ತಕಗಳನ್ನು ನಿಮ್ಮ ಮನೆಬಾಗಿಲಿಗೆ ರಿಯಾಯಿತಿ ದರದಲ್ಲಿ ತರಿಸಿಕೊಳ್ಳಿ.
            ಪ್ರತಿಯೊಂದು ಪ್ರತಿಯೊಂದಿಗೆ ಲೇಖಕರ ಹಸ್ತಾಕ್ಷರದ ಸಂದೇಶ ಲಭ್ಯ.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#E3D4B6] shadow-2xs">
            <Gift className="w-8 h-8 text-[#78241C] shrink-0" />
            <div>
              <div className="font-bold text-xs sm:text-sm text-stone-900">
                ಲೇಖಕರ ಹಸ್ತಾಕ್ಷರದೊಂದಿಗೆ
              </div>
              <div className="text-[11px] text-stone-600">
                ಪುಸ್ತಕದ ಮೊದಲ ಪುಟದಲ್ಲಿ ಲೇಖಕರ ವೈಯಕ್ತಿಕ ಸಂದೇಶ
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#E3D4B6] shadow-2xs">
            <Truck className="w-8 h-8 text-[#78241C] shrink-0" />
            <div>
              <div className="font-bold text-xs sm:text-sm text-stone-900">
                ಮನೆ ಬಾಗಿಲಿಗೆ ಸ್ಪೀಡ್ ಪೋಸ್ಟ್
              </div>
              <div className="text-[11px] text-stone-600">
                ಕರ್ನಾಟಕದ ಯಾವುದೇ ಹಳ್ಳಿ, ಪಟ್ಟಣಕ್ಕೂ ಸುರಕ್ಷಿತ ರವಾನೆ
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#E3D4B6] shadow-2xs">
            <CheckCircle className="w-8 h-8 text-emerald-700 shrink-0" />
            <div>
              <div className="font-bold text-xs sm:text-sm text-stone-900">
                ಸುಲಭ UPI / COD ಪಾವತಿ
              </div>
              <div className="text-[11px] text-stone-600">
                Google Pay, PhonePe ಅಥವಾ ಮುಂಗಡ ಪಾವತಿ
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {authorBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl border border-[#E3D4B6] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Cover with Badge */}
              <div className="relative h-64 bg-stone-100 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-auto object-cover rounded shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-[#78241C] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                  {book.genre}
                </div>
              </div>

              {/* Book Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] text-stone-500">
                    <span>{book.publisher}</span>
                    <span aria-hidden="true" className="mx-1">·</span>
                    <span>{book.pages} ಪುಟಗಳು</span>
                  </div>

                  <h3 className="text-lg font-bold font-literary text-[#2B1713] leading-snug group-hover:text-[#78241C] transition-colors">
                    {book.title}
                  </h3>

                  {book.subtitle && (
                    <p className="text-xs text-amber-900 font-medium line-clamp-1">
                      {book.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-stone-600 font-serif line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="space-y-3 pt-3 border-t border-stone-100">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[#78241C]">
                        ₹{book.price}
                      </span>
                      {book.originalPrice && (
                        <span className="text-xs text-stone-400 line-through">
                          ₹{book.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      ಸ್ಟಾಕ್ ಲಭ್ಯ
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedBookForSample(book)}
                      className="px-2.5 py-2 text-xs font-semibold rounded bg-[#F0E8D7] text-[#341F1A] hover:bg-[#E4D8C1] transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ಮಾದರಿ ಓದು</span>
                    </button>

                    <button
                      onClick={() => setSelectedBookForOrder(book)}
                      className="px-2.5 py-2 text-xs font-semibold rounded bg-[#78241C] text-white hover:bg-[#8E2C22] transition-colors flex items-center justify-center gap-1 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ಖರೀದಿಸಿ</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleEmailQuickOrder(book)}
                    className="w-full py-1.5 text-[11px] font-semibold text-stone-700 hover:text-[#78241C] flex items-center justify-center gap-1 hover:underline"
                  >
                    <span>ಇಮೇಲ್ ಮೂಲಕ ವಿಚಾರಣೆ</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Order Modal */}
      {selectedBookForOrder && (
        <BookOrderModal
          book={selectedBookForOrder}
          onClose={() => setSelectedBookForOrder(null)}
        />
      )}

      {/* Book Sample Modal */}
      {selectedBookForSample && (
        <BookSampleModal
          book={selectedBookForSample}
          onClose={() => setSelectedBookForSample(null)}
          onOrderNow={() => {
            const bookToOrder = selectedBookForSample;
            setSelectedBookForSample(null);
            setSelectedBookForOrder(bookToOrder);
          }}
        />
      )}
    </section>
  );
};
