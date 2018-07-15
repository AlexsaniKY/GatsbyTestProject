export default function SquareDemoSketch (p) {
  let rotation = 5;
  let sphere_rot = 0;
  let square_rot = 0;

  p.setup = () => {
    p.createCanvas(800, 400, p.WEBGL)
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

    p.background(100);
    p.noStroke();

    p.scale(rotation);
    p.push();
    p.stroke(200);
    p.strokeWeight(2);
    p.fill(100,0,200);
    p.translate(-150, 100);
    p.rotateX(square_rot);
    p.rotateY(rotation);
    p.box(100);
    p.pop();

    p.noFill();
    p.stroke(255);
    p.push();
    p.translate(500, p.height*0.35, -200);
    p.rotateY(sphere_rot);
    p.sphere(300);
    p.pop();
  };
};