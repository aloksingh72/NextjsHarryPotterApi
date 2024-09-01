import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/pottervector.jpg';

// Define the interface for the character data
interface CharacterData {
  id: string; // Assuming each character has a unique ID, if not present in the API, omit this field
  name: string;
  image?: any; // image is optional
}

const Character: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CharacterData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<CharacterData[]>(
          "https://potterhead-api.vercel.app/api/characters"
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
    <Link to="/character">
      <div className="p-4">
        <h1 className="text-2xl mb-4">Character Data</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="hover:scale-105 transition-all duration-200  rounded-lg overflow-hidden shadow-lg shadow-orange-500"
            >
              <img
                src={item.image || defaultImage}
                alt="character"
                className="w-full h-[460px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Character;
