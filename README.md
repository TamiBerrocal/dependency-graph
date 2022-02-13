# Dependency graph app

Draw a dependency graph diagram from a string input.

![Dependency graph app](public/dependency-graph-app.png)

![Dependency graph](public/dependency-graph.png)

Come and take a look: https://dependency-graph-deployed.herokuapp.com/

## How to run the app

Clone this repo and go to the project directory. Then run `npm install` (make sure you have Node.js already installed) and `npm start` to start the app in development mode or `npm run start:prod` to start the app in production mode.
Open http://localhost:3000 to view it in the browser.

## How to test the app

Go to the project directory and `npm test`.

## Notes

We are using [react-archer](https://www.npmjs.com/package/react-archer) to simplify the task of drawing the arrows that connect our nodes.
