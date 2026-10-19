# E-commerce UI Improvement

## 1. Giới thiệu
Bài tập cá nhân Chương 1 môn Phát triển ứng dụng TMĐT. Em khảo sát website Shopee Việt Nam và chọn cải tiến **thẻ sản phẩm** (product card) trong danh sách sản phẩm: hiển thị rõ giá bán, giá gốc, mức giảm, và bố cục lưới phù hợp cả máy tính lẫn điện thoại.

## 2. Website tham khảo
- Tên website: Shopee Việt Nam
- URL: https://shopee.vn
- Ngày khảo sát: 18/10/2026
- Khu vực đã khảo sát: Trang chủ, Danh mục sản phẩm, Chi tiết sản phẩm, Tìm kiếm, Giỏ hàng
- Bảng khảo sát đầy đủ: xem [survey.md](survey.md)
- Ảnh chụp minh chứng: thư mục [images/screenshots](images/screenshots)

## 3. Chức năng
- Hiển thị danh sách 8 sản phẩm mẫu dạng lưới.
- Mỗi thẻ hiển thị: ảnh, tên (tối đa 2 dòng), giá bán, giá gốc gạch ngang, nhãn % giảm, đánh giá, số đã bán, nút "Thêm vào giỏ".
- Sản phẩm không giảm giá chỉ hiển thị giá bán, không hiện nhãn hay giá gạch ngang.
- Bố cục tự đổi số cột: 2 cột (điện thoại), 3 cột (máy tính bảng), 4 cột (máy tính).
- Hiệu ứng khi rê chuột lên thẻ và nút.

## 4. Công nghệ
- HTML5
- CSS3 (CSS Grid, Flexbox, media query)
- Không dùng JavaScript, backend hay thư viện ngoài.

## 5. Cách chạy
Mở file `index.html` bằng trình duyệt (hoặc dùng extension Live Server trong VS Code).
Demo: (dán link GitHub Pages sau khi bật, dạng `https://USERNAME.github.io/ecommerce-ui-improvement/`)

## 6. Cải tiến đã thực hiện
**Vấn đề ban đầu (quan sát trên Shopee):**
- Thẻ sản phẩm trong trang danh mục chỉ hiện một mức giá, chưa thấy giá gốc gạch ngang nên khó nhận ra mức tiết kiệm.
- Nhãn % giảm nhỏ, nằm lệch ở góc ảnh.
- Nhiều nhãn chồng nhau (Voucher Xtra, Hoa Hồng Xtra...) và ảnh chứa nhiều chữ khuyến mãi nên mắt khó dừng ở thông tin chính (tên, giá).
- Tên sản phẩm bị cắt bằng dấu "...".
- Khi xem ở kích thước điện thoại (375px), danh sách hiển thị [2] cột; thẻ vẫn chứa nhiều nhãn nhỏ nên [chữ giá và nhãn giảm giá khá nhỏ / thông tin chính khó đọc nhanh].

**Thay đổi đã thực hiện:**
- Giá bán cỡ chữ lớn, màu nhấn; giá gốc nhỏ, màu xám, gạch ngang (`<del>`).
- Nhãn % giảm bo tròn, nền đậm, đặt cố định góc trên bên phải ảnh.
- Mỗi thẻ chỉ gồm ảnh, tên, giá, đánh giá, nút; không chồng nhiều nhãn.
- Ảnh tỉ lệ 1:1 với `object-fit: cover`; tên giới hạn 2 dòng; nút luôn nằm đáy thẻ để các thẻ thẳng hàng.
- Lưới mobile-first: 2 cột, mở rộng lên 3 và 4 cột bằng media query.

**Điểm tôi tự phát hiện và sửa sau khi kiểm tra:**
- - Thêm hiệu ứng :active (thu nhỏ nút còn 97%) cho nút "Thêm vào giỏ" (file css/style.css, class .btn-add). Lý do: trên điện thoại không có thao tác rê chuột nên :hover gần như không có tác dụng, cần phản hồi khi chạm nút. Đã kiểm tra bằng cách bấm giữ nút trên trình duyệt.

## 7. Hỗ trợ từ AI
AI (Claude) hỗ trợ: soạn nháp bảng khảo sát từ ảnh chụp, phân tích giao diện, đề xuất bố cục thẻ sản phẩm, và tạo mã HTML/CSS ban đầu. Tôi đã tự khảo sát và chụp ảnh Shopee, đối chiếu nhận xét của AI với ảnh, chạy thử trang trên trình duyệt ở kích thước máy tính và điện thoại, tự chỉnh sửa và giải thích được các phần mã quan trọng. Chi tiết xem [AI_USAGE.md](AI_USAGE.md).

## Nguồn hình ảnh và dữ liệu
- Ảnh sản phẩm `images/product-*.jpg` lấy từ các trang bán hàng trực tuyến.
- Tên, giá, đánh giá sản phẩm là dữ liệu mẫu tự đặt.
- Ảnh trong `images/screenshots` là ảnh chụp màn hình Shopee dùng để minh họa nhận xét khảo sát.