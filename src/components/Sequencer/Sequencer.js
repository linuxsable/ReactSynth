import React, { Component } from 'react';
import SequencerMatrix from '../SequencerMatrix'

class Sequencer extends Component {
  handleCellClicked = (value, x, y) => {
    this.props.onChange(value, x, y);
  }

  render() {
    return (
      <fieldset className="sequencer">
        <legend>Sequencer</legend>
        <SequencerMatrix
          seqNotes={this.props.seqNotes}
          seqMatrix={this.props.seqMatrix}
          handleCellClicked={this.handleCellClicked} />
      </fieldset>
    );
  }
}

export default Sequencer;
