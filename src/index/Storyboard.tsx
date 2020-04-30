import "./Storyboard/Storyboard.css";
import React, { useEffect } from "react";
import { createFlowMachine, StoryboardState } from "./shared/FlowMachine";
import { useMachine } from "@xstate/react/lib";
import LandingPage from "./Storyboard/LandingPage";
import CharacterSelectionScreen from "./Storyboard/CharacterSelectionScreen";
import Adventure from "./Storyboard/Adventure";
import ApplicationContext from "./shared/ApplicationContext";
import { loadState, saveState } from "./Storyboard/persistence";

const navigate = (state: StoryboardState) => {
  switch (state.value) {
    case "LandingPage":
      return <LandingPage />;
    case "CharacterSelectionScreen":
      return <CharacterSelectionScreen />;
    case "Adventure":
      return <Adventure />;
    default:
      return <></>;
  }
};

const Storyboard = () => {
  const machine = createFlowMachine({});
  const [state, send, service] = useMachine(machine, {
    state: loadState(machine.initialState),
  });
  const page = navigate(state);
  const context = { send, state: () => state };

  useEffect(() => {
    const subscription = service.subscribe(saveState);
    return subscription.unsubscribe;
  }, [service]);

  return (
    <ApplicationContext.Provider value={context}>
      <div className="storyboard">{page}</div>
    </ApplicationContext.Provider>
  );
};

export default Storyboard;
