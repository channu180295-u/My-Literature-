export type ContentCategory = 'story' | 'article' | 'novel' | 'poem';

export interface Comment {
  id: string;
  authorName: string;
  comment: string;
  date: string;
  rating?: number;
}

export interface WritingItem {
  id: string;
  title: string;
  kicker?: string;
  category: ContentCategory;
  categoryLabel: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  likes: number;
  views: number;
  isFeatured?: boolean;
  comments: Comment[];
  hasAudio?: boolean;
  publishedPlace?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  description: string;
  genre: string;
  pages: number;
  publishedYear: string;
  publisher: string;
  isbn?: string;
  sampleExcerpt: string;
  inStock: boolean;
  features: string[];
  isAuthorBook: boolean; // true = Channabasappa Uppina's book; false = recommended book from other great authors
  buyUrl?: string; // custom link or default whatsapp
}

export interface ExternalLinkItem {
  id: string;
  title: string;
  publicationName: string; // e.g., ಪ್ರಜಾವಾಣಿ, ವಿಜಯವಾಣಿ, ಕನ್ನಡಪ್ರಭ, ಈ-ಪತ್ರಿಕೆ
  publishDate: string;
  url: string;
  description: string;
  category: string;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  description?: string;
  url: string; // image url or youtube embed url
  thumbnailUrl?: string;
  date: string;
  location?: string;
  tags?: string[];
}

export interface AuthorProfile {
  name: string;
  designation: string;
  qualification: string;
  schoolName?: string;
  location?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  bioParagraphs: string[];
  literaryMotto: string;
  profilePhoto: string;
  bannerPhoto?: string;
  achievements: string[];
  upiId?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface BookOrderInquiry {
  id: string;
  bookId: string;
  bookTitle: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  copies: number;
  notes?: string;
  date: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface ReaderMessage {
  id: string;
  name: string;
  emailOrPhone: string;
  subject: string;
  message: string;
  date: string;
}

export interface LiteraryQuote {
  id: string;
  text: string;
  author: string;
  source?: string;
}
