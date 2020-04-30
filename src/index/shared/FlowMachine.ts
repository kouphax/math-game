import { assign, Machine, State, StateMachine } from "xstate";
import { Hero } from "../../shared/models";

export interface FlowSchema {
  states: {
    LandingPage: {};
    CharacterSelectionScreen: {};
    Adventure: {};
  };
}

export type StartCharacterCreation = { type: "StartCharacterCreation" };
export type CancelCharacterCreation = { type: "CancelCharacterCreation" };
export type CompleteCharacterCreation = {
  type: "CompleteCharacterCreation";
  hero: Hero;
};

export type CharacterCreationEvents =
  | StartCharacterCreation
  | CompleteCharacterCreation
  | CancelCharacterCreation;
export type StartAdventure = { type: "StartAdventure" };
export type EndAdventure = { type: "EndAdventure" };
export type FlowEvent = CharacterCreationEvents | StartAdventure | EndAdventure;

export interface AdventureContext {
  hero?: Hero;
}

export type StoryboardState = State<AdventureContext, FlowEvent>;

export type FlowMachine = StateMachine<AdventureContext, FlowSchema, FlowEvent>;

export const createFlowMachine = (
  initialContext: AdventureContext
): FlowMachine => {
  return Machine<AdventureContext, FlowSchema, FlowEvent>({
    id: "storyboard",
    initial: "LandingPage",
    context: initialContext,
    states: {
      LandingPage: {
        on: {
          StartCharacterCreation: "CharacterSelectionScreen",
          StartAdventure: {
            cond: (ctx) => !!ctx.hero,
            target: "Adventure",
          },
        },
      },
      CharacterSelectionScreen: {
        on: {
          CancelCharacterCreation: "LandingPage",
          CompleteCharacterCreation: {
            target: "LandingPage",
            actions: assign({
              hero: (_, { hero }) => hero,
            }),
          },
        },
      },
      Adventure: {
        on: {
          EndAdventure: {
            target: "LandingPage",
            actions: assign<AdventureContext>({
              hero: () => undefined,
            }),
          },
        },
      },
    },
  });
};
