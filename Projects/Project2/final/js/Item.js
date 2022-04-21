class Item {
  constructor(data) {
    this.name = data.name;
    this.cellLabel = data.cellLabel;
    this.type = data.type;
    this.value = data.value;
    this.imageName = data.imageName;
    this.dropZone = data.dropZone; // used unless item is dropped by NPC
    //### why doesn't this work?
  }
}
