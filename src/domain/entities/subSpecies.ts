import { Language } from "./language";

export class SubSpecies {
  id: String;
  name: String;
  description: string;
  languagesOptions: Language[]

  constructor(id: String, name: String, description: string, languagesOptions: Language[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.languagesOptions = languagesOptions;
  }
}