import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface CustomRequest extends Request {
  user?: { userId: number; username: string; role: string };
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Accès refusé, token manquant." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded as { userId: number; username: string; role: string };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide." });
  }
};
// Vérification des rôles (admin ou employer)
export const verifyRole = (role: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(403).json({ message: "Accès refusé." });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({ message: "Permission insuffisante." });
      return;
    }

    next(); // Poursuit l'exécution
  };
};
