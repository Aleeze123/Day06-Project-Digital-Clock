"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect, useMemo } from "react";

// Import custom UI components from the UI directory
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Default export of the DigitalClockComponent function
export default function DigitalClock() {
  // State hooks for managing current time, time format (24-hour or 12-hour), and component mount status
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Effect hook to run on component mount
  useEffect(() => {
    setMounted(true); // Set mounted status to true
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Memoized computation of formatted time to avoid unnecessary recalculations
  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; // Don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // Format hours in 24-hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Format hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Format minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // Format seconds
    return `${hours}:${minutes}:${seconds}`; // Return formatted time string
  }, [time, is24Hour, mounted]); // Dependencies to re-run the memoized function

  // JSX return statement rendering the digital clock UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.jfif')" }}>
    <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-black border-0">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold tracking-tight text-white">Digital Clock</div>
          <div className="text-sm text-white dark:text-white mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-6xl text-cyan-400 font-bold tracking-tight">
            {formattedTime}
          </div>
          
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold bg-cyan-300 text-black"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="mr-2 font-bold"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}