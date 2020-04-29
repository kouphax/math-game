import "./App/App.css";
import React from "react";
import { Hero, Enemy } from "./shared/models";
import { Battle } from "./App/Battle";
import "bootstrap/dist/css/bootstrap.min.css";
import BattleCard from "./shared/BattleCard"

function App() {
  const enemy: Enemy = {
    speed: 5,
    attack: 5,
    defense: 5,
    health: 10,
    picture: "",
    difficulty: [1],
  };

  const hero: Hero = {
    health: 120,
    attack: 5,
    defense: 4,
  };

  return (
    <div className="App">
      <Battle hero={hero} enemy={enemy} />
    </div>
  );
}

export default App;
