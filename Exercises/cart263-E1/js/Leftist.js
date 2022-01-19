class Leftist extends Animal{
  constructor(x,y,image){
    super(x,y,image);
    this.found = false;
    this.rotationSpeed = -0.30;
  }

  update(){
    this.display();

    if (this.found){
      this.angle += this.rotationSpeed;
    }
  }

  display(){
    push();
    imageMode(CENTER);
    translate(this.x,this.y);
    scale(-1,1); // flips png to look leftward
    rotate(this.angle);
    image(this.image,0,0);
    pop();
  }

  mousePressed(){
    if (this.overlap(mouseX,mouseY)){
      this.found = true;
    }
  }
}
