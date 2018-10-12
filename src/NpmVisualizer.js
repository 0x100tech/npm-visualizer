
const server = require('./modules/server');
const reporter = require('./modules/reporter');

/**
 * Main npm visualizer class
 */
class NpmVisualizer {
  constructor(options) {
    this.options = {
      mode: 'server',
      host: 'localhost',
      port: '3303',
      start: true,
      file: 'report.json',
      ...options,
    };
    this.server = null;
    this.data = [];
  }

  /**
   * Launches parser and gets all the necessary data
   */
  getData() {
    // TODO: should call stats parser from here
    this.data = [
      {
        id: '1',
        name: 'Test1',
        varsion: '0.1.1',
        size: '123MB',
        dependencies: ['2', '3'],
      },
      {
        id: '2',
        name: 'Test2',
        varsion: '0.2.2',
        size: '123MB',
        dependencies: ['3'],
      },
      {
        id: '3',
        name: 'Test3',
        varsion: '0.3.3',
        size: '123MB',
        dependencies: [],
      },
    ];
  }

  /**
   * Starts visualizer server
   */
  async startServer() {
    if (this.server) {
      (await this.server).updateData();
    } else {
      Object.assign(this, server.start(this.options));
    }
  }

  /**
   * Generates static report in json format
   */
  generateReport() {
    this.getData();
    reporter.write(this.options, this.data);
  }
}

module.exports = NpmVisualizer;
