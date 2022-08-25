const permissionsCheck = function(menuId,permissionType,req,res,next){
    try {   
        
        const userId = req.userIdValue;
        await permissionBodyValidation()   
        let results = await checkpermissionsRepository(userId, menuId, permissionType)
        if (results == true) {
            next()
        }
        else {
            res.status(401).json({
                success: true,
                message: "un authorized"
            })
        }
   } catch (error) {
    res.status(404).json({
        success: true,
        message: "something went wrong"
    })
   }


}

const checkpermissionsRepository = async (userId, menuId, permissionType) => {
   try {
    if (permissionType == 1) {
         sql =" select `read_acces` from `permissions` where user_id =? and menu_id=? and read_acces=1 "
         
    }
    if (permissionType ==2) {
        sql =" select write_access from permissions where user_id =? and menu_id=? and write_access=1 "
    }
    if (permissionType == 3) {
        sql =" select update_access from permissions where user_id =? and menu_id=? and update_access=1 "
    }
    if (permissionType == 4) {
        sql =" select delete_access from permissions where user_id =? and menu_id=? and delete_access=1 "
    }
    
       const results = await runQuery(sql, [userId, menuId])
       if (results) {
           return true
           
       }
       else {
           return false
       }
   } catch (error) {
    
   }
}