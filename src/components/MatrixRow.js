import React, { Component } from 'react';
import MatrixValue from './MatrixValue';

class MatrixRow extends Component {
  handleCellClicked = (value, y) => {
    this.props.handleCellClicked(value, this.props.x, y);
  }

  render() {
    const cells = this.props.cells.map((item, index) =>
      <MatrixValue
        key={index}
        x={this.props.x}
        y={index}
        handleCellClicked={this.handleCellClicked} />
    );

    return (
      <div className="row" >{cells}</div>
    );
  }
}

export default MatrixRow;
