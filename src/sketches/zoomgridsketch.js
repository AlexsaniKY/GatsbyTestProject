


function grid(p,{color= 255, linewidth= 1, cell= {x:10, y:10}, dims= {x:10,y:10}, pos= {x:0,y:0}}={}) {
  p.stroke(color);
  p.strokeWeight(linewidth);
  p.noFill();
  //horizontal
  const width = dims.x * cell.x;
  for(let j=0; j<dims.y+1; j++){
    p.line(
      pos.x, 
      pos.y + j*cell.y, 
      width, 
      pos.y + j*cell.y
    );
  }
  //vertical
  const height = dims.y * cell.y;
  for(let i =0; i<dims.x+1; i++){
    p.line(
      pos.x + i*cell.x, 
      pos.y, 
      pos.x + i*cell.x, 
      height
    );
  }
}

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

  p.setup = () => {
    p.createCanvas(800, 800)
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
        // clickedX = p.mouseX;
        // clickedY = p.mouseY;
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

  p.draw = () => {
    p.background(100,0,150);
    mouseIn = isMouseInside(p);
    
    draggedX = 0;
    draggedY = 0;
    if(isClicked){
      [draggedX, draggedY] = mouseDelta(p);
      //console.log([draggedX, draggedY]);
    }


    xOffset += draggedX / scale;
    yOffset += draggedY / scale;
    p.translate(p.width/2., p.height/2.);
    p.scale(scale);
    p.translate(xOffset, yOffset);
    
    

    grid(p, {
      color: mouseIn? p.color(100,200,255) : p.color(100,100,100),
       linewidth: isClicked? 2 : 1, 
       cell:{x:10, y:10}, 
       dims:{x:100,y:100}
      });


    wasClicked = isClicked;
  };
};