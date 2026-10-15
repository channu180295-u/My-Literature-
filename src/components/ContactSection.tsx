import React, { useState } from 'react';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ContactSection: React.FC = () => {
  const { authorProfile, sendMessage } = useData();
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactEmail.trim() || !message.trim()) return;

    sendMessage({
      name: name.trim(),
      emailOrPhone: contactEmail.trim(),
      subject: subject.trim() || 'ಸಾಹಿತ್ಯ ಅಭಿಪ್ರಾಯ',
      message: message.trim(),
    });

    setSubmitted(true);
    setName('');
    setContactEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F5EEDF] border-t border-[#E5D7B7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Information - ONLY EMAIL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#78241C]">
                ಸಂಪರ್ಕಿಸಿ
              </span>
              <h2 className="text-3xl font-extrabold font-literary text-[#2C1915]">
                ಲೇಖಕರನ್ನು ಸಂಪರ್ಕಿಸಿ
              </h2>
              <p className="text-stone-600 text-sm font-serif">
                ಪುಸ್ತಕಗಳ ಖರೀದಿ ವಿಚಾರಣೆ, ಸಾಹಿತ್ಯಿಕ ಸಲಹೆಗಳು ಅಥವಾ ಲೇಖನಗಳ ಕುರಿತ ತಮ್ಮ ಅನಿಸಿಕೆಗಳಿಗೆ
                ಇಮೇಲ್ ಮೂಲಕ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಬಹುದು.
              </p>
            </div>

            {/* Sole Contact Card: Email */}
            <div className="p-6 bg-white rounded-xl border border-[#E3D4B6] flex items-start gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-[#FAF5EB] text-[#78241C] flex items-center justify-center shrink-0 border border-[#E7DCBF]">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs text-stone-500 font-semibold uppercase">ಅಧಿಕೃತ ಇಮೇಲ್ ವಿಳಾಸ</div>
                <a
                  href={`mailto:${authorProfile.email}`}
                  className="text-base sm:text-lg font-bold text-[#78241C] hover:underline break-all"
                >
                  {authorProfile.email}
                </a>
                <p className="text-xs text-stone-500 font-serif pt-1">
                  ಲೇಖಕರು ತಮ್ಮ ಇಮೇಲ್ ಸಂದೇಶಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತಾರೆ.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#EADDC5] rounded-lg border border-[#D5C2A4] text-xs text-stone-800 space-y-1 font-serif">
              <p className="font-semibold text-stone-900 font-sans">
                ಕನ್ನಡ ಸಾಹಿತ್ಯಾಸಕ್ತರಿಗೆ ಸ್ವಾಗತ:
              </p>
              <p className="leading-relaxed">
                ಓದುಗರ ರಚನಾತ್ಮಕ ವಿಮರ್ಶೆ ಮತ್ತು ಆಶಯಗಳು ಬರವಣಿಗೆಯ ಹಾದಿಯಲ್ಲಿ ಸದಾ ಬೆಳಕಾಗಿರುತ್ತವೆ.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-[#E3D4B6] p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold font-literary text-[#2C1915] mb-2">
                ಲೇಖಕರಿಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ
              </h3>
              <p className="text-xs text-stone-500 mb-6 font-serif">
                ಇಲ್ಲಿ ನೀವು ಕಳುಹಿಸುವ ಸಂದೇಶವು ನೇರವಾಗಿ ಲೇಖಕರ ಅಡ್ಮಿನ್ ಇನ್‌ಬಾಕ್ಸ್‌ಗೆ ತಲುಪುತ್ತದೆ.
              </p>

              {submitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-sm flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ. ಲೇಖಕರು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ
                    ಪ್ರತಿಕ್ರಿಯಿಸಲಿದ್ದಾರೆ.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ಉದಾ: ಆನಂದ್ ಕುಮಾರ್"
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D8C7A5] rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D8C7A5] rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ವಿಷಯ (Subject)
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="ಉದಾ: ಪುಸ್ತಕ ಖರೀದಿ ವಿಚಾರಣೆ / ಸಾಹಿತ್ಯಿಕ ಅನಿಸಿಕೆ"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D8C7A5] rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ನಿಮ್ಮ ಸಂದೇಶ *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="ನಿಮ್ಮ ವಿಚಾರಗಳನ್ನು ಅಥವಾ ಪುಸ್ತಕದ ಬೇಡಿಕೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D8C7A5] rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={`mailto:${authorProfile.email}`}
                    className="text-xs font-semibold text-[#78241C] hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>ನೇರವಾಗಿ ಇಮೇಲ್ ಕಳುಹಿಸಿ</span>
                  </a>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#78241C] text-white text-xs font-semibold hover:bg-[#8D2C22] transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ಸಂದೇಶ ಕಳುಹಿಸಿ</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
