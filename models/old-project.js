module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project', 
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      time_laps: DataTypes.INTEGER,
      description: DataTypes.STRING,
      interests: DataTypes.STRING,
      state: DataTypes.STRING
    }, 
    {}
  )

  Project.associate = function(models) {
    // associations can be defined here
  }

  return Project;
}