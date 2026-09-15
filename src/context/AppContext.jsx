import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES, INITIAL_ENROLLED_COURSES, PROMO_CODES } from '../data/mockCourses';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'course-detail' | 'checkout' | 'my-courses' | 'player'
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
  const [playerLesson, setPlayerLesson] = useState(null); // { courseId, lessonId }

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Shopping Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('codemaster_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Promo discount
  const [appliedPromo, setAppliedPromo] = useState(null);

  // User & Enrolled Courses - Không tạo tài khoản sẵn theo yêu cầu
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const saved = localStorage.getItem('codemaster_logged_in');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('codemaster_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModal, setAuthModal] = useState({ isOpen: false, initialMode: 'login' });

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('codemaster_enrolled');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [previewModal, setPreviewModal] = useState(null); // { course, lesson }
  const [certificateModal, setCertificateModal] = useState(null); // course object
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('codemaster_logged_in', JSON.stringify(isLoggedIn));
      localStorage.setItem('codemaster_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [isLoggedIn, user]);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem('codemaster_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('codemaster_enrolled', JSON.stringify(enrolledCourses));
    } catch {
      // ignore
    }
  }, [enrolledCourses]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart operations
  const addToCart = (course) => {
    if (isEnrolled(course.id)) {
      showToast('Bạn đã sở hữu khóa học này rồi! Kiểm tra trong "Khóa học của tôi".', 'info');
      return;
    }
    if (cart.some(item => item.id === course.id)) {
      showToast('Khóa học này đã có trong giỏ hàng.', 'info');
      return;
    }
    setCart(prev => [...prev, course]);
    showToast(`Đã thêm "${course.title}" vào giỏ hàng!`, 'success');
  };

  const removeFromCart = (courseId) => {
    setCart(prev => prev.filter(c => c.id !== courseId));
    showToast('Đã xóa khóa học khỏi giỏ hàng.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (courseId) => {
    return cart.some(c => c.id === courseId);
  };

  // Enrolled status & progress calculation
  const isEnrolled = (courseId) => {
    return enrolledCourses.some(item => item.courseId === courseId);
  };

  const enrollCourses = (coursesToEnroll) => {
    const newEnrollments = coursesToEnroll.map(c => ({
      courseId: c.id,
      enrolledDate: new Date().toLocaleDateString('vi-VN'),
      completedLessonIds: [],
      lastAccessed: 'Vừa kích hoạt'
    }));

    setEnrolledCourses(prev => {
      // deduplicate
      const existingIds = new Set(prev.map(p => p.courseId));
      const filteredNew = newEnrollments.filter(n => !existingIds.has(n.courseId));
      return [...prev, ...filteredNew];
    });

    // Remove enrolled from cart
    const enrolledIds = new Set(coursesToEnroll.map(c => c.id));
    setCart(prev => prev.filter(item => !enrolledIds.has(item.id)));
  };

  const getCourseProgress = (courseId) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return { percent: 0, completed: 0, total: 0 };
    
    // total lessons
    let total = 0;
    course.modules.forEach(m => {
      total += m.lessons.length;
    });

    const enrolled = enrolledCourses.find(item => item.courseId === courseId);
    if (!enrolled) return { percent: 0, completed: 0, total };

    const completed = enrolled.completedLessonIds ? enrolled.completedLessonIds.length : 0;
    const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

    return { percent, completed, total };
  };

  const toggleLessonCompleted = (courseId, lessonId) => {
    setEnrolledCourses(prev => {
      return prev.map(item => {
        if (item.courseId !== courseId) return item;
        const currentCompleted = item.completedLessonIds || [];
        const isDone = currentCompleted.includes(lessonId);
        const nextCompleted = isDone 
          ? currentCompleted.filter(id => id !== lessonId)
          : [...currentCompleted, lessonId];
        
        return {
          ...item,
          completedLessonIds: nextCompleted,
          lastAccessed: 'Vừa học xong'
        };
      });
    });
  };

  // Promo operations
  const applyPromo = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo(PROMO_CODES[cleanCode]);
      showToast(`Áp dụng mã ưu đãi ${cleanCode} thành công!`, 'success');
      return true;
    } else {
      showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn.', 'error');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Đã hủy mã giảm giá.', 'info');
  };

  // Auth operations
  const openAuthModal = (mode = 'login') => {
    setAuthModal({ isOpen: true, initialMode: mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, initialMode: 'login' });
  };

  const login = ({ email, name, avatar }) => {
    const displayName = name || (email ? email.split('@')[0] : 'Học viên CodeMaster');
    const newUser = {
      name: displayName,
      email: email || 'student@codemaster.vn',
      role: 'Full-stack Learner',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      streak: 1,
      hoursLearned: 0,
    };
    setIsLoggedIn(true);
    setUser(newUser);
    showToast(`Chào mừng ${newUser.name} đã đăng nhập thành công! 🎉`, 'success');
    closeAuthModal();
  };

  const register = ({ name, email }) => {
    const newUser = {
      name: name || 'Học viên mới',
      email: email || 'student@codemaster.vn',
      role: 'Full-stack Learner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      streak: 1,
      hoursLearned: 0,
    };
    setIsLoggedIn(true);
    setUser(newUser);
    showToast(`Tạo tài khoản thành công! Chào mừng ${newUser.name} gia nhập CodeMaster.`, 'success');
    closeAuthModal();
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    try {
      localStorage.removeItem('codemaster_logged_in');
      localStorage.removeItem('codemaster_user');
    } catch {
      // ignore
    }
    showToast('Đã đăng xuất khỏi tài khoản.', 'info');
  };

  // Navigation helpers
  const navigateTo = (page, options = {}) => {
    if (options.courseId) setSelectedCourseId(options.courseId);
    if (options.player) setPlayerLesson(options.player);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTrialModal = (course, lesson) => {
    setPreviewModal({ course, lesson });
  };

  const closeTrialModal = () => {
    setPreviewModal(null);
  };

  const openCertificate = (course) => {
    setCertificateModal(course);
  };

  const closeCertificate = () => {
    setCertificateModal(null);
  };

  return (
    <AppContext.Provider
      value={{
        courses: COURSES,
        currentPage,
        selectedCourseId,
        playerLesson,
        navigateTo,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedLevel,
        setSelectedLevel,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        appliedPromo,
        applyPromo,
        removePromo,
        isLoggedIn,
        user,
        authModal,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        enrolledCourses,
        enrollCourses,
        isEnrolled,
        getCourseProgress,
        toggleLessonCompleted,
        previewModal,
        openTrialModal,
        closeTrialModal,
        certificateModal,
        openCertificate,
        closeCertificate,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
