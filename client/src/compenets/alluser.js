import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './admin/Header';
import Menu from './admin/Menu';
import {useState,useEffect} from 'react';

export default function Alluser(){

    // let userid = localStorage.getItem('userid');
    const [userdetails,setUserdetails] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/alluser')
        .then(response=>response.json())
        .then(json=>setUserdetails(json));
    },[]);


    return(
        <>
        <div className="container-fluid">
            <div className="d-flex justify-content-between p-3">
                <Header />
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 "><Menu /></div>
                <div className="col-lg-9">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Fathername</th>
                                    <th>Date of Birth</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                userdetails.map((v,i)=>(
                                    <tr>
                                        <td>{v.name}</td>
                                        <td>{v.fathername}</td>
                                        <td>{v.date_of_birth}</td>
                                        <td>{v.email}</td>
                                        <td>{v.phone}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}