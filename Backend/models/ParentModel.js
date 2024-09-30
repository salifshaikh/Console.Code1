const mongoose = require('mongoose');

// Define the student schema with validation and structure improvements
const parentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,  // Ensures fullname is provided
        trim: true,      // Removes whitespace from both sides of the string
    },
    role_name: {
        type: String,
        required: true,
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
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],  // Restricts values to a set of options
        required: true,
    },
    profilepic: {
        type: String,
        default: 'default.jpg',
    },
    Student_name: {
        type: [String],
        required: true,  // Ensures fullname is provided
        trim: true,      // Removes whitespace from both sides of the string
    },
    Student_id: {
        type: [String],
        required: true,  // Ensures fullname is provided
    },
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
});

// Export the model based on the schema
module.exports = mongoose.model('parent', parentSchema);
