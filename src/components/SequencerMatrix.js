import React, { Component } from 'react';
import MatrixValue from './MatrixValue';
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

    const rows = this.props.seqMatrix.map((item, x) => {
      const entry = item.map((element, y) => {
        return (
          <MatrixValue
            key={y}
            x={x}
            y={y}
            handleCellClicked={this.handleCellClicked}
            seqCurrentStep={this.props.seqCurrentStep} />
        );
      });

      return <div className="col" key={x}>{entry}</div>
    });

    return (
      <div className="matrix">
        <div className="notes">
          {notes}
        </div>
        <div className="grid">
          {rows}
        </div>
      </div>
    );
  }
}

export default SequencerMatrix;
