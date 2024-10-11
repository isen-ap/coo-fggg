class Character {
  name: string;
  picture: string;
  characterClass: CharacterClass;
  species: string; //TODO : Change to Species
  alignment: Alignment;
  constructor(name: string, picture: string, characterClass: CharacterClass, species: string, alignment: Alignment) {
    this.name = name;
    this.picture = picture;
    this.characterClass = characterClass;
    this.species = species;
    this.alignment = alignment;
  }
}
