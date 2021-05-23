import React from 'react'
import NotePic from "../../Pictures/note.png";
import { FaCloud } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="homeContainer">
                <div className="homeBox">
                    <div className="introDiv">
                        <h1>Weclome to <span>Note's Cloud</span> </h1>
                        <h2>Where you can create your</h2>
                        <h2><span>Awesome Notes !</span></h2>
                        <h3>Just Register and save all the notes in the <span><FaCloud/></span></h3>
                        <Link to='/register'>
                        <button>Register Now</button>
                        </Link>

                    </div>
                    <div className="picDiv">
                        <figure>
                            <img src={NotePic} alt="Note Pic" className='homePic picAnimation2'/>
                        </figure>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
