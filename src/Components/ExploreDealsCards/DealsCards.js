import DealCard from "./DealCard";

export default function DealsCards({ DealsData, userid }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {DealsData.map(element => (
        element.user_id !== userid && element.status !== "Deleted" && element.status !== "Inactive" ? (
          <DealCard key={element.id} element={element} userid={userid} />
        ) : null
      ))}
    </div>
  );
}
