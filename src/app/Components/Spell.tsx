import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Define the interface for the spell data
interface SpellData {
  id: string; // Assuming each spell has a unique ID
  name: string;
  description: string;
}

const Spell: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<SpellData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<SpellData[]>(
          "https://potterhead-api.vercel.app/api/spells"
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
      <h1 className="text-2xl mb-4 text-center font-bold">Data from Spell API</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.id} // Use a unique identifier for the key
            className=" rounded-lg overflow-hidden 
            shadow-lg shadow-slate-700 transform transition duration-300 hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spell;
