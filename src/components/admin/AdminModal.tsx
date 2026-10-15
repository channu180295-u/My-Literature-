import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookMarked,
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  Key,
  Link,
  Lock,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Save,
  Send,
  ShoppingBag,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import { Book, ExternalLinkItem, MediaItem, WritingItem } from '../../types';
import { useData } from '../../context/DataContext';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    recoverPasswordWithEmail,
    resetPasswordWithCode,
    authorProfile,
    updateAuthorProfile,
    writings,
    addWriting,
    updateWriting,
    deleteWriting,
    books,
    addBook,
    updateBook,
    deleteBook,
    externalLinks,
    addExternalLink,
    updateExternalLink,
    deleteExternalLink,
    media,
    addMedia,
    updateMedia,
    deleteMedia,
    quotes,
    addQuote,
    deleteQuote,
    orders,
    updateOrderStatus,
    deleteOrder,
    messages,
    deleteMessage,
    exportDataJson,
    importDataJson,
    resetAllData,
  } = useData();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Password Recovery State
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [recoveryNewPass, setRecoveryNewPass] = useState('');
  const [recoveryConfirmPass, setRecoveryConfirmPass] = useState('');
  const [recoveryStep, setRecoveryStep] = useState<'email' | 'reset'>('email');
  const [recoveryMsg, setRecoveryMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Achievement input for Author Profile
  const [newAchievement, setNewAchievement] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'writings' | 'books' | 'recommended' | 'links' | 'media' | 'profile' | 'orders' | 'security'
  >('writings');

  // Writing Form State
  const [editingWriting, setEditingWriting] = useState<WritingItem | null>(null);
  const [isAddingWriting, setIsAddingWriting] = useState(false);
  const [writingForm, setWritingForm] = useState({
    title: '',
    category: 'story' as 'story' | 'article' | 'novel' | 'poem',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 ನಿಮಿಷ ಓದು',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: 'ಸಾಹಿತ್ಯ',
    publishedPlace: '',
    isFeatured: false,
  });

  // Book Form State (Own Books & Recommended Books)
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [bookIsForAuthor, setBookIsForAuthor] = useState(true);
  const [bookForm, setBookForm] = useState({
    title: '',
    subtitle: '',
    author: 'ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ',
    price: 180,
    originalPrice: 220,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    description: '',
    genre: 'ಕಥಾಸಂಕಲನ',
    pages: 180,
    publishedYear: '2025',
    publisher: 'ಅಕ್ಷರ ಲೋಕ ಪ್ರಕಾಶನ',
    sampleExcerpt: '',
    inStock: true,
    features: 'ಉತ್ತಮ ಮುದ್ರಣ, ಲೇಖಕರ ಹಸ್ತಾಕ್ಷರ',
    buyUrl: '',
  });

  // External Link Form State
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkForm, setLinkForm] = useState({
    title: '',
    publicationName: 'ಪ್ರಜಾವಾಣಿ',
    publishDate: new Date().toISOString().split('T')[0],
    url: 'https://',
    description: '',
    category: 'ಶಿಕ್ಷಣ ಲೇಖನ',
  });

  // Media Form State
  const [isAddingMedia, setIsAddingMedia] = useState(false);
  const [mediaForm, setMediaForm] = useState({
    type: 'photo' as 'photo' | 'video',
    title: '',
    description: '',
    url: '',
    thumbnailUrl: '',
    date: new Date().toISOString().split('T')[0],
    location: 'ಕರ್ನಾಟಕ',
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState(authorProfile);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Quote Form State
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ');
  const [newQuoteSource, setNewQuoteSource] = useState('');

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Import/Export Status
  const [backupMsg, setBackupMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (success) {
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ! ದಯವಿಟ್ಟು ಸರಿಯಾದ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.');
    }
  };

  // Handle Password Recovery Request
  const handleRequestRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryMsg(null);
    const res = recoverPasswordWithEmail(recoveryEmail);
    if (res.success) {
      setRecoveryMsg({ type: 'success', text: res.message });
      setRecoveryStep('reset');
      if (res.recoveryCode) {
        setRecoveryCode(res.recoveryCode);
      }
    } else {
      setRecoveryMsg({ type: 'error', text: res.message });
    }
  };

  // Handle Reset Password with Code
  const handleResetPasswordWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryNewPass !== recoveryConfirmPass) {
      setRecoveryMsg({ type: 'error', text: 'ಹೊಸ ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ!' });
      return;
    }
    const res = resetPasswordWithCode(recoveryEmail, recoveryCode, recoveryNewPass);
    if (res.success) {
      setRecoveryMsg({ type: 'success', text: res.message });
      setTimeout(() => {
        setIsRecovering(false);
        setRecoveryStep('email');
        setRecoveryEmail('');
        setRecoveryCode('');
        setRecoveryNewPass('');
        setRecoveryConfirmPass('');
        setRecoveryMsg(null);
      }, 2500);
    } else {
      setRecoveryMsg({ type: 'error', text: res.message });
    }
  };

  // Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'ಹೊಸ ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ!' });
      return;
    }
    const result = changeAdminPassword(oldPassword, newPassword);
    if (result.success) {
      setPasswordMsg({ type: 'success', text: result.message });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMsg({ type: 'error', text: result.message });
    }
  };

  // Handle Profile Update
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAuthorProfile(profileForm);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Save Writing (Add or Edit)
  const handleSaveWriting = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryLabels: Record<string, string> = {
      story: 'ಕಥೆ',
      article: 'ಲೇಖನ',
      novel: 'ಕಾದಂಬರಿ',
      poem: 'ಕವನ',
    };

    const tagsArray = writingForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingWriting) {
      updateWriting({
        ...editingWriting,
        title: writingForm.title,
        category: writingForm.category,
        categoryLabel: categoryLabels[writingForm.category] || 'ಬರಹ',
        date: writingForm.date,
        readTime: writingForm.readTime,
        excerpt: writingForm.excerpt,
        content: writingForm.content,
        coverImage: writingForm.coverImage || undefined,
        tags: tagsArray,
        publishedPlace: writingForm.publishedPlace || undefined,
        isFeatured: writingForm.isFeatured,
      });
      setEditingWriting(null);
    } else {
      addWriting({
        title: writingForm.title,
        category: writingForm.category,
        categoryLabel: categoryLabels[writingForm.category] || 'ಬರಹ',
        date: writingForm.date,
        readTime: writingForm.readTime,
        excerpt: writingForm.excerpt,
        content: writingForm.content,
        coverImage: writingForm.coverImage || undefined,
        tags: tagsArray,
        publishedPlace: writingForm.publishedPlace || undefined,
        isFeatured: writingForm.isFeatured,
      });
      setIsAddingWriting(false);
    }

    setWritingForm({
      title: '',
      category: 'story',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 ನಿಮಿಷ ಓದು',
      excerpt: '',
      content: '',
      coverImage: '',
      tags: 'ಸಾಹಿತ್ಯ',
      publishedPlace: '',
      isFeatured: false,
    });
  };

  const startEditWriting = (w: WritingItem) => {
    setEditingWriting(w);
    setWritingForm({
      title: w.title,
      category: w.category,
      date: w.date,
      readTime: w.readTime,
      excerpt: w.excerpt,
      content: w.content,
      coverImage: w.coverImage || '',
      tags: w.tags.join(', '),
      publishedPlace: w.publishedPlace || '',
      isFeatured: !!w.isFeatured,
    });
    setIsAddingWriting(true);
  };

  // Save Book (Author's or Recommended)
  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = bookForm.features
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingBook) {
      updateBook({
        ...editingBook,
        title: bookForm.title,
        subtitle: bookForm.subtitle || undefined,
        author: bookForm.author,
        price: Number(bookForm.price),
        originalPrice: bookForm.originalPrice ? Number(bookForm.originalPrice) : undefined,
        coverImage: bookForm.coverImage,
        description: bookForm.description,
        genre: bookForm.genre,
        pages: Number(bookForm.pages),
        publishedYear: bookForm.publishedYear,
        publisher: bookForm.publisher,
        sampleExcerpt: bookForm.sampleExcerpt,
        inStock: bookForm.inStock,
        features: featuresArray,
        isAuthorBook: bookIsForAuthor,
        buyUrl: bookForm.buyUrl || undefined,
      });
      setEditingBook(null);
    } else {
      addBook({
        title: bookForm.title,
        subtitle: bookForm.subtitle || undefined,
        author: bookForm.author,
        price: Number(bookForm.price),
        originalPrice: bookForm.originalPrice ? Number(bookForm.originalPrice) : undefined,
        coverImage: bookForm.coverImage,
        description: bookForm.description,
        genre: bookForm.genre,
        pages: Number(bookForm.pages),
        publishedYear: bookForm.publishedYear,
        publisher: bookForm.publisher,
        sampleExcerpt: bookForm.sampleExcerpt,
        inStock: bookForm.inStock,
        features: featuresArray,
        isAuthorBook: bookIsForAuthor,
        buyUrl: bookForm.buyUrl || undefined,
      });
      setIsAddingBook(false);
    }

    setBookForm({
      title: '',
      subtitle: '',
      author: 'ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ',
      price: 180,
      originalPrice: 220,
      coverImage: '',
      description: '',
      genre: 'ಕಥಾಸಂಕಲನ',
      pages: 180,
      publishedYear: '2025',
      publisher: '',
      sampleExcerpt: '',
      inStock: true,
      features: '',
      buyUrl: '',
    });
  };

  const startEditBook = (b: Book) => {
    setEditingBook(b);
    setBookIsForAuthor(b.isAuthorBook);
    setBookForm({
      title: b.title,
      subtitle: b.subtitle || '',
      author: b.author,
      price: b.price,
      originalPrice: b.originalPrice || 0,
      coverImage: b.coverImage,
      description: b.description,
      genre: b.genre,
      pages: b.pages,
      publishedYear: b.publishedYear,
      publisher: b.publisher,
      sampleExcerpt: b.sampleExcerpt,
      inStock: b.inStock,
      features: b.features.join(', '),
      buyUrl: b.buyUrl || '',
    });
    setIsAddingBook(true);
  };

  // Save External Link
  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    addExternalLink(linkForm);
    setIsAddingLink(false);
    setLinkForm({
      title: '',
      publicationName: 'ಪ್ರಜಾವಾಣಿ',
      publishDate: new Date().toISOString().split('T')[0],
      url: 'https://',
      description: '',
      category: 'ಶಿಕ್ಷಣ ಲೇಖನ',
    });
  };

  // Save Media
  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    addMedia(mediaForm);
    setIsAddingMedia(false);
    setMediaForm({
      type: 'photo',
      title: '',
      description: '',
      url: '',
      thumbnailUrl: '',
      date: new Date().toISOString().split('T')[0],
      location: 'ಕರ್ನಾಟಕ',
    });
  };

  // Save Quote
  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuoteText.trim()) return;
    addQuote({
      text: newQuoteText.trim(),
      author: newQuoteAuthor.trim() || 'ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ',
      source: newQuoteSource.trim() || undefined,
    });
    setNewQuoteText('');
    setNewQuoteSource('');
  };

  // Export Data Download
  const handleDownloadBackup = () => {
    const json = exportDataJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `channabasappa_sahitya_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMsg('ಡೇಟಾ ಬ್ಯಾಕಪ್ ಯಶಸ್ವಿಯಾಗಿ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!');
    setTimeout(() => setBackupMsg(null), 4000);
  };

  // Import Data from file
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importDataJson(content);
      if (res.success) {
        setBackupMsg('ಡೇಟಾವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಮರುಸ್ಥಾಪಿಸಲಾಗಿದೆ!');
      } else {
        setBackupMsg(res.error || 'ಫೈಲ್ ಅಮಾನ್ಯವಾಗಿದೆ');
      }
      setTimeout(() => setBackupMsg(null), 4000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#D5C2A4] overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#78241C] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-200 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-literary text-lg">
                ಅಕ್ಷರ ಸಿಂಧು — ಅಡ್ಮಿನ್ ನಿಯಂತ್ರಣ ಮಂಡಳಿ
              </h3>
              <p className="text-xs text-amber-200/80">
                ಲೇಖಕರಾದ ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅವರ ವೆಬ್‌ಸೈಟ್ ಸಂಪೂರ್ಣ ನಿರ್ವಹಣೆ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs text-white font-medium flex items-center gap-1.5 transition-colors"
                title="ಅಡ್ಮಿನ್‌ನಿಂದ ನಿರ್ಗಮಿಸಿ"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>ಲಾಗ್‌ಔಟ್</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded text-white/80 hover:text-white hover:bg-white/10"
              aria-label="ಮುಚ್ಚಿ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto">
          {!isAdminLoggedIn ? (
            /* Login Gate or Password Recovery Screen */
            <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
              {!isRecovering ? (
                /* Standard Secure Login */
                <>
                  <div className="w-16 h-16 rounded-full bg-[#FAF5EB] text-[#78241C] mx-auto flex items-center justify-center border-2 border-[#E7DCBF]">
                    <Lock className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold font-literary text-stone-900">
                      ಅಡ್ಮಿನ್ ಪ್ರವೇಶ ದೃಢೀಕರಣ
                    </h4>
                    <p className="text-xs text-stone-600 mt-1">
                      ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಬದಲಾವಣೆಗಳನ್ನು ಮಾಡಲು ನಿಮ್ಮ ಗೌಪ್ಯ ಪಾಸ್‌ವರ್ಡ್ ದಾಖಲಿಸಿ.
                    </p>
                  </div>

                  {loginError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded text-left flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ಅಡ್ಮಿನ್ ಪಾಸ್‌ವರ್ಡ್
                      </label>
                      <input
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D5C2A4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78241C]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#78241C] text-white text-sm font-semibold rounded-lg hover:bg-[#8F2E23] transition-colors shadow-xs"
                    >
                      ಲಾಗಿನ್ ಆಗಿ
                    </button>
                  </form>

                  <div className="pt-2 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecovering(true);
                        setRecoveryStep('email');
                        setRecoveryMsg(null);
                        setLoginError('');
                      }}
                      className="text-xs text-[#78241C] hover:underline font-semibold"
                    >
                      ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ? (ಇಮೇಲ್ ಮೂಲಕ ಮರುಸ್ಥಾಪಿಸಿ)
                    </button>
                  </div>
                </>
              ) : (
                /* Password Recovery Linked to Author Email */
                <>
                  <div className="w-16 h-16 rounded-full bg-[#FAF5EB] text-[#78241C] mx-auto flex items-center justify-center border-2 border-[#E7DCBF]">
                    <Mail className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold font-literary text-stone-900">
                      ಪಾಸ್‌ವರ್ಡ್ ಮರುಸ್ಥಾಪನೆ (Password Recovery)
                    </h4>
                    <p className="text-xs text-stone-600 mt-1">
                      ನಿಮ್ಮ ನೋಂದಾಯಿತ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ.
                    </p>
                  </div>

                  {recoveryMsg && (
                    <div
                      className={`p-3 text-xs rounded text-left flex items-start gap-2 ${
                        recoveryMsg.type === 'success'
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border border-rose-200 text-rose-800'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{recoveryMsg.text}</span>
                    </div>
                  )}

                  {recoveryStep === 'email' ? (
                    <form onSubmit={handleRequestRecovery} className="space-y-4 text-left">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ನೋಂದಾಯಿತ ಇಮೇಲ್ ವಿಳಾಸ *
                        </label>
                        <input
                          type="email"
                          required
                          value={recoveryEmail}
                          onChange={(e) => setRecoveryEmail(e.target.value)}
                          placeholder="channu180295@gmail.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D5C2A4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78241C]"
                        />
                        <p className="text-[11px] text-stone-500 mt-1">
                          ಲೇಖಕರ ಅಧಿಕೃತ ಇಮೇಲ್: <code>{authorProfile.email}</code>
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#78241C] text-white text-sm font-semibold rounded-lg hover:bg-[#8F2E23] transition-colors shadow-xs"
                      >
                        ರಿಕವರಿ ಕೋಡ್ ಪಡೆಯಿರಿ
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleResetPasswordWithCode} className="space-y-3 text-left">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          6-ಅಂಕಿಯ ಪರಿಶೀಲನಾ ಕೋಡ್ (Verification Code) *
                        </label>
                        <input
                          type="text"
                          required
                          value={recoveryCode}
                          onChange={(e) => setRecoveryCode(e.target.value)}
                          placeholder="6-ಅಂಕಿಯ ಕೋಡ್"
                          className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5C2A4] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#78241C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ *
                        </label>
                        <input
                          type="password"
                          required
                          value={recoveryNewPass}
                          onChange={(e) => setRecoveryNewPass(e.target.value)}
                          placeholder="ಹೊಸ ಪಾಸ್‌ವರ್ಡ್"
                          className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5C2A4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78241C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ *
                        </label>
                        <input
                          type="password"
                          required
                          value={recoveryConfirmPass}
                          onChange={(e) => setRecoveryConfirmPass(e.target.value)}
                          placeholder="ದೃಢೀಕರಣ ಪಾಸ್‌ವರ್ಡ್"
                          className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5C2A4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78241C]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#78241C] text-white text-sm font-semibold rounded-lg hover:bg-[#8F2E23] transition-colors shadow-xs"
                      >
                        ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ & ಮರುಹೊಂದಿಸಿ
                      </button>
                    </form>
                  )}

                  <div className="pt-2 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecovering(false);
                        setRecoveryStep('email');
                        setRecoveryMsg(null);
                      }}
                      className="text-xs text-stone-600 hover:text-stone-900 flex items-center justify-center gap-1 mx-auto"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>ವಾಪಸ್ ಲಾಗಿನ್ ಪರದೆಗೆ ಹೋಗಿ</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Logged-in Dashboard */
            <div>
              {/* Navigation Tabs */}
              <div className="bg-[#FAF5EA] border-b border-[#E3D4B6] px-4 overflow-x-auto flex gap-2">
                {[
                  { id: 'writings', label: 'ಬರಹಗಳು', count: writings.length },
                  { id: 'books', label: 'ಸ್ವರಚಿತ ಪುಸ್ತಕಗಳು', count: books.filter((b) => b.isAuthorBook).length },
                  { id: 'recommended', label: 'ಶಿಫಾರಸು ಕೃತಿಗಳು', count: books.filter((b) => !b.isAuthorBook).length },
                  { id: 'links', label: 'ಪತ್ರಿಕಾ ಲಿಂಕ್‌ಗಳು', count: externalLinks.length },
                  { id: 'media', label: 'ಚಿತ್ರ & ವೀಡಿಯೋ', count: media.length },
                  { id: 'orders', label: 'ಬುಕ್ ಆರ್ಡರ್‌ಗಳು', count: orders.length },
                  { id: 'profile', label: 'ಪ್ರೊಫೈಲ್ & ನುಡಿಮುತ್ತುಗಳು' },
                  { id: 'security', label: 'ಪಾಸ್‌ವರ್ಡ್ & ಬ್ಯಾಕಪ್' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setIsAddingWriting(false);
                      setIsAddingBook(false);
                      setIsAddingLink(false);
                      setIsAddingMedia(false);
                      setEditingWriting(null);
                      setEditingBook(null);
                    }}
                    className={`px-3 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? 'border-[#78241C] text-[#78241C] bg-white/70'
                        : 'border-transparent text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {typeof tab.count === 'number' && (
                      <span className="text-[11px] bg-stone-200/80 text-stone-700 px-1.5 py-0.2 rounded-full font-sans">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* TAB 1: WRITINGS MANAGEMENT */}
              {activeTab === 'writings' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold font-literary text-lg text-stone-900">
                        ಕಥೆ, ಲೇಖನ, ಕಾದಂಬರಿಗಳ ನಿರ್ವಹಣೆ
                      </h4>
                      <p className="text-xs text-stone-600">
                        ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಹೊಸ ಕಥೆ ಅಥವಾ ಲೇಖನ ಸೇರಿಸಿ, ತಿದ್ದಿ ಅಥವಾ ತೆಗೆದುಹಾಕಿ.
                      </p>
                    </div>

                    {!isAddingWriting && (
                      <button
                        onClick={() => {
                          setEditingWriting(null);
                          setWritingForm({
                            title: '',
                            category: 'story',
                            date: new Date().toISOString().split('T')[0],
                            readTime: '5 ನಿಮಿಷ ಓದು',
                            excerpt: '',
                            content: '',
                            coverImage: '',
                            tags: 'ಕಥೆ, ಕನ್ನಡ',
                            publishedPlace: '',
                            isFeatured: false,
                          });
                          setIsAddingWriting(true);
                        }}
                        className="px-4 py-2 bg-[#78241C] text-white text-xs font-semibold rounded-md hover:bg-[#8D2C22] flex items-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>ಹೊಸ ಬರಹ ಸೇರಿಸಿ</span>
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {isAddingWriting ? (
                    <form onSubmit={handleSaveWriting} className="p-5 bg-[#FAF6EE] rounded-xl border border-[#E7DCBF] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#E3D4B6] pb-3">
                        <h5 className="font-bold text-sm text-[#78241C]">
                          {editingWriting ? 'ಬರಹವನ್ನು ತಿದ್ದುಪಡಿ ಮಾಡಿ' : 'ಹೊಸ ಬರಹ ರಚಿಸಿ'}
                        </h5>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingWriting(false);
                            setEditingWriting(null);
                          }}
                          className="text-xs text-stone-600 hover:text-stone-900"
                        >
                          ರದ್ದುಮಾಡಿ
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಬರಹದ ಶೀರ್ಷಿಕೆ *
                          </label>
                          <input
                            type="text"
                            required
                            value={writingForm.title}
                            onChange={(e) => setWritingForm({ ...writingForm, title: e.target.value })}
                            placeholder="ಉದಾ: ಬೆಟ್ಟದ ತಪ್ಪಲಿನ ಶಾಲೆ"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಸಾಹಿತ್ಯ ಪ್ರಕಾರ (ವರ್ಗ) *
                          </label>
                          <select
                            value={writingForm.category}
                            onChange={(e) => setWritingForm({ ...writingForm, category: e.target.value as any })}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          >
                            <option value="story">ಕಥೆ (Story)</option>
                            <option value="article">ಲೇಖನ (Article / Essay)</option>
                            <option value="novel">ಕಾದಂಬರಿ ಅಧ್ಯಾಯ (Novel Excerpt)</option>
                            <option value="poem">ಕವನ / ವಚನ (Poem)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ದಿನಾಂಕ
                          </label>
                          <input
                            type="date"
                            value={writingForm.date}
                            onChange={(e) => setWritingForm({ ...writingForm, date: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಓದುವ ಅಂದಾಜು ಸಮಯ
                          </label>
                          <input
                            type="text"
                            value={writingForm.readTime}
                            onChange={(e) => setWritingForm({ ...writingForm, readTime: e.target.value })}
                            placeholder="ಉದಾ: 5 ನಿಮಿಷ ಓದು"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಪ್ರಕಟಣೆಯ ಮೂಲ / ಪತ್ರಿಕೆ (ಐಚ್ಛಿಕ)
                          </label>
                          <input
                            type="text"
                            value={writingForm.publishedPlace}
                            onChange={(e) => setWritingForm({ ...writingForm, publishedPlace: e.target.value })}
                            placeholder="ಉದಾ: ಸಾಹಿತ್ಯ ಸಿಂಧು"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಮುಖಪುಟ ಚಿತ್ರದ ಲಿಂಕ್ (Cover Image URL - ಐಚ್ಛಿಕ)
                        </label>
                        <input
                          type="url"
                          value={writingForm.coverImage}
                          onChange={(e) => setWritingForm({ ...writingForm, coverImage: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ / ಸಾರಾಂಶ (Excerpt - 2-3 ಸಾಲುಗಳು) *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={writingForm.excerpt}
                          onChange={(e) => setWritingForm({ ...writingForm, excerpt: e.target.value })}
                          placeholder="ಓದುಗರನ್ನು ಆಕರ್ಷಿಸುವಂತೆ ಕಥೆ ಅಥವಾ ಲೇಖನದ ತಿರುಳನ್ನು ಬರೆಯಿರಿ..."
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಸಂಪೂರ್ಣ ಕಥೆ / ಲೇಖನದ ವಿಷಯ (Full Content) *
                        </label>
                        <textarea
                          required
                          rows={8}
                          value={writingForm.content}
                          onChange={(e) => setWritingForm({ ...writingForm, content: e.target.value })}
                          placeholder="ಇಲ್ಲಿ ಪೂರ್ಣ ಕಥೆ ಅಥವಾ ಲೇಖನವನ್ನು ಪ್ಯಾರಾಗ್ರಾಫ್‌ಗಳಾಗಿ ಬರೆಯಿರಿ..."
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded font-serif"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಟ್ಯಾಗ್ಸ್ (ಅಲ್ಪವಿರಾಮದಿಂದ ಪ್ರತ್ಯೇಕಿಸಿ)
                          </label>
                          <input
                            type="text"
                            value={writingForm.tags}
                            onChange={(e) => setWritingForm({ ...writingForm, tags: e.target.value })}
                            placeholder="ಗ್ರಾಮೀಣ ಕಥೆ, ಶಿಕ್ಷಣ, ಮಕ್ಕಳ ಸಾಹಿತ್ಯ"
                            className="px-3 py-1.5 text-xs bg-white border border-[#D5C2A4] rounded w-64"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingWriting(false);
                              setEditingWriting(null);
                            }}
                            className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-semibold rounded hover:bg-stone-300"
                          >
                            ರದ್ದು
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8D2C22] shadow-xs flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>{editingWriting ? 'ಬದಲಾವಣೆ ಉಳಿಸಿ' : 'ಬರಹ ಪ್ರಕಟಿಸಿ'}</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : null}

                  {/* Writings List Table */}
                  <div className="space-y-3">
                    {writings.map((w) => (
                      <div
                        key={w.id}
                        className="p-4 bg-white rounded-lg border border-[#E3D4B6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <span className="font-semibold text-[#78241C]">{w.categoryLabel}</span>
                            <span>·</span>
                            <span>{w.date}</span>
                            <span>·</span>
                            <span>{w.likes} ಮೆಚ್ಚುಗೆಗಳು</span>
                          </div>
                          <h5 className="font-bold font-literary text-base text-stone-900">
                            {w.title}
                          </h5>
                          <p className="text-xs text-stone-600 line-clamp-1">{w.excerpt}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => startEditWriting(w)}
                            className="p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded"
                            title="ತಿದ್ದಿ"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`"${w.title}" ಬರಹವನ್ನು ಖಂಡಿತವಾಗಿ ತೆಗೆದುಹಾಕಬೇಕೇ?`)) {
                                deleteWriting(w.id);
                              }
                            }}
                            className="p-2 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded"
                            title="ತೆಗೆದುಹಾಕಿ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2 & 3: BOOKS MANAGEMENT */}
              {(activeTab === 'books' || activeTab === 'recommended') && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold font-literary text-lg text-stone-900">
                        {activeTab === 'books'
                          ? 'ಸ್ವರಚಿತ ಪುಸ್ತಕಗಳ ಪ್ರಮೋಷನ್ & ಮಾರಾಟ ನಿರ್ವಹಣೆ'
                          : 'ಇತರ ಶ್ರೇಷ್ಠ ಲೇಖಕರ ಪುಸ್ತಕಗಳ ಶಿಫಾರಸು ನಿರ್ವಹಣೆ'}
                      </h4>
                      <p className="text-xs text-stone-600">
                        {activeTab === 'books'
                          ? 'ಬೆಲೆ, ರಿಯಾಯಿತಿ, ಮುಖಪುಟ, ಮಾದರಿ ಸಾಲುಗಳು ಮತ್ತು ಸ್ಟಾಕ್ ವಿವರಗಳನ್ನು ಬದಲಾಯಿಸಿ.'
                          : 'ಕುವೆಂಪು, ತೇಜಸ್ವಿ ಮುಂತಾದ ಹಿರಿಯ ಲೇಖಕರ ಕೃತಿಗಳನ್ನು ಇಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ.'}
                      </p>
                    </div>

                    {!isAddingBook && (
                      <button
                        onClick={() => {
                          setEditingBook(null);
                          setBookIsForAuthor(activeTab === 'books');
                          setBookForm({
                            title: '',
                            subtitle: '',
                            author: activeTab === 'books' ? 'ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ' : '',
                            price: 180,
                            originalPrice: 220,
                            coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
                            description: '',
                            genre: 'ಕಾದಂಬರಿ',
                            pages: 200,
                            publishedYear: '2025',
                            publisher: '',
                            sampleExcerpt: '',
                            inStock: true,
                            features: 'ಉತ್ತಮ ಮುದ್ರಣ',
                            buyUrl: '',
                          });
                          setIsAddingBook(true);
                        }}
                        className="px-4 py-2 bg-[#78241C] text-white text-xs font-semibold rounded-md hover:bg-[#8D2C22] flex items-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{activeTab === 'books' ? 'ಹೊಸ ಪುಸ್ತಕ ಸೇರಿಸಿ' : 'ಶಿಫಾರಸು ಕೃತಿ ಸೇರಿಸಿ'}</span>
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Book Form */}
                  {isAddingBook && (
                    <form onSubmit={handleSaveBook} className="p-5 bg-[#FAF6EE] rounded-xl border border-[#E7DCBF] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#E3D4B6] pb-3">
                        <h5 className="font-bold text-sm text-[#78241C]">
                          {editingBook ? 'ಪುಸ್ತಕದ ವಿವರ ತಿದ್ದುಪಡಿ' : 'ಹೊಸ ಪುಸ್ತಕ ಸೇರ್ಪಡೆ'}
                        </h5>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingBook(false);
                            setEditingBook(null);
                          }}
                          className="text-xs text-stone-600 hover:text-stone-900"
                        >
                          ರದ್ದುಮಾಡಿ
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಪುಸ್ತಕದ ಶೀರ್ಷಿಕೆ *
                          </label>
                          <input
                            type="text"
                            required
                            value={bookForm.title}
                            onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                            placeholder="ಉದಾ: ಅಕ್ಷರ ತಪಸ್ವಿ"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಲೇಖಕರ ಹೆಸರು *
                          </label>
                          <input
                            type="text"
                            required
                            value={bookForm.author}
                            onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                            placeholder="ಉದಾ: ಚನ್ನಬಸಪ್ಪ ಉಪ್ಪಿನ ಅಥವಾ ಕುವೆಂಪು"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಬೆಲೆ (₹) *
                          </label>
                          <input
                            type="number"
                            required
                            value={bookForm.price}
                            onChange={(e) => setBookForm({ ...bookForm, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಹಳೆಯ ಬೆಲೆ / ಎಂಆರ್‌ಪಿ (₹)
                          </label>
                          <input
                            type="number"
                            value={bookForm.originalPrice}
                            onChange={(e) => setBookForm({ ...bookForm, originalPrice: Number(e.target.value) })}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ವರ್ಗ / ಪ್ರಕಾರ
                          </label>
                          <input
                            type="text"
                            value={bookForm.genre}
                            onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
                            placeholder="ಕಾದಂಬರಿ / ಕಥಾಸಂಕಲನ"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಪುಟಗಳು
                          </label>
                          <input
                            type="number"
                            value={bookForm.pages}
                            onChange={(e) => setBookForm({ ...bookForm, pages: Number(e.target.value) })}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಪ್ರಕಾಶನ ಸಂಸ್ಥೆ & ವರ್ಷ
                          </label>
                          <input
                            type="text"
                            value={bookForm.publisher}
                            onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })}
                            placeholder="ಉದಾ: ಸಾಹಿತ್ಯ ಸಿಂಧು ಪ್ರಕಾಶನ (2025)"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಕವರ್ ಚಿತ್ರದ URL (Cover Image)
                          </label>
                          <input
                            type="url"
                            value={bookForm.coverImage}
                            onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಪುಸ್ತಕದ ವಿವರಣೆ *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={bookForm.description}
                          onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                          placeholder="ಪುಸ್ತಕದ ಕಥಾವಸ್ತು, ಯಾರು ಓದಬೇಕು, ವಿಶೇಷತೆಗಳನ್ನು ಬರೆಯಿರಿ..."
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಮಾದರಿ ಸಾಲುಗಳು / ಮುನ್ನುಡಿಯ ತುಣುಕು (Sample Excerpt)
                        </label>
                        <textarea
                          rows={2}
                          value={bookForm.sampleExcerpt}
                          onChange={(e) => setBookForm({ ...bookForm, sampleExcerpt: e.target.value })}
                          placeholder="ಪುಸ್ತಕದ ಆಯ್ದ ಸಾಲುಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                        />
                      </div>

                      {activeTab === 'recommended' && (
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಖರೀದಿ / ಓದುವ ಕೊಂಡಿ (Buy Link / URL)
                          </label>
                          <input
                            type="url"
                            value={bookForm.buyUrl}
                            onChange={(e) => setBookForm({ ...bookForm, buyUrl: e.target.value })}
                            placeholder="https://sapnaonline.com/..."
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingBook(false);
                            setEditingBook(null);
                          }}
                          className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-semibold rounded hover:bg-stone-300"
                        >
                          ರದ್ದು
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8D2C22] shadow-xs flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>ಉಳಿಸಿ</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Books List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {books
                      .filter((b) => (activeTab === 'books' ? b.isAuthorBook : !b.isAuthorBook))
                      .map((b) => (
                        <div
                          key={b.id}
                          className="p-4 bg-white rounded-lg border border-[#E3D4B6] flex gap-3 justify-between items-start shadow-2xs"
                        >
                          <img
                            src={b.coverImage}
                            alt={b.title}
                            className="w-16 h-22 object-cover rounded shrink-0 shadow-2xs"
                          />
                          <div className="flex-1 space-y-1">
                            <h5 className="font-bold font-literary text-sm text-stone-900">
                              {b.title}
                            </h5>
                            <p className="text-xs text-stone-500">ಲೇಖಕರು: {b.author}</p>
                            <p className="text-xs font-bold text-[#78241C]">
                              ₹{b.price} {b.originalPrice ? `(MRP ₹${b.originalPrice})` : ''}
                            </p>
                            <p className="text-[11px] text-stone-600 line-clamp-1">
                              {b.description}
                            </p>
                          </div>

                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => startEditBook(b)}
                              className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded"
                              title="ತಿದ್ದಿ"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`"${b.title}" ಪುಸ್ತಕವನ್ನು ತೆಗೆದುಹಾಕಬೇಕೇ?`)) {
                                  deleteBook(b.id);
                                }
                              }}
                              className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded"
                              title="ತೆಗೆದುಹಾಕಿ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 4: EXTERNAL LINKS MANAGEMENT */}
              {activeTab === 'links' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold font-literary text-lg text-stone-900">
                        ಪತ್ರಿಕಾ ಲೇಖನಗಳು & ಅಂತರ್ಜಾಲ ಲಿಂಕ್‌ಗಳ ನಿರ್ವಹಣೆ
                      </h4>
                      <p className="text-xs text-stone-600">
                        ಪ್ರಜಾವಾಣಿ, ವಿಜಯವಾಣಿ ಮುಂತಾದ ಪತ್ರಿಕೆಗಳಲ್ಲಿ ಪ್ರಕಟವಾದ ಲೇಖನಗಳ ಕೊಂಡಿಗಳನ್ನು ಸೇರಿಸಿ.
                      </p>
                    </div>

                    {!isAddingLink && (
                      <button
                        onClick={() => setIsAddingLink(true)}
                        className="px-4 py-2 bg-[#78241C] text-white text-xs font-semibold rounded-md hover:bg-[#8D2C22] flex items-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>ಹೊಸ ಲಿಂಕ್ ಸೇರಿಸಿ</span>
                      </button>
                    )}
                  </div>

                  {isAddingLink && (
                    <form onSubmit={handleSaveLink} className="p-5 bg-[#FAF6EE] rounded-xl border border-[#E7DCBF] space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಲೇಖನದ ಶೀರ್ಷಿಕೆ *
                          </label>
                          <input
                            type="text"
                            required
                            value={linkForm.title}
                            onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                            placeholder="ಉದಾ: ಗ್ರಾಮೀಣ ಶಾಲೆಗಳಲ್ಲಿ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಪತ್ರಿಕೆ / ಜಾಲತಾಣದ ಹೆಸರು *
                          </label>
                          <input
                            type="text"
                            required
                            value={linkForm.publicationName}
                            onChange={(e) => setLinkForm({ ...linkForm, publicationName: e.target.value })}
                            placeholder="ಉದಾ: ಪ್ರಜಾವಾಣಿ (Prajavani)"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಲೇಖನದ ನೇರ URL ಲಿಂಕ್ *
                          </label>
                          <input
                            type="url"
                            required
                            value={linkForm.url}
                            onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                            placeholder="https://prajavani.net/..."
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ವರ್ಗ
                          </label>
                          <input
                            type="text"
                            value={linkForm.category}
                            onChange={(e) => setLinkForm({ ...linkForm, category: e.target.value })}
                            placeholder="ಶಿಕ್ಷಣ / ಸಾಹಿತ್ಯ ವಿಮರ್ಶೆ"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ
                        </label>
                        <input
                          type="text"
                          value={linkForm.description}
                          onChange={(e) => setLinkForm({ ...linkForm, description: e.target.value })}
                          placeholder="ಈ ಲೇಖನದ ಮುಖ್ಯ ಉದ್ದೇಶ..."
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingLink(false)}
                          className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-semibold rounded hover:bg-stone-300"
                        >
                          ರದ್ದು
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8D2C22]"
                        >
                          ಉಳಿಸಿ
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {externalLinks.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-white rounded-lg border border-[#E3D4B6] flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-[#78241C]">
                            {item.publicationName} · {item.publishDate}
                          </span>
                          <h5 className="font-bold text-sm text-stone-900">{item.title}</h5>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-900 hover:underline flex items-center gap-1"
                          >
                            <span>{item.url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm('ಈ ಲಿಂಕ್ ಅನ್ನು ಖಂಡಿತವಾಗಿ ತೆಗೆದುಹಾಕಬೇಕೇ?')) {
                              deleteExternalLink(item.id);
                            }
                          }}
                          className="p-2 text-stone-500 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: MEDIA MANAGEMENT */}
              {activeTab === 'media' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold font-literary text-lg text-stone-900">
                        ಫೋಟೋ ಮತ್ತು ವೀಡಿಯೋಗಳ ನಿರ್ವಹಣೆ
                      </h4>
                      <p className="text-xs text-stone-600">
                        ನಿಮ್ಮ ಸಾಹಿತ್ಯ ಸಮ್ಮೇಳನಗಳು, ಉಪನ್ಯಾಸಗಳು ಮತ್ತು ಶಾಲಾ ಕಾರ್ಯಕ್ರಮಗಳ ಚಿತ್ರ-ವೀಡಿಯೋಗಳನ್ನು
                        ಸೇರಿಸಿ.
                      </p>
                    </div>

                    {!isAddingMedia && (
                      <button
                        onClick={() => setIsAddingMedia(true)}
                        className="px-4 py-2 bg-[#78241C] text-white text-xs font-semibold rounded-md hover:bg-[#8D2C22] flex items-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>ಹೊಸ ಮಾಧ್ಯಮ ಸೇರಿಸಿ</span>
                      </button>
                    )}
                  </div>

                  {isAddingMedia && (
                    <form onSubmit={handleSaveMedia} className="p-5 bg-[#FAF6EE] rounded-xl border border-[#E7DCBF] space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಪ್ರಕಾರ *
                          </label>
                          <select
                            value={mediaForm.type}
                            onChange={(e) => setMediaForm({ ...mediaForm, type: e.target.value as any })}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          >
                            <option value="photo">ಫೋಟೋ (Photo)</option>
                            <option value="video">ವೀಡಿಯೋ (YouTube Video Embed)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಶೀರ್ಷಿಕೆ *
                          </label>
                          <input
                            type="text"
                            required
                            value={mediaForm.title}
                            onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                            placeholder="ಉದಾ: ಸಾಹಿತ್ಯ ಸಮ್ಮೇಳನದಲ್ಲಿ ಭಾಷಣ"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            {mediaForm.type === 'video'
                              ? 'YouTube Embed URL (ಉದಾ: https://www.youtube.com/embed/...)'
                              : 'ಚಿತ್ರದ ನೇರ ಲಿಂಕ್ (Photo URL)'} *
                          </label>
                          <input
                            type="url"
                            required
                            value={mediaForm.url}
                            onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                            placeholder={mediaForm.type === 'video' ? 'https://www.youtube.com/embed/...' : 'https://...'}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            ಸ್ಥಳ (Location)
                          </label>
                          <input
                            type="text"
                            value={mediaForm.location}
                            onChange={(e) => setMediaForm({ ...mediaForm, location: e.target.value })}
                            placeholder="ಉದಾ: ಧಾರವಾಡ, ಹಾವೇರಿ"
                            className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ವಿವರಣೆ
                        </label>
                        <input
                          type="text"
                          value={mediaForm.description}
                          onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })}
                          placeholder="ಈ ಫೋಟೋ ಅಥವಾ ವೀಡಿಯೋದ ವಿವರ..."
                          className="w-full px-3 py-2 text-sm bg-white border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingMedia(false)}
                          className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-semibold rounded hover:bg-stone-300"
                        >
                          ರದ್ದು
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8D2C22]"
                        >
                          ಉಳಿಸಿ
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {media.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg border border-[#E3D4B6] overflow-hidden shadow-2xs flex flex-col justify-between"
                      >
                        <img
                          src={item.thumbnailUrl || item.url}
                          alt={item.title}
                          className="w-full h-32 object-cover bg-stone-100"
                        />
                        <div className="p-3 space-y-1">
                          <span className="text-[10px] font-semibold text-[#78241C] uppercase">
                            {item.type === 'video' ? 'ವೀಡಿಯೋ' : 'ಫೋಟೋ'} · {item.date}
                          </span>
                          <h6 className="font-bold text-xs text-stone-900 line-clamp-1">
                            {item.title}
                          </h6>
                        </div>
                        <div className="p-2 border-t border-stone-100 flex justify-end">
                          <button
                            onClick={() => {
                              if (confirm('ಈ ಮಾಧ್ಯಮವನ್ನು ತೆಗೆದುಹಾಕಬೇಕೇ?')) {
                                deleteMedia(item.id);
                              }
                            }}
                            className="text-stone-500 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: ORDERS & INQUIRIES */}
              {activeTab === 'orders' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-bold font-literary text-lg text-stone-900">
                      ಓದುಗರಿಂದ ಬಂದಿರುವ ಪುಸ್ತಕ ಆರ್ಡರ್‌ಗಳು & ವಿಚಾರಣೆಗಳು ({orders.length})
                    </h4>
                    <p className="text-xs text-stone-600">
                      ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ ಪುಸ್ತಕ ಖರೀದಿಸಲು ವಿನಂತಿಸಿದ ಓದುಗರ ವಿವರಗಳು.
                    </p>
                  </div>

                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-5 bg-white rounded-xl border border-[#E3D4B6] space-y-3 shadow-2xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2">
                            <div>
                              <span className="text-xs text-stone-500">{ord.date}</span>
                              <h5 className="font-bold text-base text-stone-900">
                                {ord.customerName}
                              </h5>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={ord.status}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                                className="text-xs px-2 py-1 bg-stone-100 border border-stone-300 rounded font-medium"
                              >
                                <option value="new">ಹೊಸ ಬೇಡಿಕೆ (New)</option>
                                <option value="contacted">ಸಂಪರ್ಕಿಸಲಾಗಿದೆ (Contacted)</option>
                                <option value="completed">ರವಾನಿಸಲಾಗಿದೆ (Completed)</option>
                              </select>

                              <button
                                onClick={() => {
                                  if (confirm('ಈ ಆರ್ಡರ್ ಅಳಿಸಬೇಕೇ?')) deleteOrder(ord.id);
                                }}
                                className="text-stone-400 hover:text-rose-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                            <div>
                              <strong className="text-stone-900">ಕೋರಿದ ಪುಸ್ತಕ:</strong> {ord.bookTitle}
                              <br />
                              <strong className="text-stone-900">ಪ್ರತಿಗಳ ಸಂಖ್ಯೆ:</strong> {ord.copies}
                            </div>
                            <div>
                              <strong className="text-stone-900">ದೂರವಾಣಿ:</strong> {ord.customerPhone}
                              {ord.customerEmail && <div><strong>ಇಮೇಲ್:</strong> {ord.customerEmail}</div>}
                            </div>
                            <div>
                              <strong className="text-stone-900">ವಿಳಾಸ:</strong> {ord.address}
                              {ord.notes && <div className="text-amber-800"><strong>ಸೂಚನೆ:</strong> {ord.notes}</div>}
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end">
                            <a
                              href={`https://wa.me/${ord.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`ನಮಸ್ಕಾರ ${ord.customerName} ಅವರೇ, ನೀವು ಅಕ್ಷರ ಸಿಂಧು ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ "${ord.bookTitle}" ಪುಸ್ತಕಕ್ಕೆ ನೀಡಿದ ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಿದ್ದೇವೆ.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1.5"
                            >
                              <span>ಗ್ರಾಹಕರಿಗೆ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಿ</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#D5C2A4]">
                      <ShoppingBag className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-stone-800">
                        ಇನ್ನೂ ಯಾವುದೇ ಪುಸ್ತಕದ ಆರ್ಡರ್‌ಗಳು ದಾಖಲಾಗಿಲ್ಲ.
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        ಓದುಗರು ಪುಸ್ತಕ ಪುಟದಿಂದ ಆರ್ಡರ್ ಮಾಡಿದಾಗ ವಿವರಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.
                      </p>
                    </div>
                  )}

                  {/* Reader Messages */}
                  <div className="pt-8 border-t border-[#E3D4B6]">
                    <h5 className="font-bold font-literary text-base text-stone-900 mb-4">
                      ಓದುಗರ ಸಂದೇಶಗಳು / ವಿಚಾರಣೆಗಳು ({messages.length})
                    </h5>
                    {messages.length > 0 ? (
                      <div className="space-y-3">
                        {messages.map((m) => (
                          <div
                            key={m.id}
                            className="p-4 bg-white rounded-lg border border-[#E3D4B6] space-y-1 shadow-2xs"
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-stone-900">{m.name} ({m.emailOrPhone})</span>
                              <div className="flex items-center gap-2">
                                <span className="text-stone-500">{m.date}</span>
                                <button
                                  onClick={() => deleteMessage(m.id)}
                                  className="text-stone-400 hover:text-rose-600"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className="text-xs font-semibold text-[#78241C]">{m.subject}</div>
                            <p className="text-xs text-stone-700 font-serif">{m.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-stone-500">ಯಾವುದೇ ಸಂದೇಶಗಳಿಲ್ಲ.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 7: PROFILE & QUOTES */}
              {activeTab === 'profile' && (
                <div className="p-6 space-y-8">
                  <div>
                    <h4 className="font-bold font-literary text-lg text-stone-900">
                      ಲೇಖಕರ ಪ್ರೊಫೈಲ್ & ಪರಿಚಯ ತಿದ್ದುಪಡಿ
                    </h4>
                    <p className="text-xs text-stone-600">
                      ನಿಮ್ಮ ಹೆಸರು, ವಿದ್ಯಾರ್ಹತೆ, ವೃತ್ತಿ, ಇಮೇಲ್, ಪರಿಚಯ ಬರಹಗಳು ಹಾಗೂ ಪ್ರಶಸ್ತಿಗಳನ್ನು ಇಲ್ಲಿ ಬದಲಾಯಿಸಬಹುದು.
                    </p>
                  </div>

                  {profileSuccess && (
                    <div className="p-3 bg-emerald-100 text-emerald-900 text-xs rounded-md flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>ಪ್ರೊಫೈಲ್ ವಿವರಗಳು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಣಗೊಂಡಿವೆ!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4 bg-white p-6 rounded-xl border border-[#E3D4B6]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಹೆಸರು *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ವಿದ್ಯಾರ್ಹತೆ (Qualification) *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.qualification}
                          onChange={(e) => setProfileForm({ ...profileForm, qualification: e.target.value })}
                          placeholder="M.Sc ಭೂಗೋಳಶಾಸ್ತ್ರ"
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ವೃತ್ತಿ / ಹುದ್ದೆ *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.designation}
                          onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                          placeholder="ಶಿಕ್ಷಕರು & ಸಾಹಿತಿಗಳು"
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಇಮೇಲ್ ವಿಳಾಸ *
                        </label>
                        <input
                          type="email"
                          required
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          UPI ID (ಪುಸ್ತಕ ಖರೀದಿಗೆ)
                        </label>
                        <input
                          type="text"
                          value={profileForm.upiId || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, upiId: e.target.value })}
                          placeholder="channu180295@okaxis"
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ಸಾಹಿತ್ಯಿಕ ಧ್ಯೇಯವಾಕ್ಯ (Literary Motto)
                      </label>
                      <input
                        type="text"
                        value={profileForm.literaryMotto}
                        onChange={(e) => setProfileForm({ ...profileForm, literaryMotto: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ಪ್ರೊಫೈಲ್ ಫೋಟೋ URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.profilePhoto}
                        onChange={(e) => setProfileForm({ ...profileForm, profilePhoto: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ಆತ್ಮೀಯ ಪರಿಚಯ (ಪ್ಯಾರಾಗ್ರಾಫ್‌ಗಳು)
                      </label>
                      <textarea
                        rows={4}
                        value={profileForm.bioParagraphs.join('\n\n')}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            bioParagraphs: e.target.value.split('\n\n').filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded font-serif"
                      />
                    </div>

                    {/* Manage Awards & Achievements */}
                    <div className="pt-4 border-t border-[#E3D4B6] space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-stone-800 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-700" />
                          <span>ಸಾಹಿತ್ಯಿಕ & ಶೈಕ್ಷಣಿಕ ಪ್ರಶಸ್ತಿ/ಪುರಸ್ಕಾರಗಳು ({profileForm.achievements?.length || 0})</span>
                        </label>
                        <span className="text-[11px] text-stone-500">
                          (ಮುಂದೆ ದೊರೆಯುವ ಪ್ರಶಸ್ತಿಗಳನ್ನು ಇಲ್ಲಿ ಸೇರಿಸಬಹುದು)
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          placeholder="ಹೊಸ ಪ್ರಶಸ್ತಿ ಅಥವಾ ಸನ್ಮಾನದ ವಿವರ ಬರೆಯಿರಿ..."
                          className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newAchievement.trim()) {
                              setProfileForm({
                                ...profileForm,
                                achievements: [...(profileForm.achievements || []), newAchievement.trim()],
                              });
                              setNewAchievement('');
                            }
                          }}
                          className="px-4 py-2 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8D2C22] shrink-0"
                        >
                          ಪ್ರಶಸ್ತಿ ಸೇರಿಸಿ
                        </button>
                      </div>

                      {profileForm.achievements && profileForm.achievements.length > 0 ? (
                        <div className="space-y-1.5 pt-1">
                          {profileForm.achievements.map((ach, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 bg-[#FAF6EE] border border-[#E7DCBF] rounded text-xs text-stone-800"
                            >
                              <span>✓ {ach}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setProfileForm({
                                    ...profileForm,
                                    achievements: profileForm.achievements.filter((_, i) => i !== idx),
                                  });
                                }}
                                className="text-stone-400 hover:text-rose-600 p-1"
                                title="ತೆಗೆದುಹಾಕಿ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 bg-[#FAF7F0] border border-dashed border-[#D5C2A4] rounded text-xs text-stone-500 text-center">
                          ಸದ್ಯಕ್ಕೆ ಯಾವುದೇ ಪ್ರಶಸ್ತಿಗಳನ್ನು ಸೇರಿಸಿಲ್ಲ. ಮುಂದೆ ಲಭಿಸಿದಾಗ ಇಲ್ಲಿ ಸುಲಭವಾಗಿ ಸೇರಿಸಬಹುದು.
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8D2C22] shadow-xs flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ ಉಳಿಸಿ</span>
                      </button>
                    </div>
                  </form>

                  {/* Quotes Manager */}
                  <div className="pt-6 border-t border-[#E3D4B6] space-y-4">
                    <h5 className="font-bold font-literary text-base text-stone-900">
                      ಸಾಹಿತ್ಯ ನುಡಿಮುತ್ತುಗಳು ({quotes.length})
                    </h5>

                    <form onSubmit={handleSaveQuote} className="flex flex-col sm:flex-row gap-2 bg-[#FAF6EE] p-4 rounded-lg border border-[#E7DCBF]">
                      <input
                        type="text"
                        required
                        value={newQuoteText}
                        onChange={(e) => setNewQuoteText(e.target.value)}
                        placeholder="ಹೊಸ ನುಡಿಮುತ್ತು ಅಥವಾ ಸಾಹಿತ್ಯದ ಸಾಲು..."
                        className="flex-1 px-3 py-2 text-xs bg-white border border-[#D5C2A4] rounded"
                      />
                      <input
                        type="text"
                        value={newQuoteAuthor}
                        onChange={(e) => setNewQuoteAuthor(e.target.value)}
                        placeholder="ಸಾಹಿತಿಯ ಹೆಸರು"
                        className="w-44 px-3 py-2 text-xs bg-white border border-[#D5C2A4] rounded"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8D2C22] shrink-0"
                      >
                        ಸೇರಿಸಿ
                      </button>
                    </form>

                    <div className="space-y-2">
                      {quotes.map((q) => (
                        <div
                          key={q.id}
                          className="p-3 bg-white rounded border border-[#E3D4B6] flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-serif italic">"{q.text}"</span>
                            <span className="text-stone-500 ml-2">— {q.author}</span>
                          </div>
                          <button
                            onClick={() => deleteQuote(q.id)}
                            className="text-stone-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: SECURITY & BACKUP */}
              {activeTab === 'security' && (
                <div className="p-6 space-y-8 max-w-2xl">
                  {/* Change Password Box */}
                  <div className="bg-white p-6 rounded-xl border border-[#E3D4B6] space-y-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-stone-900 font-bold font-literary text-base">
                      <Key className="w-5 h-5 text-[#78241C]" />
                      <span>ಅಡ್ಮಿನ್ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾವಣೆ</span>
                    </div>

                    <p className="text-xs text-stone-600">
                      ನಿಮ್ಮ ಅಡ್ಮಿನ್ ನಿಯಂತ್ರಣವನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಲು ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಕಾಲಕಾಲಕ್ಕೆ
                      ಬದಲಾಯಿಸಿಕೊಳ್ಳಿ.
                    </p>

                    {passwordMsg && (
                      <div
                        className={`p-3 text-xs rounded-md ${
                          passwordMsg.type === 'success'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}
                      >
                        {passwordMsg.text}
                      </div>
                    )}

                    <form onSubmit={handleChangePassword} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಪ್ರಸ್ತುತ ಪಾಸ್‌ವರ್ಡ್ (Current Password) *
                        </label>
                        <input
                          type="password"
                          required
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ (New Password) *
                        </label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಖಚಿತಪಡಿಸಿ (Confirm New Password) *
                        </label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-stone-50 border border-[#D5C2A4] rounded"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#78241C] text-white text-xs font-semibold rounded hover:bg-[#8D2C22] shadow-xs"
                      >
                        ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ
                      </button>
                    </form>
                  </div>

                  {/* Backup & Restore Box */}
                  <div className="bg-white p-6 rounded-xl border border-[#E3D4B6] space-y-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-stone-900 font-bold font-literary text-base">
                      <Download className="w-5 h-5 text-amber-700" />
                      <span>ವೆಬ್‌ಸೈಟ್ ಡೇಟಾ ಬ್ಯಾಕಪ್ & ಮರುಸ್ಥಾಪನೆ (Data Backup)</span>
                    </div>

                    <p className="text-xs text-stone-600">
                      ನೀವು ಬರೆದ ಎಲ್ಲಾ ಕಥೆಗಳು, ಲೇಖನಗಳು, ಪುಸ್ತಕಗಳ ವಿವರ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ಗೆ
                      ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ JSON ಫೈಲ್ ರೂಪದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬಹುದು.
                    </p>

                    {backupMsg && (
                      <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 text-xs rounded">
                        {backupMsg}
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={handleDownloadBackup}
                        className="px-4 py-2 bg-stone-800 text-white text-xs font-semibold rounded hover:bg-stone-900 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>ಡೇಟಾ ಬ್ಯಾಕಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ</span>
                      </button>

                      <label className="px-4 py-2 bg-stone-200 text-stone-800 text-xs font-semibold rounded hover:bg-stone-300 flex items-center gap-2 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>ಬ್ಯಾಕಪ್ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportBackup}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span>ಆರಂಭಿಕ ಸ್ಥಿತಿಗೆ ಮರುಹೊಂದಿಸಿ (Reset)</span>
                      <button
                        onClick={() => {
                          if (confirm('ಎಲ್ಲಾ ದತ್ತಾಂಶಗಳನ್ನು ಆರಂಭಿಕ ಮಾದರಿಗೆ ಮರುಹೊಂದಿಸಬೇಕೇ? ನಿಮ್ಮ ಎಲ್ಲಾ ಹೊಸ ಬರಹಗಳು ಅಳಿಸಿಹೋಗುತ್ತವೆ.')) {
                            resetAllData();
                            alert('ಮರುಹೊಂದಿಸಲಾಗಿದೆ!');
                          }
                        }}
                        className="text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>ಡೀಫಾಲ್ಟ್‌ಗೆ ರಿಸೆಟ್ ಮಾಡಿ</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
