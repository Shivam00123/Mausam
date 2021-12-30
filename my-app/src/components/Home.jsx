import React from "react";
import "../style/home.css";
import WeatherCard from "./WeatherCard";
import { ErrorBoundary } from "./ErrorBoundary";

function Home() {
  return (
    <ErrorBoundary>
      <div className="home">
        <WeatherCard />
      </div>
    </ErrorBoundary>
  );
}

export default Home;
