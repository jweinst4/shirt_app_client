import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Shape, Line, Circle, Text} from 'react-konva';


class Canvas extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
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
        
<Circle x={450} y={200} radius={30} fill={this.props.logo1FillColor} />
<Text x={430} y={200} text='logo1' fontSize={16} />

<Circle x={350} y={200} radius={30} fill={this.props.logo2FillColor}/>
<Text x={330} y={200} text='logo2   ' fontSize={16} />


        </Layer>
      </Stage>
    );
  }
}

export default Canvas