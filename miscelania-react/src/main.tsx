import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { About } from "./components/About.tsx";
import { NotFoundPage } from "./components/NotFoundPage.tsx";
import { Weather } from "./components/Weather.tsx";
import { Image3D } from "./components/Image3D.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/about", element: <About /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/weather", element: <Weather /> },
  { path: "/3D", element: <Image3D /> },
  /*   { path: "/weather", element: <Weather /> },
  { path: "/3D", element: <Image3D /> },
  { path: "/music", element: <MusicLive /> },
  */
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
