import { useEffect, useState } from "react";

export default function DataPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getData");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {data.map((artist) => (
          <li key={artist._id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
}
