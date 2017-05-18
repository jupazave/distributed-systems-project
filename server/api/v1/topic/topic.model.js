'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Topic', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  },{
    classMethods: {
      getAssociations: () => {
        return {
          concepts: {
            type: 'hasMany',
            model: 'Concept',
            hooks: true,
            foreignKey: 'topic_id'
          }
        }
      }
    }
  });
}
