const themeCategoryColor = (color) => String(color || '#8993a8').toLowerCase() === '#7c6cf2' ? '#5796d9' : (color || '#8993a8');
const state = {
  view: 'today',
  search: '',
  priority: '',
  categoryId: '',
  sort: 'due_asc',
  tasks: [],
  categories: [],
  stats: null,
  toastTimer: null,
  searchTimer: null,
  taskRequest: 0,
  deleteId: null
};

const $ = (selector) => document.querySelector(selector);
const todayISO = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const formatDate = (value) => {
  if (!value) return 'Chưa đặt hạn';
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};
const formatLongDate = () => new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
}).format(new Date()).toLocaleUpperCase('vi-VN');
const dateLabel = (task) => {
  if (!task.due_date) return 'Chưa có hạn';
  const today = todayISO();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = `${tomorrowDate.getFullYear()}-${String(tomorrowDate.getMonth() + 1).padStart(2, '0')}-${String(tomorrowDate.getDate()).padStart(2, '0')}`;
  let label = task.due_date === today ? 'Hôm nay' : task.due_date === tomorrow ? 'Ngày mai' : formatDate(task.due_date);
  if (task.status === 'pending' && task.due_date < today) label = `Quá hạn · ${formatDate(task.due_date)}`;
  if (task.due_time) label += ` · ${task.due_time}`;
  return label;
};

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) }
  });
  let payload;
  try { payload = await response.json(); } catch { payload = {}; }
  if (!response.ok) throw new Error(payload.error || 'Không thể kết nối tới máy chủ.');
  return payload;
}

function showToast(message, type = 'success') {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.toggle('error', type === 'error');
  toast.classList.add('show');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function viewInfo(view) {
  const map = {
    today: ['Hôm nay', 'Tập trung vào những điều quan trọng nhất nhé.', 'Danh sách hôm nay', 'Tất cả công việc có hạn trong ngày hôm nay'],
    all: ['Tất cả công việc', 'Mọi kế hoạch của bạn, được sắp xếp trong một nơi.', 'Toàn bộ công việc', 'Quản lý tất cả công việc của bạn'],
    upcoming: ['Sắp tới', 'Chuẩn bị trước để mọi thứ luôn trong tầm kiểm soát.', 'Công việc sắp tới', 'Những việc có thời hạn trong tương lai'],
    overdue: ['Quá hạn', 'Một chút ưu tiên hôm nay sẽ giúp bạn bắt kịp tiến độ.', 'Công việc quá hạn', 'Các việc chưa hoàn thành đã qua ngày đến hạn'],
    completed: ['Đã hoàn thành', 'Nhìn lại những điều bạn đã làm được.', 'Công việc đã hoàn thành', 'Thành quả từ sự tập trung của bạn']
  };
  return map[view] || map.today;
}

function setPageHeader() {
  const isStats = state.view === 'stats';
  const info = viewInfo(state.view);
  $('#breadcrumb-current').textContent = isStats ? 'Thống kê' : info[0];
  $('#page-title').textContent = isStats ? 'Thống kê' : info[0];
  $('#page-description').textContent = isStats ? 'Tổng quan về tiến độ và thói quen hoàn thành công việc.' : info[1];
  $('#page-eyebrow').textContent = isStats ? 'YOUR PRODUCTIVITY / OVERVIEW' : formatLongDate();
  $('#list-title').textContent = info[2];
  $('#list-subtitle').textContent = info[3];
  $('#daily-hero').hidden = state.view !== 'today';
  $('#overview-grid').hidden = isStats;
  $('#task-workspace').hidden = isStats;
  $('#stats-page').hidden = !isStats;
  $('#add-task-button').hidden = isStats;
  document.querySelectorAll('.nav-link[data-view]').forEach((button) => {
    button.classList.toggle('active', button.dataset.view === state.view);
    if (button.dataset.view === state.view) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
}

function renderCategoryControls() {
  const options = state.categories.map((category) =>
    `<option value="${category.id}">${escapeHTML(category.name)}</option>`
  ).join('');
  $('#category-filter').innerHTML = '<option value="">Tất cả danh mục</option>' + options;
  $('#task-category').innerHTML = '<option value="">Chưa phân loại</option>' + options;
  $('#category-filter').value = state.categoryId;

  $('#category-nav').innerHTML = state.categories.map((category) => `
    <button class="category-link ${state.categoryId === String(category.id) ? 'active' : ''}" type="button" data-category="${category.id}">
      <i class="category-color" style="background:${escapeHTML(themeCategoryColor(category.color))}"></i>
      <span>${escapeHTML(category.name)}</span><small>${category.task_count || 0}</small>
    </button>
  `).join('');
}

function updateOverview() {
  const summary = state.stats?.summary || {};
  $('#stat-today').textContent = summary.today || 0;
  const total = summary.today || 0;
  const done = summary.today_completed || 0;
  const rate = total ? Math.round(done / total * 100) : 0;
  $('#daily-rate').textContent = `${rate}%`;
  $('#daily-ring').style.setProperty('--progress', `${rate}%`);
  $('#daily-detail').textContent = total ? `${done}/${total} công việc đã xong` : 'Chưa có việc đến hạn hôm nay';
  $('#stat-pending').textContent = summary.pending || 0;
  $('#stat-completed').textContent = summary.completed || 0;
  $('#stat-overdue').textContent = summary.overdue || 0;
  $('#nav-today-count').textContent = summary.today || 0;
  $('#nav-all-count').textContent = summary.total || 0;
  $('#nav-upcoming-count').textContent = summary.upcoming || 0;
  $('#nav-overdue-count').textContent = summary.overdue || 0;
  $('#nav-completed-count').textContent = summary.completed || 0;
}

function renderTasks() {
  const tasks = state.tasks;
  $('#task-total').textContent = `${tasks.length} công việc`;
  $('#empty-state').hidden = tasks.length > 0;
  $('#task-list').innerHTML = tasks.map((task) => {
    const completed = task.status === 'completed';
    const overdue = !completed && task.due_date && task.due_date < todayISO();
    const priorityLabel = { high: 'Ưu tiên cao', medium: 'Trung bình', low: 'Ưu tiên thấp' }[task.priority] || 'Trung bình';
    const category = task.category_name ? `
      <span class="meta-chip category-chip"><i style="background:${escapeHTML(themeCategoryColor(task.category_color))}"></i>${escapeHTML(task.category_name)}</span>` : '';
    const description = task.description ? `<p class="task-description">${escapeHTML(task.description)}</p>` : '';
    return `
      <article class="task-card ${completed ? 'is-completed' : ''}" data-task-id="${task.id}">
        <button class="check-button" type="button" data-action="toggle" data-id="${task.id}" aria-pressed="${completed}" aria-label="${completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}">${completed ? '✓' : ''}</button>
        <div class="task-main">
          <div class="task-title-row"><h3 class="task-title" title="${escapeHTML(task.title)}">${escapeHTML(task.title)}</h3></div>
          ${description}
          <div class="task-meta">
            ${category}
            <span class="meta-chip due-chip ${overdue ? 'overdue' : ''}">◷ ${escapeHTML(dateLabel(task))}</span>
            <span class="meta-chip priority-chip priority-${escapeHTML(task.priority)}">${escapeHTML(priorityLabel)}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="task-action" type="button" data-action="edit" data-id="${task.id}" title="Sửa công việc" aria-label="Sửa công việc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m14 5 5 5M4 20l5-1L20 8a2 2 0 0 0-4-4L5 15z"/></svg></button>
          <button class="task-action delete" type="button" data-action="delete" data-id="${task.id}" title="Xóa công việc" aria-label="Xóa công việc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5m4-5v5"/></svg></button>
        </div>
      </article>
    `;
  }).join('');
  if (tasks.length === 0) {
    $('#empty-description').textContent = state.search || state.priority || state.categoryId
      ? 'Không tìm thấy công việc phù hợp. Hãy thử thay đổi từ khóa hoặc bộ lọc.'
      : 'Thêm một công việc mới để bắt đầu ngày thật hiệu quả.';
  }
}

function renderStats() {
  const stats = state.stats;
  if (!stats) return;
  const summary = stats.summary;
  const rate = summary.completion_rate || 0;
  $('#completion-rate').textContent = `${rate}%`;
  $('#completion-ring').style.background = `conic-gradient(#70a3ca ${rate * 3.6}deg, #ffffffa0 ${rate * 3.6}deg)`;
  $('#insight-text').textContent = summary.total === 0
    ? 'Hãy thêm công việc đầu tiên để bắt đầu theo dõi tiến độ của bạn.'
    : `Bạn đã hoàn thành ${summary.completed} trên tổng số ${summary.total} công việc. Cứ duy trì nhịp độ này nhé!`;

  const weekly = stats.weekly || [];
  const maxWeekly = Math.max(1, ...weekly.map((item) => item.total));
  $('#weekly-chart').innerHTML = weekly.map((item) => {
    const date = new Date(`${item.day}T12:00:00`);
    const day = new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(date).replace('.', '');
    const height = item.total === 0 ? 0 : Math.max(8, (item.total / maxWeekly) * 100);
    return `<div class="weekly-column"><span class="weekly-value">${item.total}</span><div class="weekly-bar-track"><div class="weekly-bar" style="height:${height}%"></div></div><span class="weekly-day">${escapeHTML(day)}</span></div>`;
  }).join('');

  const priorityNames = { high: 'Cao', medium: 'Trung bình', low: 'Thấp' };
  const priorityColors = { high: '#e58a84', medium: '#e7b15e', low: '#55b69a' };
  const priorityMap = new Map((stats.priorities || []).map((item) => [item.priority, item.total]));
  const priorityItems = ['high', 'medium', 'low'].map((key) => ({ key, total: priorityMap.get(key) || 0 }));
  const priorityTotal = Math.max(1, priorityItems.reduce((sum, item) => sum + item.total, 0));
  $('#priority-chart').innerHTML = priorityItems.map((item) => `
    <div class="breakdown-row"><div class="breakdown-label"><span>${priorityNames[item.key]}</span><strong>${item.total}</strong></div>
    <div class="progress-track"><div class="progress-fill" style="width:${(item.total / priorityTotal) * 100}%;background:${priorityColors[item.key]}"></div></div></div>
  `).join('');

  const categories = stats.categories || [];
  $('#category-chart').innerHTML = categories.length ? categories.map((item) => `
    <div class="breakdown-row"><div class="breakdown-label"><span>${escapeHTML(item.name)}</span><strong>${item.completed}/${item.total}</strong></div>
    <div class="progress-track"><div class="progress-fill" style="width:${(item.total ? item.completed / item.total : 0) * 100}%;background:${escapeHTML(themeCategoryColor(item.color))}"></div></div></div>
  `).join('') : '<p class="task-description">Chưa có dữ liệu danh mục.</p>';
}

async function loadTasks() {
  const params = new URLSearchParams({ view: state.view === 'stats' ? 'today' : state.view, sort: state.sort });
  if (state.search) params.set('search', state.search);
  if (state.priority) params.set('priority', state.priority);
  if (state.categoryId) params.set('category_id', state.categoryId);
  const request = ++state.taskRequest;
  const result = await api(`/api/tasks?${params.toString()}`);
  if (request !== state.taskRequest) return;
  state.tasks = result.data;
  renderTasks();
}

async function loadStats() {
  const result = await api('/api/stats');
  state.stats = result.data;
  updateOverview();
  renderStats();
}

async function refreshAll() {
  await Promise.all([loadTasks(), loadStats()]);
  const result = await api('/api/categories');
  state.categories = result.data;
  renderCategoryControls();
}

function setView(view) {
  state.view = view;
  state.search = '';
  state.priority = '';
  state.categoryId = '';
  $('#search-input').value = '';
  $('#priority-filter').value = '';
  $('#category-filter').value = '';
  setPageHeader();
  renderCategoryControls();
  closeSidebar();
  if (view === 'stats') {
    loadStats().catch((error) => showToast(error.message, 'error'));
  } else {
    loadTasks().catch((error) => showToast(error.message, 'error'));
  }
}

function openDialog(task = null) {
  const form = $('#task-form');
  form.reset();
  $('#form-error').hidden = true;
  $('#task-id').value = task ? task.id : '';
  $('#dialog-title').textContent = task ? 'Chỉnh sửa công việc' : 'Tạo công việc mới';
  $('#save-task-button').innerHTML = task ? 'Lưu thay đổi <span>→</span>' : 'Lưu công việc <span>→</span>';
  $('#task-title').value = task?.title || '';
  $('#task-description').value = task?.description || '';
  $('#task-date').value = task ? (task.due_date || '') : todayISO();
  $('#task-time').value = task?.due_time || '';
  $('#task-category').value = task?.category_id ? String(task.category_id) : '';
  $('#task-priority').value = task?.priority || 'medium';
  $('#task-dialog').showModal();
  setTimeout(() => $('#task-title').focus(), 40);
}

function closeDialog() {
  if ($('#task-dialog').open) $('#task-dialog').close();
}

async function saveTask(event) {
  event.preventDefault();
  const title = $('#task-title').value.trim();
  $('#form-error').hidden = true;
  if (!title) {
    $('#task-title').focus();
    $('#form-error').textContent = 'Vui lòng nhập tên công việc.';
    $('#form-error').hidden = false;
    return;
  }
  const id = $('#task-id').value;
  const payload = {
    title,
    description: $('#task-description').value.trim(),
    due_date: $('#task-date').value || null,
    due_time: $('#task-time').value || null,
    category_id: $('#task-category').value || null,
    priority: $('#task-priority').value
  };
  const button = $('#save-task-button');
  button.disabled = true;
  try {
    const result = await api(id ? `/api/tasks/${id}` : '/api/tasks', {
      method: id ? 'PUT' : 'POST', body: JSON.stringify(payload)
    });
    closeDialog();
    showToast(result.message || 'Đã lưu công việc.');
    await refreshAll();
  } catch (error) {
    if ($('#task-dialog').open) {
      $('#form-error').textContent = error.message;
      $('#form-error').hidden = false;
    } else showToast(error.message, 'error');
  } finally {
    button.disabled = false;
  }
}

async function handleTaskAction(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;

  try {
    if (action === 'edit') {
      openDialog(task);
    } else if (action === 'toggle') {
      const result = await api(`/api/tasks/${id}/toggle`, { method: 'PATCH' });
      showToast(result.data.status === 'completed' ? 'Tuyệt vời! Công việc đã hoàn thành.' : 'Đã chuyển công việc về trạng thái đang làm.');
      await refreshAll();
    } else if (action === 'delete') {
      state.deleteId = id;
      $('#delete-error').hidden = true;
      $('#delete-description').textContent = `Công việc “${task.title}” sẽ bị xóa vĩnh viễn.`;
      $('#delete-dialog').showModal();
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function openSidebar() {
  $('#sidebar').classList.add('open');
  $('#sidebar-backdrop').classList.add('show');
}
function closeSidebar() {
  $('#sidebar').classList.remove('open');
  $('#sidebar-backdrop').classList.remove('show');
}

function bindEvents() {
  document.querySelectorAll('.nav-link[data-view]').forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.view));
  });
  $('#hero-stats').addEventListener('click', () => setView('stats'));
  $('#delete-cancel').addEventListener('click', () => $('#delete-dialog').close());
  $('#delete-confirm').addEventListener('click', async () => {
    const button = $('#delete-confirm');
    button.disabled = true;
    try {
      const result = await api(`/api/tasks/${state.deleteId}`, { method: 'DELETE' });
      $('#delete-dialog').close();
      showToast(result.message || 'Đã xóa công việc.');
      await refreshAll();
    } catch (error) {
      if ($('#delete-dialog').open) {
        $('#delete-error').textContent = error.message;
        $('#delete-error').hidden = false;
      } else showToast(error.message, 'error');
    }
    finally { button.disabled = false; }
  });
  $('#add-task-button').addEventListener('click', () => openDialog());
  $('#empty-add-button').addEventListener('click', () => openDialog());
  $('#task-form').addEventListener('submit', saveTask);
  $('#cancel-dialog').addEventListener('click', closeDialog);
  $('#dialog-close').addEventListener('click', closeDialog);
  $('#task-list').addEventListener('click', handleTaskAction);
  $('#search-input').addEventListener('input', () => {
    state.search = $('#search-input').value.trim();
    clearTimeout(state.searchTimer);
    state.searchTimer = setTimeout(() => loadTasks().catch((error) => showToast(error.message, 'error')), 220);
  });
  $('#priority-filter').addEventListener('change', () => {
    state.priority = $('#priority-filter').value;
    loadTasks().catch((error) => showToast(error.message, 'error'));
  });
  $('#category-filter').addEventListener('change', () => {
    state.categoryId = $('#category-filter').value;
    renderCategoryControls();
    loadTasks().catch((error) => showToast(error.message, 'error'));
  });
  $('#sort-select').addEventListener('change', () => {
    state.sort = $('#sort-select').value;
    loadTasks().catch((error) => showToast(error.message, 'error'));
  });
  $('#category-nav').addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    const selectedCategory = state.categoryId === button.dataset.category ? '' : button.dataset.category;
    if (state.view === 'stats') state.view = 'all';
    state.categoryId = selectedCategory;
    state.search = '';
    state.priority = '';
    $('#search-input').value = '';
    $('#priority-filter').value = '';
    setPageHeader();
    renderCategoryControls();
    closeSidebar();
    loadTasks().catch((error) => showToast(error.message, 'error'));
  });
  $('#back-to-today').addEventListener('click', () => setView('today'));
  $('#menu-toggle').addEventListener('click', openSidebar);
  $('#sidebar-close').addEventListener('click', closeSidebar);
  $('#sidebar-backdrop').addEventListener('click', closeSidebar);
  $('#task-dialog').addEventListener('click', (event) => {
    if (event.target === $('#task-dialog')) closeDialog();
  });
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if ($('#task-dialog').open || $('#delete-dialog').open) return;
      if (state.view === 'stats') setView('today');
      $('#search-input').focus();
    }
    if (event.key === 'Escape') closeSidebar();
  });
}

async function init() {
  bindEvents();
  setPageHeader();
  try {
    const categories = await api('/api/categories');
    state.categories = categories.data;
    renderCategoryControls();
    await Promise.all([loadStats(), loadTasks()]);
    $('#connection-text').textContent = 'SQLite đã kết nối';
    $('.live-dot').classList.add('connected');
  } catch (error) {
    $('#connection-text').textContent = 'Mất kết nối máy chủ';
    showToast(error.message, 'error');
  }
}

init();
