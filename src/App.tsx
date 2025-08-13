import { Login } from "./components/Login";
import { RouterProvider, createBrowserRouter, redirect } from "react-router";
import Dashboard from "./components/Dashboard";
import { getCurrentUser } from "./api/auth";
import Logout from "./components/Logout";
import { queryClient } from "./lib/queryClient";
import { AUTH_QUERY_KEY } from "./hooks/useAuthQuery";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: dashboardLoader,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

async function rootLoader() {
  // Simple redirect without auth check to prevent loops
  // Let the AuthProvider handle auth state
  throw redirect("/login");
}

async function dashboardLoader() {
  // Check if we have cached auth data
  const cachedAuth = queryClient.getQueryData(AUTH_QUERY_KEY);

  if (cachedAuth) {
    return null; // Use cached data
  }

  // If no cache, prefetch auth data
  try {
    await queryClient.fetchQuery({
      queryKey: AUTH_QUERY_KEY,
      queryFn: getCurrentUser,
    });
    return null;
  } catch {
    console.log("🚀 ~ Auth failed in dashboardLoader, redirecting to login");
    throw redirect("/login");
  }
}

export const App = () => {
  return <RouterProvider router={router} />;
};
