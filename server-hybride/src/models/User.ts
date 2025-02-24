// Importation des types de données de Sequelize
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db"; // Connexion à la base de données

// Définition de l'interface TypeScript pour le modèle User
interface UserAttributes {
  id?: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  role: string;
  signupDate?: Date;
}

// Définition du modèle User avec Sequelize
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public uuid!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public signupDate!: Date;
}

// Initialisation du modèle Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    signupDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    freezeTableName: true,
    timestamps: true, // ✅ Active createdAt et updatedAt
  }
);

// Importation de Message et association
import Message from "./Message"; // Placer cette importation après la définition du modèle User

// Association : Un utilisateur peut avoir plusieurs messages
User.hasMany(Message, { foreignKey: "user_id", as: "messages" });

export default User;
