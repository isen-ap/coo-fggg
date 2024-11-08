export function alignmentValidator(aligment: string) {
  //if alignment is not in the list of alignments
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
