const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectToMongo = require("./db");
//swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'THIS IS MY API DOCUMENTATION USING SWAGGER UI',
      version: '1.0.0',
      description: 'API endpoints for managing policies',
    },
    servers: [ 
      {
        url: "http://localhost:8000"
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  
  apis: ['./routes/*.js'], // Path to the file containing your route definitions
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//swagger

connectToMongo();
const PORT = process.env.PORT || 8081; // Note: Changed port to 8081

const userRoutes = require("./routes/UserRoutes");
const policyRoutes = require("./routes/PolicyRoutes");
const authRoutes = require("./routes/AuthRoutes");
const claimRoutes = require("./routes/ClaimRoutes");
const purchaseRoutes = require("./routes/PurchaseRoutes");









///swagger

// Middleware
const corsOption={
  origin:"http://localhost:5173",
  method:"GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials:true,
};
app.use(cors(corsOption));

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/purchase", purchaseRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Claims Management System API");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
