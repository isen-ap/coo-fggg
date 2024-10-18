import express, { Express, Request, Response } from "express";
import morgan from "morgan";
// import { AlignmentService } from "./application/services/alignment_service";
// import { SpecieService } from "./application/services/specie_service";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use(morgan("combined"));

// const alignmentService = new AlignmentService();
// alignmentService.getAlignments();

// const specieService = new SpecieService();
// specieService.getSpecies();

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello, TypeScript Express!" });
});

app.get("/greet/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

app.post("/api/data", (req: Request, res: Response) => {
  const data = req.body;
  res.json({
    message: "Data received",
    data: data,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
