import { CharacterRepository } from "../../infrastructure/db/lowDB/character_repository";
import { ICharacterService } from "../interfaces/character_interface_service";
class CharacterService implements ICharacterService {
  repository: CharacterRepository;
  constructor(repository: CharacterRepository) {
    this.repository = repository;
  }
  getCharacter(id: number) {
    console.log(`Getting character ${id}`);
    return this.repository.getCharacter();
  }
}

export { CharacterService };
