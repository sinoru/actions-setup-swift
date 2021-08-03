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

  const swiftenvRoot = process.env.HOME + '/.swiftenv'

  await exec.exec('git clone --depth 1 https://github.com/kylef/swiftenv.git ' + swiftenvRoot);

  core.exportVariable('SWIFTENV_ROOT', process.env.HOME + '/.swiftenv');
  core.addPath(swiftenvRoot + '/bin');
  core.addPath(swiftenvRoot + '/shims');

  core.endGroup();
}

async function installSwift(options = {}) {
  core.startGroup('Install swift');

  await swiftenv.install(options);
  await swiftenv.rehash(options);

  core.endGroup();
}

async function setupSwift() {
  const swiftVersion = core.getInput('swift-version', { required: false });

  if (swiftVersion) {
    core.exportVariable('SWIFT_VERSION', swiftVersion)
  }

  await installEssentials();
  await installSwiftenv();
  await installSwift({'swiftVersion': swiftVersion, 'debug': core.isDebug()});
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