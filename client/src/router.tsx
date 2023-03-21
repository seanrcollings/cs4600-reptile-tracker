import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./Layout";
import { ReptileApi } from "./lib/api";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: () => {
          if (ReptileApi.initAuth()) return null;
          return redirect("/");
        },
      },
    ],
  },
]);
