import React from "react";
import P5Wrapper from '../components/p5wrapper';
import SquareDemoSketch from '../sketches/squaredemosketch';

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