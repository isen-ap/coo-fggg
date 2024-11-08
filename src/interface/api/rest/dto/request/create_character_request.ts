export function alignmentValidator(aligment: string) {
  const alignment = [
    "Chaotic Evil",
    "Chaotic Good",
    "Chaotic Neutral",
    "Lawful Evil",
    "Lawful Good",
    "Lawful Neutral",
    "Neutral",
    "Neutral Evil",
    "Neutral Good",
  ];
  if (!alignment.includes(aligment)) {
    return false;
  }
  return true;
}

type CharacterClass = {
  id: string;
  skillToChoose: string[];
};
export function classValidator(characterClass: CharacterClass) {
  if (
    typeof characterClass.id !== "string" ||
    !Array.isArray(characterClass.skillToChoose) ||
    !characterClass.skillToChoose.every((skill) => typeof skill === "string")
  ) {
    return false;
  }
  return true;
}

type SubSpecies = {
  id: string;
};

type CharacterSpecie = {
  id: string;
  languagesToChoose: string[];
  proficienciesToChoose: string[];
  subSpecies: SubSpecies[];
};

export function specieValidator(characterSpecie: CharacterSpecie) {
  if (
    typeof characterSpecie.id !== "string" ||
    !Array.isArray(characterSpecie.languagesToChoose) ||
    !characterSpecie.languagesToChoose.every((language) => typeof language === "string") ||
    !Array.isArray(characterSpecie.proficienciesToChoose) ||
    !characterSpecie.proficienciesToChoose.every((proficiency) => typeof proficiency === "string") ||
    !Array.isArray(characterSpecie.subSpecies) ||
    !characterSpecie.subSpecies.every((subSpecie) => typeof subSpecie.id === "string")
  ) {
    return false;
  }
  return true;
}

export type CreateCharacterRequest = {
  alignment: string;
  class: CharacterClass;
  specie: CharacterSpecie;
};

export function createCharacterRequestValidator(characterRequest: CreateCharacterRequest) {
  console.log(characterRequest);
  if (
    !alignmentValidator(characterRequest.alignment) ||
    !classValidator(characterRequest.class) ||
    !specieValidator(characterRequest.specie)
  ) {
    return false;
  }
  return true;
}
