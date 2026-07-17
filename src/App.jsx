import { useEffect } from "react";
import router from "./router/RoutesIndex.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "./store/authStore.js";
import { LoadingOutlined } from "@ant-design/icons";
function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <LoadingOutlined />
      </div>
    );
  }

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
