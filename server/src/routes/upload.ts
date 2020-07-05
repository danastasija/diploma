import * as express from "express";
import * as multer from "multer";
import * as mime from "mime";
import { resolve, join } from "path";
import { existsSync, fstat, mkdirSync } from "fs";
import { FileController } from "../controller/FileController";
import { AdaptationFile } from "src/entity/AdaptationFiles";
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const personFolder = join(
      process.cwd(),
      "uploads",
      `${req.body.id || req.params.id}`
    );
    if (!existsSync(personFolder)) {
      mkdirSync(personFolder);
    }
    cb(null, personFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname === "avatar"
        ? `${file.fieldname}-${uniqueSuffix}.${mime.getExtension(
            file.mimetype
          )}`
        : file.originalname
    );
  },
});
const upload = multer({ storage });

export default () => {
  const router = express.Router();
  const controller = new FileController();
  router.post(
    "/profilepic",
    upload.single("avatar"),
    controller.uploadProfileAvatar
  );
  router.post(
    "/adaptationFiles",
    upload.fields([{ name: "adaptation" }, { name: "summary", maxCount: 1 }]),
    controller.uploadAdaptationFiles
  );
  router.post(
    "/dismissal",
    upload.single("file"),
    controller.uploadDismissFile
  );
  router.post("/salary", upload.single("file"), controller.uploadSalaryFile);
  return router;
};
