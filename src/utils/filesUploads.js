// const path = require("path");
// const multer = require("multer");
// const fs = require("fs");

// const upload = (destination) => {
//   try {
//     // Create directories recursively if they don't exist
//     fs.mkdirSync(destination, { recursive: true });
//   } catch (err) {
//     console.error("Error creating directory:", err);
//   }

//   return multer({
//     storage: multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, destination);
//       },
//       filename: function (req, file, cb) {
//         const fileExtension = path.extname(file.originalname);
//         const uniqueFileName =
//           file.fieldname + "-" + Date.now() + fileExtension;
//         cb(null, uniqueFileName);
//       },
//     }),
//   });
// };

// module.exports = upload;
