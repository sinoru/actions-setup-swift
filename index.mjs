import core from '@actions/core';
import exec from '@actions/exec';

import * as swiftenv from './swiftenv.mjs';

async function installEssentials() {
  core.startGroup('Install Essentials');

  switch (process.platform) {
    case 'linux':
      await exec.exec('sudo apt-get install build-essential binutils gnupg2 libedit2 libpython2.7 libsqlite3-0 libxml2 libz3-dev tzdata zlib1g-dev');
      break;
  }

  core.endGroup();
}

async function installSwiftenv() {
  core.startGroup('Install swiftlint');

  await exec.exec('git clone --depth 1 https://github.com/kylef/swiftenv.git ~/.swiftenv');

  core.exportVariable('SWIFTENV_ROOT', '$HOME/.swiftenv');
  core.addPath('~/.swiftenv/bin');
  core.addPath('~/.swiftenv/shims');

  core.endGroup();
}

async function setupSwift() {
  const swiftVersion = core.getInput('swift-version', { required: false });

  await installEssentials();
  await installSwiftenv();
  await swiftenv.install({'swiftVersion': swiftVersion});
}

// most @actions toolkit packages have async methods
export async function run() {
  try {
    await setupSwift();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();