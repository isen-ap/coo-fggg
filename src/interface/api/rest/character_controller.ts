import { Request, Response, Application } from "express";
import { ClassesService } from "../../../application/services/classes_service";
import { JsonDB, Config } from "node-json-db";
class CharacterController {
  classesService: ClassesService;

  constructor(app: Application, classesService: ClassesService) {
    this.classesService = classesService;
    app.get("/character", this.getCharacters.bind(this));
    app.post("/character", this.createCharacter.bind(this));
  }

  async getCharacters(_req: Request, res: Response) {
    const classes = await this.classesService.getClasses();
    res.json(classes);
  }

  async createCharacter(req: Request, res: Response) {
    try {
      const dbConfig = new Config("database.json", true, false, "/");
      const db = new JsonDB(dbConfig);
      db.push("/", req.body);
      res.status(200).json({ message: "Données enregistrées avec succès" });
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue lors de l'enregistrement des données" });
    }
  }
}

export { CharacterController };
