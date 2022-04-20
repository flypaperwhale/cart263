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
    this.relationship2player = data.relationship2player;
    this.relationship2items = data.relationship2items;
    // {
    //   peach: 0,
    // };

    this.itemDropZone = data.itemDropZone;
    this.currentText = data["initial dialog"];
  }

  // events
}
