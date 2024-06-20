
import { ManangementWeek, ManangementHistory, sequelize} from '../config/db.js'


// const sequelize = new Sequelize('sqlite::memory:');

export class ManangementWeekService {

    createMovement = async (movement) => {
      try {
        const movementCreated = await ManangementWeek.create({
          hw_date: movement.hw_date,
          hw_amount: movement.hw_amount,
          hw_description: movement.hw_description,
          hw_type: movement.hw_type,
          usu_id: movement.usu_id,
          cur_id: movement.cur_id,
          hw_status: true,
        })

        const result = { message: "Movimiento creado correctamente", movement: movementCreated}
        return result;
      } 
      catch (err) {
        throw err; 
      }
    }

    updateMovement = async (hw_id, updatedFields) => {
      try {
        const hwUpdated = await ManangementWeek.update(updatedFields, {
          where: {hw_id: hw_id}
        }); 
        const result = {message: "Movimiento actualizado correctamente"}
        return result;
      }
      catch (err) {
        throw err; 
      } 
    }

    goToGeneral = async () => {
      console.log("goToGeneral")
      const t = await sequelize.transaction();
      
      try {
        // Obtener los datos de la tabla ManagementWeek
        const tempExpenses = await ManangementWeek.findAll({ transaction: t });
    
        // Mapear los datos para insertar en la tabla ManagementHistory
        const generalExpensesData = tempExpenses.map(expense => ({
          his_amount: expense.hw_amount,
          his_description: expense.hw_description,
          his_type: expense.hw_type,
          his_date: expense.hw_date,
          his_status: expense.hw_status,
          usu_id: expense.usu_id,
          cur_id: expense.cur_id,
        }));
    
        // Insertar los datos en la tabla ManagementHistory
        await ManangementHistory.bulkCreate(generalExpensesData, { transaction: t });
    
        // Eliminar los datos de la tabla ManagementWeek
        await ManangementWeek.destroy({ where: {}, transaction: t });
    
        // Confirmar la transacción
        await t.commit();
        console.log('Datos migrados exitosamente.');
        return { message: 'Transferencia completada exitosamente.' };
        
      } catch (error) {
        // Revertir la transacción en caso de error
        await t.rollback();
        console.error('Error al migrar los datos:', error);
        return { message: 'Error al transferir los datos.', error: error.message };
      }
    };
  
  };
  

