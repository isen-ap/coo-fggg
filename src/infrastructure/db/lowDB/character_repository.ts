import { ICharacterRepository } from "../../../domain/repositories/character_interface_repository";
class CharacterRepository implements ICharacterRepository {
  getCharacter(): string {
    return "tristan";
  }
}
export { CharacterRepository };
