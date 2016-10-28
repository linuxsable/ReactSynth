import React, { Component } from 'react';

class VolumeField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [0, 25, 50, 75, 100].reverse()
    };
  }

  handleChange = (e) => {
    const value = parseInt(e.target.value);
    this.props.onChange(value);
    this.setState({ value: value });
  }

  render() {
    return (
      <fieldset>
        <legend>Volume</legend>
        <select value={this.state.value} onChange={this.handleChange}>
          {this.state.options.map((num) =>
            <option key={num} value={num}>{num}%</option>
          )}
        </select>
      </fieldset>
    );
  }
}

export default VolumeField;
