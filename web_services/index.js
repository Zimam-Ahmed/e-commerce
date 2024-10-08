const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')));
// Read value from .env file
dotenv.config();

//MongoDB Connection
mongoose.connect(process.env.DB_URL_DEVELOPMENT)
.then(()=>{
	console.log("DB Connection Successfully")
}).catch((err)=>{
	console.log(err)
})

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://vibeescom.vercel.app', 
      'http://localhost:5003', 
      'http://localhost:5001', 
      'https://e-commerce-ten-mauve-45.vercel.app'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensure these methods are allowed
  allowedHeaders: ['Content-Type', 'Authorization'], // Ensure Authorization header is allowed
}));

// Add this line to handle pre-flight requests
app.options('*', cors());
// parse requests of content-type - application/json, Read JSON data from request
app.use(express.json());

//Use routes
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",stripeRoute);


//Read PORT from .env file OR Default set 5002
const API_PORT = process.env.API_PORT || 5002;

app.listen(API_PORT,()=>{
	console.log(`Backend Server is running on port ${API_PORT}`)
})
