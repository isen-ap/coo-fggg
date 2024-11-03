class Species{
  id : String;
  name : String;
  height : number;
  subSpecies : SubSpecies[];
  skills : Skill[];
  skillsToChoose : Skill[];
  languages : Language[];
  languagesToChoose : Language[];
  traits : Trait[];
  characteristicBonus : String[];

  constructor(id: String, name: String, height: number, subSpecies: SubSpecies[], skills: Skill[], skillsToChoose: Skill[], languages: Language[], languagesToChoose: Language[], traits: Trait[], characteristicBonus: String[]) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.subSpecies = subSpecies;
    this.skills = skills;
    this.skillsToChoose = skillsToChoose;
    this.languages = languages;
    this.languagesToChoose = languagesToChoose;
    this.traits = traits; 
    this.characteristicBonus = characteristicBonus;
  }
}