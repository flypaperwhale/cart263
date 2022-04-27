class NPC {
  constructor(data) {
    // pass in JSON npc data
    this.name = data.name; // npc name
    this.cellLabel = data.cellLabel; // npc label in gridMap
    this.color = data.color; // npc ellipse color fill
    this.relationship2player = data.relationship2player; // npc's orientation towards player, for dialog
    this.relationship2items = data.relationship2items; // npc's orientation towards items, to manipulate npc's orientation towards player
    this.itemDropZone = data.itemDropZone; // zone so items fall near dropping npc
    this.firstTalk = data.firstTalk; // starts true, is turned false after first utterance
    this.initialDialog = data.initialDialog;// npc's first utterance
    this.neutralDialog = data.neutralDialog; // npc's neutral phrases
    this.dislikeDialog = data.dislikeDialog; // npc's dislike phrases
    this.friendlyDialog = data.friendlyDialog; // npc's friendly phrases
  }
  // events (BOT's goldcoinEvent and IDL's peachEvent etc.) are handled manually in script
}
