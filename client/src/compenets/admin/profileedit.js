import React from 'react';
import { Flip, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Profileedit(){
    let userid = localStorage.getItem('userid');
    const handlesubmit = (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{"enctype":"multipart/form-data"}};

        axios.post('http://localhost:3000/profileupload',datastring,config)
        .then(function(response){
            if(response.data.status === 'error'){
                // alert('Error');
                toast('Error', {
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
                // window.location.href="./Signreg";
            }
            else if(response.data.status === 'Uploaded'){
                // alert('Successfully Registered');
                toast('Uploaded', {
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
                // window.location.href="./Signreg";
            }
            else{
                alert('Contact Admin');
                // window.location.href="./Signreg";
            }
        })
        .catch(function(error){
            alert('Error');
            // window.location.href="./Signreg";
        })
    } 
    
    
    return(
    <>
        <div className='row'>
        <ToastContainer/>
            <form onSubmit={handlesubmit}>
            
                <table className='table table-bordered'>
                    <tbody>
                        <tr>
                            <td><lable>Add Profile Image</lable></td>
                            <td>
                                <input type='file' name='profile' id="profile" className='form-control'/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className='text-center'>
                                <input type='hidden' id="id" name="id" value={userid}/>
                                <input type='submit' value="Upload" className='btn btn-primary'/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

        </div>
    </>
    )
}