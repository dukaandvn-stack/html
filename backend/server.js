import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());


import path from 'path';
import { fileURLToPath } from 'url';

// In-memory job list and applications
const jobs = [
  { id: 1, title: 'Frontend Developer', description: 'Work on UI/UX.' },
  { id: 2, title: 'Backend Developer', description: 'Work on APIs and databases.' }
];
const applications = [];

// Serve static files from /public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// Submit a job application
app.post('/api/apply', (req, res) => {
  const { name, email, jobId, coverLetter } = req.body;
  if (!name || !email || !jobId) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  applications.push({ name, email, jobId, coverLetter });
  res.json({ message: 'Application submitted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
