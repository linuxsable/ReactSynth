import React, { Component } from 'react';

class MatrixValue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'on': false
    };
  }

  handleClick = (e) => {
    const newValue = !this.state.on;
    this.setState({ 'on':  newValue });
    this.props.handleCellClicked(newValue, this.props.y);
  }

  getClassName() {
    return this.state.on ? 'matrix-value selected' : 'matrix-value';
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={this.handleClick} />
    );
  }
}

export default MatrixValue;
