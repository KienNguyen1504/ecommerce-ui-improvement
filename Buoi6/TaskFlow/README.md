# TaskFlow 2.1 — Ocean Breeze

TaskFlow là ứng dụng TODO quản lý công việc cá nhân được xây dựng bằng **Node.js, Express, SQLite, HTML, CSS và JavaScript thuần**. Dự án có giao diện responsive, REST API và database lưu trữ thật trên máy.

## Giao diện Pastel Gradient

Phiên bản 2.1 sử dụng gradient xanh dương pastel, baby blue, sky blue và cyan; màu xanh lá, cam và đỏ nhạt dành cho trạng thái công việc, minh họa SVG tự chứa, thẻ công việc, thanh điều hướng và hộp thoại đồng bộ. Không phụ thuộc CDN hay font tải từ Internet.

- Dashboard có vòng tiến độ hôm nay: số công việc hoàn thành / tổng công việc có hạn hôm nay.
- Trang thống kê có vòng tỷ lệ hoàn thành toàn bộ, biểu đồ 7 ngày, phân bổ ưu tiên và tỷ lệ hoàn thành theo danh mục.
- Tự chọn ngày hôm nay khi tạo công việc; có thể thay đổi hoặc bỏ ngày.
- Xác nhận trước khi xóa, hiển thị lỗi ngay trong hộp thoại.

**Nâng cấp từ bản cũ:** Dừng server bằng Ctrl+C, sao lưu thư mục `data` (và `.env` nếu có), sau đó thay `public/` và `src/routes/stats.js` bằng file mới. Không xóa `data/todo.sqlite`. Schema SQLite không thay đổi. Hoặc giải nén bản mới riêng rồi sao chép database đã sao lưu vào thư mục `data` của bản mới khi cả hai server đã dừng.

**Kiểm tra:** `npm run check` đã qua. Giao diện được kiểm tra bằng Chromium với API mô phỏng: thêm, sửa, xóa, xác nhận/hủy xóa, tìm kiếm, lọc, thống kê và menu điện thoại. Môi trường đóng gói không truy cập được npm registry (EAI_AGAIN), vì vậy cần kiểm tra tích hợp Express/SQLite trên máy có dependencies bằng `npm install` và `npm start`.

## 1. Chức năng

- **Hôm nay:** xem các công việc có hạn trong ngày.
- **Quản lý công việc:** thêm, chỉnh sửa, xóa và đánh dấu hoàn thành / chưa hoàn thành.
- **Tìm kiếm:** tìm theo tên công việc, mô tả hoặc tên danh mục.
- **Bộ lọc:** lọc theo danh mục, mức độ ưu tiên và trạng thái / thời hạn.
- **Các danh sách:** tất cả công việc, sắp tới, quá hạn và đã hoàn thành.
- **Thống kê:** tỷ lệ hoàn thành, số việc theo mức độ ưu tiên, phân bổ theo danh mục và số việc hoàn thành trong 7 ngày gần nhất.
- **Database:** SQLite tự tạo file dữ liệu khi chạy lần đầu; dữ liệu vẫn còn sau khi tắt và mở lại server.
- **Dữ liệu mẫu:** tự thêm một số công việc minh họa khi database chưa có dữ liệu. Không thêm lại dữ liệu mẫu nếu database đã có công việc.
- **Responsive:** sử dụng được trên máy tính, tablet và điện thoại.

## 2. Công nghệ sử dụng

| Thành phần | Công nghệ | Vai trò |
|---|---|---|
| Runtime | Node.js 20+ | Chạy JavaScript phía server |
| Backend | Express 5 | Tạo HTTP server và REST API |
| Database | SQLite + better-sqlite3 | Lưu danh mục và công việc |
| Frontend | HTML5, CSS3, JavaScript | Giao diện và tương tác người dùng |
| Giao tiếp | JSON / REST API | Trao đổi dữ liệu frontend – backend |

## 3. Cấu trúc thư mục

```text
TaskFlow/
├── database/
│   └── schema.sql             # Thiết kế bảng, khóa ngoại và index
├── data/
│   └── .gitkeep               # Database được tự tạo tại đây khi chạy
├── public/
│   ├── css/
│   │   └── styles.css         # Giao diện và responsive
│   ├── js/
│   │   └── app.js             # Logic frontend, gọi REST API
│   └── index.html             # Trang giao diện chính
├── src/
│   ├── routes/
│   │   ├── categories.js      # API danh mục
│   │   ├── stats.js           # API thống kê
│   │   └── tasks.js           # API CRUD công việc
│   ├── db.js                  # Kết nối, khởi tạo và seed database
│   └── server.js              # Khởi chạy Express server
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 4. Cài đặt và chạy chương trình

### Bước 1 — Cài Node.js

Tải bản **LTS** tại: https://nodejs.org/ . Sau khi cài xong, mở Terminal (hoặc CMD) và kiểm tra:

```bash
node -v
npm -v
```

Khuyến nghị Node.js bản LTS còn được hỗ trợ (22 hoặc 24) để tương thích với better-sqlite3.

### Bước 2 — Mở thư mục dự án

Giải nén project, mở thư mục `TaskFlow` bằng VS Code. Mở Terminal ngay tại thư mục này.

### Bước 3 — Cài thư viện

```bash
npm install
```

### Bước 4 — Chạy chương trình

```bash
npm start
```

Hoặc chạy chế độ tự khởi động lại khi sửa code:

```bash
npm run dev
```

### Bước 5 — Mở giao diện

Truy cập địa chỉ:

**http://localhost:3000**

Terminal sẽ hiển thị thông báo server đã chạy. Giữ cửa sổ Terminal mở trong lúc sử dụng ứng dụng. Nhấn `Ctrl + C` để dừng server.

> Nếu cổng 3000 đang được chương trình khác sử dụng, hãy đổi `PORT` trong file `.env` (tạo từ `.env.example`) sang một cổng khác, ví dụ `3001`.

## 5. Thiết kế database

Database sử dụng SQLite, mặc định được lưu tại `data/todo.sqlite`. Hệ thống có thêm bảng `app_meta` để ghi nhận việc khởi tạo dữ liệu mẫu, nhờ đó dữ liệu demo không tự xuất hiện lại sau khi người dùng chủ động xóa hết công việc.

### Bảng `categories`

| Cột | Kiểu | Ý nghĩa |
|---|---|---|
| id | INTEGER, PK | Mã danh mục |
| name | TEXT, UNIQUE | Tên danh mục |
| color | TEXT | Màu hiển thị |
| created_at | TEXT | Thời điểm tạo |

### Bảng `tasks`

| Cột | Kiểu | Ý nghĩa |
|---|---|---|
| id | INTEGER, PK | Mã công việc |
| title | TEXT | Tên công việc, tối đa 120 ký tự |
| description | TEXT | Mô tả |
| due_date | TEXT | Ngày đến hạn theo định dạng YYYY-MM-DD |
| due_time | TEXT | Giờ đến hạn theo định dạng HH:MM |
| priority | TEXT | `low`, `medium` hoặc `high` |
| status | TEXT | `pending` hoặc `completed` |
| category_id | INTEGER, FK | Tham chiếu `categories.id` |
| created_at | TEXT | Thời điểm tạo |
| updated_at | TEXT | Thời điểm cập nhật |
| completed_at | TEXT | Thời điểm hoàn thành |

**Quan hệ:** một danh mục có thể có nhiều công việc (1–N). `tasks.category_id` là khóa ngoại tham chiếu `categories.id`; nếu xóa danh mục thì công việc được giữ lại và `category_id` chuyển thành `NULL`.

Các index trên `due_date/status`, `category_id` và `created_at` hỗ trợ truy vấn danh sách và thống kê. Database bật `foreign_keys` và chế độ WAL.

## 6. REST API

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | `/health` | Kiểm tra server |
| GET | `/tasks` | Lấy danh sách; hỗ trợ `view`, `search`, `priority`, `category_id`, `sort` |
| POST | `/tasks` | Thêm công việc |
| PUT | `/tasks/:id` | Cập nhật công việc |
| PATCH | `/tasks/:id/toggle` | Đổi trạng thái hoàn thành |
| DELETE | `/tasks/:id` | Xóa công việc |
| GET | `/categories` | Lấy danh sách danh mục |
| GET | `/stats` | Lấy dữ liệu thống kê |

Ví dụ lấy công việc hôm nay:

```http
GET /api/tasks?view=today
```

Ví dụ tìm kiếm:

```http
GET /api/tasks?view=all&search=Node.js
```

Ví dụ thêm công việc (JSON):

```json
{
  "title": "Hoàn thành bài thực hành",
  "description": "Kiểm tra API và giao diện",
  "due_date": "2026-11-25",
  "due_time": "15:00",
  "priority": "high",
  "category_id": 1
}
```

Các giá trị ngày trong ví dụ chỉ để minh họa; khi tạo công việc, hãy chọn ngày phù hợp với thời điểm thực tế.

## 7. Kiểm tra nhanh

Kiểm tra cú pháp các file JavaScript:

```bash
npm run check
```

Kiểm tra server sau khi chạy:

```text
http://localhost:3000/api/health
```

Kết quả mong đợi:

```json
{
  "status": "ok",
  "app": "TaskFlow",
  "database": "connected"
}
```

## 8. Đưa project lên GitHub

1. Tạo repository mới trên GitHub.
2. Mở Terminal tại thư mục `TaskFlow`.
3. Chạy các lệnh sau (thay URL bằng repository của bạn):

```bash
git init
git add .
git commit -m "Initial commit - TaskFlow TODO app"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Không đưa `node_modules`, file `.env` hoặc database cá nhân `data/todo.sqlite` lên GitHub. Những mục này đã được khai báo trong `.gitignore`.

## 9. Lưu ý khi demo / nộp bài

- Chạy `npm install` trước khi chạy ứng dụng lần đầu.
- Chạy `npm start`, sau đó mở `http://localhost:3000`.
- Thử thêm, sửa, xóa, tìm kiếm, lọc và đánh dấu hoàn thành một công việc.
- Tắt server rồi mở lại để chứng minh dữ liệu được lưu trong SQLite.
- Mở trang **Thống kê** để trình bày dashboard và biểu đồ.
- File database nằm tại `data/todo.sqlite`; nếu muốn tạo lại dữ liệu demo từ đầu, dừng server rồi xóa file này và chạy lại chương trình.

---

**TaskFlow** — Built for focus, made for progress.
