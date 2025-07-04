import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location) return alert('Please fill all fields');
    setLoading(true);
    const res = await axios.post('http://localhost:5000/business-data', { name, location });
    setData((prevData) => [...prevData, res.data]); // accumulate results
    setLoading(false);
    setName('');
    setLocation('');
  };

  const regenerateHeadline = async (index) => {
    const res = await axios.get(`http://localhost:5000/regenerate-headline?name=${data[index].name}&location=${data[index].location}`);
    const updated = [...data];
    updated[index].headline = res.data.headline;
    setData(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">SEO Dashboard</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
          <input
            type="text"
            placeholder="Business Name"
            className="w-full border p-2 mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full border p-2 mb-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 w-full rounded" type="submit">
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>

        {data.map((each, index) => (
          <div key={index} className="bg-white mt-6 p-4 rounded shadow">
            <p><strong>Name:</strong> {each.name}</p>
            <p><strong>Location:</strong> {each.location}</p>
            <p><strong>Rating:</strong> {each.rating} ⭐</p>
            <p><strong>Reviews:</strong> {each.reviews}</p>
            <p><strong>Headline:</strong> {each.headline}</p>
            <button
              onClick={() => regenerateHeadline(index)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Regenerate SEO Headline
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
