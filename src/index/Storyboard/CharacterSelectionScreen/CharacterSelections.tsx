import { Hero } from "../../../shared/models";
import React from "react";

const characters: Hero[] = [
  { type: "barbarian", attack: 5, defense: 1, health: 150 },
  { type: "wizard", attack: 5, defense: 1, health: 150 },
  { type: "ranger", attack: 5, defense: 1, health: 150 },
];

type CharacterSelectionsProps = {
  onSelectCharacter: (character: Hero) => void;
  character: Hero | undefined;
};

const CharacterSelections = ({
  character,
  onSelectCharacter,
}: CharacterSelectionsProps) => {
  return (
    <div className="characterSelections">
      {characters.map((c) => (
        <div key={c.type} className="characterSelection">
          <label>
            <input
              type="radio"
              checked={character?.type === c.type}
              onChange={() => onSelectCharacter(c)}
            />
            {c.type.charAt(0).toUpperCase() + c.type.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CharacterSelections;
