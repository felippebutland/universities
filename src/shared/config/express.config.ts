import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { json, urlencoded } from "body-parser";
import dotenv from "dotenv";
import universityRoutes from "../../../src/modules/universities/controllers/university.controller";
import userRoutes from "../../../src/modules/users/controllers/user.controller";
import {errorHandler} from "../middleware/error.middleware";

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/universities", universityRoutes);
app.use("/users", userRoutes);

app.use(errorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});


export default app;