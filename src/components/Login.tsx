const clientID = import.meta.env.VITE_STRAVA_CLIENT_ID;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const Login = () => {
  const login = async () => {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${apiBaseUrl}/auth/exchange_token&approval_prompt=force&scope=activity:read_all`;
  };

  return (
    <>
      <h1>Strava Connect</h1>
      <button onClick={login}>Connect to Strava</button>
    </>
  );
};
