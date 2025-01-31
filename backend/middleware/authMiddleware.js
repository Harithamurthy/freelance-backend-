


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Request Headers:", req.headers);//new line

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
