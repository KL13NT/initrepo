[![npm](https://img.shields.io/npm/dt/@kl13nt/initrepo?style=plastic)](https://www.npmjs.com/package/@kl13nt/initrepo)
[![npm (scoped)](https://img.shields.io/npm/v/@kl13nt/initrepo)](https://www.npmjs.com/package/@kl13nt/initrepo)
[![GitHub](https://img.shields.io/github/license/kl13nt/initrepo)](https://github.com/KL13NT/initrepo/blob/master/LICENSE)

## Introduction

> Hello there~ https://youtu.be/eaEMSKzqGAg

A simple command line utility to help you initialize git repositories locally!

I have multiple gpg keys and git emails on my machine and it was tedious to clone,
configure git, and make sure everything works every time. This package makes my
life much easier. The NPM package is just a wrapped around my script, you can
copy it, modify it however you like, the limit's the sky!

![initrepo example](https://user-images.githubusercontent.com/20807178/180826131-72ed9760-a452-411e-ab8a-e3d101937ec6.PNG)

## Installation

```
npm i -g @kl13nt/initrepo
# or
yarn global add @kl13nt/initrepo
```

Why global? Because you want to run it anywhere.

## Requirements

- gpg
- git

## Features

- Choose between creating a directory for the repo or initializing in `cwd`
- Lists gpg keys interactively for you to choose
- Specify commit author email
- Automatically add a remote

## Debugging GPG Errors

#### GnuGPG is not available in the global environment

If you use gpg or have it enabled through the Git Bash it will only be available
in that environment. Make sure to explicitly install GnuGPG or use the package
through Git Bash.

#### Keys aren't listed

If you installed GnuGPG explicitly outside of Git Bash you'll be able
to use it from any terminal, but it won't have the keys configured with Git
Bash.

Make sure the package has permission to execute gpg and that it can access the keys
in the same terminal. To confirm the keys exist in the current terminal run `gpg --list-secret-keys --keyid-format=long`.

To fix this make sure to configure gpg with new keys or move them by exporting
them from Git Bash and importing them on the other executable. Google is your
best friend on this.

## Supported Operating Systems

I tested this on the latest Windows 10 build. It _should_ work on other versions
of windows AND linux distros with NodeJS > 12 installed.

## Contributing

I welcome all contributions! Feel free to open an issue or submit a PR! 😀

## License

This project is licensed under MIT. Refer to [LICENSE](LICENSE) for more
details.
