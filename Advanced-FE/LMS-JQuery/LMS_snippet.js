/* Chạy tại Console của trang khóa học LMS sau khi đăng nhập. Không chạy trên trang tổng quan chưa mở chủ đề. */
(() => {
  const $ = window.jQuery;
  if (!$) { console.warn('Trang LMS hiện không có jQuery. Hãy dùng mã DOM thuần trong lms.js và kiểm tra cấu trúc Elements.'); return; }
  const assignments = $('.modtype_assign');
  const fifth = assignments.eq(4);
  const deadline = node => $(node).find('.activity-dates, .activity-due-date, .availabilityinfo').first().text().trim() || 'Chưa hiển thị deadline';
  console.log('=== BÀI NỘP THỨ 5 ===');
  console.log(fifth.length ? fifth.find('.instancename').first().text().trim() : 'Trang hiện có ít hơn 5 bài nộp');
  console.log('=== DANH SÁCH CHỦ ĐỀ / BÀI TẬP / DEADLINE ===');
  const output = [];
  $('.course-section, .section.main').each((index, section) => {
    const s = $(section);
    const topic = s.find('.sectionname, .section-title').first().text().trim() || `Chủ đề ${index + 1}`;
    const entries = [];
    s.find('.modtype_assign').each((_, assign) => {
      const label = $(assign).find('.instancename').first().text().trim();
      entries.push({baiTap:label, hanNop:deadline(assign)});
    });
    output.push({chuDe:topic, soBaiTap:entries.length, baiTap:entries});
  });
  console.table(output.map(x=>({chuDe:x.chuDe,soBaiTap:x.soBaiTap, coBaiTap:x.soBaiTap>0?'Có':'Không'})));
  output.forEach(x=>{console.group(x.chuDe);if(!x.baiTap.length)console.log('Không có bài tập');else console.table(x.baiTap);console.groupEnd();});
  // Chỉ đọc nội dung hiển thị trong trang. Không gửi thông tin ra mạng.
})();
