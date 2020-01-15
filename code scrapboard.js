//This does not work:
if (this.positionVector.x == this.originX && this.positionVector.y == this.originY){
  return true;
} else if ((this.positionVector.x > this.originX-10 &&
this.positionVector.x < this.originX+10)
&& (this.positionVector.y > this.originY-10 &&
  this.positionVector.y < this.originY+10)){
  return true;
} else if (this.particleBirthColor == colorOfTheLand){
  return true;
}else{
  return false;
}//close else




//Now this works way better................
//BUT they still jitter around the generator, albeit at a
//larger radius..
if(this.particleBirthColor == colorOfTheLand){
  return true;
}else if(
  (this.positionVector.x == this.originX
    ||
    (this.positionVector.x > this.originX-10 &&
    this.positionVector.x < this.originX+10))
     ||
  (this.positionVector.y == this.originY
    ||
    (this.positionVector.y > this.originY-10 &&
      this.positionVector.y < this.originY+10))
  ){
    return true;
} else {
  return false
} //close else
