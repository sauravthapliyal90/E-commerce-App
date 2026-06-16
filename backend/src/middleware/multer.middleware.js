import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = path
      .extname(file.originalname || "")
      .toLowerCase();

    const safeExt = [
      ".jpeg",
      ".jpg",
      ".png",
      ".webp",
    ].includes(ext)
      ? ext
      : "";

    const unique = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;

    cb(null, `${unique}${safeExt}`);
  },
});

// fileFilter
const fileFilter = (req, file, cb) => {
  const allowedType =
    /jpeg|jpg|png|webp/;

  const extname = allowedType.test(
    path
      .extname(file.originalname)
      .toLowerCase()
  );

  const mimeType = allowedType.test(
    file.mimetype
  );

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files are allowed (jpeg, jpg, png, webp)"
      ),
      false
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});