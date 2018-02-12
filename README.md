# WORD SEARCH SOLVER
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Using TDD based upon Pillars approach, every class will be built step by step allowing tests to drive majority of functional architecture. Test file are denoted with .test.js and will be siblings to the classes they test. This makes it much simpler to import and maintain when changes are made.

Built with node version 8.9.4 and npm 5.6.0 

### Getting Started
1. Install node, I'd recommend brew/nvm/some other package manager, but installers can be found [here](https://nodejs.org/en/download/)
2. Pull this project down with [git](https://git-scm.com/downloads)
3. Open a terminal or cmd prompt, navigate to the project directory, run `npm run initialOneLineRun` and follow onscreen prompt
4. A test file named r.txt is at the root level for your convenience (＾◡＾)

### Script List
1. `npm start` - Spins up a web server with live reloads or updates whenever code changes.
2. `npm test` - Runs a Jest test suit on any file under the source directory that has a .test in its file name. Actively watches files for changes and reruns test on any files changed. Can be run in parallel with `npm start`
3. `npm run build` - Compiles React app into a static server deployable version within the `/build` directory
4. `npm run eject` - Removed reliance on React-Scripts framework and copies all config to be more traditional. This can't be undone but if you want full control it's here.
5. `npm run buildCMD` - Run webpack with a custom CMD config, this will compile the ES6 based commandLineSearch.js into a npm package to later be consumed by main.js
6. `npm run wordSearchFromFile` - Run node command `searchFileForWords` from main.js (combine this with `buildCMD` to update project and run on command line)
7. `npm run initialOneLineRun` - Installs all needed packages, compiles project, then runs main.js all in one neat lil command.

### Future Goals
The powerful JS toolkit that comes with `create-react-app` aided in developing the core business logic required for a word search solver. Turning this into a Single Page App and deploying it for use to everyone is a logical next step. Leveraging tools suchs as Materializecss, Material-UI, and Zeit Now makes this process fairly straight forward. 

Thank you for giving me the opportunity to have some fun and learn some new tools and tricks. Hope you enjoy!