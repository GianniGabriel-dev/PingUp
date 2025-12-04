import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/mainLayout.js";
import { MainFeed } from "../pages/feed/mainFeed.js";
import { Explore } from "../pages/feed/explore.js";
import { Notifications } from "../pages/feed/notifications.js";

//se crea el router para las rutas de la aplicacion
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainFeed />,
      },
      {
        path:"explore",
        element: <Explore/>
      },
    {
        path:"notifications",
        element: <Notifications/>
      }
    ],
  },
]);
