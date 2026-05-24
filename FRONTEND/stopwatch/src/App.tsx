import { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          setIsRunning(false);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-linear-to-br  from-black via-zinc-900 to-gray-950 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-10 tracking-wide">
          Stopwatch
        </h1>

        <div className="flex items-center justify-center gap-4 text-white mb-10">
          
          <div className="bg-black/30 px-6 py-5 rounded-2xl  min-w-27.5">
            <p className="text-6xl font-bold">
              {String(hours).padStart(2, "0")}
            </p>
            <span className="text-sm uppercase tracking-widest text-gray-300">
              Hours
            </span>
          </div>

          <p className="text-5xl font-bold text-gray-300">:</p>

          <div className="bg-black/30 px-6 py-5 rounded-2xl min-w-27.5">
            <p className="text-6xl font-bold">
              {String(minutes).padStart(2, "0")}
            </p>
            <span className="text-sm uppercase tracking-widest text-gray-300">
              Minutes
            </span>
          </div>

          <p className="text-5xl font-bold text-gray-300">:</p>

          <div className="bg-black/30 px-6 py-5 rounded-2xl min-w-27.5">
            <p className="text-6xl font-bold">
              {String(seconds).padStart(2, "0")}
            </p>
            <span className="text-sm uppercase tracking-widest text-gray-300">
              Seconds
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 shadow-lg
            ${
              isRunning
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}