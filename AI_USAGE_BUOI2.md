# Nhật ký sử dụng AI — Bài tập cá nhân Buổi 2

**Công cụ:** ChatGPT (OpenAI).

**Mục đích:** Rà soát bài tập, đề xuất thiết kế giao diện chuyên nghiệp hơn, hỗ trợ tạo HTML/CSS, kiểm tra đường dẫn và responsive, cập nhật báo cáo Word.

## Prompt tiêu biểu đã sử dụng

> “Sửa font chữ lại, thiết kế website đẹp hơn; cho số giá bán lớn và các phần giảm giá nổi bật. Làm thành các trang riêng thay vì chỉ trỏ xuống; tham khảo trải nghiệm của Shopee, hỗ trợ trải nghiệm người dùng tối đa.”

Ngữ cảnh: Website phụ kiện công nghệ VoltLab đã có từ Buổi 1–2; tiếp tục sử dụng 8 sản phẩm cũ. Ràng buộc học phần Buổi 2: **HTML5 và CSS3**, chưa dùng JavaScript, backend hay cơ sở dữ liệu.

## Kết quả AI đề xuất và hỗ trợ

- Giữ danh mục và 8 sản phẩm cũ; tạo **18 trang HTML tĩnh** để menu, danh mục, xếp giá và trang chi tiết có đường dẫn riêng.
- Chuyển sang font hệ thống Segoe UI/Arial; tăng giá bán lên 29px ở màn hình lớn và khoảng 21px tại 390px.
- Làm nổi bật phần giảm giá qua `.sale-ribbon`, kèm giá gốc gạch ngang và `.saving` cho số tiền tiết kiệm.
- Dùng `header`, `nav`, `main`, `section`, `article`, `footer` đúng ngữ nghĩa; CSS Grid cho danh sách sản phẩm, Flexbox cho menu và nút.
- Bổ sung hover, focus-visible và responsive. Không làm chức năng giỏ hàng giả.

## Kiểm thử được AI/công cụ hỗ trợ

- Đã đối chiếu đường dẫn cục bộ của 18 trang, không phát hiện tệp HTML, CSS hay hình ảnh nội bộ bị thiếu.
- Đã thử bố cục bằng Chromium ở 1366px, 768px, 390px: không tràn ngang, 8 ảnh sản phẩm trên trang danh sách đã tải; lưới trang chủ 4/2/2 cột tương ứng.
- Ảnh và kết quả kỹ thuật được lưu ở `evidence/`.

**Phân biệt:** Các bước trên do AI/công cụ thực hiện, **không được xem là sinh viên đã tự kiểm tra**.

## Sinh viên tự kiểm tra và điều chỉnh — CẦN TỰ ĐIỀN

- Ngày kiểm tra: ........................................
- Khu vực kiểm tra: ........................................
- Vấn đề tự phát hiện: ........................................
- Thuộc tính HTML/CSS đã tự sửa: ........................................
- Kết quả sau sửa, tên ảnh minh chứng: ........................................

Phần giải thích bảy câu hỏi kiến thức và bảng kiểm thử cá nhân nằm trong `BAO_CAO_THUC_HANH_BUOI_2.docx`.
