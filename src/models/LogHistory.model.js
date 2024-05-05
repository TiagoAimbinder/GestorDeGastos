import { DataTypes, Model } from 'sequelize'; 

export default (sequelize)  => {
    class LogHistory extends Model {}
    LogHistory.init({
      log_id: {
          type: DataTypes.INTEGER,
          primaryKey: true, 
          autoIncrement: true, 
          allowNull: false, 
      },
      usu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
        sequelize,
        modelName: 'logHistory',
        timestamps: true, 
    });

    return LogHistory; 
}