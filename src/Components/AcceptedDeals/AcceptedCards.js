import React from 'react';
import AcceptedCard from "./AcceptedCard";
import Card from 'react-bootstrap/Card';

export default function AcceptedCards({ DealsData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {DealsData.map(element => (
        <Card key={element.id} style={{ width: '18rem', marginBottom: '20px' }}>
          <AcceptedCard element={element} />
        </Card>
      ))}
    </div>
  );
}
