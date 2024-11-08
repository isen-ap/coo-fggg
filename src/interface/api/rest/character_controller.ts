import { Request, Response, Application } from "express";
import { ClassesService } from "application/services/classes_service";
import { SpecieService } from "application/services/specie_service";
import { AlignmentService } from "application/services/alignment_service";
import { CharacterService } from "application/services/character_service";

import { createCharacterRequestValidator } from "./dto/request/create_character_request";
class CharacterController {
  characterService: CharacterService;
  classesService: ClassesService;
  alignmentService: AlignmentService;
  specieService: SpecieService;

  constructor(
    app: Application,
    classesService: ClassesService,
    alignmentService: AlignmentService,
    specieService: SpecieService,
    characterService: CharacterService,
  ) {
    this.classesService = classesService;
    this.alignmentService = alignmentService;
    this.specieService = specieService;
    this.characterService = characterService;
    app.get("/character", this.getCharactersInfo.bind(this));
    app.post("/character", this.createCharacter.bind(this));
  }

  async getCharactersInfo(_req: Request, res: Response) {
    const classes = await this.classesService.getClasses();
    const alignments = await this.alignmentService.getAlignments();
    const species = await this.specieService.getSpecies();
    res.json({ classes, species, alignments });
  }

  async createCharacter(req: Request, res: Response) {
    try {
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
