# Development

## How to import custom modules in `preload.js`

- Create custom module in `electron` folder
- Add `export` to the module

```js
// electron/yourModule.js
// Recommend using function (not class)
const yourModule = () => {
  console.log("yourModule");
};
module.exports = yourModule;
```

- Import the module in `preload.js`

```js
// electron/preload.js
const yourModule = require(path.join(__dirname, "yourModule.js"));
```
