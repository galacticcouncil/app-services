import { ApillonApiError } from "@apillon/sdk";
import express, { Request, Response } from "express";
import multer from "multer";
import { getBucketContent, uploadToBucket } from "../lib/apillon";

const multerMiddleware = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

router.get("/bucket/:uuid?", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  if (!uuid) {
    return res
      .status(400)
      .send({ status: "error", message: "Bucket UUID is required." });
  }

  return getBucketContent(uuid, req.query)
    .then((data) => {
      return res.send({ status: "success", data });
    })
    .catch(handleApiError(res));
});

router.post(
  "/bucket/:uuid/upload",
  multerMiddleware.single("file"),
  async (req: Request, res: Response) => {
    const { uuid } = req.params;

    if (!uuid) {
      return res
        .status(400)
        .send({ status: "error", message: "Bucket UUID is required." });
    }

    if (!req.file) {
      return res.status(400).send({
        status: "error",
        message: "No file to upload",
      });
    }

    return uploadToBucket(uuid, [
      {
        content: req.file.buffer,
        contentType: req.file.mimetype,
        fileName: req.body.fileName || req.file.originalname,
      },
    ])
      .then((data) => {
        return res.send({
          status: "success",
          data,
        });
      })
      .catch(handleApiError(res));
  },
);

function handleApiError(res: Response) {
  return (err: unknown) => {
    if (err instanceof ApillonApiError) {
      const { message } = JSON.parse(err.message);
      return res.status(400).send({ status: "error", message });
    }
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  };
}

export default router;
