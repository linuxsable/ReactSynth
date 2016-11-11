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

    if (newValue) {
      e.currentTarget.style.backgroundColor = 'red';
    } else {
      e.currentTarget.style.backgroundColor = '#ccc';
    }
  }

  render() {
    return (
      <div className="matrix-value" onClick={this.handleClick} />
    );
  }
}

export default MatrixValue;
