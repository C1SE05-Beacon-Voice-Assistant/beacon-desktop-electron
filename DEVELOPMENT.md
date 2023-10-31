# Development

## How to import custom modules in `preload.js`

- Create custom module in `electron` folder
- Add `export` to the module

```js
// electron/myModule.js
// Recommend using function (not class)
const myModule = () => {
  console.log("myModule");
};
module.exports = myModule;
```

- Import the module in `preload.js`

```js
// electron/preload.js
const myModule = require("./myModule");

// Use contextBridge to expose custom module to the renderer process
contextBridge.exposeInMainWorld("electron", {
    ...
    myModule,
    ...
});
```

- Define input in `vite.preload.config.ts`

```ts
// vite.preload.config.ts
export default defineConfig({
  build: {
    ...
    rollupOptions: {
      input: {
        preload: "electron/preload.js", // Don't remove this line, it's required for preload to work
        myModule: "electron/myModule.js",
      },
    },
    ...
  },
  ...
});
```
