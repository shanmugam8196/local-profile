import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Menu from './Menu';
import axios from 'axios';
import {useState,useEffect} from 'react';

export default function Profilephoto(){

    let userid = localStorage.getItem('userid');

    const [viewphoto,setViewphoto] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/View_profilephoto/'+userid)
        .then(response=>response.json())
        .then(json=>setViewphoto(json));
    },[]);

    const handlesubmit = (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{"enctype":"multipart/form-data"}};

        axios.post('http://localhost:3000/Add_profilephoto',datastring,config)
        .then(function(response){
            if(response.data.status === 'error'){
                alert('Error');
                window.location.reload();
            }
            else if(response.data.status === 'uploaded'){
                alert('File Uploaded');
                window.location.reload();
            }
            else{
                alert('Contact Admin');
                window.location.reload();
            }
        })
        .catch(function(error){
            alert(error);
            window.location.reload();
        })

    }

    return(
        <>
        <div className="container-fluid">
            <div className="d-flex justify-content-between p-3">
                <Header />
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3"><Menu /></div>
                <div className="col-lg-9">
                    <form onSubmit={handlesubmit}>
                    <div className="table-responsive mt-3">
                        <table width={50} className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan={2}>Profile Photo</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Photo</td>
                            <td>
                                <input type="hidden" name="userid" id="userid" value={userid}/>
                                <input type="file" name="image" id="image" className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Alteration Tag</td>
                            <td>
                                <input type="text" name="alt_text" id="alt_text" className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit" name="data_submit" id="data_submit"
                                className="btn btn-primary" value="submit">
                                    Submit
                                </button>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                    </form>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Alteration Text</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    viewphoto.map((v,i)=>(
                                        <tr>
                                            <td><img src={v.url+'/'+v.filename} alt={v.alt_text} height="200" width="200"/></td>
                                            <td>{v.alt_text}</td>
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