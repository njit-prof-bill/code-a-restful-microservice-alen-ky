const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

let userList = [];
let currentId = 1;

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Both name and email are required' });
    }

    const newUser = { id: currentId++, name, email };
    userList.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const foundUser = userList.find(user => user.id === userId);

    if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(foundUser);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const foundUser = userList.find(user => user.id === userId);
    if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!name || !email) {
        return res.status(400).json({ message: 'Both name and email must be provided' });
    }

    foundUser.name = name;
    foundUser.email = email;

    res.json(foundUser);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = userList.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    userList.splice(userIndex, 1);
    res.status(204).send();
});


// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing