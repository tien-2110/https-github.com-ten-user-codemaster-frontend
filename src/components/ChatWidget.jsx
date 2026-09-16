import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Minus,
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Tag,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Check,
  CreditCard,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  QUICK_SUGGESTIONS,
  INITIAL_WELCOME_MESSAGE,
  getBotResponse,
} from '../utils/chatbotRules';

const SESSION_STORAGE_KEY = 'codemaster_chatbot_messages';

export default function ChatWidget() {
  const { courses, navigateTo, applyPromo, showToast } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load chat history from sessionStorage:', e);
    }
    return [INITIAL_WELCOME_MESSAGE];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Lưu tin nhắn vào sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist chat messages:', e);
    }
  }, [messages]);

  // Hiển thị welcome tooltip sau 2 giây nếu chưa mở chat
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length <= 1) {
        setShowWelcomeTooltip(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  // Tự động cuộn xuống dưới cùng khi có tin nhắn mới hoặc khi bot đang gõ
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end',
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      // Focus vào input khi mở
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isTyping]);

  // Mở cửa sổ chat
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowWelcomeTooltip(false);
    setUnreadCount(0);
  };

  // Đóng hoặc thu nhỏ
  const handleCloseChat = () => {
    setIsOpen(false);
  };

  // Làm mới cuộc trò chuyện
  const handleResetChat = () => {
    const resetMsg = {
      ...INITIAL_WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([resetMsg]);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    showToast('Đã làm mới phiên trò chuyện!', 'info');
  };

  // Gửi tin nhắn
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Thời gian trễ ngẫu nhiên mô phỏng bot đang suy nghĩ và gõ tin (600ms - 950ms)
    const typingDelay = Math.floor(Math.random() * 350) + 600;

    setTimeout(() => {
      const botResult = getBotResponse(query);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResult.text,
        courseRecommendations: botResult.courseRecommendations || null,
        promoCodes: botResult.promoCodes || null,
        suggestFollowUp: botResult.suggestFollowUp || null,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }, typingDelay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Sao chép mã giảm giá hoặc áp dụng trực tiếp
  const handleApplyPromoCode = (code) => {
    const success = applyPromo(code);
    if (success) {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  // Format text đơn giản hỗ trợ Markdown bold **text** và xuống dòng
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // Tách các đoạn in đậm **...**
      const parts = line.split(/(\*\*.*?\*\*)/g);

      return (
        <div key={lineIdx} className={line.trim() === '' ? 'h-2' : 'min-h-[1.25rem] leading-relaxed'}>
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-semibold text-brand-cyan">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={partIdx} className="italic text-slate-300">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return <span key={partIdx}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <>
      {/* 1. FLOATING ACTION BUTTON & WELCOME TOOLTIP */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
        {/* Welcome Tooltip nếu người dùng chưa bấm mở chat */}
        {showWelcomeTooltip && !isOpen && (
          <div className="relative mb-3.5 max-w-[280px] sm:max-w-[320px] bg-dark-900/95 border border-brand-cyan/40 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in-up">
            <button
              onClick={() => setShowWelcomeTooltip(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-200 transition-colors p-1"
              title="Đóng thông báo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-3 cursor-pointer" onClick={handleOpenChat}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-indigo flex items-center justify-center shrink-0 shadow-glow-cyan">
                <Bot className="w-4 h-4 text-slate-950" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                  CodeMaster Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-snug">
                  👋 Bạn cần hỗ trợ chọn khóa học hoặc nhận mã giảm giá? Nhắn cho mình nhé!
                </p>
              </div>
            </div>
            {/* Mũi tên tooltip */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-dark-900 border-b border-r border-brand-cyan/40 transform rotate-45"></div>
          </div>
        )}

        {/* Nút Chat Bong Bóng Nổi (Floating Action Button) với hiệu ứng thu phóng */}
        {!isOpen && (
          <button
            id="open-chatbot-btn"
            onClick={handleOpenChat}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-cyan-500 via-brand-cyan to-indigo-600 text-dark-950 font-bold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 transform hover:scale-110 active:scale-95 transition-all duration-300 ease-out focus:outline-none"
            title="Mở trợ lý hỗ trợ khách hàng CodeMaster"
            aria-label="Mở cửa sổ chat hỗ trợ"
          >
            {/* Hiệu ứng pulse tỏa sóng */}
            <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-30 group-hover:animate-ping pointer-events-none"></span>

            {/* Icon tin nhắn */}
            <MessageSquare className="w-7 h-7 text-dark-950 transition-transform duration-300 group-hover:rotate-6" />

            {/* Chấm Online xanh lá cây */}
            <span className="absolute top-1 right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-dark-950"></span>
            </span>

            {/* Badge thông báo tin chưa đọc nếu có */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-xs font-black rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center shadow-lg animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* 2. CỬA SỔ CHAT (CHAT WINDOW) */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[600px] max-h-[85vh] rounded-2xl flex flex-col shadow-2xl border border-brand-cyan/30 bg-dark-900/95 backdrop-blur-2xl text-slate-100 overflow-hidden transform transition-all duration-300 animate-fade-in-up"
          style={{ boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(6, 182, 212, 0.25)' }}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-dark-850 via-dark-800 to-dark-850 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-3">
              {/* Bot Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-indigo-500 to-purple-500 p-0.5 shadow-glow-cyan">
                  <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-brand-cyan animate-pulse-slow" />
                  </div>
                </div>
                {/* Trạng thái Online */}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-dark-900"></span>
                </span>
              </div>

              {/* Bot Info */}
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm text-slate-100">CodeMaster AI</h3>
                  <span className="px-1.5 py-0.2 bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan text-[10px] font-medium rounded-full">
                    Bot
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-400 font-medium text-[11px]">Đang trực tuyến</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px]">Tư vấn 24/7</span>
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
                title="Làm mới cuộc trò chuyện"
                aria-label="Làm mới đoạn hội thoại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleCloseChat}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
                title="Thu nhỏ cửa sổ chat"
                aria-label="Thu nhỏ cửa sổ"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={handleCloseChat}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Đóng cửa sổ chat"
                aria-label="Đóng cửa sổ"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips (Luôn ghim phía trên để truy cập tiện lợi) */}
          <div className="px-3 py-2 bg-dark-950/80 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
            <span className="text-slate-400 text-[11px] font-medium shrink-0 flex items-center gap-1 pl-1">
              <Sparkles className="w-3 h-3 text-brand-cyan" />
              Gợi ý:
            </span>
            {QUICK_SUGGESTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSendMessage(item.text)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-brand-cyan/20 border border-slate-700 hover:border-brand-cyan/50 text-slate-300 hover:text-brand-cyan text-[11px] font-medium whitespace-nowrap transition-all duration-200 disabled:opacity-50"
              >
                {item.shortLabel}
              </button>
            ))}
          </div>

          {/* Message Thread Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-dark-900/60 custom-scrollbar">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';

              return (
                <div key={msg.id} className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}>
                  {/* Bot avatar icon */}
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-indigo flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-4 h-4 text-dark-950" />
                    </div>
                  )}

                  {/* Message Bubble Container */}
                  <div className={`max-w-[84%] sm:max-w-[80%] flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-md ${
                        isBot
                          ? 'bg-slate-800/90 text-slate-200 border border-white/10 rounded-tl-sm'
                          : 'bg-gradient-to-r from-brand-cyan to-indigo-600 text-white font-medium rounded-br-sm shadow-cyan-950/40'
                      }`}
                    >
                      {/* Message Content */}
                      <div className="space-y-1">{renderFormattedText(msg.text)}</div>

                      {/* Interactive Course Recommendation Cards nếu có */}
                      {msg.courseRecommendations && msg.courseRecommendations.length > 0 && (
                        <div className="mt-3 space-y-2 pt-2 border-t border-white/10">
                          <p className="text-[11px] font-semibold text-brand-cyan flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            Khóa học gợi ý từ hệ thống:
                          </p>
                          {msg.courseRecommendations.map((cId) => {
                            const foundCourse = courses.find((c) => c.id === cId);
                            if (!foundCourse) return null;

                            return (
                              <div
                                key={foundCourse.id}
                                className="bg-dark-950/80 border border-brand-cyan/30 rounded-xl p-2.5 hover:border-brand-cyan transition-all group cursor-pointer"
                                onClick={() => {
                                  navigateTo('course-detail', { courseId: foundCourse.id });
                                }}
                              >
                                <div className="flex gap-2.5 items-center">
                                  <img
                                    src={foundCourse.thumbnail}
                                    alt={foundCourse.title}
                                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/10"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-semibold text-slate-100 line-clamp-1 group-hover:text-brand-cyan transition-colors">
                                      {foundCourse.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[11px] font-bold text-emerald-400">
                                        {foundCourse.price.toLocaleString('vi-VN')}đ
                                      </span>
                                      <span className="text-[10px] text-slate-400 line-through">
                                        {foundCourse.originalPrice.toLocaleString('vi-VN')}đ
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                                  <span className="text-slate-400">{foundCourse.levelName}</span>
                                  <span className="text-brand-cyan font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                    Xem chi tiết
                                    <ArrowRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Interactive Promo Code Cards nếu có */}
                      {msg.promoCodes && msg.promoCodes.length > 0 && (
                        <div className="mt-3 space-y-2 pt-2 border-t border-white/10">
                          <p className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5" />
                            Mã giảm giá có thể áp dụng:
                          </p>
                          <div className="grid grid-cols-1 gap-2">
                            {msg.promoCodes.map((item) => (
                              <div
                                key={item.code}
                                className="bg-dark-950/80 border border-amber-500/30 rounded-xl p-2.5 flex items-center justify-between gap-2"
                              >
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono font-bold text-amber-400 text-xs tracking-wider">
                                      {item.code}
                                    </span>
                                    <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded font-medium">
                                      {item.val}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                                </div>
                                <button
                                  onClick={() => handleApplyPromoCode(item.code)}
                                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-dark-950 text-xs font-bold rounded-lg transition-all shadow shrink-0 flex items-center gap-1 active:scale-95"
                                  title="Áp dụng mã này cho giỏ hàng"
                                >
                                  {copiedCode === item.code ? (
                                    <>
                                      <Check className="w-3 h-3 text-dark-950" />
                                      Đã áp dụng
                                    </>
                                  ) : (
                                    'Áp dụng ngay'
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Gợi ý các câu hỏi tiếp theo (Follow-up suggestions) */}
                      {msg.suggestFollowUp && msg.suggestFollowUp.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                          {msg.suggestFollowUp.map((followUp, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => handleSendMessage(followUp)}
                              disabled={isTyping}
                              className="px-2 py-1 rounded-lg bg-dark-950/70 border border-slate-700 hover:border-brand-cyan/60 text-[11px] text-slate-300 hover:text-brand-cyan transition-colors text-left"
                            >
                              💡 {followUp}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                  </div>

                  {/* User icon */}
                  {!isBot && (
                    <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center shrink-0 mb-4 shadow-sm">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* TYPING INDICATOR ("Đang soạn tin nhắn...") */}
            {isTyping && (
              <div className="flex gap-2.5 items-start animate-fade-in">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-indigo flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4 text-dark-950" />
                </div>
                <div className="bg-slate-800/90 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1.5 items-center">
                      <div
                        className="w-2 h-2 rounded-full bg-brand-cyan animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-brand-cyan animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-brand-cyan animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      ></div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium ml-1">
                      CodeMaster Bot đang soạn tin nhắn...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer Form */}
          <div className="p-3 bg-dark-950 border-t border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi (VD: khóa Java, hoàn tiền, mã giảm giá)..."
                disabled={isTyping}
                className="flex-1 bg-dark-900 border border-slate-700/80 focus:border-brand-cyan rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-cyan to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-dark-950 flex items-center justify-center font-bold shadow-md hover:shadow-cyan-500/25 transition-all transform active:scale-95 shrink-0"
                title="Gửi tin nhắn"
                aria-label="Gửi tin nhắn"
              >
                <Send className="w-4 h-4 text-dark-950 ml-0.5" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Hỗ trợ trực tuyến 24/7
              </span>
              <span>Nhấn Enter để gửi</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
