import exec from '@actions/exec';

export async function install(options = {}) {
    let commandLine = 'swiftenv install -s';

    if (options['debug']) {
        commandLine += ' --verbose';
    }

    if (options['swiftVersion']) {
        commandLine += ` ${options['swiftVersion']}`
    }

    await exec.exec('bash', ['-c', commandLine]);
}

export async function rehash(options = {}) {
    let commandLine = 'swiftenv rehash';

    if (options['debug']) {
        commandLine += ' --verbose';
    }

    await exec.exec('bash', ['-c', commandLine]);
}
