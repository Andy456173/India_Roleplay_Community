// server.js
const express = require('express'); // Import Express framework
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const bodyParser = require('body-parser'); // Import body-parser to parse JSON requests
const app = express(); // Create an Express application
const PORT = 3000; // Define the port for the server

// Sample user data (in a real application, use a database)
const users = [
    { username: 'admin', password: '$2b$10$EIXZ1Z1Q1Z1Z1Z1Z1Z1Z1u', rank: 'Foundership' }, // password: admin123
    { username: 'hruser', password: '$2b$10$EIXZ1Z1Q1Z1Z1Z1Z1Z1Z1u', rank: 'HR' }, // password: hr123
    { username: 'staffuser', password: '$2b$10$EIXZ1Z1Q1Z1Z1Z1Z1Z1Z1u', rank: 'Staff' }, // password: staff123
    { username: 'directiveuser', password: '$2b$10$EIXZ1Z1Q1Z1Z1Z1Z1Z1Z1u', rank: 'Directive' } // password: directive123
];

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
app.use(express.static('public')); // Serve static files from the public directory

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password, rank } = req.body; // Destructure request body
    const user = users.find(u => u.username === username && u.rank === rank); // Find user by username and rank
    
    if (user && await bcrypt.compare(password, user.password)) { // Check if user exists and password matches
        // Send back the rank on successful login
        res.status(200).json({ message: 'Login successful', rank: user.rank });
    } else {
        res.status(401).send('Invalid credentials'); // Send error if credentials are invalid
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server status
});