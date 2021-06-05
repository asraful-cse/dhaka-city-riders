import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Passable.css';
const Passable = (props) => {
    const { id, name, img } = props.passable;

    const history = useHistory();
    const showDestination = riderId => {
        const url = `destination/${riderId}`;
        history.push(url);

    }
    return (
        <div style={{ marginTop: '40px' }}>
            {/* <Link to={"/destination/" + id} style={{ textDecoration: 'none', color: "black" }}></Link> */}
                <Card className="card shadow m-3 " style={{ width: '14rem', backgroundColor: "rgb(40 157 173 / 31%)" }}>
                    <Card.Img className="passableImg" variant="top" src={img} />
                    <Card.Body className="text-center">
                        <Card.Title>{name}
                        </Card.Title>
                    </Card.Body>
                    <button style={{
                        marginLeft: '50px',
                        marginRight: '50px',
                        borderRadius: '100px',
                        marginBottom: '4px',
                        border: '1px solid lightGray',
                        backgroundColor: 'yellow',
                        color: 'green'
                    }}
                        onClick={() => showDestination(id)}>Ride Now</button>
                </Card>
        </div >
    );
};

export default Passable;