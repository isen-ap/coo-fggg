import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { SpecieService } from "./application/services/specie_service";
import { LanguageServiceInstance } from "./application/services/language_service";
// import { AlignmentService } from "./application/services/alignment_service";
// import { ClassesService } from "./application/services/classes_service";
// import { CharacterController } from "./interface/api/rest/character_controller";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use(morgan("combined"));

// const alignmentService = new AlignmentService();
// alignmentService.getAlignments();

const specieService = new SpecieService();


// const classesService = new ClassesService();
// console.log(classesService.getClasses());

// const traitService = new TraitService();
// console.log(traitService.getTraits());


app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello, TypeScript Express!" });
});

app.get("/species", async (_req: Request, res: Response) => {
  const species = await specieService.getSpecies();
  res.json(species);
});

app.get("/languages", async (_req: Request, res: Response) => {
  const languages = await LanguageServiceInstance.getLanguages();
  res.json(languages);
});

// new CharacterController(app, classesService, alignmentService);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
