const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for notes (replace with a database in a production app)
let notes = [];

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// API endpoint to save a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now().toString(); // Use a timestamp as a simple unique ID
  notes.push(newNote);
  res.json(newNote);
});
// Define an API endpoint to provide a sample note
app.get('/api/sample-note', (req, res) => {
  const sampleNote = [
    {
      title: "Test Title",
      text: "Test text",
    },
  ];
  res.json(sampleNote);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
