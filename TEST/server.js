const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

// 🟢 Required middleware
app.use(cors());
app.use(express.json()); // ✅ Parses JSON body

// 🟢 Route to handle POST /submit
app.post('/submit', (req, res) => {
  const { email, password } = req.body;  // This will now work
  console.log('Received:', { email, password });

  const entry = JSON.stringify({ email, password, time: new Date() }) + '\n';

  fs.appendFile('formData.json', entry, (err) => {
    if (err) return res.status(500).json({ status: 'error' });
    res.status(200).json({ status: 'success' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
