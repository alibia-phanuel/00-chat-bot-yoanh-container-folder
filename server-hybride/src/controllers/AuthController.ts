import User from "../models/User";
import "express-session";
declare module "express-session" {
  interface SessionData {
    userId?: string; // ou number selon ton modèle utilisateur
  }
}
import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) {
      return res.status(400).json({ msg: "Mot de passe erroné" });
    }
    req.session.userId = user.uuid;
    const uuid = user?.uuid;
    const name = user?.name;
    const email = user?.email;
    const role = user?.role;
    res.status(200).json({ uuid, name, email, role });
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
/**
 * Fonction de récupération des informations de l'utilisateur connecté.
 */
export const Me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Vérifie si l'utilisateur est authentifié via la session
    if (!req.session.userId) {
      res.status(401).json({ msg: "Utilisateur non authentifié" });
      return;
    }

    // Recherche de l'utilisateur correspondant à l'ID stocké en session
    const user = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.session.userId,
      },
    });

    // Vérifie si l'utilisateur existe
    if (!user) {
      res.status(404).json({ msg: "Utilisateur non trouvé" });
      return;
    }

    // Retourne les informations de l'utilisateur
    res.status(200).json(user);
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
/**
 * Fonction pour gérer la déconnexion d'un utilisateur.
 */
export const logOut = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({ msg: "Impossible de se déconnecter" });
        return;
      }
      res.status(200).json({ msg: "Vous êtes déconnecté" });
    });
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
