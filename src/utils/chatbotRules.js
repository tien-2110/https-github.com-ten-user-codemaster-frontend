/**
 * CodeMaster Customer Support Chatbot Rules & Knowledge Base
 * Hỗ trợ nhận diện câu hỏi thường gặp, tư vấn khóa học lập trình,
 * chính sách hoàn tiền, mã giảm giá và hỗ trợ kỹ thuật thanh toán.
 */

// Hàm loại bỏ dấu tiếng Việt để so khớp linh hoạt
export function removeVietnameseTones(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export const QUICK_SUGGESTIONS = [
  {
    id: 'beginner',
    text: 'Khóa học nào phù hợp cho người mới bắt đầu?',
    shortLabel: '🌱 Cho người mới',
  },
  {
    id: 'refund',
    text: 'Chính sách hoàn tiền như thế nào?',
    shortLabel: '🛡️ Chính sách hoàn tiền',
  },
  {
    id: 'promo',
    text: 'Làm sao để nhận mã giảm giá?',
    shortLabel: '🎁 Mã giảm giá',
  },
  {
    id: 'payment',
    text: 'Tôi cần hỗ trợ kỹ thuật thanh toán',
    shortLabel: '💳 Hỗ trợ thanh toán',
  },
  {
    id: 'java',
    text: 'Tư vấn khóa học Java & Spring Boot',
    shortLabel: '☕ Khóa học Java',
  },
  {
    id: 'cpp',
    text: 'Tư vấn khóa học Lập trình C/C++',
    shortLabel: '⚡ Khóa học C/C++',
  },
  {
    id: 'frontend',
    text: 'Tư vấn khóa học Lập trình Front-end React',
    shortLabel: '⚛️ Front-end React',
  },
];

export const INITIAL_WELCOME_MESSAGE = {
  id: 'welcome-msg',
  sender: 'bot',
  text: `👋 **Xin chào!** Mình là **Trợ lý AI của CodeMaster**.\n\nMình có thể hỗ trợ bạn tư vấn lộ trình học, giải đáp thắc mắc về khóa học, cung cấp mã giảm giá hoặc hỗ trợ các vấn đề thanh toán 24/7.\n\nBạn có thể bấm vào các gợi ý nhanh bên dưới hoặc nhập câu hỏi trực tiếp nhé!`,
  timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  quickSuggestions: QUICK_SUGGESTIONS.slice(0, 4),
};

/**
 * Xử lý truy vấn của người dùng và trả về phản hồi tương ứng
 */
export function getBotResponse(userQuery) {
  const raw = userQuery || '';
  const normalized = removeVietnameseTones(raw);

  // 1. NGƯỜI MỚI BẮT ĐẦU (Beginner)
  if (
    normalized.includes('nguoi moi') ||
    normalized.includes('moi bat dau') ||
    normalized.includes('chua biet gi') ||
    normalized.includes('chua co kien thuc') ||
    normalized.includes('chua biet code') ||
    normalized.includes('bat dau tu dau') ||
    normalized.includes('nhap mon') ||
    normalized.includes('chua hoc lap trinh') ||
    normalized.includes('khoa hoc phu hop cho nguoi moi')
  ) {
    return {
      text: `🌱 **Lộ trình đề xuất cho người mới bắt đầu lập trình:**\n\nĐối với các bạn mới làm quen với code, CodeMaster khuyến nghị 2 hướng tiếp cận hiệu quả nhất:\n\n1. **Hướng Front-end Web (Khuyên dùng cho người thích trực quan):**\n   - Học HTML, CSS, JavaScript và React 19.\n   - **Ưu điểm:** Viết code thấy ngay giao diện đẹp mắt, tạo cảm hứng học tập mạnh mẽ, dễ có sản phẩm demo đưa vào CV.\n\n2. **Hướng C/C++ (Khuyên dùng cho sinh viên CNTT & tư duy sâu):**\n   - Xây dựng tư duy thuật toán, cấu trúc dữ liệu và quản lý bộ nhớ máy tính vững chắc từ gốc rễ.\n\n3. **Tiếp nối Backend (Java hoặc Python):**\n   - Sau khi nắm chắc nền tảng, bạn có thể học tiếp Java Spring Boot để trở thành Full-stack Developer.\n\n👇 Bạn có thể tham khảo ngay 2 khóa học khởi đầu tiêu biểu sau:`,
      courseRecommendations: ['course-frontend-react', 'course-cpp-system'],
      suggestFollowUp: ['Tư vấn khóa học Front-end React', 'Tư vấn khóa học Lập trình C/C++', 'Làm sao để nhận mã giảm giá?'],
    };
  }

  // 2. JAVA & SPRING BOOT
  if (
    normalized.includes('java') ||
    normalized.includes('spring') ||
    normalized.includes('spring boot') ||
    normalized.includes('backend masterclass')
  ) {
    return {
      text: `☕ **Khóa học Java Backend Masterclass: Từ Core đến Spring Boot 3 & Microservices**\n\nĐây là khóa học chuyên sâu được thiết kế sát chuẩn tuyển dụng Backend Engineer tại các tập đoàn công nghệ lớn:\n\n✨ **Nội dung nổi bật:**\n• **Java 21 Core:** Concurrency, Multithreading, Memory Model & JVM Tuning.\n• **Spring Boot 3.3:** Spring Security 6, JWT, OAuth2, kiến trúc Clean Architecture.\n• **Microservices Ecosystem:** Eureka Server, Spring Cloud Gateway, Apache Kafka, OpenFeign.\n• **Database & Cache:** Hibernate ORM tối ưu N+1, PostgreSQL, Redis Caching.\n• **DevOps:** Container hóa với Docker, CI/CD pipeline và monitoring Grafana.\n\n🎯 **Phù hợp:** Bạn đã biết cú pháp cơ bản muốn lên trình Junior/Middle Backend hoặc chuyển từ ngôn ngữ khác sang Java.`,
      courseRecommendations: ['course-java-spring'],
      suggestFollowUp: ['Làm sao để nhận mã giảm giá?', 'Chính sách hoàn tiền như thế nào?', 'Tôi cần hỗ trợ kỹ thuật thanh toán'],
    };
  }

  // 3. C / C++ HỆ THỐNG & GIẢI THUẬT
  if (
    normalized.includes('c++') ||
    normalized.includes('cpp') ||
    normalized.includes('c/c++') ||
    normalized.includes('lap trinh c') ||
    normalized.includes('con tro') ||
    normalized.includes('giai thuat') ||
    normalized.includes('cau truc du lieu')
  ) {
    return {
      text: `⚡ **Khóa học C/C++ Lập trình Hệ thống, Quản lý Bộ nhớ & CTDL Giải thuật**\n\nKhóa học "vỡ lòng kinh điển" giúp bạn thấu hiểu bản chất phần cứng và máy tính vận hành như thế nào:\n\n✨ **Nội dung nổi bật:**\n• **Master con trỏ (Pointers & References):** Phân biệt Stack & Heap, cấp phát động và tránh memory leaks.\n• **C++ Hiện đại (C++17/20):** Smart Pointers (unique_ptr, shared_ptr), Move Semantics, RAII.\n• **Cấu trúc dữ liệu & Giải thuật:** Dynamic Arrays, Linked Lists, Trees, Graph, Dynamic Programming phỏng vấn Big Tech.\n• **OOP thực chiến:** Virtual functions, V-table, Design Patterns trong C++.\n\n🎯 **Phù hợp:** Sinh viên ngành CNTT/Điện tử viễn thông, lập trình viên muốn làm Embedded, Game Engine hoặc rèn luyện giải thuật LeetCode.`,
      courseRecommendations: ['course-cpp-system'],
      suggestFollowUp: ['Khóa học nào phù hợp cho người mới bắt đầu?', 'Làm sao để nhận mã giảm giá?', 'Chính sách hoàn tiền như thế nào?'],
    };
  }

  // 4. FRONT-END & REACT
  if (
    normalized.includes('frontend') ||
    normalized.includes('front-end') ||
    normalized.includes('react') ||
    normalized.includes('nextjs') ||
    normalized.includes('next.js') ||
    normalized.includes('giao dien') ||
    normalized.includes('html') ||
    normalized.includes('css')
  ) {
    return {
      text: `⚛️ **Khóa học Lập trình Front-end Hiện đại: HTML/CSS, React 19, Next.js & TypeScript**\n\nKhóa học đón đầu công nghệ Web mới nhất năm 2026, giúp bạn xây dựng các ứng dụng web triệu người dùng:\n\n✨ **Nội dung nổi bật:**\n• **HTML5/Modern CSS/Tailwind:** Responsive Design, Glassmorphism, animations mượt mà.\n• **JavaScript ES6+ & TypeScript:** Asynchronous JS, Type-safe components, Generics.\n• **React 19 Core:** React Server Components (RSC), Actions, useTransition, Optimistic Updates.\n• **Next.js App Router:** Server-Side Rendering (SSR), SEO tối ưu và Static Site Generation.\n• **Dự án thực tế:** Xây dựng Dashboard Quản trị & Nền tảng E-commerce hoàn chỉnh đưa vào CV.\n\n🎯 **Phù hợp:** Người mới bắt đầu hoặc lập trình viên muốn nâng cấp tay nghề Front-end chuẩn quốc tế.`,
      courseRecommendations: ['course-frontend-react'],
      suggestFollowUp: ['Khóa học nào phù hợp cho người mới bắt đầu?', 'Làm sao để nhận mã giảm giá?', 'Tôi cần hỗ trợ kỹ thuật thanh toán'],
    };
  }

  // 5. PYTHON & AI
  if (
    normalized.includes('python') ||
    normalized.includes('ai') ||
    normalized.includes('tri tue nhan tao') ||
    normalized.includes('machine learning') ||
    normalized.includes('deep learning')
  ) {
    return {
      text: `🤖 **Khóa học Python for AI & Machine Learning: Từ Zero đến Thực chiến Mô hình**\n\nNắm trọn bí kíp lập trình Python ứng dụng và tích hợp mô hình AI Generative tiên tiến:\n\n✨ **Nội dung nổi bật:**\n• **Python Fundamentals & Data Wrangling:** NumPy, Pandas, Matplotlib.\n• **Machine Learning:** Hồi quy, phân loại, Scikit-learn, trực quan hóa dữ liệu.\n• **GenAI & LLM Integration:** Tích hợp OpenAI API, LangChain, RAG (Retrieval-Augmented Generation).\n• **Triển khai AI Service:** Xây dựng REST API với FastAPI và Docker.`,
      courseRecommendations: ['course-python-ai'],
      suggestFollowUp: ['Làm sao để nhận mã giảm giá?', 'Khóa học nào phù hợp cho người mới bắt đầu?'],
    };
  }

  // 6. SQL SERVER & CƠ SỞ DỮ LIỆU
  if (
    normalized.includes('sql') ||
    normalized.includes('database') ||
    normalized.includes('csdl') ||
    normalized.includes('co so du lieu')
  ) {
    return {
      text: `🗄️ **Khóa học SQL Server & Thiết kế CSDL Chuyên nghiệp: Từ Cơ bản đến Tối ưu Query**\n\nNền tảng không thể thiếu của mọi lập trình viên Backend và kỹ sư dữ liệu:\n\n✨ **Nội dung nổi bật:**\n• Chuẩn hóa dữ liệu 3NF, thiết kế ERD chuyên nghiệp.\n• Tối ưu hóa Index, Execution Plan, giải quyết bottleneck hệ thống lớn.\n• Viết Stored Procedures, Functions, Triggers, Transactions & Lock Handling.`,
      courseRecommendations: ['course-database-sql'],
      suggestFollowUp: ['Tư vấn khóa học Java & Spring Boot', 'Làm sao để nhận mã giảm giá?'],
    };
  }

  // 7. CHÍNH SÁCH HOÀN TIỀN (Refund Policy)
  if (
    normalized.includes('hoan tien') ||
    normalized.includes('chinh sach hoan') ||
    normalized.includes('doi tra') ||
    normalized.includes('tra tien') ||
    normalized.includes('khong hai long') ||
    normalized.includes('bao hanh hoc phi')
  ) {
    return {
      text: `🛡️ **Chính sách hoàn tiền minh bạch tại CodeMaster:**\n\nCodeMaster cam kết bảo vệ quyền lợi học viên tối đa với chính sách hoàn tiền uy tín:\n\n1. **Cam kết 100% trong 7 ngày:**\n   - Bạn được hoàn trả **100% học phí** trong vòng **7 ngày** kể từ thời điểm thanh toán nếu cảm thấy khóa học không phù hợp với nhu cầu.\n\n2. **Điều kiện hoàn tiền:**\n   - Bạn chưa học quá **20%** tổng thời lượng hoặc bài học của khóa.\n   - Chưa yêu cầu cấp chứng chỉ cho khóa học đó.\n\n3. **Thời gian & Quy trình xử lý:**\n   - Gửi yêu cầu qua email **billing@codemaster.vn** hoặc nhắn hotline **1900 8888** kèm mã đơn hàng.\n   - Tiền sẽ được hoàn về đúng tài khoản ngân hàng / thẻ của bạn trong vòng **24 - 48 giờ làm việc**, không phát sinh bất kỳ khoản phí phạt nào!`,
      suggestFollowUp: ['Làm sao để nhận mã giảm giá?', 'Tôi cần hỗ trợ kỹ thuật thanh toán', 'Khóa học nào phù hợp cho người mới bắt đầu?'],
    };
  }

  // 8. MÃ GIẢM GIÁ (Promo codes & Discounts)
  if (
    normalized.includes('ma giam gia') ||
    normalized.includes('giam gia') ||
    normalized.includes('khuyen mai') ||
    normalized.includes('voucher') ||
    normalized.includes('coupon') ||
    normalized.includes('uu dai') ||
    normalized.includes('discount') ||
    normalized.includes('ma uu dai')
  ) {
    return {
      text: `🎁 **Các mã ưu đãi độc quyền đang có hiệu lực tại CodeMaster:**\n\nBạn có thể nhấn trực tiếp vào nút **[Áp dụng ngay]** bên dưới để kích hoạt ưu đãi cho giỏ hàng của mình nhé!`,
      promoCodes: [
        { code: 'CODEMASTER2026', desc: 'Giảm 20% tổng hóa đơn nhân dịp 2026', type: 'percent', val: '20%' },
        { code: 'PROVIP', desc: 'Giảm 30% dành riêng cho học viên VIP', type: 'percent', val: '30%' },
        { code: 'TANTHU50', desc: 'Giảm 50.000đ cho học viên mới bắt đầu', type: 'fixed', val: '50.000đ' },
        { code: 'FULLSTACK100', desc: 'Giảm 100.000đ khi đăng ký theo gói combo', type: 'fixed', val: '100.000đ' },
      ],
      suggestFollowUp: ['Khóa học nào phù hợp cho người mới bắt đầu?', 'Chính sách hoàn tiền như thế nào?', 'Tôi cần hỗ trợ kỹ thuật thanh toán'],
    };
  }

  // 9. HỖ TRỢ KỸ THUẬT THANH TOÁN (Payment Support)
  if (
    normalized.includes('thanh toan') ||
    normalized.includes('chuyen khoan') ||
    normalized.includes('vietqr') ||
    normalized.includes('qr') ||
    normalized.includes('loi thanh toan') ||
    normalized.includes('chua kich hoat') ||
    normalized.includes('chua vao duoc') ||
    normalized.includes('chua nhan duoc khoa hoc') ||
    normalized.includes('momo') ||
    normalized.includes('visa') ||
    normalized.includes('ho tro thanh toan')
  ) {
    return {
      text: `💳 **Hỗ trợ kỹ thuật & Xử lý thanh toán 24/7:**\n\n1. **Các cổng thanh toán hỗ trợ:**\n   - **VietQR Quét mã tự động:** Hệ thống kích hoạt khóa học tự động trong **1 - 2 phút** ngay sau khi chuyển khoản thành công.\n   - **Thẻ ATM / Visa / MasterCard:** Thanh toán tức thì qua cổng bảo mật 3D-Secure.\n   - **Ví điện tử:** MoMo, ZaloPay, ShopeePay.\n\n2. **Nếu đã quét mã nhưng khóa học chưa kích hoạt:**\n   - Đôi lúc mạng lưới Napas hoặc ngân hàng có độ trễ đồng bộ từ 1 - 3 phút. Hãy bấm tải lại trang hoặc kiểm tra tab **"Khóa học của tôi"**.\n   - Nếu sau 5 phút vẫn chưa thấy khóa học, bạn đừng lo lắng! Vui lòng gửi ảnh chụp màn hình giao dịch chuyển tiền về:\n     📞 **Hotline/Zalo Kỹ thuật:** **1900 8888** (Hỗ trợ 24/7)\n     ✉️ **Email Hỗ trợ:** **support@codemaster.vn** hoặc **billing@codemaster.vn**\n   - Đội ngũ kỹ thuật sẽ đối soát mã giao dịch và kích hoạt khóa học thủ công cho bạn trong vòng **5 phút**!`,
      suggestFollowUp: ['Chính sách hoàn tiền như thế nào?', 'Làm sao để nhận mã giảm giá?', 'Khóa học nào phù hợp cho người mới bắt đầu?'],
    };
  }

  // 10. CHỨNG CHỈ (Certificate)
  if (
    normalized.includes('chung chi') ||
    normalized.includes('bang') ||
    normalized.includes('certificate') ||
    normalized.includes('chung nhan')
  ) {
    return {
      text: `🎓 **Chứng chỉ hoàn thành tại CodeMaster:**\n\n• Sau khi bạn hoàn thành 100% số bài học và vượt qua các bài kiểm tra thực hành, hệ thống sẽ tự động cấp **Chứng chỉ Hoàn thành khóa học (Certificate of Completion)**.\n• Chứng chỉ có **Mã định danh QR Code xác thực độc bản** có thể tra cứu toàn cầu.\n• Bạn có thể tải file PDF chất lượng cao, chia sẻ trực tiếp lên **LinkedIn Licenses & Certifications** hoặc đính kèm vào CV xin việc.`,
      suggestFollowUp: ['Khóa học nào phù hợp cho người mới bắt đầu?', 'Chính sách hoàn tiền như thế nào?', 'Làm sao để nhận mã giảm giá?'],
    };
  }

  // 11. HỎI GIẢNG VIÊN / MENTOR
  if (
    normalized.includes('giang vien') ||
    normalized.includes('mentor') ||
    normalized.includes('nguoi day') ||
    normalized.includes('thay giao')
  ) {
    return {
      text: `👨‍🏫 **Đội ngũ Giảng viên & Mentor tại CodeMaster:**\n\n• Giảng viên tại CodeMaster đều là **Tech Lead, Principal Architect** có từ 8 - 12+ năm kinh nghiệm tại các tập đoàn lớn (FPT, Viettel, VNG, Grab, Shopee, TechCorp).\n• Trong quá trình học, bạn được tham gia nhóm Discord/Zalo độc quyền để hỏi đáp bài tập, code review 1-1 và định hướng nghề nghiệp cùng Mentor.`,
      suggestFollowUp: ['Khóa học nào phù hợp cho người mới bắt đầu?', 'Tư vấn khóa học Java & Spring Boot', 'Tư vấn khóa học Front-end React'],
    };
  }

  // 12. LỜI CHÀO / HELLO
  if (
    normalized === 'chao' ||
    normalized === 'hi' ||
    normalized === 'hello' ||
    normalized.startsWith('chao ') ||
    normalized.startsWith('xin chao') ||
    normalized.includes('alo') ||
    normalized.includes('ad oi') ||
    normalized.includes('admin oi')
  ) {
    return {
      text: `👋 **Xin chào bạn!** Rất vui được đón bạn ghé thăm CodeMaster.\n\nMình là trợ lý ảo hỗ trợ 24/7. Bạn đang quan tâm đến ngôn ngữ lập trình nào (Java, C++, Front-end React, Python), cần tư vấn chọn khóa cho người mới, hay cần hỗ trợ mã ưu đãi và thanh toán?`,
      suggestFollowUp: ['Khóa học nào phù hợp cho người mới bắt đầu?', 'Chính sách hoàn tiền như thế nào?', 'Làm sao để nhận mã giảm giá?', 'Tôi cần hỗ trợ kỹ thuật thanh toán'],
    };
  }

  // 13. CẢM ƠN / TẠM BIỆT
  if (
    normalized.includes('cam on') ||
    normalized.includes('thank') ||
    normalized.includes('ok ad') ||
    normalized.includes('tuyet voi') ||
    normalized.includes('da ro')
  ) {
    return {
      text: `✨ **Rất vui được hỗ trợ bạn!**\n\nChúc bạn có những giờ học lập trình thật hiệu quả, hoàn thành nhiều dự án ấn tượng và sớm đạt được mục tiêu nghề nghiệp của mình.\n\nNếu cần bất kỳ hỗ trợ nào thêm, bạn cứ gửi tin nhắn cho mình bất cứ lúc nào nhé! 🚀`,
      suggestFollowUp: ['Khóa học nào phù hợp cho người mới bắt đầu?', 'Làm sao để nhận mã giảm giá?'],
    };
  }

  // 14. FALLBACK THÔNG MINH
  return {
    text: `Cảm ơn câu hỏi của bạn! Với câu hỏi này: *" ${raw} "*\n\nĐể hỗ trợ bạn một cách chính xác và nhanh chóng nhất, bạn có thể tham khảo các chủ đề phổ biến được chuẩn bị sẵn bên dưới:\n\n• **Lộ trình người mới:** Bắt đầu với Front-end hoặc C/C++.\n• **Tư vấn khóa học Backend:** Java Spring Boot chuyên sâu.\n• **Chính sách & Khuyến mãi:** Hoàn tiền 100% trong 7 ngày, mã giảm giá lên đến 30%.\n\nHoặc bạn có thể liên hệ trực tiếp chuyên viên tư vấn qua **Hotline 1900 8888** / email **support@codemaster.vn** để được hỗ trợ 1-1 miễn phí nhé!`,
    suggestFollowUp: [
      'Khóa học nào phù hợp cho người mới bắt đầu?',
      'Chính sách hoàn tiền như thế nào?',
      'Làm sao để nhận mã giảm giá?',
      'Tôi cần hỗ trợ kỹ thuật thanh toán',
    ],
  };
}
