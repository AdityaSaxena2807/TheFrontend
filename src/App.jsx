import axios from "axios";
import { useState } from "react";
import Login from "./pages/Login.jsx";
import router from "./router/index.jsx";
import Register from "./pages/Register.jsx";
import { Toaster } from "react-hot-toast";
import { Router } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
/** App.jsx holds your router — the thing that decides which page to show based on the URL. It also wraps everything in global providers (like your auth store).

What goes here
Import RouterProvider from react-router-dom
This activates your routing system.
Import your router from router/index.jsx
You define all your routes there, not here.
Return
That's it. The router takes over from here.
App.jsx is intentionally tiny. Its only job is 'plug the router in'.**/
