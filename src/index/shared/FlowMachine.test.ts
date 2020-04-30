import { createFlowMachine } from "./FlowMachine";
import { interpret } from "xstate";

describe("navigation flow", () => {
  const service = interpret(createFlowMachine({})).start();

  test("starts on landing page", () => {
    expect(service.initialState.matches("LandingPage")).toBeTruthy();
  });

  test("cant navigate to adventure unless you create a character", () => {
    const state = service.send("StartAdventure");
    expect(state.matches("LandingPage")).toBeTruthy();
    expect(state.changed).toBeFalsy();
  });

  test("can navigate from landing screen to character creation", () => {
    const state = service.send("StartCharacterCreation");
    expect(state.matches("CharacterSelectionScreen")).toBeTruthy();
    expect(state.changed).toBeTruthy();
  });

  test("can cancel character creation and go to landing screen", () => {
    const state = service.send("CancelCharacterCreation");
    expect(state.changed).toBeTruthy();
    expect(state.matches("LandingPage")).toBeTruthy();
    expect(state.context.hero).not.toBeDefined();
  });

  test("can return to character creation screen", () => {
    const state = service.send("StartCharacterCreation");
    expect(state.changed).toBeTruthy();
  });

  test("can create a character and return to landng page", () => {
    const state = service.send({
      type: "CompleteCharacterCreation",
      hero: { type: "barbarian", attack: 1, defense: 2, health: 3 },
    });
    expect(state.changed).toBeTruthy();
    expect(state.context.hero).toEqual({
      type: "barbarian",
      attack: 1,
      defense: 2,
      health: 3,
    });
    expect(state.matches("LandingPage")).toBeTruthy();
  });

  test("can start adventure once character is created", () => {
    const state = service.send("StartAdventure");
    expect(state.matches("Adventure")).toBeTruthy();
    expect(state.changed).toBeTruthy();
  });

  test("can end an adventure and it removes the character", () => {
    const state = service.send("EndAdventure");
    expect(state.matches("LandingPage")).toBeTruthy();
    expect(state.changed).toBeTruthy();
    expect(state.context.hero).toBeUndefined();
  });
});
