import React, { useState } from "react";
import { Hero, Enemy } from "../../shared/models";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BattleCard from "../../shared/BattleCard";

const pickOne = (numbers: number[]): number => {
  return numbers[Math.floor(Math.random() * numbers.length)];
};

const nextSum = (enemy: Enemy): Sum => {
  const first = pickOne([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const second = pickOne(enemy.difficulty);
  return {
    first,
    second,
    answer: first * second,
  };
};

type Sum = {
  first: number;
  second: number;
  answer: number;
};

type BattlegroundState = {
  sum: Sum;
  guess: string | number;
};

type BattlegroundProps = {
  hero: Hero;
  enemy: Enemy;
  onSuccessfulAttack: () => void;
  onFailedAttack: () => void;
};

export const Battleground = ({
  hero,
  enemy,
  onSuccessfulAttack,
  onFailedAttack,
}: BattlegroundProps) => {
  const [state, setState] = useState<BattlegroundState>({
    sum: nextSum(enemy),
    guess: "",
  });

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <BattleCard height={400} character={hero} />
        </Col>
        <Col className="text-center">
          <BattleCard height={400} character={enemy} />
        </Col>
      </Row>
      <Row className="rounded border border-black p-5" style={{borderWidth: "4px!important"}}>
        <Col className="display-3">{state.sum.first}</Col>
        <Col className="display-4">x</Col>
        <Col className="display-3">{state.sum.second}</Col>
        <Col className="display-4">=</Col>
        <Col className="display-3">
          <input
            type="number"
            style={{width: "200px"}}
            value={state.guess}
            autoFocus
            onChange={(e) =>
              setState({ ...state, guess: parseInt(e.target.value) })
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (state.guess === state.sum.answer) {
                  onSuccessfulAttack();
                  setState({ ...state, guess: "", sum: nextSum(enemy) });
                } else {
                  onFailedAttack();
                  setState({ ...state, guess: "" });
                }
              }
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};
