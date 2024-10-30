import { Request, Response, Application } from "express";
import { ClassesService } from "../../../application/services/classes_service";
class CharacterController {
  classesService: ClassesService;

  constructor(app: Application, classesService: ClassesService) {
    this.classesService = classesService;
    app.get("/characters-info", this.getCharacters.bind(this));
  }

  async getCharacters(_req: Request, res: Response) {
    const classes = await this.classesService.getClasses();
    res.json(classes);
  }
}

export { CharacterController };
