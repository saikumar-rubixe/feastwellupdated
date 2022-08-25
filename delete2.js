// on login request
// on validation && verification
//  get usertype and grant menu access

// write a function which taes input as usertype and sends the response a list of menuId values which are the access for the particular user id .

const sideBarAccessController = async (req, res) => {
  try {
    if (req.body.userType) {
      let details = await sideBarAccessRepository(userType);
    } else {
      // ! bad request error
    }
  } catch (error) {}
};

const sideBarAccessRepository = async (userType) => {
  let sql = " select ";
  app.post;
};
