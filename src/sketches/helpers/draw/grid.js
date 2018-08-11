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

//helper function for screenspace drawing
//yields all values in increasing order conforming to val = origin + n*interval
//where (start <= val <= end)
function* gridLineGen(origin, interval, start, end){
  let val = Math.ceil((start-origin)/interval)*interval + origin;
  while(val < end){
    yield Math.round(val);
    val += interval;
  }
}

//offset is the difference between the two origin values
//scale is their ratio
function* labelGen(p, {origin_1, interval_1, start_1, end_1, origin_2, scale}){
  let world_gen = gridLineGen(
    origin_1, 
    interval_1, 
    start_1, 
    end_1);
  let w = world_gen.next();
  let screen_gen = gridLineGen(
    p.worldToScreen(w.value,0)[0], 
    interval_1 * scale, 
    //(start_1-origin_1)*scale + origin_2, 
    //(end_1 - origin_1)*scale + origin_2);
    0,1600);
  //NOTE: could be a do-while but this safeguards the first access
  
  let s = screen_gen.next();
  while(!w.done && !s.done){
    yield [w.value, s.value];
    w = world_gen.next();
    s = screen_gen.next();
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// a "view appropriate" grid in screenspace, requires current view scale to be passed, acquires position through 
// worldspace conversions.
//
// gridpixelmin : smallest allowable distance between gridlines for minimum scale grid
// griddecade   : scale difference between each grid level (10 -> 1,10,100,1000...)
// maxdecades   : max scales of grids, 2 would have only the minimum level + 1 scaled up a size of griddecade times
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ScaledGrid{
  constructor({gridpixelmin, griddecade, maxdecades}){
    this.gridpixelmin = gridpixelmin;
    this.griddecade = griddecade;
    this.maxdecades = maxdecades;
    this.last_scale = 1;
  }

  draw(p, scale){
    // exponent required for the minimum grid size satisfying the minimum pixel setting at the current scale 
    let gridexponent = Math.log(this.gridpixelmin/scale) / Math.log(this.griddecade);
    // bounds the exponent to an integer >= 0
    let gridminlevel = Math.max(Math.ceil(gridexponent), 0);
    //add one to keep the lowest level from having reversed sign and undoing the 1- trick
    //mod 1 to get a value between 0-1 for alpha
    //subtract from 1 to reverse alpha fade, mult 255 to put in alpha range
    let alpha = Math.pow(Math.abs(1 - ( (1 + gridexponent) % 1) ) , 3) * 255;

    //for each grid scale
    for(let i=gridminlevel; i<gridminlevel + this.maxdecades - 1; i++){
      //line settings
      p.strokeWeight((i-gridminlevel)*1 + 1);
      p.stroke(p.color(0,0,0, i == gridminlevel? alpha : 100));
      //spacing between each grid cell at this scale
      let spacing = Math.pow(this.griddecade, i);
      //draw each vertical line
      for(let vert of gridLineGen(p.worldToScreen(0,0)[0], spacing*scale, 0, p.width)){
        p.line(
          vert, 
          0, 
          vert, 
          p.height
        );
      }
      //draw each horizontal line
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

  drawLabels(p, scale){
    //TODO: joint calculation for both methods should NOT occur, combine logic

    // exponent required for the minimum grid size satisfying the minimum pixel setting at the current scale 
    let gridexponent = Math.log(this.gridpixelmin/scale) / Math.log(this.griddecade);
    // bounds the exponent to an integer >= 0
    let gridminlevel = Math.max(Math.ceil(gridexponent), 0);
    let spacing = Math.pow(gridminlevel, gridexponent);

    
    for(let [w,s] of labelGen(p, {origin_1:0, interval_1:100, start_1:p.screenToWorld(0,0)[0], end_1:p.screenToWorld(p.width,0)[0], origin_2:0, scale:scale })){
      console.log(w,s);
      //find what scale of unit to generate
      //use parallel gridlinegens to give both screen position and in world positions,
        //use worldspace value as text, use screenspace value to hint position.
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

export {grid, rainbowGrid, ScaledGrid};