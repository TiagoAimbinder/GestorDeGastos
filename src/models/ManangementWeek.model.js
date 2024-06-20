import { DataTypes, Model } from 'sequelize'; 

export default (sequelize)  => {
    class ManagementWeek extends Model {}
    ManagementWeek.init({
        hw_id: {
          type: DataTypes.INTEGER,
          primaryKey: true, 
          autoIncrement: true, 
          allowNull: false, 
        },
        hw_amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        hw_description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        hw_type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        hw_date: {
          type:DataTypes.DATE,
          allowNull: false,
        },
        hw_status: {
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
        modelName: 'managementWeek',
        timestamps: true, 
    });

    return ManagementWeek; 
}