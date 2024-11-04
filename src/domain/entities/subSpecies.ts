import { Language } from "./language";

export class SubSpecies {
  id: String;
  name: String;
  description: string;
  languages: Language[]

  constructor(id: String, name: String, description: string, languages: Language[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.languages = languages;
  }
}