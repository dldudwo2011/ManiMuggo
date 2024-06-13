import { useState, useEffect } from 'react';

export default function Geolocation({ onLocationFetched }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          onLocationFetched({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation not available");
    }
  }, []);

  return (
    <div className="text-center mt-8">
      {error && <p className="text-red-500">{error}</p>}
      {location ? (
        <p>Location: {location.latitude}, {location.longitude}</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}
