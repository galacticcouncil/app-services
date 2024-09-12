import cors from "./middlewares/cors";
import apillonRouter from "./routes/apillon";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ status: "success", message: "API root" });
});

router.use("/apillon", apillonRouter);

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
