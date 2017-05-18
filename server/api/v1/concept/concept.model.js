'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Concept', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    definition: DataTypes.TEXT,
    editable: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true
    }
  },{
    classMethods: {
      getAssociations: () => {
        return {
          topic: {
            type: 'belongsTo',
            model: 'Topic',
            hooks: true,
            foreignKey: 'topic_id'
          },
          user: {
            type: 'belongsTo',
            model: 'User',
            hooks: true,
            foreignKey: 'user_id'
          },
        }
      }
    }
  });
}
