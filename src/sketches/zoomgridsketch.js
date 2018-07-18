
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

export default function ZoomGridSketch (p) {
  let scale = 1;
  let mouseIn = false;

  p.setup = () => {
    p.createCanvas(800, 800)
  };
  
  p.propsHandler = (props) => {
    if (props.scale){
      console.log(scale);
      scale = props.scale * Math.PI / 180;
      scale = scale ? scale : 0.0001;
    }
    mouseIn = props.mouseIn;
    if (props.width && props.height){
      p.resizeCanvas(props.width,props.height);
    }
    
  };

  p.draw = () => {
    p.background(100,0,150);

    p.scale(scale);

    grid(p, {color: mouseIn? p.color(100,200,255) : p.color(100,100,100), linewidth: 2, cell:{x:10, y:10}, dims:{x:100,y:100}});


    
  };
};