class BurnBot {
  constructor(){
    this.speechState = `Offline`; // can be Offline, Listening, Talking
  }

  update(){
    // draw eyes
    push();
    fill(255);
    rectMode(CENTER);
    rect(width/4,height/3, 90,20);
    rect(width/2+width/4,height/3, 90,20);
    pop();

    if (this.speechState === `Offline`){
      fill(255);
      rectMode(CENTER);
      rect(width/2,height/2+height/4, 40,20);
      pop();
    }
    if (this.speechState === `Talking`){
      fill(255);
      rectMode(CENTER);
      rect(width/4,height/4, 90,20);
      rect(width/2+width/4,height/4, 90,20);
      pop();
    }
    if (this.speechState === `Listening`){
      fill(255);
      rectMode(CENTER);
      rect(width/4,height/4, 90,20);
      rect(width/2+width/4,height/4, 90,20);
      pop();
    }
  }
}
