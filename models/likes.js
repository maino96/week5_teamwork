'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Posts, {
        foreignKey: 'postId',
        sourceKey: 'postId',
      });
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        sourceKey: 'userId',
      });
    }
  }
  Likes.init(
    {
      likesId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
      },
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Posts',
          key: 'postId',
        },
      },
    },
    {
      sequelize,
      modelName: 'Likes',
      timestamps: false,
    }
  );
  return Likes;
};