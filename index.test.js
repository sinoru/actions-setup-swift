const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', async () => {
  try {
    const ip = path.join(__dirname, 'index.mjs');
    const env = {
      ...process.env,
      'INPUT_SWIFT-VERSION': '5.3.3'
    };

    console.dir(env);

    const { stdout, stderr } = await exec('echo ${INPUT_SWIFT-VERSION}', {env: env});
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(error);
    throw error;
  }
}, 100000);
