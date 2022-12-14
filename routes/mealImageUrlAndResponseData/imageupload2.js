const express = require("express");
const imageUploadRoute = express.Router(); // imageUploadRoute will be used to handle the request.
const multer = require("multer"); // multer will be used to handle the form data.
const Aws = require("aws-sdk"); // aws-sdk library will used to upload image to s3 bucket.

const { getPstDate, getFileName } = require("../../helper/getCanadaTime");
let newDate = getPstDate();

const {
  configDataRepository,
} = require("../../repository/configDatarepository");
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
const { verify } = require("../../helper/verifyjwtToken");
//*POST ROUTE //
// now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )
imageUploadRoute.post("/", upload.single("mealImage"), async (req, res) => {
  try {
    const user = await verify(req, res);
    if (user) {
      const fileName = getFileName(req.body.residentId, req.userIdValue);

      const values = await configDataRepository();

      const BucketName = values.itemValue;
      const accessKey = values.itemValue2;
      const secretKey = values.itemValue3;

      if (req.file && req.body.residentId) {
        // Definning the params variable to uplaod the photo
        console.log(req.file.originalname);
        var image = req.file.buffer; // to check the data in the console that is being uploaded
        const params = {
          Bucket: BucketName, // bucket that we made earlier
          Key: `${fileName}-${req.file.originalname}`, // Name of the image
          Body: image, // Body which will contain the image in buffer format
          ACL: "public-read-write", // defining the permissions to get the public link
          ContentType: "image/jpeg", // Necessary to define the image content-type to view the photo in the browser with the link
          //  UserId: req.body.userId,
        };

        // Now creating the S3 instance which will be used in uploading photo to s3 bucket.
        const s3 = new Aws.S3({
          accessKeyId: accessKey, // accessKeyId that is stored in .env file
          secretAccessKey: secretKey, // secretAccessKey is also store in .env file
        });

        // uplaoding the photo using s3 instance and saving the link in the database.
        s3.upload(params, async (error, data) => {
          if (error) {
            res.status(500).send({ err: error }); // if we get any error while uploading error message will be returned.
          } else {
            const url = data.Location;
            // If not then below code will be executed

            res.status(200).send({
              success: true,
              message: "Image Uploaded Succesfully",
              data: url,
            });
          }
        });
      } else if (!req.file) {
        return res.status(403).json({
          success: false,
          message: "Please Upload The File With Correct Format",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Unauthorized User",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "got error: " + error,
    });
  }
});

module.exports = { imageUploadRoute };
