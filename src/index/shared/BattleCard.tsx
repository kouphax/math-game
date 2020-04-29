import React from "react";
import { BaseStats } from "./models";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type BattleCardProps = {
  height: number;
  character: BaseStats;
};

const BattleCard = ({ height, character }: BattleCardProps) => {
  const width = (height / 7) * 5;
  return (
    <Card
      border="dark"
      className="m-5"
      style={{ height: `${height}px`, width: `${width}px`, borderWidth: "4px" }}
    >
      <Card.Body>
        <Container className="h-100">
          <Row className="h-50">
            <Col
              className="m-1 rounded"
              style={{ border: "3px solid black" }}
            ></Col>
          </Row>
          <Row className="h-50">
            <Col>
              <Row className="h-25"></Row>
              <Container className="h-100">
                <Row className="h-25">
                  <Col>Health</Col>
                  <Col className="text-right">{character.health}</Col>
                </Row>
                <Row className="h-25">
                  <Col>Attack</Col>
                  <Col className="text-right">{character.attack}</Col>
                </Row>
                <Row className="h-25">
                  <Col>Defense</Col>
                  <Col className="text-right">{character.defense}</Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default BattleCard;
