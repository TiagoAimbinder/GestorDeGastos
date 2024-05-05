import { DataTypes, Model } from 'sequelize'; 

export default (sequelize)  => {
    class User extends Model {}
    User.init({
        usu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false, 
        },
        usu_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usu_password: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        usu_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        usu_token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        role_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'user',
        timestamps: true, 
    });

    return User; 
}