import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {  ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from "react-icons/ai";
import Forget from './forget';

export default function Signin(){
   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    var handleShow = () => setShow(true);

  



    const handlesubmit = (event) =>{
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{"enctype":"multipart/form-data"}};

        axios.post('http://localhost:3000/Signin',datastring,config)
        .then(function(response){
            if(response.data.status === 'error'){
                alert('Query Error');
                window.location.href="./Signreg";
            } 
            else if(response.data.status === 'Success'){
                let userid = response.data.userid;
                localStorage.setItem("userid",userid);
                // alert('Logined');
                toast('Login success', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition:Zoom,
                    theme: "light",
                    type:'success',
                    });
                setTimeout(function(){
                    window.location.href="./Dashboard";
                },1900);
                // window.location.href="./Dashboard";
            } 
            else if(response.data.status === 'Invalid'){
                // alert('Invalid username and password');
                toast('Invalid password', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition:Zoom,
                    theme: "light",
                    type:'error',
                    });
                // setTimeout(function(){
                //     window.location.href="./Signreg";
                // },1900);
                // window.location.href="./Signreg";
            } 
            else{
                toast('Invalid username', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition:Zoom,
                    theme: "light",
                    type:'error',
                    });
                // alert('Contact Admin');
                // window.location.href="./Signreg";
            }
        })
        .catch(function(error){
            alert('Error');
            window.location.href="./Signreg";
        })

    }

    return(
        <>
        <div className="container-fluid">
        <ToastContainer />
            <div className="row">
            <div className="col-lg-3">&nbsp;</div>
            <div className="col-lg-6">
                <form onSubmit={handlesubmit}>
                <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan={2} className="text-center">Login Form</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><label>Username</label></td>
                                <td>
                                    <input type="text" name="username" id="username" className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Password</label></td>
                                <td>
                                    <input type="password" name="password" id="password" className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button type="submit" name="data_submit" id="data_submit"
                                    value="submit" className="btn btn-primary">
                                        Sign-in
                                    </button>&nbsp;
                                    <Link to="/">
                                    <button type="button" name="data_back" id="data_back"
                                    value="back" className="btn btn-danger">
                                        Go Back
                                    </button>
                                    </Link>
                                    <button type="button" onClick={handleShow} className="btn btn-success float-right">Forget Password</button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </form>
            </div>
            <div className="col-lg-3">&nbsp;</div>
            </div>
        </div>

        <Modal show={show} onHide={handleShow}>
        <Modal.Header>
    
          <Modal.Title className="text-center col-8">Forget Password</Modal.Title>
          <Button variant="secondary" onClick={handleClose}>
           <AiOutlineClose/>
          </Button>
        </Modal.Header>
        <Modal.Body>
           <Forget/>
        </Modal.Body>
        {/* <Modal.Footer> */}
        
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        {/* </Modal.Footer> */}
      </Modal>
        </>
    )
}