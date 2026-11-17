# JavaScript Labs | Bài tập cá nhân môn Phát triển ứng dụng Web/TMĐT

**Sinh viên:** Nguyễn Văn Kiên  
**MSSV:** 31241024550  
**Lớp học phần:** 26C1INF50902701  
**Giảng viên:** TS. Nguyễn Mạnh Tuấn

## Nội dung

Bài thực hành JavaScript gồm 29 Exercise trong ba Lab:

| Lab | Nội dung | Số bài | Truy cập |
| --- | --- | ---: | --- |
| 08 | JavaScript Language Foundations | 11 | [Lab 08](Lab08/) |
| 09 | DOM and Events | 8 | [Lab 09](Lab09/) |
| 10 | jQuery | 10 | [Lab 10](Lab10/) |

Mỗi Exercise có trang HTML riêng và file `script.js` tương ứng, ngoại trừ các bài yêu cầu JavaScript nhúng hoặc thao tác trực tiếp trên trình duyệt. Trang chủ `index.html` giới thiệu nội dung học, điều hướng và liên hệ với ứng dụng TMĐT.

## Cấu trúc

```text
JavaScript-Labs/
├── index.html
├── README.md
├── css/ (giao diện chung)
├── js/ (thư mục mở rộng)
├── images/ (ảnh cá nhân)
├── vendor/jquery-3.1.1.min.js
├── Lab08/Exercise01 ... Exercise11
├── Lab09/Exercise01 ... Exercise08
├── Lab10/Exercise01 ... Exercise10
└── Lab10/assets/cities.json
```

## Chạy thử

Trong VS Code mở thư mục gốc repository, sau đó chọn **Open with Live Server** tại `JavaScript-Labs/index.html`. Không mở các bài GET bằng `file://` vì trình duyệt có thể chặn yêu cầu dữ liệu JSON khi không có máy chủ HTTP.

- Lab 08: thực hành alert, noscript, Console, Array, Function, Object.
- Lab 09: DOM selection, event handling, Debugger, Form và Validation.
- Lab 10: jQuery selectors, event, DOM insertion, animation, `$.get` và jqXHR.

Lab 10 sử dụng jQuery 3.1.1 được lấy từ bộ tài liệu lab đi kèm, nên những ví dụ có thể chạy offline khi sử dụng Live Server.

**Exercise 10.9–10.10:** dữ liệu mẫu được cung cấp dưới dạng `Lab10/assets/cities.json`. Tài liệu gốc gọi một web service bên ngoài đã cũ; dùng JSON nội bộ để việc kiểm tra GET trên Live Server và GitHub Pages ổn định. Hai bài cũng có nút gọi thử endpoint HTTPS gốc; kết quả phụ thuộc vào khả năng hoạt động và CORS của dịch vụ bên ngoài. Việc yêu cầu dữ liệu vẫn thông qua HTTP GET và trả về JSON.

## GitHub Pages

Repository: https://github.com/KienNguyen1504/ecommerce-ui-improvement  
Trang bài tập (sau khi push và kiểm tra): https://kiennguyen1504.github.io/ecommerce-ui-improvement/JavaScript-Labs/

## Minh chứng

Mỗi bài có yêu cầu và thao tác cần kiểm tra trên trang. Ảnh chụp kết quả trình duyệt được tổng hợp trong báo cáo Word. Các bài dùng Console, Debugger và HTTP GET có thể đối chiếu thêm bằng Chrome DevTools khi kiểm tra trực tiếp.

## Ghi chú học tập

Trang web là bài thực hành minh họa. Việc kiểm tra form và tải JSON thực hiện tại phía trình duyệt, không ghi dữ liệu người dùng lên máy chủ.

## Đối chiếu tài liệu Lab gốc

Các bài Lab 09 và Lab 10 giữ bố cục HTML và tài nguyên hình ảnh từ gói Lab do giảng viên cung cấp. Các bộ chọn DOM/jQuery, sự kiện, form và hoạt ảnh được viết trong từng tệp `script.js`. Tài nguyên nằm trong `Lab09/reference` và `Lab10/reference`; jQuery dùng file local `vendor/jquery-3.1.1.min.js`. Các trang 10.9–10.10 truy cập JSON nội bộ qua HTTP để minh họa GET và jqXHR.

## Đối chiếu tài liệu Lab gốc

Các bài Lab 09 và Lab 10 giữ bố cục HTML và tài nguyên hình ảnh từ gói Lab do giảng viên cung cấp. Các bộ chọn DOM/jQuery, sự kiện, form và hoạt ảnh được viết trong từng tệp `script.js`. Tài nguyên nằm trong `Lab09/reference` và `Lab10/reference`; jQuery dùng file local `vendor/jquery-3.1.1.min.js`. Các trang 10.9–10.10 truy cập JSON nội bộ qua HTTP để minh họa GET và jqXHR.


## Hình ảnh kết quả

Ảnh trong `evidence/screenshots/` ghi lại kết quả của từng Exercise khi chạy mã nguồn trong môi trường trình duyệt kiểm thử. Trên mỗi trang, ảnh được hiển thị trước phần chức năng thực hành trực tiếp. Các thao tác tương tác JavaScript và jQuery vẫn chạy bên dưới ảnh. Khi nộp bài, sinh viên tự kiểm tra lại và chụp thêm minh chứng trên trình duyệt của mình theo yêu cầu học phần.
