import mongoose from 'mongoose'

// Improved Connection with Error Handling and Options
mongoose.connect(
  'mongodb://127.0.0.1:27017/EDU_LIFT'
).then(() => console.log('Connected to MongoDB successfully'))
 .catch(err => console.error('Error connecting to MongoDB:', err));
 

// Define the student schema with validation and structure improvements
const studentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,  // Ensures fullname is provided
    trim: true,      // Removes whitespace from both sides of the string
  },
  role_name:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,     // Ensures email uniqueness
    lowercase: true,  // Converts email to lowercase before storing
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],  // Basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Ensures a minimum password length
  },
  age: {
    type: Number,
    min: 5,      // Ensures age is at least 5
    max: 100,    // Ensures age is at most 100
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],  // Restricts values to a set of options
    required: true,
  },
  profilepic: {
    type: String,
    default: 'default.jpg',
  },
  schoolname: {
    type: String,
    required: true,
  },
  H_Degree: {
    type: String,
    required: true,
  },
  Sc_in_perc: {
    type: Number,
    min: 0,     // Ensures percentage is at least 0
    max: 100,   // Ensures percentage is at most 100
  },
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

// Export the model based on the schema
export default mongoose.model('Student', studentSchema);


