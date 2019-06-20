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
        x={300}
        y={170}
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



// https://github.com/konvajs/react-konva/issues/256
class Canvas extends Component {

  constructor(props) {
    super(props)
    this.state = {
      x: 450,
      y: 200,
      circle1X: 450,
      circle1Y: 200,
      logo1X: 430,
      logo1Y: 200,
      circle2X: 350,
      circle2Y: 200,
      logo2X: 330,
      logo2Y:  200
    }

    
  }

 

  render() {
    return (

      <div className = 'canvas-border'>
      <Stage width={800} height={700}>
        <Layer>
        

            <Shape 
            sceneFunc={(context,shape) => {
              context.beginPath();
              context.lineTo(350,60);
              context.lineTo(250,100);
              context.lineTo(100,250);
              context.lineTo(150,300);
              context.lineTo(250,200);
              context.lineTo(250,600);
              context.lineTo(600,600);
              context.lineTo(600,200);
              context.lineTo(700,300);
              context.lineTo(750,250);
              context.lineTo(600,100);
              context.lineTo(500,60);
              context.quadraticCurveTo(425,140,350,60);
              context.closePath();
                context.fillStrokeShape(shape)
            }}
            fill={this.props.shirtFillColor}
            stroke={this.props.shirtStrokeColor}  
            >
 
</Shape>


<URLImage src={this.props.currentLogo} />

        </Layer>
      </Stage>
      </div>
    );
  }
}

export default Canvas