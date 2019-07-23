import React, { Component } from 'react';
import { Stage, Layer, Image, Text} from 'react-konva';

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
// https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/images?from-embed

let boundaryXLeft = 150;
let boundaryXRight = 300;
let boundaryYTop = 125;
let boundaryYBottom = 350;

class URLImageFront1 extends React.Component {
  state = {
    image: null,
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
    this.image.setAttribute('crossOrigin','anonymous')
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
        x={this.props.allProps.dragEndFront1X}
        y={this.props.allProps.dragEndFront1Y} 
        width={this.props.allProps.logo1FrontWidth}
        height={this.props.allProps.logo1FrontHeight}
        draggable

      dragBoundFunc= {(pos) => {  
        // var newY = pos.y < boundaryYBottom ? boundaryYBottom : pos.y;

        if (pos.y < boundaryYTop) {
          var newY = boundaryYTop
        }
        else if (pos.y > boundaryYBottom) {
          var newY = boundaryYBottom
        }
        else {
          var newY = pos.y
        }

        if (pos.x < boundaryXLeft) {
          var newX = boundaryXLeft
        }
        else if (pos.x > boundaryXRight) {
          var newX = boundaryXRight
        }
        else {
          var newX = pos.x
        }

        return {
          x: newX,
          y: newY,
        };
      }
    }
  
    
        onDragStart={() => {
          this.setState({
            isDraggingLogo: true
          });
        }}
        onDragEnd={e => {
          this.setState({
            isDragging: false,
            x: e.target.x(),
            y: e.target.y()
          });
         this.props.allProps.dragEndFront1(e.target.x(),e.target.y())
        }}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
 
    );
  }
}


class URLImageFront2 extends React.Component {
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
    this.image.setAttribute('crossOrigin','anonymous')
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
      x={this.props.allProps.dragEndFront2X}
      y={this.props.allProps.dragEndFront2Y}
      width={this.props.allProps.logo2FrontWidth}
      height={this.props.allProps.logo2FrontHeight}
        draggable

        dragBoundFunc= {(pos) => {  
          // var newY = pos.y < boundaryYBottom ? boundaryYBottom : pos.y;
  
          if (pos.y < boundaryYTop) {
            var newY = boundaryYTop
          }
          else if (pos.y > boundaryYBottom) {
            var newY = boundaryYBottom
          }
          else {
            var newY = pos.y
          }
  
  
          if (pos.x < boundaryXLeft) {
            var newX = boundaryXLeft
          }
          else if (pos.x > boundaryXRight) {
            var newX = boundaryXRight
          }
          else {
            var newX = pos.x
          }
  
          return {
            x: newX,
            y: newY,
          };
        }
      }


        onDragStart={() => {
          this.setState({
            isDraggingLogo: true
          });
        }}
        onDragEnd={e => {
          this.setState({
            isDragging: false,
            x: e.target.x(),
            y: e.target.y()
          });
          this.props.allProps.dragEndFront2(e.target.x(),e.target.y())
        }}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class URLImageFront3 extends React.Component {
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
    this.image.setAttribute('crossOrigin','anonymous')
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
      x={this.props.allProps.dragEndFront3X}
      y={this.props.allProps.dragEndFront3Y}
      width={this.props.allProps.logo3FrontWidth}
      height={this.props.allProps.logo3FrontHeight}
        draggable

        dragBoundFunc= {(pos) => {  
          // var newY = pos.y < boundaryYBottom ? boundaryYBottom : pos.y;
  
          if (pos.y < boundaryYTop) {
            var newY = boundaryYTop
          }
          else if (pos.y > boundaryYBottom) {
            var newY = boundaryYBottom
          }
          else {
            var newY = pos.y
          }
  
  
          if (pos.x < boundaryXLeft) {
            var newX = boundaryXLeft
          }
          else if (pos.x > boundaryXRight) {
            var newX = boundaryXRight
          }
          else {
            var newX = pos.x
          }
  
          return {
            x: newX,
            y: newY,
          };
        }
      }


        onDragStart={() => {
          this.setState({
            isDraggingLogo: true
          });
        }}
        onDragEnd={e => {
          this.setState({
            isDragging: false,
            x: e.target.x(),
            y: e.target.y()
          });
          this.props.allProps.dragEndFront3(e.target.x(),e.target.y())
        }}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}


class URLImageBack1 extends React.Component {
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
    this.image.setAttribute('crossOrigin','anonymous')
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
      x={this.props.allProps.dragEndBack1X}
      y={this.props.allProps.dragEndBack1Y} 
      width={this.props.allProps.logo1BackWidth}
      height={this.props.allProps.logo1BackHeight}
        draggable

        dragBoundFunc= {(pos) => {  
          // var newY = pos.y < boundaryYBottom ? boundaryYBottom : pos.y;
  
          if (pos.y < boundaryYTop) {
            var newY = boundaryYTop
          }
          else if (pos.y > boundaryYBottom) {
            var newY = boundaryYBottom
          }
          else {
            var newY = pos.y
          }
  
  
          if (pos.x < boundaryXLeft) {
            var newX = boundaryXLeft
          }
          else if (pos.x > boundaryXRight) {
            var newX = boundaryXRight
          }
          else {
            var newX = pos.x
          }
  
          return {
            x: newX,
            y: newY,
          };
        }
      }


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
          this.props.allProps.dragEndBack1(e.target.x(),e.target.y())
        }}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}


class URLImageBack2 extends React.Component {
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
    this.image.setAttribute('crossOrigin','anonymous')
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
      x={this.props.allProps.dragEndBack2X}
      y={this.props.allProps.dragEndBack2Y} 
      width={this.props.allProps.logo2BackWidth}
      height={this.props.allProps.logo2BackHeight}
        draggable

        dragBoundFunc= {(pos) => {  
          // var newY = pos.y < boundaryYBottom ? boundaryYBottom : pos.y;
  
          if (pos.y < boundaryYTop) {
            var newY = boundaryYTop
          }
          else if (pos.y > boundaryYBottom) {
            var newY = boundaryYBottom
          }
          else {
            var newY = pos.y
          }
  
  
          if (pos.x < boundaryXLeft) {
            var newX = boundaryXLeft
          }
          else if (pos.x > boundaryXRight) {
            var newX = boundaryXRight
          }
          else {
            var newX = pos.x
          }
  
          return {
            x: newX,
            y: newY,
          };
        }
      }


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
          this.props.allProps.dragEndBack2(e.target.x(),e.target.y())
        }}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class URLImageBack3 extends React.Component {
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
    this.image.setAttribute('crossOrigin','anonymous')
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
      x={this.props.allProps.dragEndBack3X}
      y={this.props.allProps.dragEndBack3Y} 
      width={this.props.allProps.logo3BackWidth}
      height={this.props.allProps.logo3BackHeight}
        draggable

        dragBoundFunc= {(pos) => {  
          // var newY = pos.y < boundaryYBottom ? boundaryYBottom : pos.y;
  
          if (pos.y < boundaryYTop) {
            var newY = boundaryYTop
          }
          else if (pos.y > boundaryYBottom) {
            var newY = boundaryYBottom
          }
          else {
            var newY = pos.y
          }
  
  
          if (pos.x < boundaryXLeft) {
            var newX = boundaryXLeft
          }
          else if (pos.x > boundaryXRight) {
            var newX = boundaryXRight
          }
          else {
            var newX = pos.x
          }
  
          return {
            x: newX,
            y: newY,
          };
        }
      }


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
          this.props.allProps.dragEndBack3(e.target.x(),e.target.y())
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
    image: null,
    shirtWidth: '',
  }
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
    this.image.setAttribute('crossOrigin','anonymous')
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
      x={this.props.allProps.shirtStartingX}
      y={this.props.allProps.shirtStartingY}
      width={this.props.allProps.shirtWidth}
      height={this.props.allProps.shirtHeight}
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

    this.handleExportClick = this.handleExportClick.bind(this)

  };

  handleExportClick(){
    console.log(this.stageRef.getStage().toDataURL());
  }
  

 
  render() {
    return (

<div className = 'canvas-border row'>

    <Stage width={this.props.canvasWidth} height={this.props.canvasHeight} ref={node => { this.stageRef = node}}>
      <Layer>

{this.props.front ? (
 <>

      <Shirt crossOrigin = 'Anonymous' allProps = {this.props}  src= {this.props.currentShirtColor.url}/>

    {this.props.currentLogoFront1 !== '' ? (
        <>
          <URLImageFront1 crossOrigin = 'Anonymous' allProps = {this.props} src={this.props.currentLogoFront1} x = {this.props.dragEndFront1X} y = {this.props.dragEndFront1Y}/>
        </>
      ):(
        <>

        </>
      )
    }
  
  {this.props.currentLogoFront2 !== '' ? (
        <>
          <URLImageFront2 crossOrigin = 'Anonymous' allProps = {this.props} src={this.props.currentLogoFront2}   x = {this.props.dragEndFront2X} y = {this.props.dragEndFront2Y}/>
        </>
      ):(
        <>

        </>
      )
    }

{this.props.currentLogoFront3 !== '' ? (
        <>
          <URLImageFront3 crossOrigin = 'Anonymous' allProps = {this.props} src={this.props.currentLogoFront3}  x = {this.props.dragEndFront3X} y = {this.props.dragEndFront3Y}/>
        </>
      ):(
        <>

        </>
      )
    }

  <Text x={this.props.text1FrontStartingX} y={this.props.text1FrontStartingY} allProps = {this.props}  fontFamily={this.props.currentFontFront1} fontSize={this.props.logoTextFontSizeFront1} fill={this.props.currentLogoTextColorFront1} text={this.props.currentLogoTextFront1} stroke = {this.props.currentLogoTextStrokeFront1} draggable />


  <Text x={this.props.text2FrontStartingX} y={this.props.text2FrontStartingY} allProps = {this.props}  fontFamily={this.props.currentFontFront2} fontSize={this.props.logoTextFontSizeFront2} fill={this.props.currentLogoTextColorFront2} text={this.props.currentLogoTextFront2} stroke = {this.props.currentLogoTextStrokeFront2} draggable />

  <Text x={this.props.text3FrontStartingX} y={this.props.text3FrontStartingY} allProps = {this.props}  fontFamily={this.props.currentFontFront3} fontSize={this.props.logoTextFontSizeFront3} fill={this.props.currentLogoTextColorFront3} text={this.props.currentLogoTextFront3} stroke = {this.props.currentLogoTextStrokeFront3} draggable />

  
  <Text x={70} y={590} allProps = {this.props}  fontSize={20} text={'Shirt Color: ' + this.props.currentShirtColor.name}/>

  <Text x={70} y={620} allProps = {this.props}  fontSize={20} text={'Logo Text Color Front: ' + this.props.currentLogoTextColorFront}/>

  <Text x={70} y={650} allProps = {this.props}  fontSize={20} text={'Logo Font Front: ' + this.props.currentFontFront}/>
</>
) : (
  <>
  <Shirt crossOrigin = 'Anonymous' allProps = {this.props}  src= {this.props.currentShirtColor.backURL}/>

  {this.props.currentLogoBack1 !== '' ? (
        <>
          <URLImageBack1 crossOrigin = 'Anonymous' allProps = {this.props} src={this.props.currentLogoBack1}  x = {this.props.dragEndBack1X} y = {this.props.dragEndBack1Y}/>
        </>
      ):(
        <>

        </>
      )
    }
  
  {this.props.currentLogoBack2 !== '' ? (
        <>
          <URLImageBack2 crossOrigin = 'Anonymous' allProps = {this.props} src={this.props.currentLogoBack2}  x = {this.props.dragEndBack2X} y = {this.props.dragEndBack2Y}/>
        </>
      ):(
        <>

        </>
      )
    }

{this.props.currentLogoBack3 !== '' ? (
        <>
          <URLImageBack3 crossOrigin = 'Anonymous' allProps = {this.props} src={this.props.currentLogoBack3}  x = {this.props.dragEndBack3X} y = {this.props.dragEndBack3Y}/>
        </>
      ):(
        <>

        </>
      )
    }

  <Text x={this.props.text1BackStartingX} y={this.props.text1BackStartingY} allProps = {this.props}  fontFamily={this.props.currentFontBack1} fontSize={this.props.logoTextFontSizeBack1} fill={this.props.currentLogoTextColorBack1} text={this.props.currentLogoTextBack1} stroke = {this.props.currentLogoTextStrokeBack1} draggable />

  <Text x={this.props.text2BackStartingX} y={this.props.text2BackStartingY} allProps = {this.props}  fontFamily={this.props.currentFontBack2} fontSize={this.props.logoTextFontSizeBack2} fill={this.props.currentLogoTextColorBack2} text={this.props.currentLogoTextBack2} stroke = {this.props.currentLogoTextStrokeBack2} draggable />

  <Text x={this.props.text3BackStartingX} y={this.props.text3BackStartingY} allProps = {this.props}  fontFamily={this.props.currentFontBack3} fontSize={this.props.logoTextFontSizeBack3} fill={this.props.currentLogoTextColorBack3} text={this.props.currentLogoTextBack3} stroke = {this.props.currentLogoTextStrokeBack3} draggable />


  <Text allProps = {this.props}  x={70} y={590} fontSize={20} text={'Shirt Color: ' + this.props.currentShirtColor.name}/>

  <Text allProps = {this.props}  x={70} y={620} fontSize={20} text={'Logo Text Color Back: ' + this.props.currentLogoTextColorBack}/>

  <Text allProps = {this.props}  x={70} y={650} fontSize={20} text={'Logo Font Back: ' + this.props.currentFontBack}/>
</>
)}       
      </Layer>
    </Stage>
  
    <button style={{ position: 'absolute', top: '0'}} onClick={this.handleExportClick}>Export stage</button>

    
  </div>


    )

  }
}

export default Canvas