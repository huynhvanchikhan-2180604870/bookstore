import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";
import Category from "@/models/Category";
import Author from "@/models/Author";
import Publisher from "@/models/Publisher";

const booksData = [
  {
    title: "Đắc Nhân Tâm",
    authorName: "Dale Carnegie",
    description: "Đắc nhân tâm của Dale Carnegie là quyển sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại. Tác phẩm đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và có mặt ở hàng trăm quốc gia.",
    price: 89000,
    discountPrice: 69000,
    categoryName: "Kỹ năng sống",
    isbn: "978-8935086883",
    publisherName: "NXB Tổng Hợp",
    publishDate: "2020-01-15",
    pages: 320,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    stock: 150,
    featured: true,
    bestseller: true,
  },
  {
    title: "Nhà Giả Kim",
    authorName: "Paulo Coelho",
    description: "Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người.",
    price: 79000,
    discountPrice: 59000,
    categoryName: "Văn học",
    isbn: "978-8935235162",
    publisherName: "NXB Văn Học",
    publishDate: "2019-06-20",
    pages: 227,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    stock: 200,
    featured: true,
    bestseller: true,
  },
  {
    title: "Sapiens: Lược Sử Loài Người",
    authorName: "Yuval Noah Harari",
    description: "Sapiens là một câu chuyện lịch sử về loài người từ khi xuất hiện đến nay. Cuốn sách đã trở thành hiện tượng xuất bản toàn cầu với hơn 10 triệu bản được bán ra.",
    price: 199000,
    discountPrice: 159000,
    categoryName: "Lịch sử",
    isbn: "978-8935235199",
    publisherName: "NXB Thế Giới",
    publishDate: "2021-03-10",
    pages: 512,
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
    stock: 100,
    featured: true,
    bestseller: false,
  },
  {
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    authorName: "Rosie Nguyễn",
    description: "Cuốn sách dành cho những người trẻ đang loay hoay tìm kiếm chính mình, những người đang muốn thay đổi bản thân để có một cuộc sống tốt đẹp hơn.",
    price: 89000,
    discountPrice: 69000,
    categoryName: "Kỹ năng sống",
    isbn: "978-8935235176",
    publisherName: "NXB Hội Nhà Văn",
    publishDate: "2020-08-15",
    pages: 288,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 180,
    featured: true,
    bestseller: true,
  },
  {
    title: "Nghĩ Giàu Làm Giàu",
    authorName: "Napoleon Hill",
    description: "Think and Grow Rich - Nghĩ giàu & làm giàu là một trong những cuốn sách bán chạy nhất mọi thời đại. Đã hơn 60 triệu bản được phát hành với gần trăm ngôn ngữ trên toàn thế giới.",
    price: 99000,
    discountPrice: 79000,
    categoryName: "Kinh tế",
    isbn: "978-8935235183",
    publisherName: "NXB Tổng Hợp",
    publishDate: "2019-11-20",
    pages: 384,
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    stock: 120,
    featured: false,
    bestseller: true,
  },
  {
    title: "Atomic Habits",
    authorName: "James Clear",
    description: "Atomic Habits sẽ thay đổi cách bạn nghĩ về tiến bộ và thành công, đồng thời cung cấp cho bạn các công cụ và chiến lược để biến đổi thói quen.",
    price: 149000,
    discountPrice: 119000,
    categoryName: "Kỹ năng sống",
    isbn: "978-8935235206",
    publisherName: "NXB Thế Giới",
    publishDate: "2020-05-10",
    pages: 352,
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400",
    stock: 160,
    featured: true,
    bestseller: true,
  },
  {
    title: "Cà Phê Cùng Tony",
    authorName: "Tony Buổi Sáng",
    description: "Cà phê cùng Tony là tập hợp những bài viết truyền cảm hứng, động lực sống của tác giả Tony Buổi Sáng được đăng tải trên Facebook.",
    price: 79000,
    discountPrice: 59000,
    categoryName: "Kỹ năng sống",
    isbn: "978-8935235213",
    publisherName: "NXB Trẻ",
    publishDate: "2018-09-15",
    pages: 256,
    coverImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400",
    stock: 140,
    featured: false,
    bestseller: true,
  },
  {
    title: "Tôi Tài Giỏi, Bạn Cũng Thế",
    authorName: "Adam Khoo",
    description: "Cuốn sách chia sẻ những bí quyết và phương pháp học tập hiệu quả giúp bạn trở thành học sinh xuất sắc và thành công trong cuộc sống.",
    price: 89000,
    discountPrice: 69000,
    categoryName: "Kỹ năng sống",
    isbn: "978-8935235220",
    publisherName: "NXB Tổng Hợp",
    publishDate: "2019-04-20",
    pages: 304,
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    stock: 130,
    featured: false,
    bestseller: false,
  },
  {
    title: "Homo Deus: Lược Sử Tương Lai",
    authorName: "Yuval Noah Harari",
    description: "Homo Deus khám phá những dự án sẽ định hình thế kỷ XXI, từ việc vượt qua cái chết đến việc tạo ra trí tuệ nhân tạo và sự sống nhân tạo.",
    price: 199000,
    discountPrice: 159000,
    categoryName: "Lịch sử",
    isbn: "978-8935235237",
    publisherName: "NXB Thế Giới",
    publishDate: "2021-07-15",
    pages: 544,
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400",
    stock: 90,
    featured: true,
    bestseller: false,
  },
  {
    title: "Đời Ngắn Đừng Ngủ Dài",
    authorName: "Robin Sharma",
    description: "Cuốn sách truyền cảm hứng về việc tận dụng tối đa thời gian và sống một cuộc đời ý nghĩa, không lãng phí từng khoảnh khắc quý giá.",
    price: 79000,
    discountPrice: 59000,
    categoryName: "Kỹ năng sống",
    isbn: "978-8935235244",
    publisherName: "NXB Trẻ",
    publishDate: "2020-02-10",
    pages: 272,
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    stock: 170,
    featured: false,
    bestseller: true,
  },
];

export async function GET() {
  try {
    await dbConnect();

    const createdBooks = [];

    for (const bookData of booksData) {
      const { authorName, categoryName, publisherName, ...rest } = bookData;

      let category = await Category.findOne({ name: categoryName });
      if (!category) {
        category = await Category.create({ 
          name: categoryName, 
          slug: categoryName.toLowerCase().replace(/\s+/g, '-') 
        });
      }

      let author = await Author.findOne({ name: authorName });
      if (!author) {
        author = await Author.create({ name: authorName });
      }

      let publisher = await Publisher.findOne({ name: publisherName });
      if (!publisher) {
        publisher = await Publisher.create({ name: publisherName });
      }

      const existingBook = await Book.findOne({ isbn: rest.isbn });
      if (!existingBook) {
        const book = await Book.create({
          ...rest,
          author: author._id,
          category: category._id,
          publisher: publisher._id,
          language: "Tiếng Việt",
          images: [rest.coverImage],
          rating: 0,
          reviewCount: 0,
        });
        createdBooks.push(book);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Seeded ${createdBooks.length} books`,
      books: createdBooks 
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
