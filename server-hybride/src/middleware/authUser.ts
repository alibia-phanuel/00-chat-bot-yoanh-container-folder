import User from "../models/User";
import { Request, Response, NextFunction } from "express";
interface RequestParamsProps extends Request {
  userId?:  number | undefined;
  role?: string;
}
import "express-session";
declare module "express-session" {
  interface SessionData {
    userId?: string; // Add userId to the session
  }
}

export const verifyUser = async (
  req: RequestParamsProps,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "Veuillez vous connecter à votre compte !" });
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé" });
  req.userId = user.id;
  req.role = user.role;
  next();
};
export const adminOnly = async (
  req: RequestParamsProps,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "Veuillez vous connecter à votre compte !" });
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Accès restreint" });
  next();
};
