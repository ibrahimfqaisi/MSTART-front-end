import React from 'react';
import DealGridCard from "./DealGridCard";
import Card from 'react-bootstrap/Card';

export default function DealsGridCards({ DealsData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {DealsData.map(element => (
        <Card key={element.id} style={{ width: '18rem', marginBottom: '20px' }}>
          <DealGridCard element={element} />
        </Card>
      ))}
    </div>
  );
}
