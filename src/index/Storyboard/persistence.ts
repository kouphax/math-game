import {
  AdventureContext,
  FlowEvent,
  StoryboardState,
} from "../shared/FlowMachine";
import { State } from "xstate";

export const loadState = (defaultState: StoryboardState): StoryboardState => {
  if (window.localStorage) {
    const savedState = window.localStorage.getItem("state");
    if (savedState) {
      console.log("rehydating: ", savedState);
      return State.create(JSON.parse(savedState));
    }
  }

  return defaultState;
};

export const saveState = (state: State<AdventureContext, FlowEvent>) => {
  if (window.localStorage) {
    const savedState = JSON.stringify(state);
    console.log("saving state", savedState);
    window.localStorage.setItem("state", savedState);
  }
};
