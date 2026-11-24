# CSS Nâng Cao — Lab 07 (19 Exercise)

**Họ tên:** Nguyễn Văn Kiên  
**Lớp học phần:** 26C1INF50902701  
**MSSV trong các báo cáo trước:** 31241024550 (*cần đối chiếu với MSSV chính xác trước khi nộp*).

**Repository:** https://github.com/KienNguyen1504/ecommerce-ui-improvement  
**GitHub Pages (sau khi push và triển khai):** https://kiennguyen1504.github.io/ecommerce-ui-improvement/CSS-NangCao/

## Cách chạy

1. Mở `CSS-NangCao/index.html` bằng Live Server hoặc GitHub Pages.
2. Chọn Exercise trong ô chọn và nhấn **Chạy bài đã chọn**. Trang Exercise tự mở với `?autorun=1` và hiển thị nội dung được chèn vào DOM ở thời điểm chạy.
3. Nếu vào trực tiếp `Lab07/ExerciseXX/index.html` không có `?autorun=1`, ban đầu trang không có phần thực hành; nhấn **Chạy code** mới tạo HTML và áp dụng stylesheet.
4. Mỗi bài có HTML, CSS riêng; các bài 7.12/7.13 còn có `desktop.css`/`mobile.css`, bài 7.19 dùng Bootstrap 3.4.1.

**Về nút chạy:** JavaScript trong `js/exercise-runner.js` chỉ kích hoạt việc đưa đoạn HTML bài thực hành vào DOM. CSS của Exercise mới quyết định cách hiển thị, định vị và hiệu ứng. Đây không phải trình biên dịch CSS hay chương trình JavaScript dựng hình giả.

## Tổ chức

- `index.html`: portfolio cá nhân; có thông tin sinh viên, mục tiêu, danh sách liên kết tới 19 Exercise và phần tổng kết. **Không chứa ảnh demo hoặc ảnh giả.**
- `Lab07/Exercise01` đến `Exercise19`: 19 bài thực hành độc lập, nút chạy, HTML/CSS.
- `css/`: định dạng trang chủ, cơ sở giao diện bài và Bootstrap 3.4.1.
- `js/exercise-runner.js`: kích hoạt nút **Chạy code**.
- `images/`: ảnh cục bộ dùng cho các bài positioning / filter.
- `evidence/`: để sinh viên tự lưu ảnh VS Code và Chrome rồi đưa vào Word.

## Nội dung

- 7.1–7.4: luồng tài liệu, display, relative, absolute, z-index.
- 7.5–7.9: float, clear, kết hợp positioning.
- 7.10–7.13: bố cục hai/ba cột, media queries, viewport (7.13 phát triển từ 7.12).
- 7.14–7.18: transform, transition, filter, animation.
- 7.19: Bootstrap grid, navbar, panel, list-group, jumbotron, buttons và nested columns.

## Giới hạn đối chiếu

Mã nguồn này đối chiếu theo `BaiTap_CaNhan_CSS_NangCao.pdf` đã gửi, gồm bảng các chủ đề Exercise. Chưa có `Lab07.pdf` và ZIP starter gốc kèm từng thao tác, nên không thể cam kết từng chi tiết giống bản Lab gốc. Nếu giảng viên cung cấp starter, cần so sánh và cập nhật theo file đó.

Trang chủ và bài có nút chạy không thay đổi các thư mục `Advanced-FE`, `Nhom3-Game`, `JavaScript-Labs` hay bài cũ.
