const express = require("express");
const getConnectivity = require("./connection");
const UrlRouter = require("./Routes/URL");
const StaticRoute = require("./Routes/StaticRoutes");
const path = require('path')
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))
//DB Connection

//SSR
app.set("view engine","ejs");
app.set("views",path.resolve("./Views"));


getConnectivity("mongodb://localhost:27017/URLShortner")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error: " + error);
  });

//Routes
app.use("/",StaticRoute);
app.use("/url", UrlRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
