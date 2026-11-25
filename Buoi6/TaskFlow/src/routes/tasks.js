const express = require('express');
const { db, localDate } = require('../db');

const router = express.Router();
const priorities = new Set(['low', 'medium', 'high']);
const views = new Set(['all', 'today', 'upcoming', 'overdue', 'completed']);

function getTask(id) {
  return db.prepare(`
    SELECT t.*, c.name AS category_name, c.color AS category_color
    FROM tasks t
    LEFT JOIN categories c ON c.id = t.category_id
    WHERE t.id = ?
  `).get(id);
}

function validDate(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : undefined;
}

function normalizeTask(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Dữ liệu gửi lên không hợp lệ.' };
  }

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) return { error: 'Vui lòng nhập tên công việc.' };
  if (title.length > 120) return { error: 'Tên công việc không được vượt quá 120 ký tự.' };

  const description = typeof body.description === 'string' ? body.description.trim() : '';
  if (description.length > 1000) return { error: 'Mô tả không được vượt quá 1.000 ký tự.' };

  const dueDate = validDate(body.due_date);
  if (dueDate === undefined) return { error: 'Ngày đến hạn không hợp lệ.' };

  let dueTime = body.due_time === '' || body.due_time === null || body.due_time === undefined ? null : body.due_time;
  if (dueTime !== null && (typeof dueTime !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(dueTime))) {
    return { error: 'Giờ đến hạn không hợp lệ.' };
  }
  if (!dueDate) dueTime = null;

  const priority = body.priority || 'medium';
  if (!priorities.has(priority)) return { error: 'Mức độ ưu tiên không hợp lệ.' };

  let categoryId = body.category_id;
  if (categoryId === '' || categoryId === null || categoryId === undefined) {
    categoryId = null;
  } else {
    categoryId = Number(categoryId);
    if (!Number.isInteger(categoryId) || categoryId < 1) return { error: 'Danh mục không hợp lệ.' };
    const category = db.prepare('SELECT id FROM categories WHERE id = ?').get(categoryId);
    if (!category) return { error: 'Danh mục không tồn tại.' };
  }

  return {
    value: {
      title,
      description,
      due_date: dueDate,
      due_time: dueTime,
      priority,
      category_id: categoryId
    }
  };
}

router.get('/', (req, res) => {
  const view = views.has(req.query.view) ? req.query.view : 'all';
  const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 100) : '';
  const priority = priorities.has(req.query.priority) ? req.query.priority : '';
  const categoryId = req.query.category_id ? Number(req.query.category_id) : null;
  const today = localDate();
  const conditions = [];
  const params = [];

  if (view === 'today') {
    conditions.push('t.due_date = ?');
    params.push(today);
  } else if (view === 'upcoming') {
    conditions.push("t.due_date > ? AND t.status = 'pending'");
    params.push(today);
  } else if (view === 'overdue') {
    conditions.push("t.due_date < ? AND t.status = 'pending'");
    params.push(today);
  } else if (view === 'completed') {
    conditions.push("t.status = 'completed'");
  }

  if (priority) {
    conditions.push('t.priority = ?');
    params.push(priority);
  }
  if (Number.isInteger(categoryId) && categoryId > 0) {
    conditions.push('t.category_id = ?');
    params.push(categoryId);
  }
  if (search) {
    conditions.push('(t.title LIKE ? OR t.description LIKE ? OR c.name LIKE ?)');
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  const sortOptions = {
    due_asc: "CASE WHEN t.due_date IS NULL THEN 1 ELSE 0 END, t.due_date ASC, t.due_time ASC, t.created_at DESC",
    due_desc: "CASE WHEN t.due_date IS NULL THEN 1 ELSE 0 END, t.due_date DESC, t.due_time ASC, t.created_at DESC",
    created_desc: 't.created_at DESC, t.id DESC',
    priority: "CASE t.priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END, t.due_date ASC"
  };
  const sort = sortOptions[req.query.sort] || sortOptions.due_asc;
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const tasks = db.prepare(`
    SELECT t.*, c.name AS category_name, c.color AS category_color
    FROM tasks t
    LEFT JOIN categories c ON c.id = t.category_id
    ${where}
    ORDER BY ${sort}
  `).all(...params);

  res.json({ data: tasks });
});

router.post('/', (req, res) => {
  const normalized = normalizeTask(req.body);
  if (normalized.error) return res.status(400).json({ error: normalized.error });

  const result = db.prepare(`
    INSERT INTO tasks (title, description, due_date, due_time, priority, category_id)
    VALUES (@title, @description, @due_date, @due_time, @priority, @category_id)
  `).run(normalized.value);

  res.status(201).json({ data: getTask(result.lastInsertRowid), message: 'Đã thêm công việc.' });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID công việc không hợp lệ.' });
  if (!getTask(id)) return res.status(404).json({ error: 'Không tìm thấy công việc.' });

  const normalized = normalizeTask(req.body);
  if (normalized.error) return res.status(400).json({ error: normalized.error });

  db.prepare(`
    UPDATE tasks
    SET title = @title,
        description = @description,
        due_date = @due_date,
        due_time = @due_time,
        priority = @priority,
        category_id = @category_id,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = @id
  `).run({ ...normalized.value, id });

  res.json({ data: getTask(id), message: 'Đã cập nhật công việc.' });
});

router.patch('/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID công việc không hợp lệ.' });
  const task = getTask(id);
  if (!task) return res.status(404).json({ error: 'Không tìm thấy công việc.' });

  if (task.status === 'completed') {
    db.prepare(`UPDATE tasks SET status = 'pending', completed_at = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(id);
  } else {
    db.prepare(`UPDATE tasks SET status = 'completed', completed_at = datetime('now', 'localtime'), updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(id);
  }

  res.json({ data: getTask(id), message: 'Đã cập nhật trạng thái công việc.' });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'ID công việc không hợp lệ.' });
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  if (!result.changes) return res.status(404).json({ error: 'Không tìm thấy công việc.' });
  res.json({ message: 'Đã xóa công việc.' });
});

module.exports = router;
