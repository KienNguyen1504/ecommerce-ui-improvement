# AI Usage Log

## 1. Công cụ AI
Tên công cụ: Claude

## 2. Mục đích sử dụng
- Soạn nháp bảng khảo sát 5 khu vực của Shopee từ 7 ảnh chụp màn hình cung cấp.
- Phân tích giao diện theo 5 khu vực (Prompt 1) và đề xuất cải tiến.
- Đề xuất phương án thiết kế thẻ sản phẩm (Prompt 2).
- Tạo mã HTML/CSS ban đầu và giải thích mã (Prompt 3).
- Hướng dẫn các bước dùng VS Code, Git, GitHub.

## 3. Prompt đã sử dụng
**Prompt 1 – Phân tích website**
```
Bạn là chuyên gia phân tích nghiệp vụ và thiết kế trải nghiệm người dùng cho website thương mại điện tử.
Tôi đang khảo sát website: Shopee Việt Nam (https://shopee.vn).
Hãy giúp tôi lập bảng phân tích các khu vực: Trang chủ, Danh mục sản phẩm, Chi tiết sản phẩm, Tìm kiếm, Giỏ hàng. Với mỗi khu vực nêu: mục đích, thành phần giao diện, điểm thuận tiện, một vấn đề có thể phát sinh, một đề xuất cải tiến.
Không khẳng định những tính năng chưa được kiểm chứng.
Phân biệt rõ nhận xét dựa trên quan sát và đề xuất của AI.
```
**Prompt 2 – Đề xuất giao diện**
```
Tôi đang thực hiện bài tập phát triển giao diện website thương mại điện tử bằng HTML5 và CSS3.
Tôi muốn cải tiến khu vực: thẻ sản phẩm trong danh sách sản phẩm, tham khảo Shopee.
Đối tượng sử dụng: khách hàng mua sắm trực tuyến tại Việt Nam.
Hãy đề xuất: bố cục, thành phần HTML, cách tổ chức CSS, hiển thị máy tính/điện thoại, điểm cần kiểm tra về khả năng sử dụng. Trước tiên giải thích phương án, chưa tạo toàn bộ mã.
```
**Prompt 3 – Tạo mã nguồn**
```
Dựa trên phương án đã thống nhất, hãy tạo một trang giao diện thương mại điện tử bằng HTML5 và CSS3. Có tiêu đề và khu vực sản phẩm, tối thiểu 4 sản phẩm mẫu, mỗi sản phẩm có hình ảnh, tên, giá và nút thao tác, bố cục phù hợp máy tính và điện thoại, CSS tách file riêng, không backend, không thư viện không cần thiết.
Mỗi thẻ hiển thị giá gốc (gạch ngang), giá khuyến mãi và nhãn % giảm.
```

## 4. Kết quả AI đề xuất
- **Bảng khảo sát:** AI điền 5 khu vực dựa trên ảnh chụp; đề xuất chính là thiết kế lại thẻ sản phẩm.
- **Phương án thẻ sản phẩm:** ảnh vuông ở trên, tên giới hạn 2 dòng, giá bán lớn màu nhấn, giá gốc gạch ngang, nhãn % giảm góc ảnh, đánh giá và số đã bán, nút "Thêm vào giỏ" ở đáy; lưới 2/3/4 cột theo màn hình; hiệu ứng hover.
- **Mã nguồn:** `index.html` (header, main, section, ul/li, article, img, del, button) và `css/style.css` (biến màu, grid, flex, media query, hover).

## 5. Kiểm tra và điều chỉnh
**Đối chiếu nhận xét AI với Shopee thật** (dựa trên ảnh chụp ngày 18/10/2026):

| Nhận xét của AI | Đối chiếu thực tế | Kết luận |
|---|---|---|
| Trang chủ có banner khuyến mãi nổi bật | Ảnh `01-trang-chu.png`: banner lớn và 2 banner phụ | Đúng |
| Trang chủ có khu vực flash sale | Ảnh trang chủ chưa thấy; Flash Sale chỉ thấy ở trang chi tiết và ghi chú trong giỏ hàng | Chưa kiểm chứng ở trang chủ |
| Danh mục có sắp xếp theo giá | Ảnh `02-danh-muc.png`: Giá thấp→cao, cao→thấp | Đúng |
| Danh mục có bộ lọc theo khoảng giá | Ảnh trang tìm kiếm có mục "Khoảng Giá"; ảnh danh mục chưa thấy (cột lọc bị cắt) | Đúng ở trang tìm kiếm, chưa kiểm chứng ở danh mục |
| Trang chi tiết hiển thị giá gốc gạch ngang | Ảnh `03-chi-tiet.png` chỉ thấy "Giá Sau Voucher", không thấy giá gốc | Không thấy trong ảnh đã chụp |
| Có biểu đồ phân bố số sao đánh giá | Ảnh `03b-danh-gia.png`: có lọc 5/4/3/2/1 sao kèm số lượng, không có biểu đồ | Đúng một phần |
| Tìm kiếm có gợi ý từ khóa khi gõ | Ảnh `04a-tim-kiem-goi-y.png`: 10 gợi ý | Đúng |
| Kết quả tìm kiếm có quảng cáo xen đầu trang | Ảnh `04b-tim-kiem-ket-qua.png`: khối shop liên quan có nhãn "Ad" | Đúng |
| Giỏ hàng cho đổi số lượng, xóa, nhập voucher | Ảnh `05-gio-hang.png`: nút −/+, Xóa, Thêm Shop Voucher, Shopee Voucher | Đúng |
| Giỏ hàng có gợi ý mua kèm | Chỉ thấy "Tìm sản phẩm tương tự" trên từng dòng; phần dưới giỏ chưa chụp | Chưa kiểm chứng |

**Phần không dùng:** các nhận xét ở trạng thái "Chưa kiểm chứng" hoặc "Không thấy" không đưa vào kết luận khảo sát.

**Kiểm tra giao diện:** mở bằng trình duyệt, kiểm tra ở kích thước máy tính (1280px) và điện thoại (375px bằng Chrome DevTools): số cột đổi 4 → 2, không bị cuộn ngang, ảnh không méo.

**Điểm tự phát hiện và sửa:**
- Thêm hiệu ứng :active (thu nhỏ nút còn 97%) cho nút "Thêm vào giỏ" (file css/style.css, class .btn-add). Lý do: trên điện thoại không có thao tác rê chuột nên :hover gần như không có tác dụng, cần phản hồi khi chạm nút. Đã kiểm tra bằng cách bấm giữ nút trên trình duyệt.

## 6. Phần tôi hiểu và có thể giải thích
- **Cấu trúc HTML:** `header` (tiêu đề), `main > section` (khu vực sản phẩm, có `h2`), `ul.product-grid > li > article.product-card` (mỗi sản phẩm là một thẻ độc lập), `img` có `alt` mô tả, `del` cho giá gốc gạch ngang, `button type="button"` cho nút thao tác.
- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`:** để trình duyệt điện thoại dùng đúng chiều rộng màn hình, media query mới hoạt động đúng.
- **CSS Grid:** `display: grid` + `grid-template-columns: repeat(2, 1fr)` chia 2 cột bằng nhau; `gap` là khoảng cách giữa các ô.
- **Media query (mobile-first):** viết mặc định cho điện thoại (2 cột), `@media (min-width: 768px)` lên 3 cột, `(min-width: 1024px)` lên 4 cột.
- **Flexbox trong thẻ:** `.product-card` và `.product-body` dùng `flex-direction: column`; `margin-top: auto` ở nút đẩy nút xuống đáy để các thẻ thẳng hàng.
- **Ảnh:** `aspect-ratio: 1 / 1` giữ ảnh vuông, `object-fit: cover` cắt ảnh vừa khung nên không bị méo.
- **Cắt tên 2 dòng:** `-webkit-line-clamp: 2` cùng `overflow: hidden`; `min-height: 2.5em` giữ chỗ để các thẻ đều nhau.
- **Nhãn % giảm:** `.product-media` có `position: relative`, `.badge` có `position: absolute` để đặt đúng góc ảnh.
- **Hiệu ứng:** `:hover` + `transition` cho thẻ (nhấc lên) và nút (đổi màu); `:focus-visible` hiện viền khi dùng bàn phím; `prefers-reduced-motion` tắt hiệu ứng với người dùng không muốn chuyển động.
