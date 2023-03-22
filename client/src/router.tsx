import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reptile from "./pages/Reptile";
import Signup from "./pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
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
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/reptile/:id",
        element: <Reptile />,
      },
    ],
  },
]);
