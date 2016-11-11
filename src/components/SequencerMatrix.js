import React, { Component } from 'react';
import MatrixRow from './MatrixRow';
import Keys from '../lib/Keys';

class SequencerMatrix extends Component {
  handleCellClicked = (value, x, y) => {
    this.props.handleCellClicked(value, x, y);
  }

  render() {
    const notes = this.props.seqNotes.map((freq, index) => {
      return <div key={index} className="note">
        {Keys.getNoteNameByFreq(freq)}
      </div>
    });

    const grid = this.props.seqMatrix.map((cells, index) => {
      return <MatrixRow
        key={index}
        x={index}
        cells={cells}
        handleCellClicked={this.handleCellClicked} />
    });

    return (
      <div className="matrix">
        <div className="notes">
          {notes}
        </div>
        <div className="grid">
          {grid}
        </div>
      </div>
    );
  }
}

export default SequencerMatrix;
