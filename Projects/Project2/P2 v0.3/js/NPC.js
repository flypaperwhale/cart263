class NPC {
  constructor(data) {
    this.name = data.name;
    this.index = data["gridMap index"];
    // {
    //   row: undefined,
    //   collumn: undefined,
    // };
    this.cellLabel = data["cell label"];
    this.color = data.color;
    this.personality = data.personality;
    this.playerRelation = data["relationship to player"];
    this.itemRelations = data["relationship to items"];
    // {
    //   peach: 0,
    // };



    this.itemDropZone = [];
    this.currentText = data["initial dialog"];
  }

  // events
}
