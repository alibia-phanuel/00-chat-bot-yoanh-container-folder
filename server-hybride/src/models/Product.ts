// Importation des types et de Sequelize
import { DataTypes, Sequelize, Model, Optional } from "sequelize";

// Importation de l'instance de connexion à la base de données
import sequelize from "../config/db";

// Importation du modèle Users pour gérer la relation avec les produits
import Users from "./User";

// Définition de l'interface TypeScript pour le modèle "Products"
interface ProductAttributes {
  id?: number; // Ajout de l'ID (peut être undefined avant la création)
  uuid: string;
  name: string;
  price: number;
  userId: number;
}

// Création d'une interface pour les attributs optionnels (utilisée pour `.create()`)
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

// Définition du modèle "Products" avec TypeScript et Sequelize
class Products
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number; // Type `number`, non nullable après création
  public uuid!: string;
  public name!: string;
  public price!: number;
  public userId!: number;
}

// Initialisation du modèle Sequelize
Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "product",
    freezeTableName: true,
  }
);

// Définition des relations
Users.hasMany(Products, { foreignKey: "userId" });
Products.belongsTo(Users, { foreignKey: "userId" });

// Exportation du modèle
export default Products;
