"use strict";

import { Router, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import config from "../../config";

const router: Router = Router();

function getPath(dir: string): string {
  return path.resolve(process.cwd(), dir);
}

router.get("/", (req: Request, res: Response) => {
  res.render("uploader.ejs");
});

router.get("/:dir/:file", (req: Request, res: Response) => {
  if (!config.dirs.includes(req.params.dir)) {
    return res.status(403).send({
      error: true,
      status: 404,
      message: "Resource not found.",
    });
  }

  if (!fs.existsSync(`${getPath("./uploads")}/${req.params.file}`)) {
    return res.status(404).send({
      error: true,
      status: 404,
      message: "Resource not found.",
    });
  }

  fs.access(getPath("./uploads"), fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: true, status: 404, message: "Not found" });
    } else {
      res.render("img.ejs", {
        name: req.params.file,
        ext: path.extname(req.params.file),
      });
    }
  });
});

export default router;
