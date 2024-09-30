import express from 'express';
import cors from 'cors';
import session from 'express-session';  // Import express-session
import passport from 'passport';        // Import passport
import './passport.js';                 // Import the passport configuration
import userRoute from './routes/userRoute.js'; // Correct import
import studentModel from '../Backend/models/StudentModel.js'
import bcrypt from 'bcrypt'


const app = express();

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

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
  let { name, school,school_perc,degree,gender , email, age, password } = req.body;

  let user = await studentModel.findOne({ email });
  if (user) return res.status(500).send('Student Already registered');

  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
          let user = await studentModel.create({
              name,
              email,
              age,
              gender,
              school,
              degree,
              school_perc,
              password: hash
          });

          // let token = jwt.sign({ email: email, userid: user._id }, 'Secret');
          // res.cookie('token', token);
          res.redirect('/')
      });
  });
});
// Set the port for the server
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
