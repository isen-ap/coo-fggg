class User extends AnonymousUser {
  id: number;
  isConnected: boolean;
  characters: Array<number>; //TODO: typer

  constructor(id: number, isConnected: boolean, characters: Array<number>) {
    super();
    this.id = id;
    this.isConnected = isConnected;
    this.characters = characters;
  }
}
