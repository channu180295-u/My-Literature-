import React, { useState } from 'react';
import {
  Bookmark,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Printer,
  Share2,
  Star,
  Type,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { WritingItem } from '../types';
import { useData } from '../context/DataContext';

interface ArticleReaderModalProps {
  writing: WritingItem;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ writing, onClose }) => {
  const { likeWriting, addComment } = useData();
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      likeWriting(writing.id);
      setHasLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    addComment(writing.id, commentName.trim(), commentText.trim(), commentRating);
    setCommentText('');
    setCommentName('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const handleSpeechToggle = () => {
    if (!('speechSynthesis' in window)) {
      alert('ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಆಡಿಯೋ ಬೆಂಬಲ ಲಭ್ಯವಿಲ್ಲ.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${writing.title}. ${writing.content.slice(0, 1500)}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'kn-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `*${writing.title}* - ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅವರ ಸ್ವರಚಿತ ಬರಹ.\n\n"${writing.excerpt}"\n\nಅಕ್ಷರ ಸಿಂಧು ಸಾಹಿತ್ಯ ತಾಣದಲ್ಲಿ ಓದಿ: ${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-xl shadow-2xl border border-[#DBCAB1] overflow-hidden my-6">
        {/* Reader Top Controls Toolbar */}
        <div className="sticky top-0 z-10 bg-[#FAF5EA] border-b border-[#E3D4B6] px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs text-stone-600 hidden sm:inline">ಅಕ್ಷರದ ಗಾತ್ರ:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 text-xs font-semibold rounded ${
                fontSize === 'normal'
                  ? 'bg-[#78241C] text-white'
                  : 'bg-white text-stone-700 border border-stone-200'
              }`}
            >
              ಸಾಮಾನ್ಯ
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 text-xs font-semibold rounded ${
                fontSize === 'large'
                  ? 'bg-[#78241C] text-white'
                  : 'bg-white text-stone-700 border border-stone-200'
              }`}
            >
              ದೊಡ್ಡದು
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 text-xs font-semibold rounded ${
                fontSize === 'xlarge'
                  ? 'bg-[#78241C] text-white'
                  : 'bg-white text-stone-700 border border-stone-200'
              }`}
            >
              ಬಹಳ ದೊಡ್ಡದು
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleSpeechToggle}
              title={isSpeaking ? 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ' : 'ಧ್ವನಿ ವಾಚನ'}
              className={`p-2 rounded-md transition-colors ${
                isSpeaking
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShareWhatsApp}
              title="ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ"
              className="p-2 rounded-md text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => window.print()}
              title="ಮುದ್ರಿಸಿ"
              className="p-2 rounded-md text-stone-700 hover:bg-stone-200 transition-colors hidden sm:block"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (isSpeaking) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-md text-stone-700 hover:bg-stone-200 transition-colors ml-1"
              aria-label="ಮುಚ್ಚಿ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto">
          {/* Metadata Row (Zero-pill text separators) */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600 mb-3">
            <span className="font-semibold text-[#78241C] uppercase tracking-wide">
              {writing.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {writing.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {writing.readTime}
            </span>
            {writing.publishedPlace && (
              <>
                <span aria-hidden="true">·</span>
                <span className="italic">{writing.publishedPlace}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-literary text-[#2E1814] mb-4 leading-tight">
            {writing.title}
          </h1>

          {/* Author Kicker */}
          <div className="flex items-center justify-between pb-6 border-b border-[#EADECB] mb-8">
            <div className="text-xs sm:text-sm text-stone-600">
              ಬರಹ: <strong className="text-stone-900 font-semibold">ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ</strong> (ಪದವೀಧರ ಶಿಕ್ಷಕರು)
            </div>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                hasLiked
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-stone-100 text-stone-700 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{writing.likes} ಮೆಚ್ಚುಗೆಗಳು</span>
            </button>
          </div>

          {/* Optional Cover Image */}
          {writing.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden border border-[#D5C2A4]">
              <img
                src={writing.coverImage}
                alt={writing.title}
                className="w-full max-h-80 object-cover"
              />
            </div>
          )}

          {/* Excerpt Highlight */}
          <div className="bg-[#F6EEDF] p-4 sm:p-5 rounded-md border-l-4 border-[#78241C] text-stone-800 font-serif italic text-base sm:text-lg mb-8 leading-relaxed">
            "{writing.excerpt}"
          </div>

          {/* Main Story / Article Body */}
          <div className={`font-serif text-stone-800 space-y-5 ${getFontSizeClass()}`}>
            {writing.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="indent-4 sm:indent-8">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {writing.tags && writing.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#EADECB] flex flex-wrap items-center gap-2 text-xs text-stone-600">
              <span className="font-semibold text-stone-800">ವರ್ಗೀಕರಣ:</span>
              {writing.tags.map((tag, i) => (
                <span key={i} className="text-stone-700">
                  #{tag}
                  {i < writing.tags.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          )}

          {/* Share on WhatsApp Box */}
          <div className="mt-8 p-4 rounded-lg bg-[#EFE8D6] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-stone-900">
                ಈ ಬರಹ ಇಷ್ಟವಾಯಿತೇ? ಸಾಹಿತ್ಯ ಪ್ರಿಯರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ!
              </p>
              <p className="text-xs text-stone-600">
                ಸ್ನೇಹಿತರಿಗೆ ಮತ್ತು ಗ್ರೂಪ್‌ಗಳಿಗೆ ಕಳುಹಿಸಲು ವಾಟ್ಸಾಪ್ ಬಟನ್ ಒತ್ತಿ.
              </p>
            </div>
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors flex items-center gap-2 shrink-0"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t border-[#E3D4B6]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-literary text-[#2E1814] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#78241C]" />
                <span>ಓದುಗರ ಅನಿಸಿಕೆಗಳು ({writing.comments?.length || 0})</span>
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-[#FAF6EE] p-4 sm:p-6 rounded-lg border border-[#E7DCBF] mb-8 space-y-4">
              <h4 className="text-sm font-bold text-stone-900">
                ಲೇಖಕರಿಗೆ ನಿಮ್ಮ ಅನಿಸಿಕೆಯನ್ನು ಬರೆಯಿರಿ
              </h4>

              {commentSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 text-xs rounded-md">
                  ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಅನಿಸಿಕೆ ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಕಟಗೊಂಡಿದೆ.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    ನಿಮ್ಮ ಹೆಸರು *
                  </label>
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="ಉದಾ: ರಮೇಶ ಕುಲಕರ್ಣಿ"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    ರೇಟಿಂಗ್ (ಮೆಚ್ಚುಗೆ)
                  </label>
                  <select
                    value={commentRating}
                    onChange={(e) => setCommentRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ ಅತ್ಯುತ್ತಮ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ ಬಹಳ ಚೆನ್ನಾಗಿದೆ (4/5)</option>
                    <option value={3}>⭐⭐⭐ ಉತ್ತಮ (3/5)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  ನಿಮ್ಮ ಅನಿಸಿಕೆ / ಪ್ರತಿಕ್ರಿಯೆ *
                </label>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="ಈ ಕಥೆ ಅಥವಾ ಲೇಖನದ ಕುರಿತು ನಿಮ್ಮ ಅನಿಸಿಕೆಯನ್ನು ಇಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ..."
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded focus:outline-none focus:ring-1 focus:ring-[#78241C]"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8E2C22] transition-colors"
              >
                ಅನಿಸಿಕೆ ಕಳುಹಿಸಿ
              </button>
            </form>

            {/* Comments List */}
            {writing.comments && writing.comments.length > 0 ? (
              <div className="space-y-4">
                {writing.comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-white rounded-lg border border-[#E7DCBF] shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm text-stone-900">
                        {c.authorName}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>{c.date}</span>
                        {c.rating && (
                          <span className="flex items-center text-amber-600">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {c.rating}/5
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
                      {c.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 text-center py-4">
                ಇನ್ನೂ ಯಾವುದೇ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಲ್ಲ. ಮೊದಲಿಗರಾಗಿ ನಿಮ್ಮ ಅನಿಸಿಕೆ ಬರೆಯಿರಿ!
              </p>
            )}
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-[#FAF5EA] border-t border-[#E3D4B6] px-6 py-3 flex justify-between items-center text-xs text-stone-600">
          <span>ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅವರ ಸಾಹಿತ್ಯ ವೇದಿಕೆ</span>
          <button
            onClick={() => {
              if (isSpeaking) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-4 py-1.5 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 font-medium"
          >
            ಮುಚ್ಚಿ
          </button>
        </div>
      </div>
    </div>
  );
};
