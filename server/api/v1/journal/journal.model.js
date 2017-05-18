'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Journal', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.ENUM('topic', 'concept'),
    action: DataTypes.ENUM('new', 'edit', 'delete'),
    modified_at: DataTypes.DATETIME
  },{
    classMethods: {
      getAssociations: () => {
        return {
          user: {
            type: 'belongsTo',
            model: 'User',
            hooks: true,
            foreignKey: 'user_id'
          },
          concept: {
            type: 'belongsTo',
            model: 'Concept',
            hooks: true,
            constraints: false,
            foreignKey: 'type_id'
          },
          topic: {
            type: 'belongsTo',
            model: 'Topic',
            hooks: true,
            constraints: false,
            foreignKey: 'type_id'
          }
        }
      }
    }
  });
}
