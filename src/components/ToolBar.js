import React, { Component } from 'react';

class ToolBar extends Component {
  render () {
    return (
      <div className = 'toolbarContent'>
      <h1>Toolbar</h1>
      <div className = 'test-icon'>
      <i className="large material-icons">insert_chart</i>
      </div>
      </div>
    )
  }
}

export default ToolBar