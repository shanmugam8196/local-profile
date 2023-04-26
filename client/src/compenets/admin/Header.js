import axios from "axios";
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import user from '../admin/img/user.png'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Edit from "./edit";
import './header.css'
import { AiOutlineClose } from "react-icons/ai";
import Profileedit from "./profileedit";


export default function Header(){

    let userid = localStorage.getItem('userid');
    let [username,setUsername] = useState('');

    useEffect(()=>{
        fetch('http://localhost:3000/View_par_user/'+userid)
        .then(response=>response.json())
        .then(json=>setUsername(json.status))
    },[]);

    // let userid = localStorage.getItem('userid');
    const [userdetails,setUserdetails] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/Get_userdetails/'+userid)
        .then(response=>response.json())
        .then(json=>setUserdetails(json));
    },[]);
 let image="";
    userdetails.map((v,i)=>{
        console.log(v.name,v.fathername);
        image=v.url + "/" +v.profile;

    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    var handleShow = () => setShow(true);

    const [profile, setProfile] = useState(false);
    const profileClose = () => setProfile(false);
    var profileShow = () => setProfile(true);

    return(
        <>
       
        <div className="">
                <label>User Dashboard</label>
         </div>
                <div className="">

                 <Dropdown className="d-flex float-right " as={ButtonGroup}>
                        <Dropdown.Toggle className="text-white bg-white btn-outline-light" split variant="" id="dropdown-split-basic">

                            <img src={image} height={50} width={50} className="rounded-circle"/>
                            </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="bg-white  form-control col-12">{username}</Dropdown.Item>
                            <Dropdown.Item className="bg-white  form-control col-12">
                                 <button type="button" onClick={profileShow} className="btn btn-success">Change Profile</button>

                            </Dropdown.Item>
                            <Dropdown.Item  className="bg-white form-control col-12"> 
                                <button type="button" onClick={handleShow} className="btn btn-success w-100">Edit</button>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                            <Dropdown.Item  className="bg-white form-control col-12"> <Link to="/Signreg">
                                <button type="button" className="btn btn-danger w-100">Logout</button>
                            </Link></Dropdown.Item>
                        </Dropdown.Menu>
               
                  </Dropdown>
                  
                </div>  

                <Modal show={show} onHide={handleShow}>
                      <Modal.Header>
                         <Modal.Title className="text-center col-8">Profile Details Edit</Modal.Title>
                            <Button variant="danger" onClick={handleClose}>
                                <AiOutlineClose/>
                             </Button>
                       </Modal.Header>
                       <Modal.Body>
                             <Edit/>
                      </Modal.Body>
                 </Modal>

                 <Modal show={profile} onHide={profileShow}>
                      <Modal.Header>
                         <Modal.Title className="text-center col-8">Profile Photo Edit</Modal.Title>
                            <Button variant="danger" onClick={profileClose}>
                                <AiOutlineClose/>
                            </Button>
                       </Modal.Header>
                       <Modal.Body>
                             <Profileedit/>
                      </Modal.Body>
                 </Modal>
              
        {/* <div className="col-lg-3">
            <label>Resume</label>
        </div>
        <div className="col-lg-6">&nbsp;</div>
        <div className="col-lg-3">
            <label>{username}</label>
            <Link to="/Signreg">
                <button type="button" className="btn btn-danger">Logout</button>
            </Link>
        </div> */}
        </>
    )
}