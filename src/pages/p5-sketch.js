import React from "react";
import p5 from 'p5';
import P5Wrapper from '../components/p5wrapper';
import SquareDemoSketch from '../sketches/squaredemosketch';
// class P5Wrapper extends React.Component {

//   componentDidMount() {
//     this.canvas = new p5( this.props.sketch , this.wrapper);

//     if( this.canvas.propsHandler ) {
//       this.canvas.propsHandler(this.props);
//     }
//   }

//   componentWillReceiveProps(newprops) {
//     //check for sketch swapping
//     if(this.props.sketch !== newprops.sketch){
//       this.wrapper.removeChild(this.wrapper.childNodes[0]);
//       //should this call this.canvas.remove() first ??
//       this.canvas = new p5(newprops.sketch, this.wrapper);
//     }
//     //pass through props
//     if( this.canvas.propsHandler ) {
//       this.canvas.propsHandler(newprops);
//     }
//   }

//   render() {
//     return <div ref={wrapper => this.wrapper = wrapper}></div>;
//   }
// }


// function SquareDemoSketch (p) {
//   let rotation = 5;
//   let sphere_rot = 0;
//   let square_rot = 0;

//   p.setup = () => {
//     p.createCanvas(800, 400, p.WEBGL)
//   };
  
//   p.propsHandler = (props) => {
//     if (props.rotation){
//       rotation = props.rotation * Math.PI / 180;
//       rotation = rotation ? rotation : 0.0001;
//     }
//   };

//   p.draw = () => {
//     sphere_rot += .001;
//     square_rot += .01;

//     p.background(100);
//     p.noStroke();

//     p.scale(rotation);
//     p.push();
//     p.stroke(200);
//     p.strokeWeight(2);
//     p.fill(100,0,200);
//     p.translate(-150, 100);
//     p.rotateX(square_rot);
//     p.rotateY(rotation);
//     p.box(100);
//     p.pop();

//     p.noFill();
//     p.stroke(255);
//     p.push();
//     p.translate(500, p.height*0.35, -200);
//     p.rotateY(sphere_rot);
//     p.sphere(300);
//     p.pop();
//   };
// };

export default class Sketch extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			rotation: 150,
			sketch: SquareDemoSketch,
		};
	}

	rotationChange(e){
		this.setState({rotation:e.target.value});
	}

	pressEvent(){
		this.state.sketch === SquareDemoSketch ? this.setState({sketch:sketch2}) : this.setState({sketch:SquareDemoSketch});
	}

	render () {
		return (
			<div>
				<P5Wrapper sketch={this.state.sketch} rotation={this.state.rotation}/>
				<input type="range" value={this.state.rotation}  min="0"  max="360" step=".1" style={{ width:"1000px" }} onInput={this.rotationChange.bind(this)}/>
				<button onClick={this.pressEvent.bind(this)}>Change Sketch</button>
			</div>
		);
	}
}