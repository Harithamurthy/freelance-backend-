// // backend/index.js
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// dotenv.config();  // For using environment variables from a .env file

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cors()); // Allow requests from the frontend

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/freelancehub", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log("Failed to connect to MongoDB", err));

// // Basic Route
// app.get("/", (req, res) => {
//   res.send("Welcome to FreelanceHub Backend");
// });

// // Routes for Signup
// app.use("/api/auth", require("./routes/auth"));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// backend/index.js

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// dotenv.config();  // Load environment variables

// const app = express();

// // Middleware to handle CORS
// app.use(express.json());  // Middleware to parse incoming JSON bodies
// app.use(cors({
//   origin: ["http://localhost:3000", "http://localhost:5173"],  // Allow both frontend URLs
//   methods: ["GET", "POST", "PUT", "DELETE"],  // Specify allowed HTTP methods
//   credentials: true,  // Allow cookies or credentials if needed
// }));

// // Connect to MongoDB (Make sure MongoDB is running locally)
// mongoose.connect("mongodb://localhost:27017/freelancehub", { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch((err) => console.log("Failed to connect to MongoDB", err));

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Welcome to FreelanceHub Backend");
// });

// // Routes for Signup & Authentication
// app.use("/api/auth", require("./routes/auth"));

// // Routes for Jobs
// app.use("/api/jobs", require("./routes/jobRoutes"));

// // Error Handling Middleware (Catch-all for errors not handled by specific routes)
// app.use((err, req, res, next) => {
//   console.error(err.stack);  // Log the error stack
//   res.status(500).json({ message: "Something went wrong!" });  // Return a generic error message
// });

// // Start the server
// const PORT = process.env.PORT || 5000;  // Use environment variable for the port or default to 5000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





//with application
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config(); 

const app = express();


app.use(express.json()); 
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);


mongoose
  .connect("mongodb://localhost:27017/freelancehub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.log(" Failed to connect to MongoDB", err));

// Basic route
app.get("/", (req, res) => {
  res.send(" Welcome to FreelanceHub Backend");
});


app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobRoutes")); 
app.use("/api/applications", require("./routes/application")); 


app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});











