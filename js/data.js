// Dữ liệu sách
const books = [
    {
        id: 1,
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        price: 120000,
        salePrice: 89000,
        category: "fiction",
        rating: 4.8,
        reviews: 1250,
        icon: "📕",
        description: "Một tác phẩm kinh điển về hành trình tìm kiếm vận mệnh của mình. Cuốn sách này đã truyền cảm hứng cho hàng triệu độc giả trên toàn thế giới."
    },
    {
        id: 2,
        title: "Tư Duy Nhanh Và Chậm",
        author: "Daniel Kahneman",
        price: 150000,
        salePrice: 99000,
        category: "selfhelp",
        rating: 4.7,
        reviews: 980,
        icon: "📗",
        description: "Khám phá cách não bộ của chúng ta hoạt động và những sai lầm trong suy luận hàng ngày."
    },
    {
        id: 3,
        title: "Lập Trình Với Python",
        author: "Mark Lutz",
        price: 180000,
        salePrice: 125000,
        category: "tech",
        rating: 4.6,
        reviews: 650,
        icon: "💻",
        description: "Hướng dẫn toàn diện về ngôn ngữ lập trình Python, từ cơ bản đến nâng cao."
    },
    {
        id: 4,
        title: "Lịch Sử Thế Giới",
        author: "E.H. Carr",
        price: 140000,
        salePrice: 95000,
        category: "history",
        rating: 4.5,
        reviews: 520,
        icon: "📙",
        description: "Một cái nhìn tổng quan về lịch sử loài người từ thời cổ đại đến hiện đại."
    },
    {
        id: 5,
        title: "Thói Quen Tốt",
        author: "James Clear",
        price: 130000,
        salePrice: 88000,
        category: "selfhelp",
        rating: 4.9,
        reviews: 2100,
        icon: "📔",
        description: "Cách xây dựng thói quen tốt và vứt bỏ thói quen xấu để tạo cuộc sống tốt hơn."
    },
    {
        id: 6,
        title: "The Big Picture",
        author: "Sean Carroll",
        price: 160000,
        salePrice: 110000,
        category: "tech",
        rating: 4.4,
        reviews: 380,
        icon: "📕",
        description: "Tìm hiểu về vũ trụ, khoa học và ý nghĩa của sự tồn tại."
    },
    {
        id: 7,
        title: "Nghìn Năm Lịch Sử",
        author: "Bill Gates",
        price: 170000,
        salePrice: 115000,
        category: "history",
        rating: 4.6,
        reviews: 890,
        icon: "📗",
        description: "Một lịch sử toàn cảnh về sự phát triển của xã hội loài người qua các thời kỳ."
    },
    {
        id: 8,
        title: "Cuộc Sống Của Pi",
        author: "Yann Martel",
        price: 125000,
        salePrice: 85000,
        category: "fiction",
        rating: 4.7,
        reviews: 1450,
        icon: "📙",
        description: "Câu chuyện kỳ diệu về một chàng trai và cuộc phiêu lưu tuyệt vời trên biển."
    },
    {
        id: 9,
        title: "Được Mua Lại",
        author: "Ryan Holiday",
        price: 115000,
        salePrice: 78000,
        category: "selfhelp",
        rating: 4.5,
        reviews: 620,
        icon: "📔",
        description: "Bí quyết để giành lại cuộc sống của bạn từ những căng thẳng và bộn bề hàng ngày."
    },
    {
        id: 10,
        title: "JavaScript: Hành Động",
        author: "Kyle Simpson",
        price: 185000,
        salePrice: 130000,
        category: "tech",
        rating: 4.8,
        reviews: 580,
        icon: "💻",
        description: "Học JavaScript sâu hơn với các ví dụ thực tế và best practices."
    },
    {
        id: 11,
        title: "Lạc Trong Phòng Thế Giới",
        author: "Matt Damon",
        price: 145000,
        salePrice: 98000,
        category: "fiction",
        rating: 4.3,
        reviews: 420,
        icon: "📕",
        description: "Một câu chuyện hấp dẫn về những bí mật ẩn giấu trong một phòng bí ẩn."
    },
    {
        id: 12,
        title: "Kỹ Năng Giao Tiếp",
        author: "Dale Carnegie",
        price: 110000,
        salePrice: 75000,
        category: "selfhelp",
        rating: 4.7,
        reviews: 3200,
        icon: "📗",
        description: "Cách giao tiếp hiệu quả và xây dựng mối quan hệ tốt với mọi người."
    }
];

// Thêm thêm sách để tạo sự đa dạng
const allBooks = [
    ...books,
    {
        id: 13,
        title: "CSS Mastery",
        author: "Andy Budd",
        price: 140000,
        salePrice: 92000,
        category: "tech",
        rating: 4.5,
        reviews: 450,
        icon: "💻",
        description: "Thành thạo CSS - từ cơ bản đến thiết kế web chuyên nghiệp."
    },
    {
        id: 14,
        title: "Mật Mã Của Thành Công",
        author: "Darren Hardy",
        price: 135000,
        salePrice: 90000,
        category: "selfhelp",
        rating: 4.6,
        reviews: 780,
        icon: "📔",
        description: "Những nguyên tắc để đạt được sự thành công trong cuộc sống và sự nghiệp."
    },
    {
        id: 15,
        title: "Chiến Tranh Và Hòa Bình",
        author: "Leo Tolstoy",
        price: 200000,
        salePrice: 145000,
        category: "history",
        rating: 4.8,
        reviews: 1680,
        icon: "📙",
        description: "Tác phẩm kinh điển miêu tả các sự kiện lịch sử qua cuộc sống của những nhân vật."
    }
];
