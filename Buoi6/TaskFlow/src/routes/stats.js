const express = require('express');
const { db, localDate } = require('../db');

const router = express.Router();

router.get('/', (_req, res) => {
  const today = localDate();
  const summary = db.prepare(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'pending' AND due_date < @today THEN 1 ELSE 0 END) AS overdue,
      SUM(CASE WHEN due_date = @today THEN 1 ELSE 0 END) AS today,
      SUM(CASE WHEN status = 'completed' AND due_date = @today THEN 1 ELSE 0 END) AS today_completed,
      SUM(CASE WHEN status = 'pending' AND due_date > @today THEN 1 ELSE 0 END) AS upcoming
    FROM tasks
  `).get({ today });

  const total = summary.total || 0;
  const completed = summary.completed || 0;
  summary.completed = completed;
  summary.pending = summary.pending || 0;
  summary.overdue = summary.overdue || 0;
  summary.today = summary.today || 0;
  summary.today_completed = summary.today_completed || 0;
  summary.upcoming = summary.upcoming || 0;
  summary.completion_rate = total ? Math.round((completed / total) * 100) : 0;

  const categoryBreakdown = db.prepare(`
    SELECT c.id, c.name, c.color,
           COUNT(t.id) AS total,
           SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) AS completed
    FROM categories c
    LEFT JOIN tasks t ON t.category_id = c.id
    GROUP BY c.id
    ORDER BY total DESC, c.name ASC
  `).all().map((item) => ({ ...item, completed: item.completed || 0 }));

  const priorities = db.prepare(`
    SELECT priority, COUNT(*) AS total
    FROM tasks
    GROUP BY priority
  `).all();

  const last7 = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    last7.push(localDate(date));
  }
  const weeklyRows = db.prepare(`
    SELECT date(completed_at, 'localtime') AS day, COUNT(*) AS total
    FROM tasks
    WHERE status = 'completed' AND date(completed_at, 'localtime') BETWEEN ? AND ?
    GROUP BY date(completed_at, 'localtime')
  `).all(last7[0], last7[last7.length - 1]);
  const weeklyMap = new Map(weeklyRows.map((row) => [row.day, row.total]));
  const weekly = last7.map((day) => ({ day, total: weeklyMap.get(day) || 0 }));

  res.json({ data: { summary, categories: categoryBreakdown, priorities, weekly } });
});

module.exports = router;
