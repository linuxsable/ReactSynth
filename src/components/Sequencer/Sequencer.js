import React, { Component } from 'react';
import './Sequencer.css';
import SequenceValue from '../SequenceValue/SequenceValue'

class Sequencer extends Component {
  constructor(props) {
    super(props);
  }

  handleSequenceValueChange = (value, index) => {
    this.props.onChange(value, index);
  }

  render() {
    const numSteps = this.props.engine.seqNumSteps;
    const sequenceItems = Array(numSteps).fill(null).map((value, index) =>
      <SequenceValue
        key={index}
        index={index}
        engine={this.props.engine}
        onChange={this.handleSequenceValueChange} />
    );

    return (
      <fieldset className="sequencer">
        <legend>Sequencer</legend>
        {sequenceItems}
      </fieldset>
    );
  }
}

export default Sequencer;
