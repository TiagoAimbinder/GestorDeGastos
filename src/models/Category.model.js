import { DataTypes, Model } from 'sequelize'; 

export default (sequelize)  => {
    class Category extends Model {}
    Category.init({
      cat_id: {
          type: DataTypes.INTEGER,
          primaryKey: true, 
          autoIncrement: true, 
          allowNull: false, 
      },
      cat_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cat_color: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
        sequelize,
        modelName: 'category',
        timestamps: true, 
    });

    return Category; 
}