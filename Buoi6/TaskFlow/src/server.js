require('dotenv').config();
const express = require('express');
const path = require('node:path');
const { dbPath } = require('./db');
const tasksRouter = require('./routes/tasks');
const categoriesRouter = require('./routes/categories');
const statsRouter = require('./routes/stats');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.static(PUBLIC_DIR));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'TaskFlow', database: 'connected' });
});
app.use('/api/tasks', tasksRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/stats', statsRouter);

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API không tồn tại.' });
});

app.use((err, _req, res, _next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON gửi lên không hợp lệ.' });
  }
  console.error('[TaskFlow error]', err);
  res.status(500).json({ error: 'Đã có lỗi máy chủ. Vui lòng thử lại.' });
});

const server = app.listen(PORT, () => {
  console.log('');
  console.log('  ✦ TaskFlow đã sẵn sàng!');
  console.log(`  Local:    http://localhost:${PORT}`);
  console.log(`  Database: ${dbPath}`);
  console.log('  Nhấn Ctrl + C để dừng server.');
  console.log('');
});

function shutdown() {
  server.close(() => {
    const { db } = require('./db');
    db.close();
    process.exit(0);
  });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
