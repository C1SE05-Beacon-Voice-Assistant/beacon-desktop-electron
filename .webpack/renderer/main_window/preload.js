/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./electron/bridge.ts":
/*!****************************!*\
  !*** ./electron/bridge.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   api: () => (/* binding */ api)\n/* harmony export */ });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n\nvar api = {\n  /**\r\n   * Here you can expose functions to the renderer process\r\n   * so they can interact with the main (electron) side\r\n   * without security problems.\r\n   *\r\n   * The function below can accessed using `window.Main.sendMessage`\r\n   */\n  sendMessage: function sendMessage(message) {\n    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send('message', message);\n  },\n\n  /**\r\n   * Provide an easier way to listen to events\r\n   */\n  on: function on(channel, callback) {\n    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, function (_, data) {\n      return callback(data);\n    });\n  }\n};\nelectron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('Main', api);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9lbGVjdHJvbi9icmlkZ2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFFTyxJQUFNRSxHQUFHLEdBQUc7QUFDakI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFRUMsRUFBQUEsV0FBVyxFQUFFLHFCQUFDQyxPQUFELEVBQXFCO0FBQ2hDSCxJQUFBQSxpREFBVyxDQUFDSSxJQUFaLENBQWlCLFNBQWpCLEVBQTRCRCxPQUE1QjtBQUNELEdBWGdCOztBQWFqQjtBQUNGO0FBQ0E7QUFDRUUsRUFBQUEsRUFBRSxFQUFFLFlBQUNDLE9BQUQsRUFBa0JDLFFBQWxCLEVBQXlDO0FBQzNDUCxJQUFBQSxpREFBVyxDQUFDSyxFQUFaLENBQWVDLE9BQWYsRUFBd0IsVUFBQ0UsQ0FBRCxFQUFJQyxJQUFKO0FBQUEsYUFBYUYsUUFBUSxDQUFDRSxJQUFELENBQXJCO0FBQUEsS0FBeEI7QUFDRDtBQWxCZ0IsQ0FBWjtBQXFCUFYsbURBQWEsQ0FBQ1csaUJBQWQsQ0FBZ0MsTUFBaEMsRUFBd0NULEdBQXhDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC8uL2VsZWN0cm9uL2JyaWRnZS50cz9lMmQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnRleHRCcmlkZ2UsIGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nXHJcblxyXG5leHBvcnQgY29uc3QgYXBpID0ge1xyXG4gIC8qKlxyXG4gICAqIEhlcmUgeW91IGNhbiBleHBvc2UgZnVuY3Rpb25zIHRvIHRoZSByZW5kZXJlciBwcm9jZXNzXHJcbiAgICogc28gdGhleSBjYW4gaW50ZXJhY3Qgd2l0aCB0aGUgbWFpbiAoZWxlY3Ryb24pIHNpZGVcclxuICAgKiB3aXRob3V0IHNlY3VyaXR5IHByb2JsZW1zLlxyXG4gICAqXHJcbiAgICogVGhlIGZ1bmN0aW9uIGJlbG93IGNhbiBhY2Nlc3NlZCB1c2luZyBgd2luZG93Lk1haW4uc2VuZE1lc3NhZ2VgXHJcbiAgICovXHJcblxyXG4gIHNlbmRNZXNzYWdlOiAobWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICBpcGNSZW5kZXJlci5zZW5kKCdtZXNzYWdlJywgbWVzc2FnZSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBQcm92aWRlIGFuIGVhc2llciB3YXkgdG8gbGlzdGVuIHRvIGV2ZW50c1xyXG4gICAqL1xyXG4gIG9uOiAoY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pID0+IHtcclxuICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIChfLCBkYXRhKSA9PiBjYWxsYmFjayhkYXRhKSlcclxuICB9XHJcbn1cclxuXHJcbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ01haW4nLCBhcGkpXHJcbiJdLCJuYW1lcyI6WyJjb250ZXh0QnJpZGdlIiwiaXBjUmVuZGVyZXIiLCJhcGkiLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJzZW5kIiwib24iLCJjaGFubmVsIiwiY2FsbGJhY2siLCJfIiwiZGF0YSIsImV4cG9zZUluTWFpbldvcmxkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./electron/bridge.ts\n");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./electron/bridge.ts");
/******/ 	
/******/ })()
;