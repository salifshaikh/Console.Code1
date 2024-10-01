import express from 'express';
import cors from 'cors';
import session from 'express-session';  // Import express-session
import passport from 'passport';        // Import passport
import './passport.js';                 // Import the passport configuration
import userRoute from './routes/userRoute.js'; // Correct import
import bcrypt from 'bcrypt'

const app = express();

// Middleware to handle CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace this with the frontend's URL if different
  credentials: true // This allows cookies to be sent with requests
}));

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Initialize session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,  // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },  // Set secure to true if you're using HTTPS
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/', userRoute); // Your routes go here

app.post('/register', async (req, res) => {
  const { name, school, school_perc, degree, gender, email, age, password } = req.body;

  try {
      // Check if user already exists
      const existingUser = await studentModel.findOne({ email });
      if (existingUser) return res.status(400).send('Student already registered');

      // Generate salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user record in the database
      const newUser = await studentModel.create({
          name,
          email,
          age,
          gender,
          school,  
          H_Degree: degree,
          school_perc,
          password: hashedPassword
      });

      // Redirect to the dashboard upon successful registration
      res.redirect('/dashboard');
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).send('Error storing user in database');
  }
});

// Set the port for the server
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
