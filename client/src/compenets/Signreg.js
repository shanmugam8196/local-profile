
import {useState,useEffect} from 'react';
import Signup from './Signup';
import Signin from './Signin';

export default function Signreg(){

    // localStorage.clear();

    const [checkstatus, setCheckstatus] = useState(localStorage.getItem('userid'));
    //    console.log(checkstatus);
//     setCheckstatus(localStorage.getItem('userid'));
//  console.log(checkstatus);
    // useEffect(()=>{
    //     fetch('http://localhost:3000/Checkstatus')
    //     .then(response=>response.json())
    //     .then(json=>setCheckstatus(json.status));
    // },[]);
    


    return(
        <>
        {checkstatus == null ? (
            <Signup />
        ) : (
            <Signin />
        )}
        </>
    )
}