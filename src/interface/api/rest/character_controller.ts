import { Request, Response, Application } from "express";
import { ClassesService } from "../../../application/services/classes_service";
import { AlignmentService } from "../../../application/services/alignment_service";
class CharacterController {
  classesService: ClassesService;
  alignmentService: AlignmentService;

  constructor(app: Application, classesService: ClassesService, alignmentService: AlignmentService) {
    this.classesService = classesService;
    this.alignmentService = alignmentService;
    app.get("/character", this.getCharacters.bind(this));
  }

  async getCharacters(_req: Request, res: Response) {
    const classes = await this.classesService.getClasses();
    const alignments = await this.alignmentService.getAlignments();
    console.log(alignments);
    res.json({ classes, alignments });
  }
}

export { CharacterController };
