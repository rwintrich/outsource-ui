// @dynamic
export class Mascaras {

  static createCepMask() {
    return {
      guide: false,
      showMask: true,
      placeholderChar: '\u2000',
      keepCharPositions: true,
      mask: [
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '-',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d')
      ]
    };
  }

  static createCpfCnpjMask() {
    return {
      mask: (value: any) => {
        if (value.length <= 14) {
          return [
            RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
            RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
            RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '-',
            RegExp('\\d'), RegExp('\\d'), RegExp('\\d')
          ];
        } else {
          return [
            RegExp('\\d'), RegExp('\\d'), '.',
            RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
            RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '/',
            RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '-',
            RegExp('\\d'), RegExp('\\d')
          ];
        }
      },
      guide: false
    };
  }


  static createCpfMask() {
    return {
      guide: false,
      showMask: true,
      placeholderChar: '\u2000',
      keepCharPositions: true,
      mask: [
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '-',
        RegExp('\\d'), RegExp('\\d')
      ]
    };
  }

  static createCnpjMask() {
    return {
      guide: false,
      showMask: true,
      placeholderChar: '\u2000',
      keepCharPositions: true,
      mask: [
        RegExp('\\d'), RegExp('\\d'), '.',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '/',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '-',
        RegExp('\\d'), RegExp('\\d')
      ]
    };
  }

  static createBoletoMask() {
    return {
      guide: false,
      showMask: true,
      placeholderChar: '\u2000',
      keepCharPositions: true,
      mask: [
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), ' ',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), ' ',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), '.',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), ' ',
        RegExp('\\d'), ' ',
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'),
        RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d'), RegExp('\\d')
      ]
    };
  }
}
