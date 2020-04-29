import { Machine, assign, actions } from "xstate";
import { Hero, Enemy } from "../../shared/models";

const { choose } = actions;

export const engaging = "engaging";
export const engagedInCombat = "engagedInCombat";
export const defeated = "defeated";
export const victory = "victory";

interface BattleSchema {
  states: {
    [engaging]: {};
    [engagedInCombat]: {};
    [defeated]: {};
    [victory]: {};
  };
}

export type EngageEvent = { type: "Engage" };

export type AttackedEvent = { type: "Attacked" };

export type AttackEvent = { type: "Attack"; success: boolean };

export type BattleEvent = EngageEvent | AttackedEvent | AttackEvent;

export interface BattleContext {
  enemy: Enemy;
  hero: Hero;
}

export const createBattleMachine = (initialContext: BattleContext) => {
  return Machine<BattleContext, BattleSchema, BattleEvent>(
    {
      id: "battle",
      initial: engaging,
      context: initialContext,
      states: {
        engaging: {
          on: {
            Engage: engagedInCombat,
          },
        },
        engagedInCombat: {
          invoke: {
            src: "enemyAttacks",
          },
          on: {
            "": [
              { target: defeated, cond: "heroDead" },
              { target: victory, cond: "enemyDead" },
            ],
            Attacked: { actions: "defend" },
            Attack: { actions: "attack" },
          },
        },
        defeated: {},
        victory: {},
      },
    },
    {
      services: {
        enemyAttacks: (ctx) => (send) => {
          const interval = setInterval(() => {
            send({ type: "Attacked" });
          }, ctx.enemy.speed * 1000);

          return () => {
            clearInterval(interval);
          };
        },
      },
      actions: {
        defend: assign({
          hero: (ctx) => ({
            ...ctx.hero,
            health: ctx.hero.health - ctx.enemy.attack,
          }),
        }),
        attack: choose<BattleContext, BattleEvent>([
          {
            cond: (_, event) => event.type === "Attack" && event.success,
            actions: assign({
              enemy: (ctx) => ({
                ...ctx.enemy,
                health: ctx.enemy.health - ctx.hero.attack,
              }),
            }),
          },
          {
            cond: (_, event) => event.type === "Attack" && !event.success,
            actions: assign({
              hero: (ctx) => ({
                ...ctx.hero,
                health: ctx.hero.health - ctx.enemy.defense,
              }),
            }),
          },
        ]),
      },
      guards: {
        heroDead: (ctx) => ctx.hero.health <= 0,
        enemyDead: (ctx) => ctx.enemy.health <= 0,
      },
    }
  );
};
