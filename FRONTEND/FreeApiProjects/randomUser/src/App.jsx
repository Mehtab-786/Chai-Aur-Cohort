import { useEffect, useState } from "react";

function App() {
  const [userData, setuserData] = useState(null);
  const [errors, seterrors] = useState(null);

  async function fetchRandomUser() {
    try {
      let res = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers"
      );
      let json = await res.json();

      let { data } = json.data;
      let user = data[Math.floor(Math.random() * data.length)];

      setuserData(user);
    } catch (err) {
      seterrors(err);
    }
  }

  useEffect(() => {
    fetchRandomUser();
  }, []);

  if (errors) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Error...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-800 text-white">

      <div className="relative w-96 p-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl hover:scale-105 transition duration-300">

        <div className="absolute -top-10 left-6">
          <img
            src={userData.picture.large}
            alt="User"
            className="w-20 h-20 rounded-full border-4 border-gray-900 shadow-md"
          />
        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold tracking-wide">
            {userData.name.title} {userData.name.first}
          </h2>

          <div className="mt-3 space-y-1">
            <p className="font-semibold text-blue-400">
              📧 {userData.email}
            </p>
            <p className="font-semibold text-green-400">
              📞 {userData.phone}
            </p>
          </div>

          <div className="border-t border-white/20 my-4"></div>

          <p className="text-sm text-gray-300">
            ID: {userData.id || "N/A"}
          </p>

          <div className="mt-4">
            <h3 className="text-gray-200 font-semibold mb-1">
              📍 Location
            </h3>
            <p className="text-sm text-gray-400">
              {userData.location.city}, {userData.location.state}
            </p>
            <p className="text-sm text-gray-500">
              {userData.location.country} - {userData.location.postcode}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;