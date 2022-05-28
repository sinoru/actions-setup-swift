import fs from 'fs';
import os from 'os';
import path from 'path';
import core from '@actions/core';
import exec from '@actions/exec';

import * as swiftenv from './swiftenv.mjs';

async function installEssentials() {
  core.startGroup('Install Essentials');

  switch (process.platform) {
    case 'linux':
      const osRelease = new Map();
      const osReleaseString = await fs.promises.readFile('/etc/os-release', 'utf8');
      osReleaseString.split('\n').forEach(
        (value) => {
          const words = value.split('=');
          if (words.length != 2) {
            return;
          }

          osRelease.set(words[0].trim(), words[1].trim());
        }
      );

      switch (osRelease.get("ID")) {
        case 'ubuntu':
          await exec.exec('sudo apt-get update');

          switch (osRelease.get("VERSION_ID")) {
            case '"18.04"':
              await exec.exec('sudo apt-get install \
                binutils \
                git \
                libc6-dev \
                libcurl4 \
                libedit2 \
                libgcc-5-dev \
                libpython2.7 \
                libsqlite3-0 \
                libstdc++-5-dev \
                libxml2 \
                pkg-config \
                tzdata \
                zlib1g-dev');
              break;
            case '"20.04"':
              await exec.exec('sudo apt-get install \
                binutils \
                git \
                gnupg2 \
                libc6-dev \
                libcurl4 \
                libedit2 \
                libgcc-9-dev \
                libpython2.7 \
                libsqlite3-0 \
                libstdc++-9-dev \
                libxml2 \
                libz3-dev \
                pkg-config \
                tzdata \
                uuid-dev \
                zlib1g-dev');
              break;
          }
          break;
      }
  }

  core.endGroup();
}

async function installSwiftenv() {
  core.startGroup('Install swiftenv');

  const swiftenvRoot = process.env['SWIFTENV_ROOT'] || path.join(os.homedir(), '.swiftenv');

  await exec.exec('git clone --depth 1 --no-tags --progress https://github.com/kylef/swiftenv.git ' + swiftenvRoot);

  core.exportVariable('SWIFTENV_ROOT', swiftenvRoot);
  core.addPath(path.join(swiftenvRoot, 'bin'));
  core.addPath(path.join(swiftenvRoot, 'shims'));

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