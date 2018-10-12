const fs = require('fs');

const console = require('../../common/console');

/**
 * Write report to file
 * @param {Object} options options, containing filename
 * @param {Array} data array of datat to write
 */
function write(options, data) {
  const {
    file = 'report.json',
  } = options;
  fs.writeFileSync(file, JSON.dumps(data), (err) => {
    if (err) {
      console.error('Report write failed');
    }
  });
}

module.exports = {
  write,
};
