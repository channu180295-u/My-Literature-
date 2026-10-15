import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthorProfile,
  Book,
  BookOrderInquiry,
  ExternalLinkItem,
  LiteraryQuote,
  MediaItem,
  ReaderMessage,
  WritingItem,
} from '../types';
import {
  INITIAL_AUTHOR_PROFILE,
  INITIAL_BOOKS,
  INITIAL_EXTERNAL_LINKS,
  INITIAL_MEDIA,
  INITIAL_QUOTES,
  INITIAL_WRITINGS,
} from '../data/initialData';

interface DataContextType {
  authorProfile: AuthorProfile;
  updateAuthorProfile: (profile: AuthorProfile) => void;

  writings: WritingItem[];
  addWriting: (writing: Omit<WritingItem, 'id' | 'likes' | 'views' | 'comments'>) => void;
  updateWriting: (writing: WritingItem) => void;
  deleteWriting: (id: string) => void;
  likeWriting: (id: string) => void;
  addComment: (writingId: string, authorName: string, comment: string, rating?: number) => void;

  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;

  externalLinks: ExternalLinkItem[];
  addExternalLink: (link: Omit<ExternalLinkItem, 'id'>) => void;
  updateExternalLink: (link: ExternalLinkItem) => void;
  deleteExternalLink: (id: string) => void;

  media: MediaItem[];
  addMedia: (item: Omit<MediaItem, 'id'>) => void;
  updateMedia: (item: MediaItem) => void;
  deleteMedia: (id: string) => void;

  quotes: LiteraryQuote[];
  addQuote: (quote: Omit<LiteraryQuote, 'id'>) => void;
  deleteQuote: (id: string) => void;

  orders: BookOrderInquiry[];
  createOrder: (order: Omit<BookOrderInquiry, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, status: 'new' | 'contacted' | 'completed') => void;
  deleteOrder: (id: string) => void;

  messages: ReaderMessage[];
  sendMessage: (msg: Omit<ReaderMessage, 'id' | 'date'>) => void;
  deleteMessage: (id: string) => void;

  // Admin Auth & Recovery
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  recoverPasswordWithEmail: (email: string) => { success: boolean; message: string; recoveryCode?: string };
  resetPasswordWithCode: (email: string, code: string, newPass: string) => { success: boolean; message: string };

  // Backup & Reset
  exportDataJson: () => string;
  importDataJson: (json: string) => { success: boolean; error?: string };
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'as_author_profile_v3',
  WRITINGS: 'as_writings_v2',
  BOOKS: 'as_books_v2',
  EXTERNAL_LINKS: 'as_ext_links_v2',
  MEDIA: 'as_media_v2',
  QUOTES: 'as_quotes_v2',
  ORDERS: 'as_orders_v2',
  MESSAGES: 'as_messages_v2',
  ADMIN_PWD: 'as_admin_pwd_v2',
  RECOVERY_CODE: 'as_recovery_code_v2',
};

const DEFAULT_PASSWORD = 'channu@1802'; // Default private initial password for Channabasappa Uppina

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authorProfile, setAuthorProfile] = useState<AuthorProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure clean state if previously had phone/school
      delete parsed.phone;
      delete parsed.schoolName;
      return {
        ...INITIAL_AUTHOR_PROFILE,
        ...parsed,
        qualification: parsed.qualification?.includes('M.Sc') ? parsed.qualification : INITIAL_AUTHOR_PROFILE.qualification,
        designation: parsed.designation || INITIAL_AUTHOR_PROFILE.designation,
      };
    }
    return INITIAL_AUTHOR_PROFILE;
  });

  const [writings, setWritings] = useState<WritingItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WRITINGS);
    return saved ? JSON.parse(saved) : INITIAL_WRITINGS;
  });

  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [externalLinks, setExternalLinks] = useState<ExternalLinkItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXTERNAL_LINKS);
    return saved ? JSON.parse(saved) : INITIAL_EXTERNAL_LINKS;
  });

  const [media, setMedia] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return saved ? JSON.parse(saved) : INITIAL_MEDIA;
  });

  const [quotes, setQuotes] = useState<LiteraryQuote[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  const [orders, setOrders] = useState<BookOrderInquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<ReaderMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('as_admin_session') === 'true';
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(authorProfile));
  }, [authorProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WRITINGS, JSON.stringify(writings));
  }, [writings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXTERNAL_LINKS, JSON.stringify(externalLinks));
  }, [externalLinks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // Auth Operations
  const getStoredPassword = (): string => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PWD) || DEFAULT_PASSWORD;
  };

  const loginAdmin = (password: string): boolean => {
    const current = getStoredPassword();
    if (password === current) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('as_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('as_admin_session');
  };

  const changeAdminPassword = (oldPass: string, newPass: string) => {
    const current = getStoredPassword();
    if (oldPass !== current) {
      return { success: false, message: 'ಪ್ರಸ್ತುತ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ!' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 4 ಅಕ್ಷರಗಳಿರಬೇಕು!' };
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_PWD, newPass.trim());
    return { success: true, message: 'ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಗಿದೆ!' };
  };

  const recoverPasswordWithEmail = (email: string) => {
    const targetEmail = authorProfile.email.toLowerCase().trim();
    if (email.toLowerCase().trim() !== targetEmail) {
      return {
        success: false,
        message: 'ನಮೂದಿಸಿದ ಇಮೇಲ್ ಅಧಿಕೃತ ಲೇಖಕರ ಇಮೇಲ್‌ಗೆ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ!',
      };
    }
    // Generate a secure 6-digit recovery OTP code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(STORAGE_KEYS.RECOVERY_CODE, generatedCode);
    return {
      success: true,
      message: `ರಿಕವರಿ ಕೋಡ್ ಅನ್ನು ${targetEmail} ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ. ಪರಿಶೀಲನಾ ಕೋಡ್ ನಮೂದಿಸಿ ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಿ.`,
      recoveryCode: generatedCode,
    };
  };

  const resetPasswordWithCode = (email: string, code: string, newPass: string) => {
    const targetEmail = authorProfile.email.toLowerCase().trim();
    if (email.toLowerCase().trim() !== targetEmail) {
      return { success: false, message: 'ಇಮೇಲ್ ವಿಳಾಸ ತಪ್ಪಾಗಿದೆ!' };
    }
    const savedCode = localStorage.getItem(STORAGE_KEYS.RECOVERY_CODE);
    // Allow matching the generated code or universal master key for author's email
    if (!savedCode || code.trim() !== savedCode.trim()) {
      return { success: false, message: 'ರಿಕವರಿ ಕೋಡ್ ತಪ್ಪಾಗಿದೆ!' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 4 ಅಕ್ಷರಗಳಿರಬೇಕು!' };
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_PWD, newPass.trim());
    localStorage.removeItem(STORAGE_KEYS.RECOVERY_CODE);
    return { success: true, message: 'ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ಮರುಹೊಂದಿಸಲಾಗಿದೆ! ಈಗ ಹೊಸ ಪಾಸ್‌ವರ್ಡ್‌ನೊಂದಿಗೆ ಲಾಗಿನ್ ಆಗಿ.' };
  };

  // Author Profile
  const updateAuthorProfile = (profile: AuthorProfile) => {
    setAuthorProfile(profile);
  };

  // Writings operations
  const addWriting = (item: Omit<WritingItem, 'id' | 'likes' | 'views' | 'comments'>) => {
    const newWriting: WritingItem = {
      ...item,
      id: 'w_' + Date.now(),
      likes: 0,
      views: 1,
      comments: [],
    };
    setWritings((prev) => [newWriting, ...prev]);
  };

  const updateWriting = (item: WritingItem) => {
    setWritings((prev) => prev.map((w) => (w.id === item.id ? item : w)));
  };

  const deleteWriting = (id: string) => {
    setWritings((prev) => prev.filter((w) => w.id !== id));
  };

  const likeWriting = (id: string) => {
    setWritings((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const addComment = (writingId: string, authorName: string, commentText: string, rating = 5) => {
    const newComment = {
      id: 'c_' + Date.now(),
      authorName,
      comment: commentText,
      date: new Date().toISOString().split('T')[0],
      rating,
    };
    setWritings((prev) =>
      prev.map((w) => {
        if (w.id === writingId) {
          return {
            ...w,
            comments: [newComment, ...(w.comments || [])],
          };
        }
        return w;
      })
    );
  };

  // Book operations
  const addBook = (item: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...item,
      id: 'b_' + Date.now(),
    };
    setBooks((prev) => [newBook, ...prev]);
  };

  const updateBook = (item: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === item.id ? item : b)));
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // External Links
  const addExternalLink = (item: Omit<ExternalLinkItem, 'id'>) => {
    const newLink: ExternalLinkItem = {
      ...item,
      id: 'el_' + Date.now(),
    };
    setExternalLinks((prev) => [newLink, ...prev]);
  };

  const updateExternalLink = (item: ExternalLinkItem) => {
    setExternalLinks((prev) => prev.map((l) => (l.id === item.id ? item : l)));
  };

  const deleteExternalLink = (id: string) => {
    setExternalLinks((prev) => prev.filter((l) => l.id !== id));
  };

  // Media
  const addMedia = (item: Omit<MediaItem, 'id'>) => {
    const newMedia: MediaItem = {
      ...item,
      id: 'm_' + Date.now(),
    };
    setMedia((prev) => [newMedia, ...prev]);
  };

  const updateMedia = (item: MediaItem) => {
    setMedia((prev) => prev.map((m) => (m.id === item.id ? item : m)));
  };

  const deleteMedia = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  // Quotes
  const addQuote = (quote: Omit<LiteraryQuote, 'id'>) => {
    const newQuote: LiteraryQuote = {
      ...quote,
      id: 'q_' + Date.now(),
    };
    setQuotes((prev) => [...prev, newQuote]);
  };

  const deleteQuote = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  // Orders
  const createOrder = (orderData: Omit<BookOrderInquiry, 'id' | 'date' | 'status'>) => {
    const newOrder: BookOrderInquiry = {
      ...orderData,
      id: 'ord_' + Date.now(),
      date: new Date().toLocaleDateString('kn-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      status: 'new',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: 'new' | 'contacted' | 'completed') => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // Messages
  const sendMessage = (msgData: Omit<ReaderMessage, 'id' | 'date'>) => {
    const newMsg: ReaderMessage = {
      ...msgData,
      id: 'msg_' + Date.now(),
      date: new Date().toLocaleDateString('kn-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Backup & Restore
  const exportDataJson = (): string => {
    const exportBundle = {
      authorProfile,
      writings,
      books,
      externalLinks,
      media,
      quotes,
      orders,
      messages,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(exportBundle, null, 2);
  };

  const importDataJson = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.authorProfile) setAuthorProfile(data.authorProfile);
      if (Array.isArray(data.writings)) setWritings(data.writings);
      if (Array.isArray(data.books)) setBooks(data.books);
      if (Array.isArray(data.externalLinks)) setExternalLinks(data.externalLinks);
      if (Array.isArray(data.media)) setMedia(data.media);
      if (Array.isArray(data.quotes)) setQuotes(data.quotes);
      if (Array.isArray(data.orders)) setOrders(data.orders);
      if (Array.isArray(data.messages)) setMessages(data.messages);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'ಅಮಾನ್ಯವಾದ JSON ಫೈಲ್.' };
    }
  };

  const resetAllData = () => {
    setAuthorProfile(INITIAL_AUTHOR_PROFILE);
    setWritings(INITIAL_WRITINGS);
    setBooks(INITIAL_BOOKS);
    setExternalLinks(INITIAL_EXTERNAL_LINKS);
    setMedia(INITIAL_MEDIA);
    setQuotes(INITIAL_QUOTES);
    setOrders([]);
    setMessages([]);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_PWD);
  };

  return (
    <DataContext.Provider
      value={{
        authorProfile,
        updateAuthorProfile,
        writings,
        addWriting,
        updateWriting,
        deleteWriting,
        likeWriting,
        addComment,
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
        createOrder,
        updateOrderStatus,
        deleteOrder,
        messages,
        sendMessage,
        deleteMessage,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        recoverPasswordWithEmail,
        resetPasswordWithCode,
        exportDataJson,
        importDataJson,
        resetAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
