#!/usr/bin/env node

const commander = require('commander');
const server = require('../modules/server');
const reporter = require('../modules/reporter');
const console = require('../common/console');

const program = commander
  .version(require('../../package.json').version)
  .usage('[options]')
  .option(
    '-m, --mode <mode>',
    'Analyzer mode. Should be `server` or `static`.'
    + '\nIn `server` mode analyzer will start HTTP server to show bundle report.'
    + '\nIn `static` mode single JSON file with bundle report will be generated.',
    'server',
  )
  .option(
    '-h, --host <host>',
    'Host that will be used in `server` mode to start HTTP server.',
    '127.0.0.1',
  )
  .option(
    '-p, --port <n>',
    'Port that will be used in `server` mode to start HTTP server.',
    Number,
    3303,
  )
  .option(
    '-r, --report <file>',
    'Path to bundle report file that will be generated in `static` mode.',
    'report.json',
  )
  .option(
    '-O, --no-open',
    'Don\'t open report in default browser automatically.',
  )
  .option(
    '-l, --log-level <level>',
    'Log level.'
    + `\nPossible values: ${['info', 'debug', 'error'].join(', ')}`,
    'error',
  )
  .parse(process.argv);

const {
  mode,
  host,
  port,
  file,
  // logLevel,
  open,
} = program;

if (mode === 'server') {
  server.start({
    open,
    host,
    port,
  });
} else if (mode === 'static') {
  reporter.write({ file }, []);
} else {
  console.error('Invalid mode. Should be either `server` or `static`.');
}
