const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const is_valid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Input file format error");
    if (is_valid) {
      uploadError = null;
    }
    cb(uploadError, "../frontend/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
