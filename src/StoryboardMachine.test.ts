import {
  createStoryboardMachine,
  StoryboardContext,
} from "./StoryboardMachine";
import { interpret } from "xstate";

const makeService = (context: StoryboardContext = {}) =>
  interpret(createStoryboardMachine(context)).start();

test("navigation", () => {
  let state;
  const service = makeService().start();

  // starting state
  expect(service.initialState.matches("LandingPage")).toBeTruthy();

  // trying to start game without creeating character wont change state
  state = service.send("StartAdventure");
  expect(state.matches("LandingPage")).toBeTruthy();
  expect(state.changed).toBeFalsy();

  // going to character creation and cancelling
  state = service.send("StartCharacterCreation");
  expect(state.matches("CharacterCreator")).toBeTruthy();
  expect(state.changed).toBeTruthy();
  state = service.send("CharacterCreationCancelled");
  expect(state.changed).toBeTruthy();
  expect(state.matches("LandingPage")).toBeTruthy();
  expect(state.context.hero).not.toBeDefined();

  // going to character creation and creating a character
  service.send("StartCharacterCreation");
  expect(state.changed).toBeTruthy();
  state = service.send({
    type: "CharacterCreationComplete",
    hero: { attack: 1, defense: 2, health: 3 },
  });
  expect(state.changed).toBeTruthy();
  expect(state.context.hero).toBeDefined();
  expect(state.context.hero).toEqual({ attack: 1, defense: 2, health: 3 });
  expect(state.matches("LandingPage")).toBeTruthy();

  // once character created can start adventure
  state = service.send("StartAdventure");
  expect(state.matches("Adventure")).toBeTruthy();
  expect(state.changed).toBeTruthy();
});
