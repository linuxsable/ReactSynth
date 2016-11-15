import React, { Component } from 'react';

class Envelope extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attack: parseFloat(props.value.attack),
      decay: parseFloat(props.value.decay),
      sustain: parseFloat(props.value.sustain),
      release: parseFloat(props.value.release)
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: parseFloat(event.target.value) });
    this.props.onChange(this.state);
  }

  render() {
    return (
      <section className="envelope">
        <section className="attack">
          <label>A</label>
          <input
            id="attack"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={this.state.attack}
            onChange={this.handleChange} />
        </section>
        <section className="decay">
          <label>D</label>
          <input
            id="decay"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={this.state.decay}
            onChange={this.handleChange} />
        </section>
        <section className="sustain">
          <label>S</label>
          <input
            id="sustain"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={this.state.sustain}
            onChange={this.handleChange} />
        </section>
        <section className="release">
          <label>R</label>
          <input
            id="release"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={this.state.release}
            onChange={this.handleChange} />
        </section>
      </section>
    );
  }
}

export default Envelope;
