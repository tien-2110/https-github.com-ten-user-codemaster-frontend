import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatVND } from '../components/CourseCard';
import confetti from 'canvas-confetti';
import { 
  Trash2, 
  Tag, 
  ArrowLeft, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  PlayCircle,
  ShoppingBag
} from 'lucide-react';

export default function CheckoutPage() {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    appliedPromo, 
    applyPromo, 
    removePromo, 
    enrollCourses, 
    navigateTo, 
    showToast,
    courses 
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('vietqr'); // 'vietqr' | 'card' | 'momo'
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Credit card form state simulator
  const [cardData, setCardData] = useState({
    number: '9704 2201 8888 9999',
    holder: 'NGUYEN HOANG LONG',
    expiry: '12/28',
    cvv: '888'
  });

  // Calculate pricing
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discountAmount = Math.round(subtotal * (appliedPromo.value / 100));
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = Math.min(subtotal, appliedPromo.value);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (success) {
      setPromoInput('');
    }
  };

  const handleQuickPromo = (code) => {
    applyPromo(code);
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Đã sao chép: ${text}`, 'info');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmPayment = () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng của bạn đang trống!', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      
      // Trigger festive confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Enroll courses in user profile
      enrollCourses(cart);
      clearCart();
    }, 1200);
  };

  // If cart is empty and not in success state
  if (cart.length === 0 && !checkoutSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-dark-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-white">Giỏ hàng của bạn đang trống</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Hãy khám phá các khóa học lập trình thực chiến (Java, React, C++, SQL Server) để bắt đầu hành trình nâng cao kỹ năng!
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 rounded-xl bg-brand-cyan text-dark-950 font-bold text-xs shadow-glow-cyan transition-all hover:scale-105"
        >
          Khám phá khóa học ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-cyan transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Tiếp tục chọn khóa học</span>
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Giỏ Hàng & Thanh Toán
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Xác nhận đơn hàng và chọn phương thức thanh toán an toàn
          </p>
        </div>
        <span className="text-xs text-brand-cyan font-semibold">
          {cart.length} khóa học trong giỏ
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Items & Payment Gateway) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cart Items List */}
          <div className="rounded-2xl bg-dark-900/80 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Khóa học đã chọn</span>
              <button 
                onClick={clearCart} 
                className="text-slate-500 hover:text-rose-400 text-[11px] transition-colors"
              >
                Xóa tất cả
              </button>
            </div>

            <div className="divide-y divide-slate-800">
              {cart.map(item => (
                <div key={item.id} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-dark-950/40 transition-colors">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-brand-cyan uppercase">
                      {item.categoryName}
                    </span>
                    <h4 
                      onClick={() => navigateTo('course-detail', { courseId: item.id })}
                      className="text-xs sm:text-sm font-bold text-white truncate hover:text-brand-cyan cursor-pointer transition-colors"
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400">Giảng viên: {item.instructor.name}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {formatVND(item.price)}
                    </div>
                    <div className="text-[11px] text-slate-500 line-through">
                      {formatVND(item.originalPrice)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Xóa khóa học"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="rounded-2xl bg-dark-900/80 border border-slate-800 p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Phương Thức Thanh Toán</span>
            </h3>

            {/* Methods tabs */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('vietqr')}
                className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'vietqr'
                    ? 'bg-brand-cyan/15 border-brand-cyan text-white shadow-glow-cyan'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <QrCode className="w-5 h-5 text-brand-cyan" />
                <span>VietQR Napas 24/7</span>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-brand-cyan/15 border-brand-cyan text-white shadow-glow-cyan'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-5 h-5 text-brand-cyan" />
                <span>Thẻ Visa / Master</span>
              </button>

              <button
                onClick={() => setPaymentMethod('momo')}
                className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'momo'
                    ? 'bg-brand-cyan/15 border-brand-cyan text-white shadow-glow-cyan'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-5 h-5 text-brand-cyan" />
                <span>Ví MoMo / ZaloPay</span>
              </button>
            </div>

            {/* Payment Details simulator according to selected tab */}
            {paymentMethod === 'vietqr' && (
              <div className="p-5 rounded-xl bg-dark-950 border border-slate-800 space-y-4 text-xs text-slate-300">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Mock VietQR Code visual */}
                  <div className="p-3 bg-white rounded-xl shadow-lg shrink-0 flex flex-col items-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://codemaster.vn/pay?amount=${finalTotal}&msg=CODEMASTER-STUDENT`}
                      alt="VietQR Code"
                      className="w-36 h-36"
                    />
                    <span className="text-[10px] font-bold text-slate-800 mt-1">VietQR • Napas 247</span>
                  </div>

                  {/* Transfer Details with copy buttons */}
                  <div className="space-y-2.5 w-full">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-slate-800">
                      <div>
                        <span className="text-[11px] text-slate-500 block">NGÂN HÀNG:</span>
                        <span className="font-semibold text-white">MB Bank (Quân Đội)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-slate-800">
                      <div>
                        <span className="text-[11px] text-slate-500 block">SỐ TÀI KHOẢN:</span>
                        <span className="font-mono font-bold text-brand-cyan">0988 8888 6868</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('098888886868', 'stk')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        {copiedField === 'stk' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Chép STK</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-slate-800">
                      <div>
                        <span className="text-[11px] text-slate-500 block">CHỦ TÀI KHOẢN:</span>
                        <span className="font-semibold text-white">CTY CP CONG NGHE CODEMASTER VN</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-slate-800">
                      <div>
                        <span className="text-[11px] text-slate-500 block">NỘI DUNG CHUYỂN:</span>
                        <span className="font-mono font-bold text-amber-400">CM STUDY 8942</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('CM STUDY 8942', 'nd')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        {copiedField === 'nd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Chép cú pháp</span>
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center sm:text-left italic">
                  * Hệ thống tự động kích hoạt khóa học sau khi nhận chuyển khoản trong 30 giây.
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-5 rounded-xl bg-dark-950 border border-slate-800 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Số thẻ tín dụng / ghi nợ</label>
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-700 text-white font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Hạn hết hạn (MM/YY)</label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-700 text-white font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Mã CVV</label>
                    <input
                      type="password"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-700 text-white font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'momo' && (
              <div className="p-5 rounded-xl bg-dark-950 border border-slate-800 text-center space-y-3 text-xs text-slate-300">
                <div className="w-12 h-12 rounded-2xl bg-pink-600/20 text-pink-500 border border-pink-500/30 flex items-center justify-center mx-auto">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">Thanh toán qua Ví MoMo</h4>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Bạn sẽ được chuyển hướng tới ứng dụng MoMo hoặc quét mã QR một chạm trên điện thoại để hoàn tất.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Order Summary & Promo Codes) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-dark-900 border border-slate-700/80 p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white">Tóm Tắt Đơn Hàng</h3>

            {/* Pricing details */}
            <div className="space-y-2.5 text-xs text-slate-300 pb-4 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <span>Tổng tiền gốc:</span>
                <span className="font-semibold text-white">{formatVND(subtotal)}</span>
              </div>

              {appliedPromo && (
                <div className="flex items-center justify-between text-rose-400 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Mã {appliedPromo.code}:</span>
                  </div>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-400">
                <span>Thuế VAT (0% - Đào tạo):</span>
                <span>0 ₫</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-bold text-white">Tổng thanh toán:</span>
              <span className="text-2xl font-extrabold text-brand-cyan">
                {formatVND(finalTotal)}
              </span>
            </div>

            {/* Voucher Section */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-300">Mã giảm giá ưu đãi:</div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs">
                  <div>
                    <span className="font-bold text-emerald-300 block">{appliedPromo.code}</span>
                    <span className="text-emerald-400/80 text-[11px]">{appliedPromo.desc}</span>
                  </div>
                  <button 
                    onClick={removePromo}
                    className="p-1 rounded text-emerald-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Nhập mã: CODEMASTER2026..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-brand-cyan"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                  >
                    Áp dụng
                  </button>
                </form>
              )}

              {/* Quick voucher suggestion pills */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-500 block">Mã gợi ý sẵn cho bạn:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleQuickPromo('CODEMASTER2026')}
                    className="px-2.5 py-1 rounded-lg bg-dark-950 border border-slate-800 hover:border-brand-cyan text-[11px] text-brand-cyan transition-colors"
                  >
                    CODEMASTER2026 (-20%)
                  </button>
                  <button
                    onClick={() => handleQuickPromo('TANTHU50')}
                    className="px-2.5 py-1 rounded-lg bg-dark-950 border border-slate-800 hover:border-brand-cyan text-[11px] text-brand-cyan transition-colors"
                  >
                    TANTHU50 (-50k)
                  </button>
                  <button
                    onClick={() => handleQuickPromo('PROVIP')}
                    className="px-2.5 py-1 rounded-lg bg-dark-950 border border-slate-800 hover:border-brand-cyan text-[11px] text-brand-cyan transition-colors"
                  >
                    PROVIP (-30%)
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Payment Button */}
            <button
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-dark-950 font-extrabold text-sm shadow-glow-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                  <span>Đang xử lý giao dịch...</span>
                </div>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Xác nhận thanh toán ngay</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Bằng việc bấm "Xác nhận thanh toán", bạn đồng ý với Điều khoản dịch vụ và Chính sách hoàn tiền của CodeMaster.
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Success Modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-dark-900 border border-emerald-500/40 p-6 sm:p-8 text-center space-y-5 shadow-2xl shadow-emerald-950/60">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto text-dark-950 shadow-lg shadow-emerald-500/30">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Thanh toán thành công!
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white pt-2">
                Chúc mừng bạn đã gia nhập!
              </h3>
              <p className="text-xs text-slate-400">
                Các khóa học đã được kích hoạt trực tiếp vào tài khoản của bạn.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 text-left font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">MÃ ĐƠN:</span>
                <span className="text-white">CM-ORDER-202688</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SỐ TIỀN:</span>
                <span className="text-emerald-400 font-bold">{formatVND(finalTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TRẠNG THÁI:</span>
                <span className="text-emerald-400">Đã thanh toán 100%</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCheckoutSuccess(false);
                navigateTo('my-courses');
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Vào học ngay trong My Courses</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
