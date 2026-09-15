export const CATEGORIES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'frontend', name: 'Front-end' },
  { id: 'java', name: 'Java & Spring' },
  { id: 'cpp', name: 'C/C++ Hệ thống' },
  { id: 'database', name: 'SQL Server & CSDL' },
  { id: 'python-ai', name: 'Python & AI' },
  { id: 'golang', name: 'Golang & Microservices' },
];

export const LEVELS = [
  { id: 'all', name: 'Tất cả cấp độ' },
  { id: 'beginner', name: 'Người mới bắt đầu' },
  { id: 'intermediate', name: 'Trung cấp' },
  { id: 'advanced', name: 'Nâng cao / Chuyên sâu' },
];

export const PROMO_CODES = {
  'CODEMASTER2026': { code: 'CODEMASTER2026', type: 'percent', value: 20, desc: 'Giảm 20% tổng hóa đơn nhân dịp 2026' },
  'PROVIP': { code: 'PROVIP', type: 'percent', value: 30, desc: 'Giảm 30% dành cho thành viên VIP CodeMaster' },
  'TANTHU50': { code: 'TANTHU50', type: 'fixed', value: 50000, desc: 'Giảm ngay 50.000đ cho lập trình viên mới' },
  'FULLSTACK100': { code: 'FULLSTACK100', type: 'fixed', value: 100000, desc: 'Giảm 100.000đ khi mua khóa học combo' },
};

export const COURSES = [
  {
    id: 'course-java-spring',
    title: 'Java Backend Masterclass: Từ Core đến Spring Boot 3 & Microservices',
    slug: 'java-backend-spring-boot-3',
    category: 'java',
    categoryName: 'Java & Spring',
    level: 'intermediate',
    levelName: 'Trung cấp - Chuyên sâu',
    badge: 'Bán chạy nhất',
    rating: 4.9,
    ratingCount: 1420,
    studentsCount: 5680,
    hours: 48,
    lessonsCount: 64,
    lastUpdated: '02/2026',
    price: 1299000,
    originalPrice: 2499000,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Lộ trình trở thành Senior Java Developer với kiến trúc Spring Boot 3, Spring Cloud, Hibernate, Docker, Kafka và triển khai Microservices thực tế.',
    fullDesc: `Khóa học Java Backend chuyên nghiệp được thiết kế theo tiêu chuẩn tuyển dụng tại các tập đoàn công nghệ lớn. Không chỉ dừng lại ở cú pháp cơ bản, bạn sẽ được dẫn dắt xây dựng hệ thống thương mại điện tử phân tán chịu tải cao, áp dụng Design Patterns, tối ưu hiệu năng cơ sở dữ liệu và triển khai CI/CD lên AWS/Cloud.`,
    features: [
      'Nắm vững Java Core 21, Concurrency, Multithreading & Memory Model',
      'Làm chủ Spring Boot 3.3, Spring Security 6 với JWT & OAuth2',
      'Xây dựng kiến trúc Microservices với Eureka, API Gateway, Kafka',
      'ORM nâng cao với Hibernate/Spring Data JPA, tối ưu truy vấn N+1',
      'Container hóa với Docker & Kubernetes, monitoring với Prometheus/Grafana',
      'Code review 1-1 và bảo vệ đồ án tốt nghiệp cùng Mentor'
    ],
    instructor: {
      name: 'Trần Minh Đức',
      role: 'Principal Backend Architect tại TechCorp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      experience: '11+ năm kinh nghiệm',
      students: 14500,
      courses: 4,
      bio: 'Chuyên gia thiết kế hệ thống phân tán, cựu Tech Lead tại các kỳ lân công nghệ Đông Nam Á, diễn giả thường niên tại sự kiện Java Vietnam Summit.'
    },
    modules: [
      {
        id: 'm1',
        title: 'Chương 1: Nền tảng Java Hiện Đại (Java 17 & Java 21 LTS)',
        lessons: [
          {
            id: 'l1',
            title: 'Bài 1: Giới thiệu hệ sinh thái Java & Cài đặt môi trường JDK 21',
            duration: '18:45',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            summary: 'Tìm hiểu tổng quan cấu trúc JVM, JRE, JDK và cách thiết lập môi trường phát triển chuyên nghiệp với IntelliJ IDEA.',
            codeSnippet: `public class Main {\n    public static void main(String[] args) {\n        var greeting = "Chào mừng bạn đến với Java 21 Masterclass!";\n        System.out.println(greeting);\n    }\n}`
          },
          {
            id: 'l2',
            title: 'Bài 2: Record, Pattern Matching & Virtual Threads trong Java 21',
            duration: '26:10',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            summary: 'Khám phá tính năng đột phá Virtual Threads (Project Loom) giúp xử lý hàng triệu requests đồng thời với chi phí tài nguyên tối thiểu.',
            codeSnippet: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    IntStream.range(0, 10_000).forEach(i -> {\n        executor.submit(() -> {\n            Thread.sleep(Duration.ofSeconds(1));\n            return i;\n        });\n    });\n}`
          },
          {
            id: 'l3',
            title: 'Bài 3: Quản lý Bộ nhớ JVM & Tối ưu Garbage Collector (G1, ZGC)',
            duration: '32:00',
            isPreview: false
          }
        ]
      },
      {
        id: 'm2',
        title: 'Chương 2: Spring Boot 3 & Xây dựng RESTful API Chuẩn Enterprise',
        lessons: [
          {
            id: 'l4',
            title: 'Bài 4: Khởi tạo dự án Spring Boot 3 với Spring Initializr & Kiến trúc Clean Architecture',
            duration: '22:15',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            summary: 'Tổ chức source code theo mô hình Clean Architecture chuẩn công ty: Controller -> Service -> Repository -> Domain Entity.',
            codeSnippet: `@RestController\n@RequestMapping("/api/v1/orders")\n@RequiredArgsConstructor\npublic class OrderController {\n    private final OrderService orderService;\n    \n    @PostMapping\n    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest req) {\n        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(req));\n    }\n}`
          },
          {
            id: 'l5',
            title: 'Bài 5: Xác thực & Phân quyền bảo mật cao với Spring Security 6 + JWT',
            duration: '35:40',
            isPreview: false
          },
          {
            id: 'l6',
            title: 'Bài 6: Xử lý ngoại lệ toàn cục (Global Exception Handling) & Validation',
            duration: '24:50',
            isPreview: false
          }
        ]
      },
      {
        id: 'm3',
        title: 'Chương 3: Cơ sở Dữ liệu Nâng cao với Spring Data JPA & Hibernate',
        lessons: [
          {
            id: 'l7',
            title: 'Bài 7: Thiết kế Entity quan hệ 1-N, N-N và chiến lược Fetching Lazy/Eager',
            duration: '28:10',
            isPreview: false
          },
          {
            id: 'l8',
            title: 'Bài 8: Giải quyết dứt điểm vấn đề N+1 Query với EntityGraph & Fetch Join',
            duration: '31:25',
            isPreview: false
          }
        ]
      },
      {
        id: 'm4',
        title: 'Chương 4: Kiến trúc Microservices, Message Broker & Triển khai',
        lessons: [
          {
            id: 'l9',
            title: 'Bài 9: Phân tách dịch vụ và truyền thông bất đồng bộ với Apache Kafka',
            duration: '42:10',
            isPreview: false
          },
          {
            id: 'l10',
            title: 'Bài 10: Docker hóa toàn bộ hệ thống & Deploy lên Cloud K8s',
            duration: '39:00',
            isPreview: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-cpp-system',
    title: 'Lập trình C/C++ Thực Chiến: Tối Ưu Bộ Nhớ & Cấu Trúc Dữ Liệu Nâng Cao',
    slug: 'lap-trinh-cpp-toi-uu-bo-nho',
    category: 'cpp',
    categoryName: 'C/C++ Hệ thống',
    level: 'intermediate',
    levelName: 'Trung cấp - Chuyên sâu',
    badge: 'Kỹ thuật lõi',
    rating: 4.85,
    ratingCount: 980,
    studentsCount: 3820,
    hours: 42,
    lessonsCount: 52,
    lastUpdated: '01/2026',
    price: 1199000,
    originalPrice: 1999000,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Chinh phục con trỏ, quản lý bộ nhớ động (Memory Leaks/RAII), Modern C++ (C++20/23), STL và lập trình nhúng / hệ thống hiệu năng cực cao.',
    fullDesc: `C++ là ngôn ngữ thống trị trong game engine, xe tự hành, tài chính tần số cao (HFT) và hệ điều hành. Khóa học này đưa bạn đi sâu vào bản chất cách máy tính vận hành, cách CPU đọc cache line, lập trình đa luồng không khóa (Lock-free Programming) và cách viết mã C++ hiện đại, an toàn và tối ưu đến từng chu kỳ xung nhịp.`,
    features: [
      'Bản chất con trỏ, địa chỉ bộ nhớ, Stack vs Heap, cấu trúc CPU Cache',
      'Làm chủ Modern C++: Smart Pointers, Move Semantics, Rvalue Reference',
      'Thiết kế Custom Memory Allocator & Profiling bộ nhớ với Valgrind',
      'Cấu trúc dữ liệu tự cài đặt: Red-Black Tree, B-Tree, Hash Map tối ưu',
      'Đa luồng hiệu năng cao: std::atomic, Memory Barriers, Lock-free Queue',
      'Xây dựng 1 Game Engine 2D mini hoặc Engine xử lý giao dịch tài chính'
    ],
    instructor: {
      name: 'Nguyễn Thành Nam',
      role: 'Staff Embedded & Graphics Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      experience: '13+ năm kinh nghiệm',
      students: 8900,
      courses: 3,
      bio: 'Chuyên gia tối ưu mã C++ cấp thấp, từng đóng góp mã nguồn cho các dự án Open Source lớn và phát triển hệ thống điều khiển tự động.'
    },
    modules: [
      {
        id: 'm1',
        title: 'Chương 1: Bản Chất Máy Tính & Bộ Nhớ trong C/C++',
        lessons: [
          {
            id: 'l1',
            title: 'Bài 1: Khám phá mô hình bộ nhớ vi xử lý và vòng đời con trỏ',
            duration: '21:30',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            summary: 'Hiểu rõ cách RAM phân bổ các phân vùng Text, Data, BSS, Heap, Stack và cơ chế tham chiếu con trỏ.',
            codeSnippet: `int a = 42;\nint* ptr = &a;\nstd::cout << "Gia tri: " << *ptr << " | Dia chi: " << ptr << std::endl;`
          },
          {
            id: 'l2',
            title: 'Bài 2: RAII và Smart Pointers (unique_ptr, shared_ptr, weak_ptr)',
            duration: '27:15',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            summary: 'Loại bỏ hoàn toàn lỗi rò rỉ bộ nhớ (Memory Leak) nhờ áp dụng triệt để nguyên lý RAII trong Modern C++.',
            codeSnippet: `auto resource = std::make_unique<DataBuffer>(1024);\nresource->process(); // Tu dong giai phong khi ra khoi scope`
          }
        ]
      },
      {
        id: 'm2',
        title: 'Chương 2: Move Semantics & Tối Ưu Hiệu Suất CPU',
        lessons: [
          {
            id: 'l3',
            title: 'Bài 3: Lvalue, Rvalue, std::move và Move Constructor chuyên sâu',
            duration: '31:40',
            isPreview: false
          },
          {
            id: 'l4',
            title: 'Bài 4: Cache Locality & Tối ưu mảng struct (SoA vs AoS)',
            duration: '25:20',
            isPreview: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-frontend-react',
    title: 'Front-end Toàn Diện: React 19, Next.js 15, TypeScript & Tailwind CSS',
    slug: 'frontend-react-nextjs-typescript',
    category: 'frontend',
    categoryName: 'Front-end',
    level: 'beginner',
    levelName: 'Cơ bản đến Nâng cao',
    badge: 'Xu hướng 2026',
    rating: 4.95,
    ratingCount: 2310,
    studentsCount: 8940,
    hours: 56,
    lessonsCount: 78,
    lastUpdated: '03/2026',
    price: 1399000,
    originalPrice: 2799000,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Xây dựng giao diện web đỉnh cao với React 19 Server Components, Next.js App Router, State Management hiện đại, Tailwind UI và tối ưu Core Web Vitals.',
    fullDesc: `Trở thành Front-end Engineer hiện đại với đầy đủ vũ khí công nghệ mới nhất. Khóa học hướng dẫn bạn từ tư duy Component-driven, Clean UI, thiết kế Responsive chuẩn Pixel-perfect đến xử lý bất đồng bộ, React Compiler, SSR/SSG/ISR với Next.js và tích hợp API thanh toán thực tế.`,
    features: [
      'Làm chủ React 19: use Action Hooks, Server Components, React Compiler',
      'TypeScript từ cơ bản đến Generics, Type Narrowing & Mapped Types',
      'Next.js 15 App Router: Server Actions, Streaming UI, Caching Strategy',
      'Thiết kế giao diện đẳng cấp với Tailwind CSS v3/v4 & Framer Motion',
      'Quản lý State: Zustand, TanStack Query (React Query) v5',
      'Xây dựng 3 dự án lớn: SaaS Dashboard, E-Commerce Platform và Streaming App'
    ],
    instructor: {
      name: 'Lê Hoàng Anh',
      role: 'Head of Frontend tại Fintech Unicorn',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      experience: '9+ năm kinh nghiệm',
      students: 21000,
      courses: 5,
      bio: 'Chuyên gia Front-end & Design Systems, tác giả của nhiều thư viện UI mã nguồn mở với hơn 500k lượt tải trên npm.'
    },
    modules: [
      {
        id: 'm1',
        title: 'Chương 1: Kiến thức Cốt lõi & TypeScript cho React',
        lessons: [
          {
            id: 'l1',
            title: 'Bài 1: Thiết lập dự án Vite, Tailwind CSS và TypeScript chuẩn Production',
            duration: '19:20',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            summary: 'Tạo boilerplate chuẩn với ESLint, Prettier, Absolute Imports và Tailwind Theme Tokenization.',
            codeSnippet: `interface UserCardProps {\n  name: string;\n  role: string;\n  isOnline?: boolean;\n}\n\nexport const UserCard: React.FC<UserCardProps> = ({ name, role, isOnline }) => (\n  <div className="p-4 rounded-xl glass-card flex items-center gap-3">\n    <h4 className="font-semibold text-white">{name}</h4>\n  </div>\n);`
          },
          {
            id: 'l2',
            title: 'Bài 2: React 19 Hooks đột phá: useActionState, useFormStatus & use()',
            duration: '28:40',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            summary: 'Cách xử lý form và dữ liệu bất đồng bộ mượt mà không cần dùng useState thủ công.',
            codeSnippet: `const [state, formAction, isPending] = useActionState(async (prevState, formData) => {\n  const res = await updateProfile(formData);\n  return res;\n}, null);`
          }
        ]
      },
      {
        id: 'm2',
        title: 'Chương 2: Kiến trúc Quản lý State & Gọi API Chuẩn Hiện Đại',
        lessons: [
          {
            id: 'l3',
            title: 'Bài 3: Caching, Deduping & Pagination mượt mà với TanStack Query v5',
            duration: '34:10',
            isPreview: false
          },
          {
            id: 'l4',
            title: 'Bài 4: Quản lý Global State siêu nhẹ và hiệu quả với Zustand',
            duration: '22:30',
            isPreview: false
          }
        ]
      },
      {
        id: 'm3',
        title: 'Chương 3: Next.js 15 App Router & Triển Khai Fullstack',
        lessons: [
          {
            id: 'l5',
            title: 'Bài 5: Server Components vs Client Components - Tư duy tối ưu bundle',
            duration: '38:00',
            isPreview: false
          },
          {
            id: 'l6',
            title: 'Bài 6: Server Actions, Xử lý cookie bảo mật và OAuth Authentication',
            duration: '45:10',
            isPreview: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-database-sql',
    title: 'SQL Server & Database Design: T-SQL, Indexing & Tuning Cho Doanh Nghiệp',
    slug: 'sql-server-database-design-tuning',
    category: 'database',
    categoryName: 'SQL Server & CSDL',
    level: 'all',
    levelName: 'Mọi cấp độ',
    badge: 'Ứng dụng cao',
    rating: 4.88,
    ratingCount: 1120,
    studentsCount: 4720,
    hours: 36,
    lessonsCount: 46,
    lastUpdated: '02/2026',
    price: 999000,
    originalPrice: 1899000,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Nắm vững tư duy thiết kế cơ sở dữ liệu chuẩn hóa, viết câu lệnh T-SQL phức tạp, tối ưu Index, Execution Plan và giải quyết nghẽn Deadlock cho hệ thống hàng triệu bản ghi.',
    fullDesc: `Cơ sở dữ liệu là trái tim của mọi ứng dụng. Khóa học giúp bạn nắm vững từ bản chất chuẩn hóa 3NF/BCNF, viết Stored Procedures, Triggers, Views, đến các kỹ năng nâng cao như đọc Execution Plan, chiến lược Indexing (Clustered, Non-clustered, Covering Index, Filtered Index) và kỹ thuật phân vùng bảng (Table Partitioning).`,
    features: [
      'Thiết kế CSDL chuẩn hóa (1NF -> 3NF) tránh dư thừa và mâu thuẫn dữ liệu',
      'Thành thạo T-SQL nâng cao: Window Functions, CTE, PIVOT, Dynamic SQL',
      'Đọc hiểu Execution Plan, phát hiện Table Scan và lỗi thiếu Index',
      'Chiến lược thiết kế Index tối ưu truy vấn tăng tốc 10x - 100x',
      'Xử lý Concurrency: Isolation Levels, Pessimistic vs Optimistic Locking',
      'Backup, Restore và lên kế hoạch khôi phục thảm họa (Disaster Recovery)'
    ],
    instructor: {
      name: 'Vũ Quốc Khánh',
      role: 'Senior Database Administrator & Data Architect',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      experience: '12+ năm kinh nghiệm',
      students: 7300,
      courses: 2,
      bio: 'Chuyên gia cơ sở dữ liệu Microsoft Certified Solutions Expert (MCSE), từng tư vấn kiến trúc dữ liệu cho các ngân hàng và hệ thống bán lẻ đa kênh.'
    },
    modules: [
      {
        id: 'm1',
        title: 'Chương 1: Tư Duy Thiết Kế CSDL & T-SQL Nâng Cao',
        lessons: [
          {
            id: 'l1',
            title: 'Bài 1: Chuẩn hóa dữ liệu thực tế và phân tích quan hệ thực thể (ERD)',
            duration: '24:15',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            summary: 'Các lỗi kinh điển khi thiết kế schema và cách tối ưu kiểu dữ liệu VARCHAR vs NVARCHAR, INT vs BIGINT.',
            codeSnippet: `CREATE TABLE Customers (\n    CustomerID INT IDENTITY(1,1) PRIMARY KEY,\n    FullName NVARCHAR(100) NOT NULL,\n    Email VARCHAR(150) UNIQUE NOT NULL,\n    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()\n);`
          },
          {
            id: 'l2',
            title: 'Bài 2: Làm chủ Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)',
            duration: '29:40',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            summary: 'Cách xếp hạng và tính toán thống kê tức thời mà không làm suy giảm hiệu năng cơ sở dữ liệu.',
            codeSnippet: `SELECT \n    EmployeeID, DepartmentID, Salary,\n    DENSE_RANK() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) as RankInDept\nFROM Employees;`
          }
        ]
      },
      {
        id: 'm2',
        title: 'Chương 2: Tối Ưu Hiệu Năng Truy Vấn & Indexing Chuyên Sâu',
        lessons: [
          {
            id: 'l3',
            title: 'Bài 3: Giải phẫu Execution Plan: Index Seek vs Index Scan và Lookups',
            duration: '35:20',
            isPreview: false
          },
          {
            id: 'l4',
            title: 'Bài 4: Covering Index và kỹ thuật loại bỏ Key Lookup hoàn toàn',
            duration: '30:50',
            isPreview: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-python-ai',
    title: 'Python AI & LLM Engineer: Xây Dựng Ứng Dụng AI với LangChain & OpenAI',
    slug: 'python-ai-llm-langchain',
    category: 'python-ai',
    categoryName: 'Python & AI',
    level: 'intermediate',
    levelName: 'Trung cấp',
    badge: 'Đột phá AI',
    rating: 4.92,
    ratingCount: 1650,
    studentsCount: 6100,
    hours: 44,
    lessonsCount: 58,
    lastUpdated: '03/2026',
    price: 1499000,
    originalPrice: 2999000,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Từ lập trình Python chuyên nghiệp đến tích hợp Mô hình ngôn ngữ lớn (LLM), RAG (Retrieval-Augmented Generation), Vector Database và AI Agents tự động hóa.',
    fullDesc: `Làn sóng AI tạo sinh (Generative AI) đang thay đổi hoàn toàn ngành phần mềm. Khóa học này đào tạo kỹ sư AI ứng dụng: từ xử lý dữ liệu với Pandas/NumPy, xây dựng API với FastAPI, đến việc kết nối Vector DB (Pinecone, ChromaDB), kỹ thuật Prompt Engineering nâng cao và xây dựng hệ thống AI Agent có khả năng suy luận độc lập.`,
    features: [
      'Python nâng cao: Type Hints, AsyncIO, Generators & Decorators',
      'Xây dựng RESTful API hiệu năng cao với FastAPI & Pydantic v2',
      'Tích hợp OpenAI GPT-4o, Claude 3.5 & Google Gemini API',
      'Xây dựng hệ thống hỏi đáp tài liệu thông minh (RAG) với LangChain',
      'Lưu trữ & Truy vấn ngữ nghĩa với Vector Database (Chroma / Qdrant)',
      'Phát triển Multi-Agent Systems với LangGraph giải quyết bài toán phức tạp'
    ],
    instructor: {
      name: 'Đặng Mai Phương',
      role: 'Lead AI Engineer & Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      experience: '8+ năm kinh nghiệm',
      students: 11200,
      courses: 3,
      bio: 'Tiến sĩ Khoa học Máy tính, diễn giả về Trí tuệ Nhân tạo ứng dụng, từng phát triển các trợ lý ảo AI cho tập đoàn viễn thông.'
    },
    modules: [
      {
        id: 'm1',
        title: 'Chương 1: Python Hiện Đại & Xây Dựng REST API với FastAPI',
        lessons: [
          {
            id: 'l1',
            title: 'Bài 1: Thiết lập môi trường Python 3.12, Poetry & Cấu trúc dự án chuẩn',
            duration: '20:10',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            summary: 'Quản lý dependencies chuẩn xác với Poetry, cấu hình virtual environment và linting với Ruff.',
            codeSnippet: `from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI(title="AI Agent Gateway")\n\nclass PromptReq(BaseModel):\n    query: string\n\n@app.post("/api/chat")\nasync def chat(req: PromptReq):\n    return {"status": "success", "response": f"AI da nhan: {req.query}"}`
          },
          {
            id: 'l2',
            title: 'Bài 2: Gọi LLM API & Kỹ thuật Structured Output với Pydantic',
            duration: '27:45',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            summary: 'Cách ép mô hình AI trả về JSON chuẩn xác 100% để ứng dụng backend sử dụng trực tiếp.',
            codeSnippet: `completion = client.beta.chat.completions.parse(\n    model="gpt-4o",\n    messages=[{"role": "user", "content": "Trich xuat thong tin don hang..."}],\n    response_format=OrderExtraction\n)`
          }
        ]
      }
    ]
  },
  {
    id: 'course-golang-system',
    title: 'Golang Microservices: High-Throughput & Concurrency System Design',
    slug: 'golang-microservices-concurrency',
    category: 'golang',
    categoryName: 'Golang & Microservices',
    level: 'advanced',
    levelName: 'Nâng cao',
    badge: 'Chịu tải cao',
    rating: 4.91,
    ratingCount: 840,
    studentsCount: 3150,
    hours: 40,
    lessonsCount: 50,
    lastUpdated: '02/2026',
    price: 1350000,
    originalPrice: 2400000,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Xây dựng dịch vụ mạng phân tán, giao thức gRPC cực nhanh, Goroutines, Channels, Redis Caching và kiến trúc Event-Driven chịu tải triệu người dùng cùng lúc.',
    fullDesc: `Golang là sự lựa chọn số 1 cho các dịch vụ đòi hỏi độ trễ thấp và khả năng mở rộng quy mô cực đại. Khóa học tập trung vào cách Go quản lý bộ nhớ, Goroutines Scheduler, lập trình Socket mạng, triển khai kiến trúc Hexagonal Architecture và tối ưu hóa hệ thống microservices vận hành ổn định 99.99% SLA.`,
    features: [
      'Bản chất Concurrency trong Go: Goroutines, Channels, Select, Mutex',
      'Xây dựng giao tiếp dịch vụ siêu tốc với Protocol Buffers & gRPC',
      'Kiến trúc Hexagonal (Ports & Adapters) cho dự án Enterprise',
      'Tối ưu Caching nhiều tầng với In-memory & Redis Cluster',
      'Xử lý hàng đợi chịu lỗi cao với Apache Kafka và RabbitMQ',
      'Tracing phân tán với OpenTelemetry và Jaeger'
    ],
    instructor: {
      name: 'Phạm Minh Quân',
      role: 'Chief Architect tại Payment Gateway',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      experience: '10+ năm kinh nghiệm',
      students: 6200,
      courses: 2,
      bio: 'Chuyên gia hạ tầng thanh toán điện tử, phụ trách các hệ thống xử lý giao dịch đạt hơn 50.000 TPS trong các dịp khuyến mãi lớn.'
    },
    modules: [
      {
        id: 'm1',
        title: 'Chương 1: Goroutines & Concurrency Patterns Chuẩn Go',
        lessons: [
          {
            id: 'l1',
            title: 'Bài 1: Cơ chế hoạt động của Go Scheduler (M:N Model) & Worker Pools',
            duration: '25:40',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            summary: 'Hiểu rõ Logical Processors, OS Threads và cách Goroutines chuyển đổi ngữ cảnh siêu nhẹ chỉ 2KB bộ nhớ.',
            codeSnippet: `func worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        fmt.Printf("Worker %d xu ly job %d\\n", id, j)\n        results <- j * 2\n    }\n}`
          },
          {
            id: 'l2',
            title: 'Bài 2: Context Package, Timeout & Graceful Shutdown dịch vụ',
            duration: '22:15',
            isPreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            summary: 'Cách ngắt kết nối an toàn và giải phóng tài nguyên khi dịch vụ nhận tín hiệu SIGINT/SIGTERM.',
            codeSnippet: `ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\ndefer cancel()`
          }
        ]
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Nguyễn Văn Hùng',
    role: 'Java Software Engineer tại FPT Software',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    content: 'Khóa Java Spring Boot trên CodeMaster đã giúp mình pass phỏng vấn vị trí Middle chỉ sau 4 tháng học. Nội dung rất thực chiến, đặc biệt phần tối ưu SQL và kiến trúc Microservices.',
    course: 'Java Backend Masterclass',
    rating: 5
  },
  {
    id: 2,
    name: 'Trần Thị Thu Thảo',
    role: 'Frontend Developer tại Momo',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    content: 'Giao diện và chất lượng video học rất cuốn hút. Các bài học thử cho mình cái nhìn rõ ràng trước khi mua. Sau khi hoàn thành khóa React & Next.js, mình đã tự tin làm chủ toàn bộ dự án tại công ty.',
    course: 'Front-end Toàn Diện React 19',
    rating: 5
  },
  {
    id: 3,
    name: 'Đỗ Đức Thắng',
    role: 'Database Engineer tại Techcombank',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    content: 'Phần giảng về Indexing và phân tích Execution Plan của thầy Khánh thực sự mở mang tầm mắt. Những kỹ thuật này đã giúp team mình giảm thời gian truy vấn báo cáo từ 45 giây xuống còn 0.6 giây!',
    course: 'SQL Server & Database Tuning',
    rating: 5
  }
];

// Initial enrolled courses for user (empty by default)
export const INITIAL_ENROLLED_COURSES = [];

