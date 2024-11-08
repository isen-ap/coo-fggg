import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { SpecieService } from "./application/services/specie_service";
import { AlignmentService } from "./application/services/alignment_service";
import { ClassesService } from "./application/services/classes_service";
import { CharacterController } from "./interface/api/rest/character_controller";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use(morgan("combined"));

const classesService = new ClassesService();
const alignmentService = new AlignmentService();

const specieService = new SpecieService();

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello, TypeScript Express!" });
});


new CharacterController(app, classesService, alignmentService, specieService);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
