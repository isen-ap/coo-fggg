import { Request, Response, Application } from "express";
import { ClassesService } from "../../../application/services/classes_service";
import { CharacterService } from "application/services/character_service";
class CharacterController {
  classesService: ClassesService;
  characterService: CharacterService;
  constructor(app: Application, classesService: ClassesService, characterService: CharacterService) {
    this.classesService = classesService;
    this.characterService = characterService;
    app.get("/character", this.getCharacters.bind(this));
    app.post("/character", this.createCharacter.bind(this));
  }

  async getCharacters(_req: Request, res: Response) {
    const classes = await this.classesService.getClasses();
    res.json(classes);
  }

  async createCharacter(req: Request, res: Response) {
    try {
      await this.characterService.createCharacter(req.body);
      res.status(200).json({ message: "Données enregistrées avec succès" });
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue lors de l'enregistrement des données" });
    }
  }
}

export { CharacterController };
