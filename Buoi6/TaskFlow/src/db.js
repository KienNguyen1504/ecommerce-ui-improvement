const Database = require('better-sqlite3');
const fs = require('node:fs');
const path = require('node:path');

const configuredPath = process.env.DB_FILE || './data/todo.sqlite';
const dbPath = path.resolve(process.cwd(), configuredPath);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
db.exec(fs.readFileSync(schemaPath, 'utf8'));

function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const seed = db.transaction(() => {
  const seeded = db.prepare("SELECT value FROM app_meta WHERE key = 'demo_seeded'").get();
  if (seeded) return;

  const categoryCount = db.prepare('SELECT COUNT(*) AS count FROM categories').get().count;
  if (categoryCount === 0) {
    const insertCategory = db.prepare('INSERT INTO categories (name, color) VALUES (?, ?)');
    [
      ['Học tập', '#5796d9'],
      ['Công việc', '#3988e8'],
      ['Cá nhân', '#e49a43'],
      ['Sức khỏe', '#2ca58d'],
      ['Khác', '#8993a8']
    ].forEach(([name, color]) => insertCategory.run(name, color));
  }

  const taskCount = db.prepare('SELECT COUNT(*) AS count FROM tasks').get().count;
  if (taskCount === 0) {
    const categoryId = (name) => db.prepare('SELECT id FROM categories WHERE name = ?').get(name).id;
    const insertTask = db.prepare(`
      INSERT INTO tasks (title, description, due_date, due_time, priority, status, category_id, completed_at)
      VALUES (@title, @description, @due_date, @due_time, @priority, @status, @category_id, @completed_at)
    `);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const samples = [
      {
        title: 'Hoàn thành bài tập Node.js',
        description: 'Xây dựng API và kiểm tra các chức năng cơ bản.',
        due_date: localDate(today), due_time: '10:30', priority: 'high', status: 'pending',
        category_id: categoryId('Học tập'), completed_at: null
      },
      {
        title: 'Ôn lại kiến thức JavaScript',
        description: 'Ôn tập array, object, promise và async/await.',
        due_date: localDate(today), due_time: '15:00', priority: 'medium', status: 'pending',
        category_id: categoryId('Học tập'), completed_at: null
      },
      {
        title: 'Lên kế hoạch cho tuần mới',
        description: 'Ghi lại các việc quan trọng và sắp xếp thứ tự ưu tiên.',
        due_date: localDate(tomorrow), due_time: '09:00', priority: 'low', status: 'pending',
        category_id: categoryId('Cá nhân'), completed_at: null
      },
      {
        title: 'Gửi bản cập nhật tiến độ',
        description: 'Tổng hợp những phần đã hoàn thành trong dự án.',
        due_date: localDate(yesterday), due_time: '17:00', priority: 'high', status: 'pending',
        category_id: categoryId('Công việc'), completed_at: null
      },
      {
        title: 'Đi bộ hoặc vận động 30 phút',
        description: 'Dành thời gian nghỉ ngơi và vận động nhẹ.',
        due_date: localDate(today), due_time: null, priority: 'low', status: 'completed',
        category_id: categoryId('Sức khỏe'), completed_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        title: 'Sắp xếp tài liệu học tập',
        description: 'Phân loại tài liệu theo từng môn học.',
        due_date: null, due_time: null, priority: 'medium', status: 'pending',
        category_id: categoryId('Khác'), completed_at: null
      }
    ];
    samples.forEach((task) => insertTask.run(task));
  }

  db.prepare("INSERT INTO app_meta (key, value) VALUES ('demo_seeded', '1')").run();
});
seed();

module.exports = { db, dbPath, localDate };
