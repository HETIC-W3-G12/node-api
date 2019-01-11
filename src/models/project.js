'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
        allowNull: false
      
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    interests: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    state: {
      type: DataTypes.ENUM,
      values: ['unvalid', 'valid', 'running', 'complete', 'canceled'],
      allowNull: false
    },
    timeLaps: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};