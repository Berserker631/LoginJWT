import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];
  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    try {
      let bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || "omega");
      next();
    } catch (error) {
      res.status(401).json({
        msg: "Unvalid token",
      });
    }
  } else {
    res.status(401).json({
      msg: "Access error",
    });
  }
};

export default validateToken;
