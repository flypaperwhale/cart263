class BurnBot {
  constructor(){
    this.speechState = `Offline`; // can be Offline, Listening, Talking
  }

  update(){
    // draw eyes
    noStroke();
    push();
    fill(255);
    rectMode(CENTER);
    rect(width/4,height/3, 90,20);
    rect(width/2+width/4,height/3, 90,20);
    pop();

    if (this.speechState === `Offline`){
      push();
      fill(255);
      rectMode(CENTER);
      rect(width/2,height/2+height/4, 130,20);
      pop();
    }
    if (this.speechState === `Talking`){
      push();
      fill(255);
      rectMode(CENTER);
      rect(width/2,height/2+height/4-40, 117,20);
      rect(width/4+25,height/2+height/4-20, 32,20);
      rect(width/2+width/4-25,height/2+height/4-20, 32,20);
      rect(width/2,height/2+height/4, 117,20);
      pop();
    }
    if (this.speechState === `Listening`){
      push();
      fill(255);
      rectMode(CENTER);
      rect(width/4,height/2+height/4-20, 50,20);
      rect(width/2+width/4,height/2+height/4-20, 50,20);
      rect(width/2,height/2+height/4, 150,20);
      pop();
    }
  }
}
