class Campaign {
  name: string;
  picture: string;
  user: User[];
  dungeonMaster: DungeonMaster;
  constructor(name: string, picture: string, user: User[], dungeonMaster: DungeonMaster) {
    this.name = name;
    this.picture = picture;
    this.user = user;
    this.dungeonMaster = dungeonMaster;
  }
}
