class CharacterClass {
  id: number;
  name: string;
  skillToChoose: Array<string>;
  skill: Array<string>;
  savingThrow: Array<string>;
  spellcastingAbility: string;
  spellLevelOne: Array<string>;
  constructor(
    id: number,
    name: string,
    skillToChoose: Array<string>,
    skill: Array<string>,
    savingThrow: Array<string>,
    spellcastingAbility: string,
    spellLevelOne: Array<string>,
  ) {
    this.id = id;
    this.name = name;
    this.skillToChoose = skillToChoose;
    this.skill = skill;
    this.savingThrow = savingThrow;
    this.spellcastingAbility = spellcastingAbility;
    this.spellLevelOne = spellLevelOne;
  }
}
