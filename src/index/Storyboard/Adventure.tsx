import React, { useContext } from "react";
import ApplicationContext, {
  ApplicationEnvironment,
} from "../shared/ApplicationContext";

const Adventure = () => {
  const { send } = useContext<ApplicationEnvironment>(ApplicationContext);

  return (
    <>
      <h1>Adventure</h1>
      <button onClick={() => send({ type: "EndAdventure" })}>
        End Adventure
      </button>
    </>
  );
};

export default Adventure;
