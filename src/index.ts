import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { CharacterController } from "./interface/api/rest/character_controller";
import { CharacterRepository } from "./infrastructure/db/lowDB/character_repository";
import { CharacterService } from "./application/services/character_service";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use(morgan("combined"));
const characterRepository = new CharacterRepository();
const characterService = new CharacterService(characterRepository);
new CharacterController(app, characterService);

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
