class SynthEngine {
  constructor() {
    this.context = new window.AudioContext();
    this.osc = null;
    this.gainNode = null;

    this.oscTypes = {
      sawtooth: 'sawtooth',
      square: 'square'
    };

    this.noteMap = {
      'C': 261.626,
      'C#': 277.183,
      'D': 293.665,
      'D#': 311.127,
      'E': 329.628,
      'F': 349.228,
      'F#': 369.994,
      'G': 391.995,
      'G#': 415.305,
      'A': 440,
      'A#': 466.164,
      'B': 493.883
    };

    this.CMajScale = {
      'C': this.noteMap['C'],
      'D': this.noteMap['D'],
      'E': this.noteMap['E'],
      'F': this.noteMap['F'],
      'G': this.noteMap['G'],
      'A': this.noteMap['A'],
      'B': this.noteMap['B']
    };

    this.seqTimerId = null;
    this.seqCurrentStep = 0;
    this.seqNumSteps = 8;
    this.seqBPM = 120;

    this.seqSteps = [
      this.noteMap['C'],
      this.noteMap['C'],
      this.noteMap['C'],
      this.noteMap['C'],
      this.noteMap['C'],
      this.noteMap['C'],
      this.noteMap['C'],
      this.noteMap['C']
    ];

    this.initOsc();
    this.initGain();
  }

  initOsc() {
    this.osc = this.context.createOscillator();
    this.setOscType('sawtooth');
  }

  initGain() {
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);
    this.osc.connect(this.gainNode);
  }

  setGain(gain) {
    this.gainNode.gain.value = gain * .001;
  }

  setFrequency(frequency) {
    this.osc.frequency.value = frequency;
  }

  setSeqSteps(seqSteps) {
    this.seqSteps = seqSteps;
  }

  setOscType(type) {
    this.osc.type = this.oscTypes[type];
  }

  nextSeqStep(state) {
    this.initOsc();
    this.initGain();
    this.setGain(state.volume);
    this.setOscType(state.oscType);

    this.osc.start(this.context.currentTime);
    this.osc.stop(this.context.currentTime + 0.4);

    this.setFrequency(this.seqSteps[this.seqCurrentStep]);

    if (this.seqSteps[this.seqCurrentStep + 1] == undefined) {
      this.seqCurrentStep = 0;
    } else {
      this.seqCurrentStep++;
    }
  }

  start(state) {
    this.seqTimerId = setInterval(() => this.nextSeqStep(state), 200);
  }

  stop() {
    this.osc.stop(0);
    clearInterval(this.seqTimerId);
  }
}

export default SynthEngine;
