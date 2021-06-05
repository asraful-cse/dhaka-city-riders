import React, { useState } from 'react';
import { useParams } from 'react-router';
import fakeData from '../fakeData/data.json';
//font awesome use''''
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Destination = () => {

    const [item, setItem] = useState(false)
    const [place, setPlace] = useState({
        from: "",
        to: ""
    })
    // // using useParams '''
    const { riderId } = useParams();
    const passable = fakeData.find(passable => passable.id === parseInt(riderId));
    console.log(passable);

    //  // using blur handle''''
    const handleBlur = (event) => {
        console.log(event.target.name);
        let isFieldValid = true;
        if (event.target.name === "from") {
            isFieldValid = event.target.value;
        }
        if (event.target.name === "to") {
            isFieldValid = event.target.value;
        }
        if (isFieldValid) {
            const newPlace = { ...place };
            newPlace[event.target.name] = event.target.value;
            setPlace(newPlace);
        }
    };

    return (

        <div className="container" style={{ backgroundColor: 'rgb(33 187 228 / 22%)' }}>
            <div className="row d-flex p-5" style={{ backgroundColor: 'rgb(33 187 228 / 22%)' }}>
                <div className="col-md-4" >
                    {
                        !item && <div style={{ backgroundColor: "#EFEFEF", border: "1px solid #EFEFEF", borderRadius: "8px" }}>
                            <div className="m-3">
                                <h6 style={{ color: 'green', marginTop: '10px' }}>1. Select your destination?</h6>
                                <label className="form-label">Pick From</label>
                                <input type="text" onBlur={handleBlur} className="form-control" placeholder="Pick from" name="from" required />
                            </div>
                            <div className="m-3">
                                <label className="form-label">Pick To</label>
                                <input type="text" onBlur={handleBlur} className="form-control" placeholder="Pick to" name="to" required />
                            </div>
                            <div className="m-3">
                                <h6 style={{ color: 'green', marginTop: '20px' }}>2. Select your ride or return date?</h6>
                                <label className="form-label">Rides Date</label>
                                <input type="date" className="form-control" name="Travel" />
                            </div>
                            <div className="m-3">
                                <label className="form-label">Return Date</label>
                                <input type="date" className="form-control" name="Return" />
                            </div>
                            <div className="m-3">
                                <button onClick={() => setItem(!item)} className="btn btn-info w-100 form-btn">Process</button>
                            </div>
                        </div>
                    }

                    {
                        item && <div style={{ backgroundColor: "rgb(34 121 111 / 73%)", border: "1px solid rgb(152 239 100)", borderRadius: "100px", boxShadow: '0px 3px 5px 9px' }}>
                            <div class="card m-2" style={{ backgroundColor: "#FF6E40" }} >
                                <div class="card-body text-capitalize" style={{ color: "white" }}>
                                    <h5>From: {place.from}</h5>
                                    <h5>To: {place.to}</h5>
                                </div>
                            </div>
                            <div class="card mb-3 card text-center m-2" style={{ maxWidth: "500px" }}>
                                <div class="row g-0">
                                    <div class="col-md-4 p-3">
                                        {item && <img style={{ width: "60px" }} src={passable.img} alt="" />}
                                    </div>
                                    <div class="col-md-4 p-4">
                                        <h6 class="card-title">  {passable.name} <FontAwesomeIcon icon={faUser} /></h6>
                                    </div>
                                    <div class="col-md-4 p-4">
                                        <h6 class="card-title"><p style={{ color: 'green' }}><small>VIP</small></p>
                                            <h5 style={{
                                                color: "yellow",
                                                backgroundColor: 'black',
                                                border: '1px solid lightGray',
                                                borderRadius: '5px'
                                            }}>৳ 900</h5></h6>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3 card text-center m-2" style={{ maxWidth: "500px" }}>
                                <div class="row g-0">
                                    <div class="col-md-4 p-3">
                                        {item && <img style={{ width: "55px" }} src={passable.img} alt="" />}
                                    </div>
                                    <div class="col-md-4 p-4">
                                        <h6 class="card-title">{passable.name}    <FontAwesomeIcon icon={faUserFriends} /></h6>
                                    </div>
                                    <div class="col-md-4 p-4">
                                        <h6 class="card-title"><p style={{ color: 'blue' }}><small>Classic</small></p>
                                            <h5 style={{
                                                color: "yellow",
                                                backgroundColor: 'black',
                                                border: '1px solid lightGray',
                                                borderRadius: '5px'
                                            }}>৳ 650</h5></h6>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3 card text-center m-2" style={{ maxWidth: "500px" }}>
                                <div class="row g-0">
                                    <div class="col-md-4 p-3">
                                        {item && <img style={{ width: "40px" }} src={passable.img} alt="" />}
                                    </div>
                                    <div class="col-md-4 p-4">
                                        <h6 class="card-title">{passable.name}    <FontAwesomeIcon icon={faUsers} /></h6>
                                    </div>
                                    <div class="col-md-4 p-4">
                                        <h6 class="card-title" ><p style={{ color: 'lightGray' }}><small>Normal</small></p>
                                            <h5 style={{
                                                color: "yellow",
                                                backgroundColor: 'black',
                                                border: '1px solid lightGray',
                                                borderRadius: '5px'
                                            }}>৳ 360</h5></h6>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </div>
                <div className="col-md-8">
                    {/* <iframe src="https://www.google.com/maps/place/Dhanmondi,+Dhaka+1205/@23.7470304,90.3671072,15z/data=!3m1!4b1!4m5!3m4!1s0x3755b8b33cffc3fb:0x4a826f475fd312af!8m2!3d23.7461495!4d90.3742307"
                        width="650" height="471"
                        style={{
                            border: '3px solid yellow',
                            borderRadius:'10px'
                        }} allowfullscreen="" loading="lazy"></iframe> */}
                          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223908687!2d90.27923710646989!3d23.780887457084543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1616325694859!5m2!1sen!2sbd" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    );
};

export default Destination;