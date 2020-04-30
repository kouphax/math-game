import { createContext } from "react";
import { FlowEvent, StoryboardState } from "./FlowMachine";

export type StoryboardEventHandler = (evt: FlowEvent) => StoryboardState | void;
export type StoryboardStateProvider = () => StoryboardState

const deadLetterOffice: StoryboardEventHandler = (event: FlowEvent) =>
  console.log("StoryboardEvent not delivered", event);

const exceptionalStoryboardStateProvider: StoryboardStateProvider = () => {
  throw new Error("not implemented")
}

export interface ApplicationEnvironment {
  send: StoryboardEventHandler;
  state: StoryboardStateProvider;
}

const ApplicationContext = createContext<ApplicationEnvironment>({
  state: exceptionalStoryboardStateProvider,
  send: deadLetterOffice
});

export default ApplicationContext;
