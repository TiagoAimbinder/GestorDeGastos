import { DataTypes, Model } from 'sequelize'; 

export default (sequelize)  => {
    class ManagementHistory extends Model {}
    ManagementHistory.init({
        his_id: {
          type: DataTypes.INTEGER,
          primaryKey: true, 
          autoIncrement: true, 
          allowNull: false, 
        },
        his_amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        his_description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        his_type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        usu_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        cur_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        estado: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
      },
    },
    {
        sequelize,
        modelName: 'managementHistory',
        timestamps: true, 
    });

    return ManagementHistory; 
}