import React from 'react';
import CreatedCard from "./CreatedCard";
import Card from 'react-bootstrap/Card';

export default function CreatedCards({ DealsData, userid }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {DealsData.map(element => (
        element.user_id === userid ? (
          <Card key={element.id} style={{ width: '18rem', marginBottom: '20px' }}>
            <CreatedCard element={element} userid={userid} />
          </Card>
        ) : null
      ))}
    </div>
  );
}
