import React from "react";
import p5 from 'p5';

export default class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = new p5( this.props.sketch , this.wrapper);

    if( this.canvas.propsHandler ) {
      this.canvas.propsHandler(this.props);
    }
  }

  componentWillReceiveProps(newprops) {
    //check for sketch swapping
    if(this.props.sketch !== newprops.sketch){
      this.wrapper.removeChild(this.wrapper.childNodes[0]);
      //should this call this.canvas.remove() first ??
      this.canvas = new p5(newprops.sketch, this.wrapper);
    }
    //pass through props
    if( this.canvas.propsHandler ) {
      this.canvas.propsHandler(newprops);
    }
  }

  render() {
    return <div ref={wrapper => this.wrapper = wrapper}></div>;
  }
}