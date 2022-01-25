class BurnBot {
  constructor(){
    this.speechState = `Offline`; // can be Offline, Listening, Talking
  }

  update(){
    // draw eyes
    push();
    fill(0);
    rectMode(CENTER);
    rect(width/4,height/4, 50,20);
    rect(width/2,height/4, 50,20);
    pop();

    if (this.speechState === `Offline`){

    }
  }
}
