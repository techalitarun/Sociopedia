//authorization for logged in users
import jwt from "jsonwebtoken";
//next allows the function to continue
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }
    console.log("AAAAAAAAAAAABBBBAAAAAAAAAAAA");

    if (token.startsWith("Bearer ")) {
      /*actual token*/ token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
