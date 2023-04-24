import {Link} from 'react-router-dom';

export default function Menu(){
    return(
        <>
        <Link to="/Dashboard">Home</Link><br/>
        <Link to="/Profilephoto">Profile Photo</Link> <br/>
        <Link to="/alluser">All User Details</Link>
        </>
    )
}