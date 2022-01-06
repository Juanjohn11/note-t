const { v4: uuidv4 } = require('uuid');
const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require ('fs');

const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res)=>{
    req.body.id = uuidv4();
    console.log(req.body);
    noteData.push(req.body);
    fs.writeFile('./db/db.json',JSON.stringify(noteData),function(err){
        if (err) throw err;
        res.json(noteData);
    })
    
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
