function grid(p,{color= 255, linewidth= 1, cell= {x:10, y:10}, dims= {x:10,y:10}, pos= {x:0,y:0}}={}) {
  p.stroke(color);
  p.strokeWeight(linewidth);
  p.noFill();
  p.strokeCap(p.PROJECT);
  p.noSmooth();
  //horizontal
  const width = dims.x * cell.x;
  for(let j=0; j<dims.y+1; j++){
    p.line(
      pos.x, 
      pos.y + j*cell.y -.5, 
      width, 
      pos.y + j*cell.y -.5
    );
  }
  //vertical
  const height = dims.y * cell.y;
  for(let i =0; i<dims.x+1; i++){
    p.line(
      pos.x + i*cell.x, 
      pos.y + .5, 
      pos.x + i*cell.x, 
      height+.5
    );
  }
}

function* gridLineGen(origin, interval, start, end){
  let val = Math.ceil((start-origin)/interval)*interval + origin;
  while(val < end){
    yield Math.round(val);
    val += interval;
  }
}

function scaledGrid(p, {gridpixelmin = 3, griddecade = 10, maxdecades = 4, scale=1}={}){
  let gridexponent = Math.log(gridpixelmin/scale) / Math.log(griddecade);
  let gridminlevel = Math.max(Math.ceil(gridexponent), 0);
  //add one to keep the lowest level from having reversed sign and undoing the 1- trick
  //mod 1 to get a value between 0-1 for alpha
  //subtract from 1 to reverse alpha fade, mult 255 to put in alpha range
  let alpha = Math.pow(Math.abs(1 - ( (1 + gridexponent) % 1) ) , 3) * 255;
  for(let i=gridminlevel; i<gridminlevel + maxdecades - 1; i++){
    p.strokeWeight((i-gridminlevel)*1 + 1);
    p.stroke(p.color(0,0,0, i == gridminlevel? alpha : 100));
    let spacing = Math.pow(griddecade, i);
    //TODO: handle dependency on WorldToScreen
    for(let vert of gridLineGen(p.worldToScreen(0,0)[0], spacing*scale, 0, p.width)){
      p.line(
        vert, 
        0, 
        vert, 
        p.height
      );
    }
    //TODO: handle dependency on WorldToScreen
    for(let hor of gridLineGen(p.worldToScreen(0,0)[1], spacing*scale, 0, p.height)){
      p.line(
        0, 
        hor, 
        p.width, 
        hor
      );
    }
  }
}

function rainbowGrid(p,{ linewidth= 1, cell= {x:10, y:10}, dims= {x:10,y:10}, pos= {x:0,y:0}}={}) {
  p.colorMode(p.HSB, 100);
  p.strokeWeight(linewidth);
  p.noFill();
  p.strokeCap(p.PROJECT);
  p.noSmooth();
  const from = p.color(0,100,100);
  const to = p.color(99,100,100);
  //horizontal
  const width = dims.x * cell.x;
  for(let j=0; j<dims.y+1; j++){
    p.stroke(p.lerpColor(from, to, j/(dims.y+1)));
    //p.stroke(from);
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
    p.stroke(p.lerpColor(from, to, i/(dims.x+1)));
    //p.stroke(to);
    p.line(
      pos.x + i*cell.x, 
      pos.y, 
      pos.x + i*cell.x, 
      height
    );
  }
}

export {grid, rainbowGrid, scaledGrid};