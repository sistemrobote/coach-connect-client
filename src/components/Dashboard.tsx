import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  console.log("🚀 ~ Dashboard - userss>>", user);

  if (isLoading) {
    return <div>Loading Dashboard...</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.username}!</p>
      <p>User ID: {user?.id}</p>
    </div>
  );
}

export default Dashboard;
