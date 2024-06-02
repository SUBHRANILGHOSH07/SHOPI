const express = require("express");//this is used to import express
const app = express();//this is used to create the server
const mongoose = require("mongoose");//this is used to connect to the database
const dotenv = require("dotenv");//this is used to access the .env file
const userRoute = require("./routes/user");//this is the route we created in user.js
const authRoute = require("./routes/auth");//this is the route we created in auth.js
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


dotenv.config();//this is used to access the .env file

mongoose
  .connect(process.env.MONGO_URL)
  .then(()=>console.log("DBConnection Successful!"))//if the connection is successful, this will run
  .catch((err)=>{
    console.log(err)
  });

  app.use(express.json());//this is used to parse the json data


app.use(cors());//this is used to allow the frontend to access the backend
app.use("/api/users",userRoute);//when we go to /api/user, it will redirect to userRoute
app.use("/api/auth",authRoute);//when we go to /api/auth, it will redirect to authRoute
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",stripeRoute);


app.listen(process.env.Port || 5000,()=>{//this is used to start the server
    console.log("Backend server is running!");//this will run when the server is started
})