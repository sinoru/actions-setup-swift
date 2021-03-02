import exec from '@actions/exec';

export async function install(options = {}) {
    let commandLine = 'swiftenv install -s';

    if (options['debug']) {
        commandLine += ' --verbose';
    }

    if (options['swiftVersion']) {
        commandLine += ` ${options['swiftVersion']}`
    }

    await exec.exec(commandLine)
}
