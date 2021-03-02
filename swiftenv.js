import core from '@actions/core';
import exec from '@actions/exec';

export async function install(options = {}) {
    let commandLine = 'swiftenv install -s';

    if (core.isDebug) {
        commandLine += ' --verbose';
    }

    if (options['swiftVersion']) {
        commandLine += ` ${options['swiftVersion']}`
    }

    await exec.exec(commandLine)
}
