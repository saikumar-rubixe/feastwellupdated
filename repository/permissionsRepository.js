/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * * permissions file is to check the speicific user_type has the permission to make CRUD operations
 * 													
* 1. permission_id	
* 2. role_id	
* 3. read_access	
* 4. write_access
* 5. update_access
* 6. delete_access
* 7. status
* 8. created_date
* 9. updated_date

 * The methods Calls were as follows
 * 1.getPermissionsDetailByIdRepository -->fetch the user by ID
 *
 */
const { runQuery, con } = require("../config/database");
const { permissionsModel } = require("../models/permissionsModel");
// 1 get by id
const getPermissionsDetailByIdRepository = async (id, res) => {
  try {
    let query = " select * from permissions where permission_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new permissionsModel();
      model.fill(
        (permissionId = result.permission_id),
        (roleId = result.role_id),
        (readAccess = result.read_access),
        (writeAccess = result.write_access),
        (updateAccess = result.update_access),
        (deleteAccess = result.delete_access),
        (permissionStatus = result.status),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

module.exports = { getPermissionsDetailByIdRepository };
