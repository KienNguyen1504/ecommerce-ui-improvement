# Advanced Front-End – Chương 6

**Sinh viên:** Nguyễn Văn Kiên · **MSSV dùng trong bài:** 31241024550 (cần xác minh) · **Lớp:** 26C1INF50902701

## Các phần
- `shop.html`: VoltLab – danh sách sản phẩm, tìm kiếm, lọc, sắp xếp, badge giảm giá, nhãn NEW/BEST SELLER, progress kho theo Bootstrap 3 markup, giỏ hàng localStorage.
- `product.html?id=p1`: ảnh chính và 2 góc nhìn, xZoom plugin nếu CDN hoạt động; có zoom thuần JS dự phòng. Bootstrap Star Rating tích hợp có fallback text sao.
- `LMS-JQuery/`: bài phân tích bài tập LMS qua các selector `.modtype_assign`, `.instancename`, nhóm topic, deadline. Có giao diện dữ liệu mẫu và script chạy trên LMS thực (phải đăng nhập tài khoản của chính mình).
- `FlappyBird/`: game canvas dùng phím ArrowDown; Level 1/2/3/4 mốc 0/5/20/40, chiến thắng tại 50, interval 40/30/25/20ms.

## Chạy
Mở `Advanced-FE/index.html` bằng VS Code Live Server để `fetch('products.json')` hoạt động. Không mở trực tiếp với giao thức `file://`. Các plugin xZoom/Bootstrap Star Rating cần truy cập Internet. Chức năng cơ bản được triển khai với JavaScript thuần để hoạt động khi offline.

## Giới hạn thực tế
Không đăng nhập LMS thay sinh viên, không thể tự chụp dữ liệu có hạn nộp riêng của lớp. E-commerce là bản học tập: giá, số tồn và đánh giá giả định; giỏ hàng lưu cục bộ, không phải đặt hàng hoặc thanh toán thực.

GitHub Pages dự kiến sau khi push: https://kiennguyen1504.github.io/ecommerce-ui-improvement/Advanced-FE/
