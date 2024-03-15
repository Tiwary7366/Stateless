const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/PurchaseController');
const authenticateJWT = require('../middlewares/authenticateJWT'); // Import the authenticateJWT middleware

// Route to buy a policy
/**
 * @swagger
 * components:
 *   schemas:
 *     Policy:
 *       type: object
 *       properties:
 *         policyName:
 *           type: string
 *         totalAmount:
 *           type: number
 *         premiumAmount:
 *           type: number
 *         duration:
 *           type: number
 *       required:
 *         - policyName
 *         - totalAmount
 *         - premiumAmount
 *         - duration
 */

/**
 * @swagger
 * tags:
 *   name: Policies
 *   description: API endpoints for managing policies
 * security:
 *   - BearerAuth: []
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/purchase/buyPolicy:
 *   post:
 *     summary: Buy a policy
 *     description: Allows a user to buy a policy.
 *     tags: [Policies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               policyId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Policy bought successfully
 *       '400':
 *         description: Error buying policy
 */



// Route to buy a policy
router.post('/buyPolicy', authenticateJWT,PurchaseController.buyPolicy);

module.exports = router;
