import { Language } from "./language";

export class SubSpecies {
  id: String;
  name: String;
  description: string;
  languages: Language[];
  languagesOptions: { choose: number, from: Language[] }

  constructor(id: String, name: String, description: string, languages: Language[], languagesOptions: { choose: number, from: Language[] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.languages = languages;
    this.languagesOptions = languagesOptions;
  }
}