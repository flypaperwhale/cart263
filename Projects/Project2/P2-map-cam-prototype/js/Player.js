class Player {
  constructor(x, y) {
    // feed x,y in script
    this.x = x; // player starting x
    this.y = y; // player starting y
    this.size = 20; // player size is 20
    this.vx = 0; // handled by pause or ad/arrow keys
    this.vy = 0; // handled by pause or ws/arrow keys
    this.speed = 4; // speed of 4
    this.alive = true; // always alive
    this.playerCollidedNPC = false; // switch true/false if player is in collision with npc or not
    this.isPaused = false; // player pause state switch
  }

  constrain() {
    // constrain player to the ground
    // this.x = constrain(this.x, 0, 600);
    // this.y = constrain(this.y, 402, 810);
  }

  handleInput() {
    // handle keys for moving player avatar (code from https://github.com/pippinbarr/cc/tree/main/1/activities/inheritance-activity)
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.vx = -this.speed;
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.vy = -this.speed;
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  move() {
    // move player
    this.x += this.vx;
    this.y += this.vy;
  }

  paused() {
    // pause player turns isPaused switch to true
    this.isPaused = true;
  }

  display() {
    // display player
    push();
    fill(200, 50, 50); // red
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
