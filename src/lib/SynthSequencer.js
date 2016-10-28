class SynthSequencer {
  constructor() {
    this.numSteps = 8;
    this.bpm = 120;

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

    this.steps = [
      this.noteMap['C'],
      this.noteMap['D'],
      this.noteMap['E'],
      this.noteMap['F'],
      this.noteMap['G'],
      this.noteMap['A'],
      this.noteMap['B']
    ];
  }

  start() {
    
  }

  stop() {

  }
}

export default SynthSequencer;
