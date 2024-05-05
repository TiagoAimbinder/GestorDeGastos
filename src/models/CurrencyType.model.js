import { DataTypes, Model } from 'sequelize'; 

export default (sequelize)  => {
    class CurrencyType extends Model {}
    CurrencyType.init({
      cur_id: {
          type: DataTypes.INTEGER,
          primaryKey: true, 
          autoIncrement: true, 
          allowNull: false, 
      },
      cur_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
    },
    {
        sequelize,
        modelName: 'currencyType',
        timestamps: true, 
    });

    return CurrencyType; 
}