// userController.js

// Load Authentication Page
const loadAuth = (req, res) => {
    res.render('index'); // Render the index page (consider serving an HTML page if using React)
}

// Handle Successful Google Login
const successGoogleLogin = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth'); // Redirect if no user is found
    }
    console.log(req.user);
    res.send(`Welcome: ${req.user.email}`); // Send a welcome message (adjust as needed for your app)
}

// Export Functions
export { loadAuth, successGoogleLogin }; // Use named exports for both functions
