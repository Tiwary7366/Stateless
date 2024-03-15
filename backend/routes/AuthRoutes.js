const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');


//swaggerr
/**
 * @swagger
 * components:
 *   schemas:
 *     Policy:
 *       type: object
 *       properties:
 *         policyId:
 *           type: string
 *           description: The ID of the policy.
 *         claimableAmount:
 *           type: number
 *           description: The claimable amount of the policy.
 *         expiresOn:
 *           type: string
 *           format: date-time
 *           description: The expiration date of the policy.
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         dob:
 *           type: string
 *           format: date
 *           description: The date of birth of the user.
 *         policies:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Policy'
 *           description: The policies associated with the user.
 *         totalClaimAmount:
 *           type: number
 *           description: The total claim amount of the user.
 *         isAdmin:
 *           type: boolean
 *           description: Indicates whether the user is an admin or not.
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided data.
 *     tags: [User Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: A new user account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request, validation error or user already exists
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in to user account
 *     description: Sign in to a user account with the provided credentials.
 *     tags: [Users Sign]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized, email or password is incorrect
 */


//swaggere
// Registration route
router.post('/register', AuthController.register);
// Sign-in route
router.post('/signin', AuthController.signIn);

module.exports = router;
