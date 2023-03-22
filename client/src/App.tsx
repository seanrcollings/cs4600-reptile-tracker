import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { ApiContext, AuthContext } from "./context";
import { ReptileApi } from "./lib/api";
import { router } from "./router";

export default function App() {
  const [token, setToken] = useState<null | string>(() =>
    window.localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={setToken}>
      <ApiContext.Provider value={new ReptileApi(token || "")}>
        <RouterProvider router={router} />
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
}
