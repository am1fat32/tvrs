import boxen from 'boxen';

export class Logger {
  static logSuccess(message) {
    // eslint-disable-next-line no-console
    console.log(boxen(message, { borderColor: 'green' }));
  }

  static logError(message) {
    // eslint-disable-next-line no-console
    console.error(boxen(message, { borderColor: 'red' }));
  }
}
