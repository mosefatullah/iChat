const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

function singleUploader(
 subfolder_path,
 allowed_file_types,
 max_file_size,
 error_msg
) {
 const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(null, UPLOADS_FOLDER);
  },
  filename: function (req, file, cb) {
   const fileExt = path.extname(file.originalname);
   const fileName =
    file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") +
    "-" +
    Date.now();

   cb(null, fileName + fileExt);
  },
 });

 const upload = multer({
  storage: storage,
  limits: {
   fileSize: max_file_size,
  },
  fileFilter: function (req, file, cb) {
   if (allowed_file_types.includes(file.mimetype)) {
    cb(null, true);
   } else {
    cb(createError(error_msg));
   }
  },
 });

 return upload;
}

module.exports = singleUploader;
