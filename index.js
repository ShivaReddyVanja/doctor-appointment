
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// this makes sure css and other static files are served
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  
  // Store the data in a JSON file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    const jsonData = JSON.parse(data);
    jsonData.push(formData);
    
    fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      res.json(formData);
    });
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

