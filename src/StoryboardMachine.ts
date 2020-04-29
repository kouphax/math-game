import { Machine, actions, assign } from "xstate";
import { Hero } from "./index/shared/models";

const { choose } = actions;

interface StoryboardScema {
  states: {
    LandingPage: {};
    CharacterCreator: {};
    Adventure: {};
  };
}

export type StartCharacterCreation = { type: "StartCharacterCreation" };
export type CharacterCreationCancelled = { type: "CharacterCreationCancelled" };
export type CharacterCreationComplete = {
  type: "CharacterCreationComplete";
  hero: Hero;
};

export type CharacterCreationEvents =
  | StartCharacterCreation
  | CharacterCreationComplete
  | CharacterCreationCancelled;

export type StartAdventure = { type: "StartAdventure" };

export type StoryboardEvent = CharacterCreationEvents | StartAdventure;

export interface StoryboardContext {
  hero?: Hero;
}

export const createStoryboardMachine = (initialContext: StoryboardContext) => {
  return Machine<StoryboardContext, StoryboardScema, StoryboardEvent>({
    id: "storyboard",
    initial: "LandingPage",
    context: initialContext,
    states: {
      LandingPage: {
        on: {
          StartCharacterCreation: "CharacterCreator",
          StartAdventure: {
            cond: (ctx) => !!ctx.hero,
            target: "Adventure",
          },
        },
      },
      CharacterCreator: {
        on: {
          CharacterCreationCancelled: "LandingPage",
          CharacterCreationComplete: {
            target: "LandingPage",
            actions: assign({
              hero: (_, { hero }) => hero,
            }),
          },
        },
      },
      Adventure: {},
    },
  });
};
