const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/posts', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'blog_data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});

app.post('/admin/addpost', (req, res) => {
    const { title, content, photo, date } = req.body;

    const newPost = {
        date,
        title,
        content,
        photo
    };

    fs.readFile(path.join(__dirname, 'public', 'blog_data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading blog data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            jsonData.unshift(newPost); // Add new post at the beginning of the array

            fs.writeFile(path.join(__dirname, 'public', 'blog_data.json'), JSON.stringify(jsonData), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing blog data:', writeErr);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.status(201).json({ message: 'New blog post added successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
