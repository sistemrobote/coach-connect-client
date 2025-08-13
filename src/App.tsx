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
  // const userId = useUserId();
  // const { data: runningData = [] } = useRunningHeatmapData("userId");

  // const pushUps = useManualActivity("pushups");
  // const pullUps = useManualActivity("pullups");

  return (
    <RouterProvider router={router} />
    // <div className="flex justify-center py-2">
    //   <div className="w-full max-w-[640px] p-4">
    //     <ActivityCard
    //       title="Running"
    //       data={runningData}
    //       colorScheme="orange"
    //       icon={
    //         <svg
    //           className="w-5 h-5 text-gray-600"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
    //         </svg>
    //       }
    //     />
    //     <ActivityCard
    //       title="Push-ups"
    //       data={pushUps.data}
    //       colorScheme="blue"
    //       icon={
    //         <svg
    //           className="w-5 h-5 text-gray-600"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM16 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    //         </svg>
    //       }
    //     />

    //     <ActivityCard
    //       title="Pull-ups"
    //       data={pullUps.data}
    //       colorScheme="red"
    //       icon={
    //         <svg
    //           className="w-5 h-5 text-gray-600"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
    //         </svg>
    //       }
    //     />

    //     <TrainingLog userId={"userId"} />
    //   </div>
    // </div>
  );
};
