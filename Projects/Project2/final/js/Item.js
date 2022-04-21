class Item {
  constructor(data) {
    // pass in JSON item data
    this.name = data.name; // item name
    this.cellLabel = data.cellLabel; // item label in gridMap
    this.type = data.type; // item type // could have been useful with depanneur npc
    this.value = data.value; // item value // useful for peddler npc
    this.imageName = data.imageName; // item image name
    this.dropZone = data.dropZone; // used to drop certain items automatically at certain points on map
  }
}
