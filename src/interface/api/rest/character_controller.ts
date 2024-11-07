import { Request, Response, Application } from "express";
import { ClassesService } from "../../../application/services/classes_service";
import { AlignmentService } from "../../../application/services/alignment_service";
import { SpecieService } from "../../../application/services/specie_service";
class CharacterController {
  classesService: ClassesService;
  alignmentService: AlignmentService;
  specieService: SpecieService;

  constructor(
    app: Application,
    classesService: ClassesService,
    alignmentService: AlignmentService,
    specieService: SpecieService,
  ) {
    this.classesService = classesService;
    this.alignmentService = alignmentService;
    this.specieService = specieService;
    app.get("/character", this.getCharacters.bind(this));
  }

  async getCharacters(_req: Request, res: Response) {
    const classes = await this.classesService.getClasses();
    const alignments = await this.alignmentService.getAlignments();
    const species = await this.specieService.getSpecies();
    res.json({ classes, alignments, species });
  }
}

export { CharacterController };
