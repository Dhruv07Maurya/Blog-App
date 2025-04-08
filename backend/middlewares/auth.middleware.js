import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const tokenUser = req.cookies.UserToken;
  console.log("tokenUser:", tokenUser);
  next();

  //   if (!token) {
  //     return res
  //       .status(401)
  //       .json({ success: false, message: "No token provided" });
  //   }

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.userId = decoded.id;
  //     next();
  //   } catch (error) {
  //     return res
  //       .status(403)
  //       .json({ success: false, message: "Invalid or expired token" });
  //   }
};

export { auth };
