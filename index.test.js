const process = require('process');
const cp = require('child_process');
const path = require('path');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  return new Promise((resolve, reject) => {
    process.env['INPUT_SWIFT-VERSION'] = '5.3.3';
    const ip = path.join(__dirname, 'index.mjs');
    cp.exec(`node ${ip}`, {env: process.env}, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error);
        return;
      }
      console.log(stdout.toString());
      console.error(stderr.toString());
      resolve();
    });
  })
})