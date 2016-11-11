import React, { Component } from 'react';

class OscField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      options: this.props.oscTypes
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value);
    this.setState({ value: value });
  }

  render() {
    const options = this.state.options.map((type, index) =>
      <option key={type} value={type}>{type}</option>
    );

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}

export default OscField;
