export type Speed = 15 | 10 | 5;

export type Attack = 0 | 1 | 2 | 3 | 4 | 5;

export type Defense = 0 | 1 | 2 | 3 | 4 | 5;

export type Difficulty = (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10)[];

export type Enemy = BaseStats & {
  speed: Speed;
  picture: string;
  difficulty: Difficulty;
};

export type Hero = BaseStats & {
  type: string;
};

export type BaseStats = {
  health: number;
  attack: Attack;
  defense: Defense;
};
