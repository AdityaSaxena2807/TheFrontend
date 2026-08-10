import { useEffect, Suspense } from "react";
import router from "./router/RoutesIndex.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "./store/authStore.js";
import { LoadingOutlined } from "@ant-design/icons";
import { useUiStore } from "./store/uiStore.js";
import "./index.css";
import "./App.css";
function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-text-primary">
        <LoadingOutlined />
      </div>
    );
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-bg text-text-primary">
            <LoadingOutlined />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
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
