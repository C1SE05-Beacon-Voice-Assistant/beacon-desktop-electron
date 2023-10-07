import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <div>
//         <h1>Hello World</h1>
//         <Link to="about">About Us</Link>
//       </div>
//     ),
//   },
//   {
//     path: "about",
//     element: <div>About</div>,
//   },
// ]);
// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );
const container = createRoot(document.getElementById("root"));
container.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
