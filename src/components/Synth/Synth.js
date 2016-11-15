import React, { Component } from 'react';
import Keys from '../../lib/Keys';
import Sequencer from '../Sequencer/Sequencer';
import OscField from '../OscField/OscField';
import VolumeField from '../VolumeField/VolumeField';
import Envelope from '../Envelope';
import EG from '../../lib/EnvelopeGenerator';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 75,
      seqKey: 'Dm',
      oscType: 'Sawtooth',
      seqMatrix: this.createSeqMatrix(),
      seqNotes: Object.values(Keys.key('Dm')),
      seqCurrentStep: 0,
      envelope: {
        attack: 0.2,
        decay: 0.5,
        sustain: 0,
        release: 0
      }
    };

    this.oscTypes = [
      'Sawtooth',
      'Sine',
      'Square',
      'Triangle'
    ];

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.seqTimerId = null;
  }

  componentWillMount() {
    this.start();
  }

  // Create the matrix
  createSeqMatrix() {
    let output = [];

    Array(7).fill().map((_, y) => {
      output[y] = [];

      Array(16).fill().map((_, x) => {
        output[y][x] = false;
      });
    });

    return output;
  }

  handleOscTypeChange = (value) => {
    this.setState({ oscType: value });
  }

  handleVolumeChange = (value) => {
    this.setState({ volume: value });
  }

  handleSequencerChange = (value = false, x, y) => {
    const newValues = this.state.seqMatrix;
    newValues[x][y] = value;
    this.setState({ seqMatrix: newValues });
  }

  handleEnvelopeChange = (value) => {
    this.setState({ envelope: value });
  }

  playNote(frequency = Keys.notes().C) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const env = new EG(this.audioContext, {
      attackTime: this.state.envelope.attack,
      decayTime: this.state.envelope.decay,
      sustainLevel: this.state.envelope.sustain,
      releaseTime: this.state.envelope.release
    });

    gainNode.connect(this.audioContext.destination);
    gainNode.gain.value = 0;

    osc.connect(gainNode);
    osc.frequency.value = frequency;
    osc.type = this.state.oscType.toLowerCase();

    env.connect(gainNode.gain);

    osc.start(this.audioContext.currentTime);
    env.start(this.audioContext.currentTime);

    env.release(this.audioContext.currentTime + 1);

    // Stop the oscillator once the envelope has completed.
    let stopAt = env.getReleaseCompleteTime();
    osc.stop(stopAt);
    env.stop(stopAt);
  }

  startSequence() {
    if (this.seqTimerId) return;

    this.seqTimerId = setInterval(() => {
      const notesToPlay = this.state.seqMatrix.map((row, rowIndex) => {
        if (row[this.state.seqCurrentStep]) {
          // We've found a selected note
          this.playNote(
            this.state.seqNotes[rowIndex]
          );
        }
      });

      if ((this.state.seqCurrentStep + 2) > this.state.seqMatrix[0].length) {
        this.setState({ seqCurrentStep: 0 });
      } else {
        this.setState({ seqCurrentStep: this.state.seqCurrentStep + 1 });
      }
    }, 250);
  }

  stopSequence() {
    clearInterval(this.seqTimerId);
    this.seqTimerId = null;
  }

  start = () => {
    this.startSequence();
  }

  stop = () => {
    this.stopSequence();
  }

  reset = () => {

  }

  render() {
    return (
      <div className="synth">
        <div className="logo">
          <div className="icon"></div>
          <div className="text">REACTSYNTH</div>
        </div>
        <OscField
          onChange={this.handleOscTypeChange}
          oscTypes={this.oscTypes}
          value={this.state.oscType} />
        {/* <VolumeField
          onChange={this.handleVolumeChange}
          defaultValue={this.state.volume} /> */}
        <Sequencer
          onChange={this.handleSequencerChange}
          seqCurrentStep={this.state.seqCurrentStep}
          seqKey={this.state.seqKey}
          seqNotes={this.state.seqNotes}
          seqMatrix={this.state.seqMatrix} />
        <Envelope
          value={this.state.envelope}
          onChange={this.handleEnvelopeChange} />
      </div>
    );
  }
}

export default Synth;
