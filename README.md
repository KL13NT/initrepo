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

## Features

- Choose between creating a directory for the repo or initializing in `cwd`
- Lists gpg keys interactively for you to choose
- Specify commit author email
- Automatically add a remote

## Supported Operating Systems

I tested this on the latest Windows 10 build. It _should_ work on other versions
of windows AND linux distros with NodeJS > 12 installed.

## Contributing

I welcome all contributions! Feel free to open an issue or submit a PR! 😀

## License

This project is licensed under MIT. Refer to [LICENSE](LICENSE) for more
details.
