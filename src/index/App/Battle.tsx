import { useMachine } from "@xstate/react";
import React from "react";
import { Hero, Enemy } from "../shared/models";
import { Battleground } from "./Battle/Battleground";
import {
  createBattleMachine,
  engaging,
  engagedInCombat,
  defeated,
  victory,
} from "./Battle/BattleMachine";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BattleCard from "../shared/BattleCard"

type BattleProps = {
  hero: Hero;
  enemy: Enemy;
};

// export const PreBattleScreen = () => {
//   return (

//   )
// }

export const Battle = ({ hero, enemy }: BattleProps) => {
  const machine = createBattleMachine({ hero, enemy });
  const [state, send] = useMachine(machine);

  switch (state.value) {
    case engaging:
      return <Container>
        <Row>
          <Col className="text-center">
            <BattleCard height={400} character={state.context.hero} />
          </Col>
          <Col className="text-center">
            <BattleCard height={400} character={state.context.enemy} />
          </Col>
        </Row>
        <Row>
          <button onClick={() => send({ type: "Engage" })}>FIGHT!</button>;
        </Row>
      </Container>
    case engagedInCombat:
      return (
        <Battleground
          hero={state.context.hero}
          enemy={state.context.enemy}
          onFailedAttack={() => send({ type: "Attack", success: false })}
          onSuccessfulAttack={() => send({ type: "Attack", success: true })}
        />
      );
    case defeated:
      return <div>YOU HAVE DIED</div>;
    case victory:
      return <Container>
      <Row>
        <h1>You have killed the monster</h1>
      </Row>
    </Container>
    default:
      return <></>;
  }
};
