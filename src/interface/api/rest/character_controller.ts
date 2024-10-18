import { Request, Response, Application } from "express";
import { CharacterService } from "../../../application/services/character_service";
class CharacterController {
  service: CharacterService;

  constructor(app: Application, service: CharacterService) {
    this.service = service;
    app.get("/characters", this.getCharacters.bind(this));
  }

  getCharacters(_req: Request, res: Response) {
    const character = this.service.getCharacter(1);
    res.json(character);
  }
}

export { CharacterController };
