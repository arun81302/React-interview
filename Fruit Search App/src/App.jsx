import { useState, useEffect } from "react";

export default function App() {
  const [value, setValue] = useState("");
  const [res, setRes] = useState([]);

  useEffect(() => {
    if (value.trim() === "") {
      setRes([]);
      return;
    }

    const time = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://fruit-search.freecodecamp.rocks/api/fruits?q=${value}`
        );

        const data = await response.json();

        setRes(data.map((value) => value.name));
      } catch (err) {
        console.log("error fetching the data");
      }
    }, 500);

    return () => clearTimeout(time);
  }, [value]);

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10 sm:py-16">

      <div className="w-full max-w-lg">

      
        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">

          
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              🍎 Fruit Search
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Search for your favorite fruits
            </p>
          </div>

          
          <form onSubmit={handleClick}>
            <label
              htmlFor="input"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Search for fruits
            </label>

            <div className="relative">
              <input
                type="search"
                id="input"
                value={value}
                placeholder="e.g. apple, mango..."
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
              />
            </div>
          </form>

          
          <div className="mt-6">

            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Search Results
            </h2>

            {res.length > 0 ? (
              <div className="space-y-2">
                {res.map((value) => (
                  <div
                    key={value}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-100 transition"
                  >
                    🍓 {value}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-400 text-sm">
                  No fruits found
                </p>
              </div>
            )}

          </div>
        </div>

        
        <p className="text-center text-gray-400 text-xs mt-5">
          Search results appear automatically
        </p>

      </div>
    </div>
  );
}