import React, { Component } from 'react';
import { Stage, Layer, Shape, Image} from 'react-konva';
import useImage from 'use-image';
// https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/images?from-embed

class URLImage extends React.Component {
  state = {
    image: null
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
    this.image.src = this.props.src;
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
      <Image
        x={195}
        y={120}
        width={130}
        height={45}
        draggable
        onDragStart={() => {
          this.setState({
            isDragging: true
          });
        }}
        onDragEnd={e => {
          this.setState({
            isDragging: false,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}


class Shirt extends React.Component {
  state = {
    image: null
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
    this.image.src = this.props.src;
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
      <Image
        x={30}
        y={-60}
        width={560}
        height={700}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}


// https://github.com/konvajs/react-konva/issues/256
class Canvas extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }

    
  }

 

  render() {
    return (

      <div className = 'canvas-border'>
      <Stage width={570} height={580} fill = 'red'>
        <Layer>
        

            



<Shirt src= {this.props.shirtFillColor} />
<URLImage src={this.props.currentLogo} />

        </Layer>
      </Stage>
      </div>
    );
  }
}

export default Canvas