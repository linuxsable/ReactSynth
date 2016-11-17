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
    this.props.handleCellClicked(newValue, this.props.x, this.props.y);
  }

  getClassName() {
    let classes = ['matrix-value'];

    if (this.state.on) {
      classes.push('selected');
    }

    if (this.props.seqCurrentStep == this.props.x && this.state.on) {
      classes.push('active');
    }

    return classes.join(' ');
  }

  render() {
    return (
      <div
        data-x={this.props.x}
        data-y={this.props.y}
        className={this.getClassName()}
        onClick={this.handleClick} />
    );
  }
}

export default MatrixValue;
