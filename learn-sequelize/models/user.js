module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER.UNSIGNED, // 양수만
        allowNull: false,
      },
      married: {
        type: DataTypes.BOOLEAN, // 양수만
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT, // 양수만
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
};
