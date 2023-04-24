import React, { useState ,useEffect} from 'react';
import axios from 'axios'
import { Flip,Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
    let userid = localStorage.getItem('userid');
    // const {id} = useParams();
    const [id,setId] = useState('');
    const [username,setUsername] = useState('');
    const [fathername,setFathername] = useState('');
    const [email,setEmail] = useState('');
    const [dob,setDob] = useState('');

    const [phone,setPhone] = useState('');

    useEffect(()=>{
        // console.warn(id);

        fetch("http://localhost:3000/Get_userdetails/"+userid)
        .then((response) => response.json())
        .then((response)=>{
            setId(response[0].id);
            setUsername(response[0].username);
            setFathername(response[0].fathername);
            setEmail(response[0].email);
            setDob(response[0].date_of_birth);
            setPhone(response[0].phone);
        })
    },[]);

    const handlesubmit = async(event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers : {"enctype":"multipart/form-data"}};

        await axios.post('http://localhost:3000/Update',datastring,config)
              .then(function(res){
                if(res.data.status === 'success'){
                    toast('Updated', {
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
                    // alert('Updated');
                    // window.location.href="/Dashboard";
                }
                else if(res.data.status === 'error'){
                    toast('Not Updated', {
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
                    // alert('Not Updated');
                    // window.location.href="/";
                }
              })
              .catch(function(error){
                    alert(error);
                    // window.location.href="/";
              })

    }

  return (
    <>
    <div className="container-fluid">
                <ToastContainer/>
                <form onSubmit={handlesubmit}>
                <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                  
                        <tbody>
                            <tr>
                                <td><label>Username</label></td>
                                <td>
                                    <input type='hidden' id="id" name="id" value={userid} onChange={(e)=> setId(e.target.value)}/>
                                    <input type="text" name="username" id="username" value={username} onChange={(e)=> setUsername(e.target.value)} className="form-control"/>
                                </td>
                            </tr>
                            {/* <tr>
                                <td><label>Password</label></td>
                                <td>
                                    <input type="password" name="password" id="password" className="form-control"/>
                                </td>
                            </tr> */}
                            {/* <tr>
                                <td><label>Name</label></td>
                                <td>
                                    <input type="text" name="name" id="name" className="form-control"/>
                                </td>
                            </tr> */}
                            <tr>
                                <td><label>Father Name</label></td>
                                <td>
                                 
                                    <input type="text" name="fathername" id="fathername" value={fathername} onChange={(e)=> setFathername(e.target.value)} className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>DOB</label></td>
                                <td>
                                    <input type="text" name="date_of_birth" id="date_of_birth" value={dob} onChange={(e)=> setDob(e.target.value)} className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Email ID</label></td>
                                <td>
                                    <input type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Phone</label></td>
                                <td>
                                    <input type="number" name="phone" id="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className='text-center'>
                                    <button type="submit" name="data_submit" id="data_submit"
                                    value="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </form>
           
        </div>
 
    

    </>
  );
}

