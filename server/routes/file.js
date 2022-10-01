const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");

const { uploadFile, downloadFile } = require("./functions/S3");

const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image") && req.body.type === "image") {
    cb(null, true);
  } else {
    if (req.body.type !== "image") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};
const upload = multer({
  dest: "./uploads",
  limits: { fileSize: 1024 * 1024 * 50 },
  fileFilter: fileFilter,
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const inlineFileFilter = (file, type) => {
  if (file.mimetype.includes("image") && type === "image") {
    return true;
  } else {
    return false;
  }
};

router.get("/:id", (req, res) => {
  const readStream = downloadFile(req.params.id);

  readStream.pipe(res);
});

router.post(
  "/",
  authenticate(),
  upload.array("files", 10),
  async (req, res) => {
    try {
      const uploadedFiles = [];

      for (let i = 0; i < req.files.length; i++) {
        const random = crypto.randomBytes(10).toString("hex");
        const fileExtension = path
          .extname(req.files[i].originalname)
          .toLowerCase();
        const result = await uploadFile(req.files[i], random + fileExtension);
        uploadedFiles.push("/api/file/" + random + fileExtension);
        console.log(result);
      }

      // if (inlineFileFilter(req.file, req.body.type)) {
      return res.status(200).json({
        message: "File uploaded!",
        files: uploadedFiles,
      });
      //} else {
      //  return res.status(500).json({ message: "Only .png files are allowed!" });
      //}
    } catch (err) {
      res.status(500).json({ message: err });
      console.log(err);
    }
  }
);

module.exports = router;
