import React, { useEffect, useState } from 'react';
import fakeData from '.././fakeData/data.json';
import Passable from '../Passable/Passable';
const Home = () => {
    const [passables , setPassables] = useState([]);
    useEffect(() => {
        setPassables(fakeData)
        // console.log(fakeData);
    }, [])
    return (
        <div className="justify-content-center" style={{ backgroundColor: "#0f3528", minHeight: "100vh", marginTop: '-40px' }}>
            <div className="container">
                <div className="d-flex flex-wrap justify-content-center" style={{ boxShadow: '1px 3px 4px 6px' }}>
                    {
                        passables.map(passable => <Passable passable={passable}></Passable>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;