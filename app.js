const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Custom Middleware
app.use((req, res, next) => {
    // Log request details
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next(); // Continue to the next middleware or route handler
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Render the first template with an image and download button
app.get('/template1', (req, res) => {
    const imagePath = path.join(__dirname, 'public', 'images', 'example.jpg'); // Adjust the path to your image
    res.render('template1', { customPortion: 'This is a customizable portion in Template 1', imagePath });
});

// Render the second template
app.get('/template2', (req, res) => {
    res.render('template2', { customPortion: 'This is a customizable portion in Template 2' });
});

// Handle the form submission
app.post('/submit', (req, res) => {
    const message = req.body.message;
    console.log('Received message:', message);
    res.send('Success');
});

// Route for downloading the image
app.get('/download', (req, res) => {
    const imagePath = path.join(__dirname, 'public', 'images', 'example.jpg'); // Adjust the path to your image
    res.download(imagePath, 'downloaded_image.jpg');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});