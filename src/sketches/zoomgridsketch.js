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
  return [p.mouseX - p.pmouseX, p.mouseY - p.pmouseY];
}



export default function ZoomGridSketch (p) {
  let scale = 1;
  let mouseIn = false;
  let isClicked = false;
  let wasClicked = false;
  let clickedX = 0.;
  let clickedY = 0.;
  let draggedX = 0.;
  let draggedY = 0.;
  let pts = [];
  let xOffset = 0.;
  let yOffset = 0.;
  let halfwidth = 0.;
  let halfheight = 0.;

  function screenToWorld(x,y){
    return [
      (x - halfwidth  )/scale - xOffset,
      (y - halfheight )/scale - yOffset
    ];
  }

  function worldToScreen(x,y){
    return [
      scale * (x + xOffset) + halfwidth ,
      scale * (y + yOffset) + halfheight
    ];
  }

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
      clickedX = p.mouseX;
      clickedY = p.mouseY;
      isClicked = true;
      //console.log(pts);
      return false;
    }
    return true;
  }

  p.mouseReleased = () => {
    isClicked = false;
    draggedX = 0;
    draggedY = 0;
  }


  p.draw = () => {
    mouseIn = isMouseInside(p);

    //input processing
    if(isClicked){
      [draggedX, draggedY] = mouseDelta(p);
      if(!wasClicked){
        //pts.push((clickedX - halfwidth)/scale - xOffset, (clickedY - halfheight )/scale - yOffset);
        pts.push(...screenToWorld(clickedX, clickedY));
      }
      xOffset += draggedX / scale;
      yOffset += draggedY / scale;
    }
    

    //screenspace predraw
    p.colorMode(p.RGB);
    p.background(100,0,150);

    //push into worldspace
    p.push();
    {
      //set origin to center of screen
      p.translate(halfwidth, halfwidth);
      //zoom
      p.scale(scale);
      //reposition
      p.translate(xOffset , yOffset );
      
      p.stroke(100,100,100);
      p.strokeWeight(1);
      for (let i = 0; i<pts.length-1; i+=2){
        p.point(Math.floor(pts[i]),Math.floor(pts[i+1]));
      }

      rainbowGrid(p, {
        color: mouseIn? p.color(100,200,255) : p.color(100,100,100),
        linewidth: 1,
        cell:{x:100, y:100}, 
        dims:{x:10,y:10}
        });

      

      
    }
    p.pop();
    //pop into screenspace post-draw
    function* gridLineGen(origin, interval, start, end){
        let val = Math.ceil((start-origin)/interval)*interval + origin;
        while(val < end){
          yield Math.round(val);
          val += interval;
        }
      }

    for(let i=0; i<3; i++){}
    for(let vert of gridLineGen(worldToScreen(0,0)[0], 100*scale, 0, p.width)){
      p.line(
        vert, 
        0, 
        vert, 
        p.height
      );
    }
    for(let hor of gridLineGen(worldToScreen(0,0)[1], 100*scale, 0, p.height)){
      p.line(
        0, 
        hor, 
        p.width, 
        hor
      );
    }

    for (let i = 0; i<pts.length-1; i+=2){
      p.point(...worldToScreen(pts[i],pts[i+1]));
    }

    p.rect(p.width -20 , p.height - 20, 15, 15);
    wasClicked = isClicked;
  };
};