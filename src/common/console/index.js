const chalk = require('chalk');

/**
 * Logger proxy for console, adds log level indicators
 */
module.exports = new Proxy(console, {
  get(target, prop) {
    return function targetFunction(...arg) {
      let args = arg;
      if (prop === 'error') {
        args = [chalk.bgRed('[ERROR]'), ...arg];
      }
      if (prop === 'info') {
        args = [chalk.bgGreen('[INFO]'), ...arg];
      }
      if (prop === 'debug') {
        args = [chalk.bgMagenta('[DEBUG]'), ...arg];
        const result = target.log(...args);
        return result;
      }
      const result = target[prop](...args);
      return result;
    };
  },
});
