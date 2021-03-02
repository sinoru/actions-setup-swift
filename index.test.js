const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', async () => {
  process.env['INPUT_SWIFT-VERSION'] = '5.3.3';
  const ip = path.join(__dirname, 'index.mjs');

  const { stdout, stderr } = await exec(`node ${ip}`, {env: process.env});
  console.log(stdout);
  console.error(stderr);
}, 100000);
