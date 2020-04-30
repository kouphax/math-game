import React, { useContext } from "react";
import ApplicationContext, {
  ApplicationEnvironment,
} from "../shared/ApplicationContext";

const LandingPage = () => {
  const { send, state } = useContext<ApplicationEnvironment>(
    ApplicationContext
  );
  return (
    <>
      <h1>Landing Page</h1>
      <div>
        <button onClick={() => send({ type: "StartCharacterCreation" })}>
          Create Character
        </button>
      </div>
      <div>
        <button
          onClick={() => send({ type: "StartAdventure" })}
          disabled={!state().context.hero}
        >
          Start Adventure
        </button>
      </div>
    </>
  );
};

export default LandingPage;
