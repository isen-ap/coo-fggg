import { ICharacterService } from "../interfaces/character_interface_service";
import { JsonDB, Config } from "node-json-db";
import * as path from "path";

class CharacterService implements ICharacterService {
  constructor() {}

  async createCharacter(body: JSON) {
    try {
      const dirPath = path.resolve(__dirname, "../../infrastructure/db/node-json-db");
      const dbConfig = new Config(path.join(dirPath, "data.json"), true, false, "/");
      const db = new JsonDB(dbConfig);
      db.push("/", body);
    } catch (error) {
      console.error("Error saving character data:", error);
    }
  }
}

export { CharacterService };
