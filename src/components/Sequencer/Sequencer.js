import React, { Component } from 'react';
import SequencerMatrix from '../SequencerMatrix'

class Sequencer extends Component {
  handleCellClicked = (value, x, y) => {
    this.props.onChange(value, x, y);
  }

  render() {
    return (
      <SequencerMatrix
        seqNotes={this.props.seqNotes}
        seqMatrix={this.props.seqMatrix}
        seqCurrentStep={this.props.seqCurrentStep}
        handleCellClicked={this.handleCellClicked} />
    );
  }
}

export default Sequencer;
