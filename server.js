const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Serve all files in public folder
app.use(express.static(path.join(__dirname, 'math_sitesi', 'public')));

// API endpoint to serve image list for a course
const dirs = ['analiz', 'lineer-cebir', 'diff-equations', 'math2'];
app.get('/api/:ders', (req, res) => {
  const ders = req.params.ders;
  if (!dirs.includes(ders)) {
    return res.status(404).json({ error: 'Ders bulunamadı.' });
  }
  const dirPath = path.join(__dirname, 'math_sitesi', 'public', 'uploads', ders);

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(404).json({ error: 'Klasör okunamadı.' });
    }
    const imagePaths = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)).map(file => `/uploads/${ders}/${file}`);
    res.json(imagePaths);
  });
});

app.get('/api/:ders/notes', (req, res) => {
  const ders = req.params.ders;
  if (!dirs.includes(ders)) {
    return res.status(404).json({ error: 'Ders bulunamadı.' });
  }
  const dirPath = path.join(__dirname, 'math_sitesi', 'public', 'uploads', ders, 'notes');
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Klasör okunamadı.' });
    }
    const notes = files.filter(file => /\.(pdf|jpg|jpeg|png|gif)$/i.test(file));
    res.json(notes);
  });
});

app.get('/api/:ders/:topic', (req, res) => {
  const { ders, topic } = req.params;
  if (!dirs.includes(ders)) {
    return res.status(404).json({ error: 'Ders bulunamadı' });
  }
  const topicPath = path.join(__dirname, 'math_sitesi', 'public', 'uploads', ders, topic);
  fs.readdir(topicPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Dosyalar okunamadı' });
    }
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.json(images);
  });
});

app.get('/api/:ders/all-questions', (req, res) => {
  const { ders } = req.params;
  if (!dirs.includes(ders)) {
    return res.status(404).json({ error: 'Ders bulunamadı' });
  }
  const allQuestionsPath = path.join(__dirname, 'math_sitesi', 'public', 'uploads', ders, 'all-questions');
  fs.readdir(allQuestionsPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Dosyalar okunamadı' });
    }
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.json(images);
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { ders, type } = req.body; // Assuming ders and type are sent in the body
    cb(null, path.join(__dirname, 'math_sitesi', 'public', 'uploads', ders, type));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/api/upload-notes', upload.array('files'), (req, res) => {
  res.json({ message: 'Dosyalar başarıyla yüklendi.' });
});

app.post('/api/upload-questions', upload.array('files'), (req, res) => {
  res.json({ message: 'Dosyalar başarıyla yüklendi.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
}); 