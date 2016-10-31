import React, { Component } from 'react';
import Keys from '../../lib/Keys';

class SequenceValue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.seqValues[props.index]
    };
  }

  handleChange = (e) => {
    const value = parseFloat(e.target.value);
    this.setState({ value: value });
    this.props.onChange(value, this.props.index);
  }

  render() {
    const notes = Object.values(Keys.key(this.props.seqKey));
    const options = notes.map((note, index) =>
      <option key={index} value={notes[index]}>{Keys.getNoteNameByFreq(note)}</option>
    );

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}

export default SequenceValue;
