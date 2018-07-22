import {grid, rainbowGrid} from "./helpers/draw/grid";




function isMouseInside(p){
  if(
    p.mouseX >= 0 &&
    p.mouseX <= p.width &&
    p.mouseY >= 0 &&
    p.mouseY <= p.height){
      return true
    }
  else return false;
}

function mouseDelta(p){
  let a = [p.mouseX - p.pmouseX, p.mouseY - p.pmouseY]
  console.log(a);
  return a;
}

export default function ZoomGridSketch (p) {

  let scale = 1;
  let mouseIn = false;
  let isClicked = false;
  let wasClicked = false;
  let clickedX = 0;
  let clickedY = 0;
  let draggedX = 0;
  let draggedY = 0;

  let xOffset = 0;
  let yOffset = 0;
  let halfwidth = 0;
  let halfheight = 0;

  p.setup = () => {
    p.createCanvas(800, 800);
    halfwidth = p.width/2.;
    halfheight = p.height/2.;
  };
  
  p.propsHandler = (props) => {
    if (props.scale){
      console.log(scale);
      scale = props.scale * Math.PI / 180;
      scale = scale ? scale : 0.0001;
    }
    // if (props.width && props.height){
    //   p.resizeCanvas(props.width,props.height);
    // }
    
  };

  p.mouseWheel = (e) => {
    if(mouseIn) {
      scale *= Math.pow(10, -e.delta / 1000.) ;
      scale = scale ? scale : 0.0001;
      return false;
    }
    return true;
  }

  p.mousePressed = () => {
    if(mouseIn){
      //if(!isClicked){
        clickedX = p.mouseX;
        clickedY = p.mouseY;
        isClicked = true;
      //}
      // else{
      //   draggedX = p.mouseX - p.pmouseX;
      //   draggedY = p.mouseY - p.pmouseY;
      //   console.log(draggedX + ", " + draggedY);
      // }
      return false;
    }
    return true;
  }

  p.mouseReleased = () => {
    isClicked = false;
    draggedX = 0;
    draggedY = 0;
  }

  // p.mouseDragged = () => {
  //   if(isClicked){
  //     draggedX = p.mouseX - p.pmouseX;
  //     draggedY = p.mouseY - p.pmouseY;
  //     console.log(draggedX + ", " + draggedY);
  //     return false;
  //   }
  //   return true;
  // }

  let pts = [];
  p.draw = () => {
    p.colorMode(p.RGB);
    p.background(100,0,150);
    mouseIn = isMouseInside(p);
    
    draggedX = 0;
    draggedY = 0;

    
    if(isClicked){
      [draggedX, draggedY] = mouseDelta(p);
    }

    xOffset += draggedX / scale;
    yOffset += draggedY / scale;

    //pts.push((clickedX - halfheight)/scale - xOffset, (clickedY - halfwidth )/scale - yOffset);
    
    
    p.push();
    p.translate(halfwidth, halfwidth);

    
    p.scale(scale);
    //p.translate(-halfwidth/scale, -halfheight/scale);
    p.translate(xOffset , yOffset );
    
    p.stroke(100,100,100);
    p.strokeWeight(4);
    for (let i = 0; i<pts.length-2; i+=2){
      p.point(pts[i],pts[i+1]);
    }

    rainbowGrid(p, {
       color: mouseIn? p.color(100,200,255) : p.color(100,100,100),
       linewidth: 1, //isClicked? 2 : 1, 
       cell:{x:10, y:10}, 
       dims:{x:100,y:100}
      });
    p.pop();

    p.rect(p.width -20 , p.height - 20, 15, 15);
    wasClicked = isClicked;
  };
};