import { useState, useEffect } from 'react';
import axios from 'axios';

const clientID = import.meta.env.VITE_STRAVA_CLIENT_ID;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [activities, setActivities] = useState([]);
  const [userId, setuserId] = useState('');

  const login = async () => {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${apiBaseUrl}/auth/exchange_token&approval_prompt=force&scope=activity:read_all`;
  };

  const fetchLastActivities = async (userId) => {
    try {
      const res = await axios.get(`${apiBaseUrl}/activities?user_id=${userId}`);
      setActivities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user_id = params.get('user_id');
    if (user_id) {
      localStorage.setItem('strava_user_id', user_id);
      setuserId(user_id);
    }

    if (window.location.pathname.includes('activities') || user_id) {
      fetchLastActivities(user_id);
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatPace = (seconds, meters) => {
    const pace = seconds / (meters / 1000); // sec per km
    const mins = Math.floor(pace / 60);
    const secs = Math.round(pace % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs} /km`;
  };

  return (
    <div style={{ padding: 20 }}>
      {!userId && <><h1>Strava Connect</h1>
        <button onClick={login}>Connect to Strava</button></>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <div>
              <h3>{activity.name}</h3>
              <p><strong>Date:</strong> {new Date(activity.start_date_local).toLocaleString()}</p>
              <p><strong>Distance:</strong> {(activity.distance / 1000).toFixed(2)} km</p>
              <p><strong>Running Time:</strong> {formatTime(activity.moving_time)}</p>
              <p><strong>Pace:</strong> {formatPace(activity.moving_time, activity.distance)}</p>
              <hr />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

