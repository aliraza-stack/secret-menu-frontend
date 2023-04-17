import React from "react";
import styles from "./About.module.css";
import { Row, Col } from "react-bootstrap";

function About() {
  return (
    <>
      <Row>
        <Col>
          <div className={styles.header}>
            <h1 className="fw-bold">Secret Menu</h1>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default About;