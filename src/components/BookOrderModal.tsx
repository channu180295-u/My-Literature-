import React, { useState } from 'react';
import { CheckCircle2, Mail, ShoppingBag, Truck, X } from 'lucide-react';
import { Book } from '../types';
import { useData } from '../context/DataContext';

interface BookOrderModalProps {
  book: Book;
  onClose: () => void;
}

export const BookOrderModal: React.FC<BookOrderModalProps> = ({ book, onClose }) => {
  const { authorProfile, createOrder } = useData();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [copies, setCopies] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalPrice = book.price * copies;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) return;

    createOrder({
      bookId: book.id,
      bookTitle: book.title,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      address: address.trim(),
      copies,
      notes: notes.trim() || undefined,
    });

    setIsSubmitted(true);
  };

  const handleEmailOrder = () => {
    const subject = `ಪುಸ್ತಕ ಖರೀದಿ ಕೋರಿಕೆ: ${book.title}`;
    const text = `ಪುಸ್ತಕ ಖರೀದಿ ಕೋರಿಕೆ (Book Order):\n\nಪುಸ್ತಕ: ${book.title}\nಬೆಲೆ: ₹${book.price} (ಪ್ರತಿಗಳು: ${copies}, ಒಟ್ಟು: ₹${totalPrice})\nಹೆಸರು: ${customerName}\nದೂರವಾಣಿ/ಇಮೇಲ್: ${customerPhone} ${customerEmail ? `(${customerEmail})` : ''}\nವಿಳಾಸ: ${address}\nವಿಶೇಷ ಸೂಚನೆ: ${notes || 'ಇಲ್ಲ'}\n\nದಯವಿಟ್ಟು ಪುಸ್ತಕ ಕಳುಹಿಸಿಕೊಡುವ ವಿಧಾನ ತಿಳಿಸಿ.`;
    const url = `mailto:${authorProfile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.location.href = url;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-xl shadow-2xl border border-[#DBCAB1] overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#78241C] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold font-literary text-lg">
              ಪುಸ್ತಕ ಖರೀದಿ & ಮುಂಗಡ ಕಾಯ್ದಿರಿಸುವಿಕೆ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold font-literary text-stone-900">
                ನಿಮ್ಮ ಬೇಡಿಕೆ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ!
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                ಧನ್ಯವಾದಗಳು <strong>{customerName}</strong>. ಲೇಖಕರಾದ ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅವರು
                ನಿಮ್ಮ ಕೋರಿಕೆಯನ್ನು ಸ್ವೀಕರಿಸಿದ್ದು, ಶೀಘ್ರದಲ್ಲೇ ಪುಸ್ತಕವನ್ನು ಅಂಚೆ / ಕೊರಿಯರ್
                ಮೂಲಕ ನಿಮ್ಮ ವಿಳಾಸಕ್ಕೆ ರವಾನಿಸಲಾಗುವುದು.
              </p>

              <div className="p-4 bg-[#F5EEDF] rounded-lg max-w-md mx-auto text-left text-xs text-stone-700 space-y-1">
                <p><strong>ಪುಸ್ತಕ:</strong> {book.title}</p>
                <p><strong>ಪ್ರತಿಗಳು:</strong> {copies} (ಒಟ್ಟು ಮೊತ್ತ: ₹{totalPrice})</p>
                <p><strong>ಡೆಲಿವರಿ ವಿಳಾಸ:</strong> {address}</p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleEmailOrder}
                  className="px-4 py-2 bg-stone-800 text-white rounded font-medium text-xs hover:bg-stone-900 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>ಇಮೇಲ್ ಮುಖಾಂತರವೂ ಕಳುಹಿಸಿ</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-200 text-stone-800 rounded font-medium text-xs hover:bg-stone-300"
                >
                  ಮುಚ್ಚಿ
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Book Summary Card */}
              <div className="flex gap-4 p-4 rounded-lg bg-[#FAF5EA] border border-[#E7DCBF] mb-6">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded shadow-xs shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold font-literary text-base text-[#2E1814]">
                    {book.title}
                  </h4>
                  <p className="text-xs text-stone-600">ಲೇಖಕರು: {book.author}</p>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-bold text-[#78241C]">
                      ₹{book.price}
                    </span>
                    {book.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        ₹{book.originalPrice}
                      </span>
                    )}
                    <span className="text-xs text-emerald-700 font-medium">
                      (ಅಂಚೆ ವೆಚ್ಚ ಉಚಿತ)
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">{book.publisher}</p>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ನಿಮ್ಮ ಹೆಸರು *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="ಉದಾ: ಆನಂದ್ ಹೆಗಡೆ"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ಮೊಬೈಲ್ ನಂಬರ್ (ಅಂಚೆ ರವಾನೆಗೆ) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="ಉದಾ: 98450 12345"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ಪ್ರತಿಗಳ ಸಂಖ್ಯೆ (Copies)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={copies}
                      onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ಇಮೇಲ್ (ಐಚ್ಛಿಕ)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ಪುಸ್ತಕ ತಲುಪಿಸಬೇಕಾದ ಪೂರ್ಣ ಅಂಚೆ ವಿಳಾಸ (ಪಿನ್‌ಕೋಡ್ ಸಮೇತ) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="ಮನೆ ನಂ, ರಸ್ತೆ, ಗ್ರಾಮ/ನಗರ, ತಾಲೂಕು, ಜಿಲ್ಲೆ, ಪಿನ್ ಕೋಡ್..."
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ವಿಶೇಷ ಸೂಚನೆಗಳು (ಲೇಖಕರ ಹಸ್ತಾಕ್ಷರ ಬೇಕಿದ್ದಲ್ಲಿ ಇಲ್ಲಿ ನಮೂದಿಸಿ)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="ಉದಾ: ಲೇಖಕರ ಹಸ್ತಾಕ್ಷರದೊಂದಿಗೆ ಕಳುಹಿಸಿ"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                  />
                </div>

                {/* Payment & Delivery Notice */}
                <div className="p-3 bg-[#F4EEDB] rounded text-xs text-stone-700 flex items-start gap-2 border border-[#E3D4B6]">
                  <Truck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">ಪಾವತಿ ವಿಧಾನ:</span> ಗೂಗಲ್ ಪೇ / ಫೋನ್‌ಪೇ (UPI ID:{' '}
                    <code>{authorProfile.upiId || 'channu180295@okaxis'}</code>) ಅಥವಾ ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ
                    (COD) ಲಭ್ಯವಿದೆ. ಆರ್ಡರ್ ಮಾಡಿದ ನಂತರ ಸ್ಪೀಡ್ ಪೋಸ್ಟ್ ಮೂಲಕ ನಿಮ್ಮ ಮನೆಗೆ ತಲುಪುತ್ತದೆ.
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-sm font-bold text-stone-900">
                    ಒಟ್ಟು ಮೊತ್ತ: <span className="text-[#78241C] text-lg">₹{totalPrice}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#78241C] text-white text-xs font-semibold hover:bg-[#8E2C22] transition-colors shadow-xs"
                    >
                      ಆರ್ಡರ್ ದೃಢೀಕರಿಸಿ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
