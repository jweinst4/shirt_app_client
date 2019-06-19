import React, { Component } from 'react';
import { Stage, Layer, Shape, Circle, Text, Rect} from 'react-konva';

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
      <Stage width={700} height={600}>
        <Layer>

            <Shape 
            sceneFunc={(context,shape) => {
                context.beginPath();
                context.moveTo(300,50);
                context.quadraticCurveTo(400,200,500,50);
                context.lineTo(700,250);
                context.lineTo(650,300);
                context.lineTo(550,200);
                context.lineTo(550,500);
                context.lineTo(250,500);
                context.lineTo(250,200);
                context.lineTo(150,300);
                context.lineTo(100,250);
                context.lineTo(300,50);
                context.closePath();
                context.fillStrokeShape(shape)
            }}
            fill={this.props.shirtFillColor}
            stroke={this.props.shirtStrokeColor}  
            >

</Shape>
        
<Circle x={this.state.x} y={this.state.y} radius={30} fill={this.props.logo1FillColor} draggable/>
<Text x={this.state.logo1X} y={this.state.logo1Y} fontSize={16} draggable/>

<Circle x={this.state.circle2X} y={this.state.circle2Y} radius={30} fill={this.props.logo2FillColor} draggable/>
<Text x={this.state.logo2X} y={this.state.logo2Y}  fontSize={16} draggable/>
       

        </Layer>
      </Stage>
      </div>
    );
  }
}

export default Canvas