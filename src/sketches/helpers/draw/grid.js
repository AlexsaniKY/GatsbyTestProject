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

function scaledGrid(p,{decadesize = 10, bounds = {x:{min: 0, max : 100}, y:{min :0, max:100}}, scale = 1}){
  p.stroke(100);
  p.strokeWeight(1);
  p.noFill();
  p.strokeCap(p.PROJECT);
  p.noSmooth();
  let minsize =  0;
  let maxsize = 3;
  let cellsize;
  for(let curscale=minsize; curscale < maxsize; curscale++){
    cellsize = Math.pow(decadesize, curscale);
    cellsize = cellsize == 1 ? 2 : cellsize;
    //horizontal
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

export {grid, rainbowGrid};