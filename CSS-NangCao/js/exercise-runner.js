"use strict";
/* Chỉ có chức năng kích hoạt bài. Phần bố cục, vị trí và hiệu ứng dùng CSS thật của Exercise. */
(function () {
  const output = document.getElementById('demo-output');
  const source = document.getElementById('exercise-source');
  const panel = document.getElementById('exercise-output');
  const run = document.getElementById('run-exercise');
  const again = document.getElementById('run-again');
  const status = document.getElementById('run-status');
  if (!output || !source || !panel || !run) return;

  function executeExercise() {
    // Tạo các phần tử HTML vào DOM tại thời điểm bấm nút; CSS link trong head sẽ định dạng chúng ngay.
    output.replaceChildren(source.content.cloneNode(true));
    panel.hidden = false;
    run.hidden = true;
    again.hidden = false;
    if (status) status.textContent = 'Đã chạy — nội dung được tạo trực tiếp trong trình duyệt.';
  }
  run.addEventListener('click', executeExercise);
  again.addEventListener('click', executeExercise);
  if (new URLSearchParams(window.location.search).get('autorun') === '1') {
    executeExercise();
  }
})();
