import React, { useState, useEffect } from "react";
import { ListGroup, Card } from 'react-bootstrap';

interface Props {
  classLabels: string[];
  colors: string[];
}

function ClassListCard({classLabels, colors}: Props) {
  return (
    <Card>

      <Card.Header>
        <Card.Title as="h4">Model Categories</Card.Title>
        <p className="card-category">These categories are read from the model</p>
      </Card.Header>

      <Card.Body>
        <div style={{overflowY: 'auto', maxHeight: '300px', marginTop: '5px' }}>
          <ListGroup>
            {
              classLabels.map((x,i) => <ListGroup.Item style={{backgroundColor: colors[i % colors.length], color:"#fdf0d1"}} key={i}>{x}</ListGroup.Item>)
            }
          </ListGroup>
        </div>
      </Card.Body>

      <Card.Footer>
        <hr></hr>
        <div className="stats">
          Categories are updated when a new image is uploaded
        </div>
      </Card.Footer>

    </ Card>

  );
}

export default ClassListCard;