import React, { Component } from 'react';
import { Stage, Layer, Image, Text} from 'react-konva';

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
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
class Canvas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }

    

  }
 
// Converts canvas to an image

 
  render() {

if (this.props.frontOrBack === 'front') {


    return (

      <div className = 'canvas-border row'>
      <div className = 'col s1'>
  
      <Stage width={570} height={670}>
        <Layer>
        

            
        


        <Shirt src= {this.props.currentShirtColor.url} className = 'col'/>
<URLImage src={this.props.currentLogoFront} className = 'col'/>

<Text x={340} y={130} fontFamily={this.props.currentFontFront} fontSize={30} fill={this.props.currentLogoTextColorFront} text={this.props.logoTextFront}  draggable />

<Text x={70} y={590} fontSize={20} text={'Shirt Color: ' + this.props.currentShirtColor.name}/>
<Text x={70} y={620} fontSize={20} text={'Logo Text Color Front: ' + this.props.currentLogoTextColorFront}/>
<Text x={70} y={650} fontSize={20} text={'Logo Font Front: ' + this.props.currentFontFront}/>
         
        
        </Layer>
      </Stage>
</div>
      </div>
    )
}
else if (this.props.frontOrBack === 'back') {


  return (

    <div className = 'canvas-border row'>
    <div className = 'col s1'>

    <Stage width={570} height={670}>
      <Layer>
      

          
      


      <Shirt src= {this.props.currentShirtColor.backURL} className = 'col'/>
<URLImage src={this.props.currentLogoBack} className = 'col'/>

<Text x={340} y={130} fontFamily={this.props.currentFontBack} fontSize={30} fill={this.props.currentLogoTextColorBack} text={this.props.logoTextBack}  draggable />

<Text x={70} y={590} fontSize={20} text={'Shirt Color: ' + this.props.currentShirtColor.name}/>
<Text x={70} y={620} fontSize={20} text={'Logo Text Color Back: ' + this.props.currentLogoTextColorBack}/>
<Text x={70} y={650} fontSize={20} text={'Logo Font Back: ' + this.props.currentFontBack }/>
       
      
      </Layer>
    </Stage>
</div>
    </div>
  )
};
  }
}

export default Canvas