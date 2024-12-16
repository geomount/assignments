const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 3000;

const JWT_SECRET = "hellohi";  // Use a strong secret in production

app.use(express.json());
app.use(cors());

const users = [];

// Auth middleware to protect routes
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({
            message: "Please Login First"
        });
    }

    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET);  // Verify the token
        req.user = decodedInfo;  // Optionally store decoded user info for further use
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).send({
            message: "Invalid or Expired Token"
        });
    }
}

// Signup route
app.post("/signup", function(req, res) {
    const { username, password } = req.body;
    console.log("Signup attempt:", username, password);

    // Add user to the 'database'
    users.push({ username, password });

    res.json({
        message: "You are Signed Up!"
    });
});

// Signin route (generate JWT)
app.post("/signin", function(req, res) {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Generate JWT
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        console.log("Signin success:", user);

        res.json({
            token  // Return the token to the frontend
        });
    } else {
        res.status(409).send({
            message: "Invalid username or password"
        });
    }
});

// Protected route (only accessible with a valid JWT)
app.get("/me", auth, function(req, res) {
    res.send({
        username: req.user.username  // Send the username from the decoded token
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
