import React, { useContext, useState } from "react";
import ApplicationContext, {
  ApplicationEnvironment,
} from "../shared/ApplicationContext";
import CharacterSelections from "./CharacterSelectionScreen/CharacterSelections";
import {Hero} from "../../shared/models";

const CharacterSelectionScreen = () => {
  const { send, state } = useContext<ApplicationEnvironment>(
    ApplicationContext
  );
  const [character, setCharacter] = useState(state().context.hero);
  return (
    <>
      <h1>Character Creator</h1>
      <CharacterSelections
        character={character}
        onSelectCharacter={setCharacter}
      />
      <div>
        <button
          disabled={!character}
          onClick={() =>
            send({
              type: "CompleteCharacterCreation",
              hero: character!, // just some dummy hero data
            })
          }
        >
          Done
        </button>
      </div>
      <div>
        <button onClick={() => send({ type: "CancelCharacterCreation" })}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default CharacterSelectionScreen;
