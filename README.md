# VoltLab — Website phụ kiện công nghệ (Bài tập cá nhân Buổi 2)

**Môn học:** Phát triển ứng dụng WEB/TMĐT · **Chủ đề:** Cải tiến giao diện phụ kiện điện thoại từ Buổi 1.

VoltLab là **website mẫu bằng HTML5 và CSS3**, xây dựng theo phong cách giao diện thương mại điện tử hiện đại. Dự án kế thừa **8 sản phẩm cùng mức giá mẫu đã có từ Buổi 1**; không thay đổi repository GitHub cũ. Giao diện thiết kế lại để dễ điều hướng, dễ so sánh giá và xem thông số.

## Cách chạy

Mở thư mục bằng **VS Code**, mở `index.html` trong Chrome/Edge hoặc dùng tiện ích **Live Server → Open with Live Server**. Không cần cài thư viện, `npm install` hoặc kết nối mạng. Website chỉ sử dụng HTML/CSS và ảnh SVG lưu trong `images/`.

## Cấu trúc trang

- `index.html`: Trang chủ, banner, danh mục và sản phẩm nổi bật.
- `products.html`: Tất cả 8 sản phẩm.
- `products-price-low.html`, `products-price-high.html`: Sản phẩm xếp theo giá (liên kết đến các trang HTML tĩnh riêng).
- `categories.html`: Trang danh mục.
- `category-pin.html`, `category-sac.html`, `category-khac.html`: Ba nhóm hàng.
- `product-1.html` đến `product-8.html`: Tám trang chi tiết sản phẩm độc lập.
- `about.html`: Giới thiệu dự án.
- `guide.html`: Cẩm nang và FAQ.
- `css/style.css`: CSS riêng dùng chung toàn website.
- `images/`: Ảnh SVG phục vụ demo, không phụ thuộc link ảnh ngoài.
- `evidence/`: Ảnh và kết quả kiểm thử tự động.
- `BAO_CAO_THUC_HANH_BUOI_2.docx`: Báo cáo Word gồm kiểm thử và **đủ 7 câu hỏi kiến thức**.
- `AI_USAGE_BUOI2.md`: Nhật ký sử dụng AI trong Buổi 2.

**Tổng cộng: 18 trang HTML.** Các liên kết trong menu, danh mục, thẻ sản phẩm, trang chi tiết và liên kết xếp giá đều dẫn đến trang HTML riêng.

## Kiến thức thực hành

- HTML5 có ngữ nghĩa: `header`, `nav`, `main`, `section`, `article`, `footer`, tiêu đề `h1/h2/h3`, `ul/li`, `img` có `alt`, `table`, `details/summary`.
- CSS selector và Box Model: `.product-card`, `.card-info`, `.price`, `.sale-ribbon`, `margin`, `padding`, `border`, `border-radius`, `box-sizing`.
- Flexbox: menu, header, các nút và nhóm thông tin trên thẻ.
- CSS Grid: danh sách thẻ sản phẩm và bố cục banner.
- Responsive (1366px, 768px, 390px và 320px); `:hover`, `:focus-visible`, `transition`.
- **Font chữ:** `Segoe UI`, `Arial`, `Helvetica`, `sans-serif` — font hệ thống, không tải Google Fonts, tránh lỗi thiếu font khi mở bằng VS Code.

## Lưu ý phạm vi

Đây là **website demo học tập**. Hình ảnh, giá, giá gốc, thông số và các mức khuyến mãi không phải chào bán thực tế. **Không có JavaScript, tìm kiếm theo từ khóa, giỏ hàng, đặt hàng hoặc thanh toán thật**; những nội dung đó dành cho các buổi học tiếp theo. Chức năng “sắp xếp theo giá” dùng các tệp HTML tĩnh đã sắp sẵn, không phải thuật toán JavaScript.

## Tiếp tục repository Buổi 1

Repository cũ: https://github.com/KienNguyen1504/ecommerce-ui-improvement

1. Sao lưu repository và chụp ảnh giao diện cũ trước khi thay đổi.
2. Trong thư mục dự án cũ (có `.git/`), chép đè `index.html`, `css/style.css`, `images/`, thêm các trang HTML mới và `BAO_CAO_THUC_HANH_BUOI_2.docx`.
3. **Giữ lại `survey.md`, `AI_USAGE.md` và ảnh Buổi 1** có trong repository gốc. Các file này **không được tạo giả** trong gói vì chỉ có bản gốc trên máy/GitHub của sinh viên.
4. Chạy và tự kiểm tra từng trang; tự sửa ít nhất một điểm HTML/CSS và ghi vào **file Word**, chụp ảnh trước/sau sửa.
5. Chạy `git status`, rồi `git add .`, `git commit -m "Improve multi-page storefront UI with HTML5 CSS3"`, `git push` trên đúng nhánh đang làm.

**Về Codex trong VS Code:** Website này không cần Codex hoạt động để xem hoặc chỉnh sửa mã. Nếu extension Codex bị lỗi, đó là vấn đề cấu hình/đăng nhập hoặc extension riêng, không phải do font trong CSS.
