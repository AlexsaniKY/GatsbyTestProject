export default function ZoomGridSketch (p) {
  let rotation = 5;
  let sphere_rot = 0;
  let square_rot = 0;

  p.setup = () => {
    p.createCanvas(800, 400)
  };
  
  p.propsHandler = (props) => {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
      rotation = rotation ? rotation : 0.0001;
    }
  };

  p.draw = () => {
    sphere_rot += .001;
    square_rot += .01;

    p.background(100,0,150);
    
  };
};