import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function DealCard({ element, userid }) {
    async function handleButtonClick(event) {

        let url = `${process.env.REACT_APP_SERVER_URL}/claimDeal`;

        let data = {
            dealId: event.id,
            userId: userid,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const receivedData = await response.json();

        if (response.status === 201) {
            const userData = receivedData;
            alert("Deal claimed successfully!");

            // Set data as a cookie with a 15-minute expiration time
        } else if (response.status === 401) {
            alert("Invalid email or password");
        }
    };
    console.log(element);
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text>
                        {element.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item> amount : {element.amount}</ListGroup.Item>
                    <ListGroup.Item> currency : {element.currency},</ListGroup.Item>
                    <ListGroup.Item> status : {element.status},</ListGroup.Item>
                    <ListGroup.Item> Deal Maker  : {element.username},</ListGroup.Item>

                </ListGroup>
                {element.status === "Active" ? (
                    <Card.Body>
                        <Button variant="primary" onClick={() => handleButtonClick(element)}>Claim Deal</Button>
                    </Card.Body>
                ) : (
                    <>

                    </>
                )}

            </Card>
        </>
    )
}