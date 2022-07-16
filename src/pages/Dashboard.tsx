import { useSelector } from "app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) return <></>;

  return (
    <>
      {user ? (
        <ul>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Access: {user.access}</li>
          <li>Refresh: {user.refresh}</li>
        </ul>
      ) : (
        <h1>You're not logged yet</h1>
      )}
      <h1>Try to access the protected /secret route!</h1>
      <small>Psss: you only will be able to do so if you're logged-in</small>
    </>
  );
}

export default Dashboard;
