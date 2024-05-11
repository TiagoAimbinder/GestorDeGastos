import { DataTypes, Model } from 'sequelize'; 

export default (sequelize)  => {
    class Expenses extends Model {}
    Expenses.init({
      exp_id: {
          type: DataTypes.INTEGER,
          primaryKey: true, 
          autoIncrement: true, 
          allowNull: false, 
      },
      exp_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      exp_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      exp_percentVta: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
        sequelize,
        modelName: 'expenses',
        timestamps: true, 
    });

    return Expenses; 
}