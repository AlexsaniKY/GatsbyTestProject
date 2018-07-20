import React from "react";
import P5Wrapper from '../components/p5wrapper';
import SquareDemoSketch from '../sketches/squaredemosketch';
import ZoomGridSketch from "../sketches/zoomgridsketch";

export default class Sketch extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			scale: 150,
			sketch: SquareDemoSketch,
			mouseIn:false
		};
	}

	scaleChange(e){
		this.setState({scale:e.target.value});
	}

	mouseEnter(e){
		console.log("in");
		this.setState({mouseIn: true});
	}

	mouseLeave(e){
		console.log("out");
		this.setState({mouseIn:false});
	}

	pressEvent(e){
		this.state.sketch === SquareDemoSketch ? this.setState({sketch:ZoomGridSketch}) : this.setState({sketch:SquareDemoSketch});
	}

	render () {
		return (
			<div >
				<P5Wrapper sketch={this.state.sketch} scale={this.state.scale} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}/>
				<input type="range" value={this.state.scale}  min="0"  max="360"  style={{ width:"1000px" }} onInput={this.scaleChange.bind(this)}  />
				<button onClick={this.pressEvent.bind(this)}>Change Sketch</button>
			</div>
		);
	}
}