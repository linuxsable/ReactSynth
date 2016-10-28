import React, { Component } from 'react';

class SequenceValue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.engine.CMajScale[0]
    }
  }

  handleChange = (e) => {
    const value = parseInt(e.target.value);
    this.props.onChange(value, this.props.index);
    this.setState({ value: value });
  }

  render() {
    const options = Object.keys(this.props.engine.CMajScale).map((note, index) =>
      <option key={note} value={parseInt(this.props.engine.CMajScale[note])}>{note}</option>
    );

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}

export default SequenceValue;
