import Products from "../models/Product";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import User from "../models/User";
// Importation des types nécessaires depuis Express
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: {
    role: string;
    userId: number;
  };
  role?: string;
  userId?: number;
}

interface UserProps extends Request {
  userId?: number;
  role?: string;
}
interface ProductParams {
  userId: number;
  role: string;
  id: number;
}

/**
 * Contrôleur pour afficher la page d'accueil.
 * @param req - Objet de requête HTTP.
 * @param res - Objet de réponse HTTP.
 * @param next - Fonction pour passer au middleware suivant (gestion des erreurs).
 */
export const getProducts = async (
  req: UserProps,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let response;

    if (req.role === "admin") {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            model: User,
          },
        ],
        order: [["createdAt", "DESC"]], // Tri par date de création (du plus récent au moins récent)
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        order: [["createdAt", "DESC"]], // Tri par date de création (du plus récent au moins récent)
      });
    }

    res.status(200).json(response);
  } catch (error: any) {
    next(error instanceof Error ? error : new Error(String(error)));
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (
  req: UserProps, // Typage du body
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Vérifie si userId est défini et est un nombre
    const userId = req.userId;

    if (typeof userId !== "number") {
      return res.status(400).json({
        error:
          "L'identifiant de l'utilisateur est obligatoire et doit être un numéro",
      });
    }
    const { name, price } = req.body;

    await Products.create({
      name: name,
      price: price,
      userId,
      uuid: uuidv4(), // Génère un UUID unique
    });
    res.status(201).json({ msg: "Produit créé avec succès !" });
  } catch (error) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
  }
};

export const getProductById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Vérifier si le produit existe avant de continuer
    const product = await Products.findOne({
      where: {
        uuid: req.params.id, // Assurer que `uuid` est un paramètre correct
      },
    });

    if (!product) {
      res.status(404).json({ msg: "Produit non trouvé" });
    }

    // Vérifier que `req.role` et `req.userId` existent
    if (!req.role || !req.userId) {
      res.status(400).json({ msg: "Informations utilisateur manquantes" });
    }

    let response;

    // Logique basée sur le rôle de l'utilisateur
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: product?.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      if (req.userId !== product?.userId)
        res.status(403).json({ msg: "Accès non autorisé" });
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product?.id }, { userId: req.userId }],
        },
      });
    }

    // Si le produit n'existe pas pour l'utilisateur, retour d'une erreur
    if (!response) {
      res.status(404).json({
        msg: "Produit non autorisé ou introuvable pour cet utilisateur",
      });
    }

    // Retourner la réponse si tout est OK
    res.status(200).json(response);
  } catch (error: any) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
  }
};

export const updateProduct = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Vérifier si le produit existe avant de continuer
    const product = await Products.findOne({
      where: {
        uuid: req.params.id, // Assurer que `uuid` est un paramètre correct
      },
    });

    if (!product) {
      res.status(404).json({ msg: "Produit non trouvé" });
    }

    // Vérifier que `req.role` et `req.userId` existent
    if (!req.role || !req.userId) {
      res.status(400).json({ msg: "Informations utilisateur manquantes" });
    }

    let response;

    // Logique basée sur le rôle de l'utilisateur
    if (req.role === "admin") {
      const { name, price } = req.body;
      await Products.update({ name, price }, { where: { id: product?.id } });
    } else {
      if (req.userId !== product?.userId)
        res.status(403).json({ msg: "Accès non autorisé" });
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product?.id }, { userId: req.userId }],
        },
      });
    }

    // Retourner la réponse si tout est OK
    res.status(200).json({ msg: "Produit modifié avec succès !" });
  } catch (error: any) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
export const deleteProducts = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) res.status(404).json({ msg: "Données non trouvées" });
    if (req.role === "admin") {
      await Products.destroy({
        where: {
          id: product?.id,
        },
      });
    } else {
      if (req.userId !== product?.userId)
        res.status(403).json({ msg: "Accès restreint" });
      await Products.destroy({
        where: {
          [Op.and]: [{ id: product?.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Le produit a été supprimé avec succès" });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
