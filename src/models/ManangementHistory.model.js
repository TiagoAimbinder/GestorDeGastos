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
        his_date: {
          type:DataTypes.DATE,
          allowNull: false,
        },
        his_status: {
          type: DataTypes.BOOLEAN,
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
    },
    {
        sequelize,
        modelName: 'managementHistory',
        timestamps: true, 
    });

    return ManagementHistory; 
}