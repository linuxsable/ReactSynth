class Keys {
  static notes() {
    return {
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
      'Bb': 466.164,
      'B': 493.883
    };
  }

  static key(key) {
    const notes = Keys.notes();
    key = key.toUpperCase();

    switch (key) {
      case 'C':
        return {
          'C': notes['C'],
          'D': notes['D'],
          'E': notes['E'],
          'F': notes['F'],
          'G': notes['G'],
          'A': notes['A'],
          'B': notes['B']
        };
      break;

      case 'DM':
        return {
          'D': notes['D'],
          'E': notes['E'],
          'F': notes['F'],
          'G': notes['G'],
          'A': notes['A'],
          'Bb': notes['Bb'],
          'C': notes['C']
        };

      default:
        throw Error("Key doesn't exist");
    }
  }

  static getNoteNameByFreq(freq) {
    let foundIndex = null;

    Object.values(Keys.notes())
      .forEach((item, index) => {
        if (item == freq) {
          foundIndex = index;
        }
      });

    return Object.keys(Keys.notes())[foundIndex];
  }
}

export default Keys;
