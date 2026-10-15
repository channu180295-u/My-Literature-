import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiteraryQuotes } from './components/LiteraryQuotes';
import { WritingsSection } from './components/WritingsSection';
import { BookStoreSection } from './components/BookStoreSection';
import { RecommendedBooksSection } from './components/RecommendedBooksSection';
import { ExternalLinksSection } from './components/ExternalLinksSection';
import { MediaGallerySection } from './components/MediaGallerySection';
import { AuthorBioSection } from './components/AuthorBioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/admin/AdminModal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#2C241E] font-sans selection:bg-[#78241C] selection:text-white">
        {/* Navigation Header */}
        <Header
          onOpenAdmin={() => setIsAdminOpen(true)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Hero Section */}
        <div id="home">
          <Hero
            onExploreWritings={() => scrollToSection('writings')}
            onExploreBooks={() => scrollToSection('books')}
          />
        </div>

        {/* Dynamic Literary Quotes Ticker */}
        <LiteraryQuotes />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Author's Writings (Stories, Articles, Novels, Poems) */}
          <WritingsSection />

          {/* 2. Book Store & Promotion (Author's Published Books) */}
          <BookStoreSection />

          {/* 3. Recommended Books from Legendary Authors */}
          <RecommendedBooksSection />

          {/* 4. External Published Articles & Newspaper Links */}
          <ExternalLinksSection />

          {/* 5. Photos & Videos Gallery */}
          <MediaGallerySection />

          {/* 6. Author Bio & Teaching Philosophy */}
          <AuthorBioSection />

          {/* 7. Reader Contact & Direct Feedback */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer
          onOpenAdmin={() => setIsAdminOpen(true)}
          setActiveSection={setActiveSection}
        />

        {/* Admin Management Modal */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </div>
    </DataProvider>
  );
}
