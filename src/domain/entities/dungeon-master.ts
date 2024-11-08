class DungeonMaster extends User {
  createCampaign(name: string, picture: string) {
    console.log(`Creating campaign ${name} with picture ${picture}`);
  }
  exportCampaign(campaignId: number) {
    console.log(`Exporting campaign ${campaignId}`);
  }
  inviteUser(campaignId: number, userId: number) {
    console.log(`Inviting user ${userId} to campaign ${campaignId}`);
  }
  assignCharacter(characterId: number, campaignId: number, userId: number) {
    console.log(`Assigning character ${characterId} to user ${userId} in campaign ${campaignId}`);
  }
}
