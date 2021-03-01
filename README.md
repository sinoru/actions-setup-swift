# actions-setup-swift

[![Test](https://github.com/sinoru/actions-setup-swift/actions/workflows/test.yml/badge.svg)](https://github.com/sinoru/actions-setup-swift/actions/workflows/test.yml)

This action sets up a swift environment for use in actions by:

- optionally downloading a version of swift from swift.org.

# Usage

See [action.yml](action.yml)

Basic:
```yaml
steps:
- uses: actions/checkout@v2
- uses: sinoru/actions-setup-swift@v1
  with:
    swift-version: '5.3.0' # Exact version of a Swift version to use
- run: swift build -v
- run: swift test -v
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
