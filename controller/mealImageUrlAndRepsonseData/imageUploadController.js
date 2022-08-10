// const multer = require("multer"); // multer will be used to handle the form data.
// const Aws = require("aws-sdk"); // aws-sdk library will used to upload image to s3 bucket.
// require("dotenv/config"); // for using the environment variables that stores the confedential information.
// const {
//   createImageDetailsRepository,
// } = require("../../repository/imageUploadRepository");

// const imageUploadController = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const storage = multer.memoryStorage({
//       destination: function (req, file, cb) {
//         cb(null, "probioticaws/mealimages/");
//       },
//     });
//     // below variable is define to check the type of file which is uploaded
//     const filefilter = (req, file, cb) => {
//       if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
//         cb(null, true);
//       } else {
//         cb(null, false);
//       }
//     };
//     // defining the upload variable for the configuration of photo being uploaded
//     const upload = multer({ storage: storage, fileFilter: filefilter });
//     // Now creating the S3 instance which will be used in uploading photo to s3 bucket.
//     const s3 = new Aws.S3({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
//       secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
//     });
//     console.log(req.file); // to check the data in the console that is being uploaded
//     console.log("consolling the user id ");
//     console.log(req.body.userId);
//     // Definning the params variable to uplaod the photo
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
//       Key: req.file.originalname, // Name of the image
//       Body: req.file.buffer, // Body which will contain the image in buffer format
//       ACL: "public-read-write", // defining the permissions to get the public link
//       ContentType: "image/jpeg", // Necessary to define the image content-type to view the photo in the browser with the link
//       //  UserId: req.body.userId,
//     };
//     // uplaoding the photo using s3 instance and saving the link in the database.
//     s3.upload(params, (error, data) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send({ err: error }); // if we get any error while uploading error message will be returned.
//       }
//       // If not then below code will be executed

//       const url = data.Location;
//       const insertId = createImageDetailsRepository(userId, url);
//       console.log(`checkingt the insert id we got`);
//       const details = {
//         ResidentId: userId,
//         ImageURL: url,
//         ReferenceId: insertId,
//       };
//       res.status(200).send({
//         success: true,
//         message: "image uploaded succesfully",
//         data: details,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { imageUploadController };
