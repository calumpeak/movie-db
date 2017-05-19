# Movie DB
A simple UI connecting to the movie db to search for movies.
Implements an infinite scroll strategy to keep pulling movies (if available) when the user scrolls to the bottom of the dom.

Built on top of React with a fetch polyfill and using the lodash library.

Further Work:
 - More Tests! (Ran out of time)
 - CSS Cleanup/better positioning
 - Fixup of edge cases such as dead image handling, reliable error handling and cleanup of fetching logic
 - 'Enter' event listener for submit button


## Building

Obligatory For All
```
$ npm install
```
### Prod
```
$ npm run build
```
Then open view/index.html in browser

### Dev
Requires two console tabs. In first tab:
```
$ npm run start
```
In second tab:
```
$ npm run Dev
```
Navigate to `localhost:8080`. Webpack will rebuild changes live via hot reload
