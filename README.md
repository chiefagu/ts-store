<h1 align="center">
  TS DVD Rental Store
</h1>


This is a POC on how easy/hard it would be to refactor a js app ( The [DVD Rental Store][dvd-store-repo] ) to typescript

## System Requirements

- [git][git] v2 or greater
- [NodeJS][node] v12 or greater
- [yarn][yarn] v1 or greater (or [npm][npm] v6 or greater)

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
yarn --version # or npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup
After you've made sure to have the correct versions installed, you
should be able to just run a few commands to get set up:

```
npm install
```
## Start
Be sure to install the dependecies from the Setup step above, then proceed to start the server:

```
npm run start
```

## Running the tests

```shell
npm test
```

This will start [Jest](https://jestjs.io/) in watch mode. Read the output and
play around with it.


<!-- prettier-ignore-start -->

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[yarn]: https://yarnpkg.com/
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[dvd-store-repo]: https://github.com/chiefagu/dvd-store

<!-- prettier-ignore-end -->