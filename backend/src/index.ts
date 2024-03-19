import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

const PORT = (process.env.PORT as unknown as number) || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
