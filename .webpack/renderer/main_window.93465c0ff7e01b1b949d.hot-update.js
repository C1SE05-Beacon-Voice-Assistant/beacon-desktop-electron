"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateelectron_react_typescript"]("main_window",{

/***/ "./src/layouts/sidebar/sidebar-layout.tsx":
/*!************************************************!*\
  !*** ./src/layouts/sidebar/sidebar-layout.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SideBarLayout)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/styled.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/useTheme.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_Drawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Drawer */ \"./node_modules/@mui/material/Drawer/Drawer.js\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"./node_modules/@mui/material/CssBaseline/CssBaseline.js\");\n/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/List */ \"./node_modules/@mui/material/List/List.js\");\n/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Divider */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/IconButton */ \"./node_modules/@mui/material/IconButton/IconButton.js\");\n/* harmony import */ var _mui_icons_material_ChevronLeft__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/icons-material/ChevronLeft */ \"./node_modules/@mui/icons-material/ChevronLeft.js\");\n/* harmony import */ var _mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/icons-material/ChevronRight */ \"./node_modules/@mui/icons-material/ChevronRight.js\");\n/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/ListItem */ \"./node_modules/@mui/material/ListItem/ListItem.js\");\n/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/ListItemButton */ \"./node_modules/@mui/material/ListItemButton/ListItemButton.js\");\n/* harmony import */ var _mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/ListItemIcon */ \"./node_modules/@mui/material/ListItemIcon/ListItemIcon.js\");\n/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/ListItemText */ \"./node_modules/@mui/material/ListItemText/ListItemText.js\");\n/* harmony import */ var _mui_icons_material_MoveToInbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/icons-material/MoveToInbox */ \"./node_modules/@mui/icons-material/MoveToInbox.js\");\n/* harmony import */ var _mui_icons_material_Mail__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/icons-material/Mail */ \"./node_modules/@mui/icons-material/Mail.js\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar drawerWidth = 240;\nvar DrawerHeader = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('div')(function (_ref) {\n  var theme = _ref.theme;\n  return _objectSpread(_objectSpread({\n    display: 'flex',\n    alignItems: 'center',\n    padding: theme.spacing(0, 1)\n  }, theme.mixins.toolbar), {}, {\n    justifyContent: 'flex-end'\n  });\n});\nfunction SideBarLayout(props) {\n  var open = props.open,\n      setOpen = props.setOpen;\n  var theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    sx: {\n      display: 'flex'\n    },\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material_Drawer__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      sx: {\n        width: drawerWidth,\n        flexShrink: 0,\n        '& .MuiDrawer-paper': {\n          width: drawerWidth,\n          boxSizing: 'border-box'\n        }\n      },\n      variant: \"persistent\",\n      anchor: \"left\",\n      open: open,\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(DrawerHeader, {\n        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n          onClick: function onClick() {\n            return setOpen(false);\n          },\n          children: theme.direction === 'ltr' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_icons_material_ChevronLeft__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {})\n        })\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_List__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n        children: ['HomeIcon', 'Starred', 'Send email', 'Drafts'].map(function (text, index) {\n          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n            disablePadding: true,\n            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n                primary: text\n              })]\n            })\n          }, text);\n        })\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_List__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n        children: ['All mail', 'Trash', 'Spam'].map(function (text, index) {\n          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n            disablePadding: true,\n            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n                children: index % 2 === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_icons_material_MoveToInbox__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_icons_material_Mail__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {})\n              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n                primary: text\n              })]\n            })\n          }, text);\n        })\n      })]\n    })]\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGF5b3V0cy9zaWRlYmFyL3NpZGViYXItbGF5b3V0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxJQUFNaUIsV0FBVyxHQUFHLEdBQXBCO0FBSUEsSUFBTUMsWUFBWSxHQUFHakIsZ0VBQU0sQ0FBQyxLQUFELENBQU4sQ0FBYztBQUFBLE1BQUdrQixLQUFILFFBQUdBLEtBQUg7QUFBQTtBQUNqQ0MsSUFBQUEsT0FBTyxFQUFFLE1BRHdCO0FBRWpDQyxJQUFBQSxVQUFVLEVBQUUsUUFGcUI7QUFHakNDLElBQUFBLE9BQU8sRUFBRUgsS0FBSyxDQUFDSSxPQUFOLENBQWMsQ0FBZCxFQUFpQixDQUFqQjtBQUh3QixLQUs5QkosS0FBSyxDQUFDSyxNQUFOLENBQWFDLE9BTGlCO0FBTWpDQyxJQUFBQSxjQUFjLEVBQUU7QUFOaUI7QUFBQSxDQUFkLENBQXJCO0FBWWUsU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsRUFBa0Q7QUFDaEUsTUFBUUMsSUFBUixHQUEwQkQsS0FBMUIsQ0FBUUMsSUFBUjtBQUFBLE1BQWNDLE9BQWQsR0FBMEJGLEtBQTFCLENBQWNFLE9BQWQ7QUFDQyxNQUFNWCxLQUFLLEdBQUdqQixnRUFBUSxFQUF0QjtBQUNBLHNCQUNFLHdEQUFDLHlEQUFEO0FBQUssTUFBRSxFQUFFO0FBQUVrQixNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFUO0FBQUEsNEJBQ0UsdURBQUMsaUVBQUQsS0FERixlQUVFLHdEQUFDLDREQUFEO0FBQ0UsUUFBRSxFQUFFO0FBQ0ZXLFFBQUFBLEtBQUssRUFBRWQsV0FETDtBQUVGZSxRQUFBQSxVQUFVLEVBQUUsQ0FGVjtBQUdGLDhCQUFzQjtBQUNwQkQsVUFBQUEsS0FBSyxFQUFFZCxXQURhO0FBRXBCZ0IsVUFBQUEsU0FBUyxFQUFFO0FBRlM7QUFIcEIsT0FETjtBQVNFLGFBQU8sRUFBQyxZQVRWO0FBVUUsWUFBTSxFQUFDLE1BVlQ7QUFXRSxVQUFJLEVBQUVKLElBWFI7QUFBQSw4QkFhRSx1REFBQyxZQUFEO0FBQUEsK0JBQ0UsdURBQUMsZ0VBQUQ7QUFBWSxpQkFBTyxFQUFFO0FBQUEsbUJBQU1DLE9BQU8sQ0FBQyxLQUFELENBQWI7QUFBQSxXQUFyQjtBQUFBLG9CQUNHWCxLQUFLLENBQUNlLFNBQU4sS0FBb0IsS0FBcEIsZ0JBQ0MsdURBQUMsdUVBQUQsS0FERCxnQkFHQyx1REFBQyx5RUFBRDtBQUpKO0FBREYsUUFiRixlQXNCRSx1REFBQyw4REFBRCxLQXRCRixlQXVCRSx1REFBQywyREFBRDtBQUFBLGtCQUNHLENBQUMsVUFBRCxFQUFhLFNBQWIsRUFBd0IsWUFBeEIsRUFBc0MsUUFBdEMsRUFBZ0RDLEdBQWhELENBQ0MsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQO0FBQUEsOEJBQ0UsdURBQUMsK0RBQUQ7QUFBcUIsMEJBQWMsTUFBbkM7QUFBQSxtQ0FDRSx3REFBQyxxRUFBRDtBQUFBLHNDQUNFLHVEQUFDLG1FQUFELEtBREYsZUFFRSx1REFBQyxtRUFBRDtBQUFjLHVCQUFPLEVBQUVEO0FBQXZCLGdCQUZGO0FBQUE7QUFERixhQUFlQSxJQUFmLENBREY7QUFBQSxTQUREO0FBREgsUUF2QkYsZUFtQ0UsdURBQUMsOERBQUQsS0FuQ0YsZUFvQ0UsdURBQUMsMkRBQUQ7QUFBQSxrQkFDRyxDQUFDLFVBQUQsRUFBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCRCxHQUE5QixDQUFrQyxVQUFDQyxJQUFELEVBQU9DLEtBQVA7QUFBQSw4QkFDakMsdURBQUMsK0RBQUQ7QUFBcUIsMEJBQWMsTUFBbkM7QUFBQSxtQ0FDRSx3REFBQyxxRUFBRDtBQUFBLHNDQUNFLHVEQUFDLG1FQUFEO0FBQUEsMEJBQ0dBLEtBQUssR0FBRyxDQUFSLEtBQWMsQ0FBZCxnQkFBa0IsdURBQUMsd0VBQUQsS0FBbEIsZ0JBQWtDLHVEQUFDLGlFQUFEO0FBRHJDLGdCQURGLGVBSUUsdURBQUMsbUVBQUQ7QUFBYyx1QkFBTyxFQUFFRDtBQUF2QixnQkFKRjtBQUFBO0FBREYsYUFBZUEsSUFBZixDQURpQztBQUFBLFNBQWxDO0FBREgsUUFwQ0Y7QUFBQSxNQUZGO0FBQUEsSUFERjtBQXNERCIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQvLi9zcmMvbGF5b3V0cy9zaWRlYmFyL3NpZGViYXItbGF5b3V0LnRzeD85ODMwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgc3R5bGVkLCB1c2VUaGVtZSB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJztcclxuaW1wb3J0IEJveCBmcm9tICdAbXVpL21hdGVyaWFsL0JveCc7XHJcbmltcG9ydCBEcmF3ZXIgZnJvbSAnQG11aS9tYXRlcmlhbC9EcmF3ZXInO1xyXG5pbXBvcnQgQ3NzQmFzZWxpbmUgZnJvbSAnQG11aS9tYXRlcmlhbC9Dc3NCYXNlbGluZSc7XHJcbmltcG9ydCBNdWlBcHBCYXIsIHsgQXBwQmFyUHJvcHMgYXMgTXVpQXBwQmFyUHJvcHMgfSBmcm9tICdAbXVpL21hdGVyaWFsL0FwcEJhcic7XHJcbmltcG9ydCBUb29sYmFyIGZyb20gJ0BtdWkvbWF0ZXJpYWwvVG9vbGJhcic7XHJcbmltcG9ydCBMaXN0IGZyb20gJ0BtdWkvbWF0ZXJpYWwvTGlzdCc7XHJcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ0BtdWkvbWF0ZXJpYWwvVHlwb2dyYXBoeSc7XHJcbmltcG9ydCBEaXZpZGVyIGZyb20gJ0BtdWkvbWF0ZXJpYWwvRGl2aWRlcic7XHJcbmltcG9ydCBJY29uQnV0dG9uIGZyb20gJ0BtdWkvbWF0ZXJpYWwvSWNvbkJ1dHRvbic7XHJcbmltcG9ydCBNZW51SWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL01lbnUnO1xyXG5pbXBvcnQgQ2hldnJvbkxlZnRJY29uIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvQ2hldnJvbkxlZnQnO1xyXG5pbXBvcnQgQ2hldnJvblJpZ2h0SWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL0NoZXZyb25SaWdodCc7XHJcbmltcG9ydCBMaXN0SXRlbSBmcm9tICdAbXVpL21hdGVyaWFsL0xpc3RJdGVtJztcclxuaW1wb3J0IExpc3RJdGVtQnV0dG9uIGZyb20gJ0BtdWkvbWF0ZXJpYWwvTGlzdEl0ZW1CdXR0b24nO1xyXG5pbXBvcnQgTGlzdEl0ZW1JY29uIGZyb20gJ0BtdWkvbWF0ZXJpYWwvTGlzdEl0ZW1JY29uJztcclxuaW1wb3J0IExpc3RJdGVtVGV4dCBmcm9tICdAbXVpL21hdGVyaWFsL0xpc3RJdGVtVGV4dCc7XHJcbmltcG9ydCBJbmJveEljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9Nb3ZlVG9JbmJveCc7XHJcbmltcG9ydCBNYWlsSWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL01haWwnO1xyXG5pbXBvcnQgSG9tZUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL2hvbWUtaWNvbic7XHJcbmNvbnN0IGRyYXdlcldpZHRoID0gMjQwO1xyXG5cclxuXHJcblxyXG5jb25zdCBEcmF3ZXJIZWFkZXIgPSBzdHlsZWQoJ2RpdicpKCh7IHRoZW1lIH0pID0+ICh7XHJcbiAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gIHBhZGRpbmc6IHRoZW1lLnNwYWNpbmcoMCwgMSksXHJcbiAgLy8gbmVjZXNzYXJ5IGZvciBjb250ZW50IHRvIGJlIGJlbG93IGFwcCBiYXJcclxuICAuLi50aGVtZS5taXhpbnMudG9vbGJhcixcclxuICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcclxufSkpO1xyXG50eXBlIFNpZGVCYXJMYXlvdXRQcm9wcyA9IHtcclxuICBvcGVuOiBib29sZWFuXHJcbiAgc2V0T3BlbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2lkZUJhckxheW91dChwcm9wczogU2lkZUJhckxheW91dFByb3BzKSB7XHJcblx0Y29uc3QgeyBvcGVuLCBzZXRPcGVuIH0gPSBwcm9wc1xyXG4gIGNvbnN0IHRoZW1lID0gdXNlVGhlbWUoKVxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IHN4PXt7IGRpc3BsYXk6ICdmbGV4JyB9fT5cclxuICAgICAgPENzc0Jhc2VsaW5lIC8+XHJcbiAgICAgIDxEcmF3ZXJcclxuICAgICAgICBzeD17e1xyXG4gICAgICAgICAgd2lkdGg6IGRyYXdlcldpZHRoLFxyXG4gICAgICAgICAgZmxleFNocmluazogMCxcclxuICAgICAgICAgICcmIC5NdWlEcmF3ZXItcGFwZXInOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBkcmF3ZXJXaWR0aCxcclxuICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH19XHJcbiAgICAgICAgdmFyaWFudD1cInBlcnNpc3RlbnRcIlxyXG4gICAgICAgIGFuY2hvcj1cImxlZnRcIlxyXG4gICAgICAgIG9wZW49e29wZW59XHJcbiAgICAgID5cclxuICAgICAgICA8RHJhd2VySGVhZGVyPlxyXG4gICAgICAgICAgPEljb25CdXR0b24gb25DbGljaz17KCkgPT4gc2V0T3BlbihmYWxzZSl9PlxyXG4gICAgICAgICAgICB7dGhlbWUuZGlyZWN0aW9uID09PSAnbHRyJyA/IChcclxuICAgICAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uIC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gLz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cclxuICAgICAgICA8L0RyYXdlckhlYWRlcj5cclxuICAgICAgICA8RGl2aWRlciAvPlxyXG4gICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAge1snSG9tZUljb24nLCAnU3RhcnJlZCcsICdTZW5kIGVtYWlsJywgJ0RyYWZ0cyddLm1hcChcclxuICAgICAgICAgICAgKHRleHQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgPExpc3RJdGVtIGtleT17dGV4dH0gZGlzYWJsZVBhZGRpbmc+XHJcbiAgICAgICAgICAgICAgICA8TGlzdEl0ZW1CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbUljb24+PC9MaXN0SXRlbUljb24+XHJcbiAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHQgcHJpbWFyeT17dGV4dH0gLz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1CdXR0b24+XHJcbiAgICAgICAgICAgICAgPC9MaXN0SXRlbT5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0xpc3Q+XHJcbiAgICAgICAgPERpdmlkZXIgLz5cclxuICAgICAgICA8TGlzdD5cclxuICAgICAgICAgIHtbJ0FsbCBtYWlsJywgJ1RyYXNoJywgJ1NwYW0nXS5tYXAoKHRleHQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgIDxMaXN0SXRlbSBrZXk9e3RleHR9IGRpc2FibGVQYWRkaW5nPlxyXG4gICAgICAgICAgICAgIDxMaXN0SXRlbUJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxMaXN0SXRlbUljb24+XHJcbiAgICAgICAgICAgICAgICAgIHtpbmRleCAlIDIgPT09IDAgPyA8SW5ib3hJY29uIC8+IDogPE1haWxJY29uIC8+fVxyXG4gICAgICAgICAgICAgICAgPC9MaXN0SXRlbUljb24+XHJcbiAgICAgICAgICAgICAgICA8TGlzdEl0ZW1UZXh0IHByaW1hcnk9e3RleHR9IC8+XHJcbiAgICAgICAgICAgICAgPC9MaXN0SXRlbUJ1dHRvbj5cclxuICAgICAgICAgICAgPC9MaXN0SXRlbT5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvTGlzdD5cclxuICAgICAgPC9EcmF3ZXI+XHJcbiAgICA8L0JveD5cclxuICApXHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlYWN0Iiwic3R5bGVkIiwidXNlVGhlbWUiLCJCb3giLCJEcmF3ZXIiLCJDc3NCYXNlbGluZSIsIkxpc3QiLCJEaXZpZGVyIiwiSWNvbkJ1dHRvbiIsIkNoZXZyb25MZWZ0SWNvbiIsIkNoZXZyb25SaWdodEljb24iLCJMaXN0SXRlbSIsIkxpc3RJdGVtQnV0dG9uIiwiTGlzdEl0ZW1JY29uIiwiTGlzdEl0ZW1UZXh0IiwiSW5ib3hJY29uIiwiTWFpbEljb24iLCJkcmF3ZXJXaWR0aCIsIkRyYXdlckhlYWRlciIsInRoZW1lIiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJwYWRkaW5nIiwic3BhY2luZyIsIm1peGlucyIsInRvb2xiYXIiLCJqdXN0aWZ5Q29udGVudCIsIlNpZGVCYXJMYXlvdXQiLCJwcm9wcyIsIm9wZW4iLCJzZXRPcGVuIiwid2lkdGgiLCJmbGV4U2hyaW5rIiwiYm94U2l6aW5nIiwiZGlyZWN0aW9uIiwibWFwIiwidGV4dCIsImluZGV4Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/layouts/sidebar/sidebar-layout.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8feb22b31b6e676a6aa2")
/******/ })();
/******/ 
/******/ }
);