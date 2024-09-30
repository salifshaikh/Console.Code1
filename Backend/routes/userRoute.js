// userRoute.js
import express from 'express';
import passport from 'passport';
import { loadAuth, successGoogleLogin } from '../controller/userController.js'; // Named imports

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

// Route for loading the authentication page
router.get('/auth', loadAuth);

// Auth route for Google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Auth Callback
router.get('/auth/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/auth' // Redirect if authentication fails
    }), 
    successGoogleLogin // Call success handler if authentication succeeds
);

// Export the router
export default router; // Use default export
