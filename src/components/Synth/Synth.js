import React, { Component } from 'react';
import './Synth.css';
import SynthEngine from '../../lib/SynthEngine';
import Sequencer from '../Sequencer/Sequencer';
import OscField from '../OscField/OscField';
import VolumeField from '../VolumeField/VolumeField';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.engine = new SynthEngine();

    this.state = {
      volume: 100,
      seqValues: this.engine.seqSteps,
      oscType: null
    };
  }

  handleOscTypeChange = (value) => {
    this.setState({ oscType: value });
    this.engine.setOscType(value);
  }

  handleVolumeChange = (value) => {
    this.setState({ volume: value });
    this.engine.setGain(value);
  }

  handleSequencerChange = (value, index) => {
    let values = this.state.seqValues;
    values[index] = value;
    this.setState({ seqValues: values });
    this.engine.setSeqSteps(values);
  }

  start = () => {
    this.engine.start(this.state);
  }

  stop = () => {
    this.engine.stop();
  }

  render() {
    return (
      <div className="synth">
        <h1>React Synth</h1>
        <OscField
          onChange={this.handleOscTypeChange}
          engine={this.engine} />
        <VolumeField onChange={this.handleVolumeChange} />
        <Sequencer
          onChange={this.handleSequencerChange}
          engine={this.engine} />
        <fieldset>
          <legend>Controls</legend>
          <button name="start" onClick={this.start}>Start</button>
          <button name="stop" onClick={this.stop}>Stop</button>
        </fieldset>
      </div>
    );
  }
}

export default Synth;
