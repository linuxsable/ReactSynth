import React, { Component } from 'react';

class OscField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.engine.oscTypes
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value);
    this.setState({ value: value });
  }

  render() {
    const options = Object.keys(this.state.options).map((type, index) =>
      <option key={type} value={this.state.options[index]}>{type}</option>
    );

    return (
      <fieldset>
        <legend>Oscillator Type</legend>
        <select value={this.state.value} onChange={this.handleChange}>
          {options}
        </select>
      </fieldset>
    );
  }
}

export default OscField;
