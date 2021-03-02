# actions-setup-swift

[![Unit Tests](https://github.com/sinoru/actions-setup-swift/actions/workflows/units.yml/badge.svg)](https://github.com/sinoru/actions-setup-swift/actions/workflows/test.yml)
[![Tests](https://github.com/sinoru/actions-setup-swift/actions/workflows/tests.yml/badge.svg)](https://github.com/sinoru/actions-setup-swift/actions/workflows/test.yml)

This action sets up a swift environment for use in actions by:

- optionally downloading a version of swift from swift.org using [swiftenv](https://github.com/kylef/swiftenv).

# Usage

See [action.yml](action.yml)

Basic:
```yaml
steps:
- uses: actions/checkout@v2
- uses: sinoru/actions-setup-swift@v2
  with:
    swift-version: '5.3.3' # Exact version of a Swift version to use
- run: swift build -v
- run: swift test -v
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
