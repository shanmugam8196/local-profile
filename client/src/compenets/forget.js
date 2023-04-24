import React from 'react'
import axios from 'axios';
import { Flip,Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Forget(){


    const handlesubmit=(event)=>{
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{"enctype":"multipart/form-data"}};

        axios.post('http://localhost:3000/Forget',datastring,config)
        .then(function(response){
            if(response.data.status === 'error'){
                alert('Query Error');
                // window.location.href="./Signreg";
            } 
            else if(response.data.status === 'Success'){
                // let userid = response.data.userid;
                // localStorage.setItem("userid",userid);
                // alert('Logined');
                toast('Password Reset successfull', {
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
                    window.location.href="./Signin";
                },1900);
                // window.location.href="./Dashboard";
            } 
            else if(response.data.status === 'Invalid'){
                // alert('Invalid username and password');
                toast('Invalid Email', {
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
            <div className='container-fluid'>
               <form onSubmit={handlesubmit}>
                    <div className='table table-responsive'>
                        <table className='table table-bordered'>
                            <tbody>
                                 <tr>
                                    <td>
                                         <lable className="">Email id</lable>
                                    </td>
                                    <td>
                                         <input type='email' name="email" id="email" className='form-control'/> 
                                    </td>
                                 </tr>
                                 <tr>
                                    <td>
                                         <lable className="">Password</lable>
                                    </td>
                                    <td>
                                         <input type='text' name="password" id="password" className='form-control'/> 
                                    </td>
                                 </tr>
                                 <tr  className='text-center'>
                                        <td colspan={2}>
                                           <input type='submit' value="Reset" className='btn btn-primary w-25 text-center'/>
                                        </td>
                                 </tr>
                            </tbody>
                        </table>
                    
                    </div>
                </form>
            </div>
        </>
    )
}