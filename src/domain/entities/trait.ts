class Trait {
  id: number;
  name: String;
  description: String;
  constructor(name: String, description: String) {
    // TODO: Put a real id generator here
    this.id = 1;

    this.name = name;
    this.description = description;
  }
}