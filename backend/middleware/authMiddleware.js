// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");

//   // Check if token exists
//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Attach user to request object
//     req.user = decoded;
    
//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Received Token:", token); 

  
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("Decoded Token:", decoded); 

    
    req.user = decoded;

   
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); 
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
