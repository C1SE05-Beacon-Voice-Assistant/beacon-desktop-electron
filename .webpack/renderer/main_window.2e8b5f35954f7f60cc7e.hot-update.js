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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SideBarLayout)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/styled.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/useTheme.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_Drawer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Drawer */ \"./node_modules/@mui/material/Drawer/Drawer.js\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"./node_modules/@mui/material/CssBaseline/CssBaseline.js\");\n/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/List */ \"./node_modules/@mui/material/List/List.js\");\n/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Divider */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/IconButton */ \"./node_modules/@mui/material/IconButton/IconButton.js\");\n/* harmony import */ var _mui_icons_material_ChevronLeft__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/icons-material/ChevronLeft */ \"./node_modules/@mui/icons-material/ChevronLeft.js\");\n/* harmony import */ var _mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/icons-material/ChevronRight */ \"./node_modules/@mui/icons-material/ChevronRight.js\");\n/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/ListItem */ \"./node_modules/@mui/material/ListItem/ListItem.js\");\n/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/ListItemButton */ \"./node_modules/@mui/material/ListItemButton/ListItemButton.js\");\n/* harmony import */ var _mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/ListItemIcon */ \"./node_modules/@mui/material/ListItemIcon/ListItemIcon.js\");\n/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material/ListItemText */ \"./node_modules/@mui/material/ListItemText/ListItemText.js\");\n/* harmony import */ var _mui_icons_material_MoveToInbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/icons-material/MoveToInbox */ \"./node_modules/@mui/icons-material/MoveToInbox.js\");\n/* harmony import */ var _mui_icons_material_Mail__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/icons-material/Mail */ \"./node_modules/@mui/icons-material/Mail.js\");\n/* harmony import */ var _components_icon_home_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/icon/home-icon */ \"./src/components/icon/home-icon.tsx\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar drawerWidth = 240;\nvar DrawerHeader = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('div')(function (_ref) {\n  var theme = _ref.theme;\n  return _objectSpread(_objectSpread({\n    display: 'flex',\n    alignItems: 'center',\n    padding: theme.spacing(0, 1)\n  }, theme.mixins.toolbar), {}, {\n    justifyContent: 'flex-end'\n  });\n});\nfunction SideBarLayout(props) {\n  var open = props.open,\n      setOpen = props.setOpen;\n  var theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_5__[\"default\"])();\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    sx: {\n      display: 'flex'\n    },\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_mui_material_Drawer__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      sx: {\n        width: drawerWidth,\n        flexShrink: 0,\n        '& .MuiDrawer-paper': {\n          width: drawerWidth,\n          boxSizing: 'border-box'\n        }\n      },\n      variant: \"persistent\",\n      anchor: \"left\",\n      open: open,\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(DrawerHeader, {\n        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n          onClick: function onClick() {\n            return setOpen(false);\n          },\n          children: theme.direction === 'ltr' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_icons_material_ChevronLeft__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {})\n        })\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_List__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_icon_home_icon__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}), 'Starred', 'Send email', 'Drafts'].map(function (icon, index) {\n          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n            disablePadding: true,\n            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n                children: icon\n              })\n            })\n          }, index);\n        })\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_List__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n        children: ['All mail', 'Trash', 'Spam'].map(function (text, index) {\n          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n            disablePadding: true,\n            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n                children: index % 2 === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_icons_material_MoveToInbox__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_icons_material_Mail__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {})\n              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n                primary: text\n              })]\n            })\n          }, text);\n        })\n      })]\n    })]\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGF5b3V0cy9zaWRlYmFyL3NpZGViYXItbGF5b3V0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFNa0IsV0FBVyxHQUFHLEdBQXBCO0FBSUEsSUFBTUMsWUFBWSxHQUFHbEIsZ0VBQU0sQ0FBQyxLQUFELENBQU4sQ0FBYztBQUFBLE1BQUdtQixLQUFILFFBQUdBLEtBQUg7QUFBQTtBQUNqQ0MsSUFBQUEsT0FBTyxFQUFFLE1BRHdCO0FBRWpDQyxJQUFBQSxVQUFVLEVBQUUsUUFGcUI7QUFHakNDLElBQUFBLE9BQU8sRUFBRUgsS0FBSyxDQUFDSSxPQUFOLENBQWMsQ0FBZCxFQUFpQixDQUFqQjtBQUh3QixLQUs5QkosS0FBSyxDQUFDSyxNQUFOLENBQWFDLE9BTGlCO0FBTWpDQyxJQUFBQSxjQUFjLEVBQUU7QUFOaUI7QUFBQSxDQUFkLENBQXJCO0FBWWUsU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsRUFBa0Q7QUFDaEUsTUFBUUMsSUFBUixHQUEwQkQsS0FBMUIsQ0FBUUMsSUFBUjtBQUFBLE1BQWNDLE9BQWQsR0FBMEJGLEtBQTFCLENBQWNFLE9BQWQ7QUFDQyxNQUFNWCxLQUFLLEdBQUdsQixnRUFBUSxFQUF0QjtBQUNBLHNCQUNFLHdEQUFDLHlEQUFEO0FBQUssTUFBRSxFQUFFO0FBQUVtQixNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFUO0FBQUEsNEJBQ0UsdURBQUMsaUVBQUQsS0FERixlQUVFLHdEQUFDLDREQUFEO0FBQ0UsUUFBRSxFQUFFO0FBQ0ZXLFFBQUFBLEtBQUssRUFBRWQsV0FETDtBQUVGZSxRQUFBQSxVQUFVLEVBQUUsQ0FGVjtBQUdGLDhCQUFzQjtBQUNwQkQsVUFBQUEsS0FBSyxFQUFFZCxXQURhO0FBRXBCZ0IsVUFBQUEsU0FBUyxFQUFFO0FBRlM7QUFIcEIsT0FETjtBQVNFLGFBQU8sRUFBQyxZQVRWO0FBVUUsWUFBTSxFQUFDLE1BVlQ7QUFXRSxVQUFJLEVBQUVKLElBWFI7QUFBQSw4QkFhRSx1REFBQyxZQUFEO0FBQUEsK0JBQ0UsdURBQUMsZ0VBQUQ7QUFBWSxpQkFBTyxFQUFFO0FBQUEsbUJBQU1DLE9BQU8sQ0FBQyxLQUFELENBQWI7QUFBQSxXQUFyQjtBQUFBLG9CQUNHWCxLQUFLLENBQUNlLFNBQU4sS0FBb0IsS0FBcEIsZ0JBQ0MsdURBQUMsd0VBQUQsS0FERCxnQkFHQyx1REFBQyx5RUFBRDtBQUpKO0FBREYsUUFiRixlQXNCRSx1REFBQyw4REFBRCxLQXRCRixlQXVCRSx1REFBQywyREFBRDtBQUFBLGtCQUNHLGNBQUMsdURBQUMsa0VBQUQsS0FBRCxFQUFlLFNBQWYsRUFBMEIsWUFBMUIsRUFBd0MsUUFBeEMsRUFBa0RDLEdBQWxELENBQ0MsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQO0FBQUEsOEJBQ0UsdURBQUMsK0RBQUQ7QUFBc0IsMEJBQWMsTUFBcEM7QUFBQSxtQ0FDRSx1REFBQyxxRUFBRDtBQUFBLHFDQUNFLHVEQUFDLG1FQUFEO0FBQUEsMEJBQ1BEO0FBRE87QUFERjtBQURGLGFBQWVDLEtBQWYsQ0FERjtBQUFBLFNBREQ7QUFESCxRQXZCRixlQXFDRSx1REFBQyw4REFBRCxLQXJDRixlQXNDRSx1REFBQywyREFBRDtBQUFBLGtCQUNHLENBQUMsVUFBRCxFQUFhLE9BQWIsRUFBc0IsTUFBdEIsRUFBOEJGLEdBQTlCLENBQWtDLFVBQUNHLElBQUQsRUFBT0QsS0FBUDtBQUFBLDhCQUNqQyx1REFBQywrREFBRDtBQUFxQiwwQkFBYyxNQUFuQztBQUFBLG1DQUNFLHdEQUFDLHFFQUFEO0FBQUEsc0NBQ0UsdURBQUMsbUVBQUQ7QUFBQSwwQkFDR0EsS0FBSyxHQUFHLENBQVIsS0FBYyxDQUFkLGdCQUFrQix1REFBQyx3RUFBRCxLQUFsQixnQkFBa0MsdURBQUMsaUVBQUQ7QUFEckMsZ0JBREYsZUFJRSx1REFBQyxtRUFBRDtBQUFjLHVCQUFPLEVBQUVDO0FBQXZCLGdCQUpGO0FBQUE7QUFERixhQUFlQSxJQUFmLENBRGlDO0FBQUEsU0FBbEM7QUFESCxRQXRDRjtBQUFBLE1BRkY7QUFBQSxJQURGO0FBd0REIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC8uL3NyYy9sYXlvdXRzL3NpZGViYXIvc2lkZWJhci1sYXlvdXQudHN4Pzk4MzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBzdHlsZWQsIHVzZVRoZW1lIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xyXG5pbXBvcnQgQm94IGZyb20gJ0BtdWkvbWF0ZXJpYWwvQm94JztcclxuaW1wb3J0IERyYXdlciBmcm9tICdAbXVpL21hdGVyaWFsL0RyYXdlcic7XHJcbmltcG9ydCBDc3NCYXNlbGluZSBmcm9tICdAbXVpL21hdGVyaWFsL0Nzc0Jhc2VsaW5lJztcclxuaW1wb3J0IE11aUFwcEJhciwgeyBBcHBCYXJQcm9wcyBhcyBNdWlBcHBCYXJQcm9wcyB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvQXBwQmFyJztcclxuaW1wb3J0IFRvb2xiYXIgZnJvbSAnQG11aS9tYXRlcmlhbC9Ub29sYmFyJztcclxuaW1wb3J0IExpc3QgZnJvbSAnQG11aS9tYXRlcmlhbC9MaXN0JztcclxuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnQG11aS9tYXRlcmlhbC9UeXBvZ3JhcGh5JztcclxuaW1wb3J0IERpdmlkZXIgZnJvbSAnQG11aS9tYXRlcmlhbC9EaXZpZGVyJztcclxuaW1wb3J0IEljb25CdXR0b24gZnJvbSAnQG11aS9tYXRlcmlhbC9JY29uQnV0dG9uJztcclxuaW1wb3J0IE1lbnVJY29uIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvTWVudSc7XHJcbmltcG9ydCBDaGV2cm9uTGVmdEljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9DaGV2cm9uTGVmdCc7XHJcbmltcG9ydCBDaGV2cm9uUmlnaHRJY29uIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvQ2hldnJvblJpZ2h0JztcclxuaW1wb3J0IExpc3RJdGVtIGZyb20gJ0BtdWkvbWF0ZXJpYWwvTGlzdEl0ZW0nO1xyXG5pbXBvcnQgTGlzdEl0ZW1CdXR0b24gZnJvbSAnQG11aS9tYXRlcmlhbC9MaXN0SXRlbUJ1dHRvbic7XHJcbmltcG9ydCBMaXN0SXRlbUljb24gZnJvbSAnQG11aS9tYXRlcmlhbC9MaXN0SXRlbUljb24nO1xyXG5pbXBvcnQgTGlzdEl0ZW1UZXh0IGZyb20gJ0BtdWkvbWF0ZXJpYWwvTGlzdEl0ZW1UZXh0JztcclxuaW1wb3J0IEluYm94SWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL01vdmVUb0luYm94JztcclxuaW1wb3J0IE1haWxJY29uIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvTWFpbCc7XHJcbmltcG9ydCBIb21lSWNvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ljb24vaG9tZS1pY29uJztcclxuY29uc3QgZHJhd2VyV2lkdGggPSAyNDA7XHJcblxyXG5cclxuXHJcbmNvbnN0IERyYXdlckhlYWRlciA9IHN0eWxlZCgnZGl2JykoKHsgdGhlbWUgfSkgPT4gKHtcclxuICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgcGFkZGluZzogdGhlbWUuc3BhY2luZygwLCAxKSxcclxuICAvLyBuZWNlc3NhcnkgZm9yIGNvbnRlbnQgdG8gYmUgYmVsb3cgYXBwIGJhclxyXG4gIC4uLnRoZW1lLm1peGlucy50b29sYmFyLFxyXG4gIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxyXG59KSk7XHJcbnR5cGUgU2lkZUJhckxheW91dFByb3BzID0ge1xyXG4gIG9wZW46IGJvb2xlYW5cclxuICBzZXRPcGVuOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaWRlQmFyTGF5b3V0KHByb3BzOiBTaWRlQmFyTGF5b3V0UHJvcHMpIHtcclxuXHRjb25zdCB7IG9wZW4sIHNldE9wZW4gfSA9IHByb3BzXHJcbiAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggc3g9e3sgZGlzcGxheTogJ2ZsZXgnIH19PlxyXG4gICAgICA8Q3NzQmFzZWxpbmUgLz5cclxuICAgICAgPERyYXdlclxyXG4gICAgICAgIHN4PXt7XHJcbiAgICAgICAgICB3aWR0aDogZHJhd2VyV2lkdGgsXHJcbiAgICAgICAgICBmbGV4U2hyaW5rOiAwLFxyXG4gICAgICAgICAgJyYgLk11aURyYXdlci1wYXBlcic6IHtcclxuICAgICAgICAgICAgd2lkdGg6IGRyYXdlcldpZHRoLFxyXG4gICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfX1cclxuICAgICAgICB2YXJpYW50PVwicGVyc2lzdGVudFwiXHJcbiAgICAgICAgYW5jaG9yPVwibGVmdFwiXHJcbiAgICAgICAgb3Blbj17b3Blbn1cclxuICAgICAgPlxyXG4gICAgICAgIDxEcmF3ZXJIZWFkZXI+XHJcbiAgICAgICAgICA8SWNvbkJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKGZhbHNlKX0+XHJcbiAgICAgICAgICAgIHt0aGVtZS5kaXJlY3Rpb24gPT09ICdsdHInID8gKFxyXG4gICAgICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gLz5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9JY29uQnV0dG9uPlxyXG4gICAgICAgIDwvRHJhd2VySGVhZGVyPlxyXG4gICAgICAgIDxEaXZpZGVyIC8+XHJcbiAgICAgICAgPExpc3Q+XHJcbiAgICAgICAgICB7WzxIb21lSWNvbiAvPiwgJ1N0YXJyZWQnLCAnU2VuZCBlbWFpbCcsICdEcmFmdHMnXS5tYXAoXHJcbiAgICAgICAgICAgIChpY29uLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxMaXN0SXRlbSBrZXk9e2luZGV4fSBkaXNhYmxlUGFkZGluZz5cclxuICAgICAgICAgICAgICAgIDxMaXN0SXRlbUJ1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPExpc3RJdGVtSWNvbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7aWNvbn1cclxuICAgICAgICAgICAgICAgICAgPC9MaXN0SXRlbUljb24+XHJcbiAgICAgICAgICAgICAgICAgIHsvKiA8TGlzdEl0ZW1UZXh0IHByaW1hcnk9e3RleHR9IC8+ICovfVxyXG4gICAgICAgICAgICAgICAgPC9MaXN0SXRlbUJ1dHRvbj5cclxuICAgICAgICAgICAgICA8L0xpc3RJdGVtPlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvTGlzdD5cclxuICAgICAgICA8RGl2aWRlciAvPlxyXG4gICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAge1snQWxsIG1haWwnLCAnVHJhc2gnLCAnU3BhbSddLm1hcCgodGV4dCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPExpc3RJdGVtIGtleT17dGV4dH0gZGlzYWJsZVBhZGRpbmc+XHJcbiAgICAgICAgICAgICAgPExpc3RJdGVtQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPExpc3RJdGVtSWNvbj5cclxuICAgICAgICAgICAgICAgICAge2luZGV4ICUgMiA9PT0gMCA/IDxJbmJveEljb24gLz4gOiA8TWFpbEljb24gLz59XHJcbiAgICAgICAgICAgICAgICA8L0xpc3RJdGVtSWNvbj5cclxuICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHQgcHJpbWFyeT17dGV4dH0gLz5cclxuICAgICAgICAgICAgICA8L0xpc3RJdGVtQnV0dG9uPlxyXG4gICAgICAgICAgICA8L0xpc3RJdGVtPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9MaXN0PlxyXG4gICAgICA8L0RyYXdlcj5cclxuICAgIDwvQm94PlxyXG4gIClcclxufVxyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJzdHlsZWQiLCJ1c2VUaGVtZSIsIkJveCIsIkRyYXdlciIsIkNzc0Jhc2VsaW5lIiwiTGlzdCIsIkRpdmlkZXIiLCJJY29uQnV0dG9uIiwiQ2hldnJvbkxlZnRJY29uIiwiQ2hldnJvblJpZ2h0SWNvbiIsIkxpc3RJdGVtIiwiTGlzdEl0ZW1CdXR0b24iLCJMaXN0SXRlbUljb24iLCJMaXN0SXRlbVRleHQiLCJJbmJveEljb24iLCJNYWlsSWNvbiIsIkhvbWVJY29uIiwiZHJhd2VyV2lkdGgiLCJEcmF3ZXJIZWFkZXIiLCJ0aGVtZSIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwicGFkZGluZyIsInNwYWNpbmciLCJtaXhpbnMiLCJ0b29sYmFyIiwianVzdGlmeUNvbnRlbnQiLCJTaWRlQmFyTGF5b3V0IiwicHJvcHMiLCJvcGVuIiwic2V0T3BlbiIsIndpZHRoIiwiZmxleFNocmluayIsImJveFNpemluZyIsImRpcmVjdGlvbiIsIm1hcCIsImljb24iLCJpbmRleCIsInRleHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/layouts/sidebar/sidebar-layout.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("70471ddc25971bb92b1a")
/******/ })();
/******/ 
/******/ }
);