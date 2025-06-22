const clientID = import.meta.env.VITE_STRAVA_CLIENT_ID;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const Login = () => {
  const login = async () => {
    console.log(" clientID:", clientID);
    console.log(" apiBaseUrl:", apiBaseUrl);
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${apiBaseUrl}/auth/exchange_token&approval_prompt=force&scope=activity:read_all`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md">
        <img src="/strava-logo.svg" alt="Strava" className="h-12 mb-6" />
        <h2 className="text-3xl font-extrabold text-strava-orange mb-6 tracking-tight">
          Connect Strava
        </h2>
        <button
          onClick={login}
          className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all shadow-md"
        >
          Connect to Strava
        </button>
      </div>
    </div>
  );
};
