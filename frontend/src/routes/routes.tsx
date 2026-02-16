import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/mainLayout.js";
import { MainFeed } from "../pages/feed/mainFeed.js";
import { Explore } from "../pages/feed/explore.js";
import { Notifications } from "../pages/feed/notifications.js";
import { Profile } from "../pages/feed/profile.js";
import { Settings } from "../pages/feed/settings.js";
import { DetailsPost } from "@/components/feed/detailsPost.js";

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
        path: "post/:postId",
        element: <DetailsPost />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: ":username/:tab",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
