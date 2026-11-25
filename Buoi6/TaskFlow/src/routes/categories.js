const express = require('express');
const { db } = require('../db');

const router = express.Router();

router.get('/', (_req, res) => {
  const categories = db.prepare(`
    SELECT c.id, c.name, c.color, COUNT(t.id) AS task_count
    FROM categories c
    LEFT JOIN tasks t ON t.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id ASC
  `).all();
  res.json({ data: categories });
});

module.exports = router;
