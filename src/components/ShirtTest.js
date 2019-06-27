import React, { Component } from 'react';
import { Stage, Layer, Image} from 'react-konva';

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
// https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/images?from-embed

class ShirtTest extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        image: null,
      }
   
    };
    componentDidMount() {
        this.loadImage();
      }
      componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
          this.loadImage();
        }
      }
      componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
      }
      loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.currentShirtColor.url;
        this.image.addEventListener('load', this.handleLoad);
      }
      handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
          image: this.image
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
      };

    render() {
      return (
        <Stage width={this.props.canvasWidth} height={this.props.canvasHeight}>
        <Layer>

   
        <Image
 src = {this.props.currentShirtColor.url}
 x={0}
 y={0}
 width = {this.props.shirtWidth}
 height = {this.props.shirtHeight}
 image={this.state.image}
 ref={node => {
   this.imageNode = node;

 }}

 
/>
  
   
        </Layer>
        </Stage>
  

        
  
  
      )
  
    }
  }

  

  export default ShirtTest