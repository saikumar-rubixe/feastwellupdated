const express = require("express");
const imageUploadRoute = express.Router(); // imageUploadRoute will be used to handle the request.
const multer = require("multer"); // multer will be used to handle the form data.
const Aws = require("aws-sdk"); // aws-sdk library will used to upload image to s3 bucket.
require("dotenv/config"); // for using the environment variables that stores the confedential information.
let { runQuery } = require("../../config/database");
let newDate = new Date();

// creating the storage variable to upload the file and providing the destination folder,
// if nothing is provided in the callback it will get uploaded in main directory

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "probioticaws/mealimages/");
  },
});

// below variable is define to check the type of file which is uploaded

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
});

//*POST ROUTE //
// now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )
imageUploadRoute.post("/", upload.single("mealImage"), async (req, res) => {
  try {
    if (req.file) {
      var image = req.file.buffer; // to check the data in the console that is being uploaded
      console.log("consolling the user id ");
      console.log(req.body.residentId);

      // Definning the params variable to uplaod the photo
      const date = new Date(Date.now());
      let value = date.toISOString();
      let newdate = value.replace(/:/g, "_");
      let newfileName = req.file.originalname.replace(
        /[&\/\\#, +()$~%'":*?<>{}]/g,
        "_"
      );
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
        Key: `${req.body.residentId}_${newdate}_${newfileName}`, // Name of the image
        Body: image, // Body which will contain the image in buffer format
        ACL: "public-read-write", // defining the permissions to get the public link
        ContentType: "image/jpeg", // Necessary to define the image content-type to view the photo in the browser with the link
        //  UserId: req.body.userId,
      };

      // uplaoding the photo using s3 instance and saving the link in the database.
      s3.upload(params, async (error, data) => {
        if (error) {
          console.log(error);
          res.status(500).send({ err: error }); // if we get any error while uploading error message will be returned.
        }

        const url = data.Location;
        // If not then below code will be executed

        res.status(200).send({
          success: true,
          message: "image uploaded succesfully",
          data: url,
        });
      });
    } else if (!req.file) {
      return res.status(403).json({
        success: false,
        message: "please upload the   file with correct format",
      });
    }
  } catch (error) {
    console.log(error);
    console.log(`something went wrong! CBE`);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = { imageUploadRoute };
