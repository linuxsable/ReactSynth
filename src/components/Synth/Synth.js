import React, { Component } from 'react';
import './Synth.css';

import Keys from '../../lib/Keys';

import Sequencer from '../Sequencer/Sequencer';
import OscField from '../OscField/OscField';
import VolumeField from '../VolumeField/VolumeField';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 75,
      seqValues: Object.values(Keys.key('Dm')),
      seqKey: 'Dm',
      oscType: 'Sine'
    };

    this.oscTypes = [
      'Sine',
      'Sawtooth',
      'Square',
      'Triangle'
    ];

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.seqTimerId = null;
    this.seqCurrentStep = 0;
    this.seqTotalSteps = 8;
  }

  handleOscTypeChange = (value) => {
    this.setState({ oscType: value });
  }

  handleVolumeChange = (value) => {
    this.setState({ volume: value });
  }

  handleSequencerChange = (value, index) => {
    let values = this.state.seqValues;
    values[index] = value;
    this.setState({ seqValues: values });
  }

  playNote(frequency = Keys.notes().C, gain = 0.5) {
    let osc = this.audioContext.createOscillator();
    let gainNode = this.audioContext.createGain();

    gainNode.connect(this.audioContext.destination);
    gainNode.gain.value = gain;

    osc.connect(gainNode);
    osc.frequency.value = frequency;
    osc.type = this.state.oscType.toLowerCase();

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.4);
  }

  startSequence() {
    if (this.seqTimerId) return;

    this.seqTimerId = setInterval(() => {
      if (this.state.seqValues[this.seqCurrentStep + 1] == undefined) {
        this.seqCurrentStep = 0;
      } else {
        this.seqCurrentStep++;
      }

      this.playNote(this.state.seqValues[this.seqCurrentStep], this.state.volume * 0.001);
    }, 200);
  }

  stopSequence() {
    clearInterval(this.seqTimerId);
    this.seqTimerId = null;
  }

  start = () => {
    this.startSequence();
  }

  stop = () => {
    this.stopSequence()
  }

  render() {
    return (
      <div className="synth">
        <h1>React Synth</h1>
        <OscField
          onChange={this.handleOscTypeChange}
          oscTypes={this.oscTypes}
          value={this.state.oscType} />
        <VolumeField
          onChange={this.handleVolumeChange}
          defaultValue={this.state.volume} />
        <Sequencer
          onChange={this.handleSequencerChange}
          seqValues={this.state.seqValues}
          seqTotalSteps={this.seqTotalSteps}
          seqKey={this.state.seqKey} />
        <fieldset>
          <legend>Controls</legend>
          <button name="start" onClick={this.start}>Start</button>
          <button name="stop" onClick={this.stop}>Stop</button>
        </fieldset>
        {/* <fieldset>
          <legend>Debug</legend>
          <pre>{JSON.stringify(this.state)}</pre>
        </fieldset> */}
      </div>
    );
  }
}

export default Synth;
