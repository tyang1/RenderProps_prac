import React, { Component } from "react";

//NOw everytime when we need the mouse position for a different use case
//we would have create another MouseWithCat component, not reusable
class Cat extends Component{
    render(){
        const mouse = this.props.mouse;
        return(
            <img scr='./cat.jpg' style={{position = 'absolute', left: mouse.x, right: mouse.y }} />
        )
    }
}


class MouseWithCat extends Component {
  constructors(props) {
    super(props);
    this.handleMouse = this.handleMouse.bind(this);
    this.state = {
      x: 0,
      y: 0
    };
  }
  handleMouse(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }
  render() {
    return (
      <div style={{ height: "100%" }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>
            {/* but how do we render something other than a <p> */}
          The current mouse position is ({this.state.x}, {this.state.y})
        </p>
        <Cat mouse={this.state}/>
      </div>
    );
  }
}

//Now we are looking into fixing render props with PureComponent
class Mouse extends React.PureComponent {
    // Same implementation as above...this.props.render={this.state}
  }
  
  class MouseTracker extends React.Component {
    render() {
        // function movement(){
        //     this.move = {};
        //     move.mouse = () => {

        //     }
        // }
        // let mouse = movement.mouse;
        function renderMouse(mouse) {
            return(
                <Cat mouse={mouse}/>
            )
        }
      return (
        <div>
          <h1>Move the mouse around!</h1>
  
          {/*
            This is bad! The value of the `render` prop will
            be different on each render.
          */}
          {/* <Mouse render={({mouse}) => (
            <Cat mouse={mouse} /> //wrong here, we want render to always refer to the same function */}
          {/* )}/> */}
          <Mouse render={this.renderMouse} /> //why using this???
        </div>
      );
    }
  }

  //HOC can be composed of render props and regular component
  function withMouse(Component){
    return class extends React.Component{
        render(){
        return(
        <Mouse render={mouse => (
          <Component mouse={mouse} />
        )}
          />
        )
    }
  }

export default MouseHover;
