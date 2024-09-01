import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Define the interface for the movie data
interface MovieData {
  id: string; // Assuming each movie has a unique ID
  poster: string;
  release_date: string;
}

const Movies: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<MovieData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<MovieData[]>(
          "https://potterhead-api.vercel.app/api/movies"
        );
        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Movies Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="hover:scale-105 transition-all duration-200  rounded-lg overflow-hidden shadow-lg shadow-orange-500"
          >
            <img
              src={item.poster}
              alt="movie poster"
              className="w-full h-[460px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">Release Date: {item.release_date}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
