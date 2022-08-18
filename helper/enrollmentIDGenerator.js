const enrollementIdTag = function (userType) {
  try {
    if (userType == 1) {
      return (tag = "SA01");
    }

    if (userType == 2) {
      return (tag = "CM02");
    }

    if (userType == 3) {
      return (tag = "AD03");
    }
    if (userType == 4) {
      return (tag = "CA04");
    }
    if (userType == 5) {
      return (tag = "NS05");
    }
    if (userType == 6) {
      return (tag = "DN06");
    }
    if (userType == 7) {
      return (tag = "RS07");
    } else {
      return (tag = "GT01");
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont",
    });
  }
};

module.exports = { enrollementIdTag };
