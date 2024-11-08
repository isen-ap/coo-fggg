import { Request, Response, Application } from "express";
import { ClassesService } from "application/services/classes_service";
import { CharacterService } from "application/services/character_service";
import { createCharacterRequestValidator } from "./dto/request/create_character_request";
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
      //validators
      if (createCharacterRequestValidator(req.body) === false) {
        res.status(400).json({ error: "Wrong body, please refer to the README" });
        return;
      }

      await this.characterService.createCharacter(req.body);
      res.status(200).json({ message: "character created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "error while creating character" });
    }
  }
}

export { CharacterController };
