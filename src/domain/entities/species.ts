import { Trait } from "./trait"
import { Language } from "./language"
import { SubSpecies } from "./subSpecies"
import { Proficiencies } from "./proficiencies";

export class Species{
  id : String;
  name : String;
  height : number;
  subSpecies : SubSpecies[];
  proficiencies : Proficiencies[];
  proficienciesToChoose : {choose: number, from: Proficiencies[]};
  languages : Language[];
  languagesToChoose : {choose: number, from: Language[]};
  traits : Trait[];
  characteristicBonus : String[];

  constructor(id: String, name: String, height: number, subSpecies: SubSpecies[], proficiencies: Proficiencies[], proficienciesToChoose: {choose: number, from: Proficiencies[]}, languages: Language[], languagesToChoose: {choose: number, from: Language[]}, traits: Trait[], characteristicBonus: String[]) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.subSpecies = subSpecies;
    this.proficiencies = proficiencies;
    this.proficienciesToChoose = proficienciesToChoose;
    this.languages = languages;
    this.languagesToChoose = languagesToChoose;
    this.traits = traits; 
    this.characteristicBonus = characteristicBonus;
  }
}