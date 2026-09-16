import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import LessonPreviewModal from './components/LessonPreviewModal';
import CertificateModal from './components/CertificateModal';
import AuthModal from './components/AuthModal';
import ChatWidget from './components/ChatWidget';

import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import MyCoursesPage from './pages/MyCoursesPage';
import CoursePlayerPage from './pages/CoursePlayerPage';

function AppContent() {
  const { currentPage } = useApp();

  // If in learning player view, render focused fullscreen view without normal header/footer
  if (currentPage === 'player') {
    return (
      <div className="min-h-screen bg-dark-950 text-slate-100">
        <CoursePlayerPage />
        <Toast />
        <CertificateModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-brand-cyan/20 selection:text-brand-cyan">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'course-detail' && <CourseDetailPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'my-courses' && <MyCoursesPage />}
      </main>

      <Footer />

      {/* Global Modals, Notifications & Chatbot */}
      <LessonPreviewModal />
      <CertificateModal />
      <AuthModal />
      <ChatWidget />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
