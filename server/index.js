const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mycon = require('mysql');
const fileupload = require('express-fileupload');
// var localStorage = require('localStorage')

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(fileupload());
app.use(express.static('public'));


const c = mycon.createConnection({
    host : "127.0.0.1",
    port : "3306",
    user : "aduser",
    password : "aduser",
    database : "resume"
});

// host : "mysql8.us.freehostia.com",
// port : "3307",
// user : "sharaj11_ei",
// password : "Shanmugam@123",
// database : "sharaj11_ei"

c.connect(function(error){
    if(error){console.log(error);}
    else{console.log('Database Connected');}
})

app.get('/Checkstatus',(request,response)=>{

    let sql = 'select * from regstatus';

    c.query(sql,(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let status = result[0].regstate;
        
            let s = {"status":status};
            response.send(s);
        }
    })
})

app.get('/alluser',(request,response)=>{

    let sql = 'select * from signup';

    c.query(sql,(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
          
            response.send(result);
        }
    })
})

app.post('/Registration',(request,response)=>{
    let imagefile = request.files.profile;
    let filename = imagefile.name;
    let path = __dirname+'/public/upload/'+imagefile.name;
    let url = 'http://localhost:3000/upload';

    let {username,password,name,fathername,date_of_birth,email,phone} = request.body;

    let sql = 'insert into signup(username,password,name,fathername,date_of_birth,email,phone,status,profile,url) values (?,?,?,?,?,?,?,?,?,?)';

    let sql1 = 'update regstatus set regstate=?';

    c.query(sql1,[1],(error1,result1)=>{})

    c.query(sql,[username,password,name,fathername,date_of_birth,email,phone,0,filename,url],(error,result)=>{
        // if(error){
        //     let s = {"status":"error"};
        //     response.send(s);
        // }
        // else{
         
        //     let s = {"status":"Registered"};
        //     // result.cookie(`Id`,1);
        //     // console.log(req.cookies)
        //     response.send(s);
        // }
    })
    imagefile.mv(path, function(err) {
        if (err){
          let s = {"status":"error"};
          response.send(s);
        }
        else{
            let s = {"status":"Registered"};
            response.send(s);
        }
      });

})

app.post('/Forget',(request,response)=>{
    let {email,password}=request.body;
    let sql1='update signup set password=? where email=?';
    let sql = 'select * from signup where email=?';
    c.query(sql,[email],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else if(result.length > 0){
          
            let id = result[0].id;
            let email1 = result[0].email;
            if(email1==email){
                c.query(sql1,[password,email],(error,result)=>{

                })

                let s = {"status":"Success"};
                response.send(s);
            }
            else{
                let s = {"status":"Invalid"};
                response.send(s);
            }
        }
        else{
            let s ={"status":"Invalid"};
            // console.log(s);
            response.send(s);
        }
    })
})

app.post('/Signin',(request,response)=>{
    let {username,password} = request.body;
    let sql = 'select * from signup where username=?';

    c.query(sql,[username],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else if(result.length > 0){

            let id = result[0].id;
            let username1 = result[0].username;
            let password1 = result[0].password;
            if(username1 == username && password1 == password){
                let s = {"status":"Success","userid":id};
                // localStorage.setItem('myKey');
                // localStorage.setItem("id",id)
                // cookie.set("userData", id);
                // response.send('user data added to cookie');
                response.send(s);
            }
            else{
                let s = {"status":"Invalid"};
                response.send(s);
            }
        }
        else{
            let s ={"status":"final_error"};
            response.send(s);
        }
    })

})

app.get('/View_par_user/:id',(request,response)=>{
    let {id} = request.params;
    let sql = 'select * from signup where id=?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let name = result[0].name;
            let s = {"status":name};
            response.send(s);
        }
    })

})

app.get('/Get_userdetails/:id',(request,response)=>{
    let {id} = request.params;
    let sql = 'select * from signup where id=?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            response.send(result);
        }
    })   
})

app.post('/Add_profilephoto',(request,response)=>{
    let userid = request.body.userid;
    let alt_text = request.body.alt_text;
    let imagefile = request.files.image;
    let filename = imagefile.name;
    let path = __dirname+'/public/upload/'+imagefile.name;

    let url = 'http://localhost:3000/upload';

    let sql = 'insert into profilephoto(userid,url,filename,alt_text,status)values(?,?,?,?,?)';

    c.query(sql,[userid,url,filename,alt_text,0],(error,result)=>{});

    imagefile.mv(path, function(err) {
        if (err){
          let s = {"status":"error"};
          response.send(s);
        }
        else{
            let s = {"status":"uploaded"};
            response.send(s);
        }
      });

})

app.get('/View_profilephoto/:userid',(request,response)=>{
    let {userid} = request.params;
    let sql = 'select * from profilephoto';
    c.query(sql,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})

app.post('/Update',(request,response)=>{
    let {username,fathername,date_of_birth,email,phone,id} = request.body;
    
    let sql = `update signup set username=?,fathername=?,date_of_birth=?,email=?,phone=? where id=?`;

    c.query(sql,[username,fathername,date_of_birth,email,phone,id],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"success"};
            response.send(s);
        }
    })

})


app.post('/profileupload',(request,response)=>{
    // let userid = localStorage.getItem('userid');
    let userid = request.body.id;
    let imagefile = request.files.profile;
    let filename = imagefile.name;
    let path = __dirname+'/public/upload/'+imagefile.name;
    let url = 'http://localhost:3000/upload';
    console.log(userid);
    let sql = `update signup set profile=?,url=? where id=?`;

    c.query(sql,[filename,url,userid],(error,result)=>{
        if (error){
            let s = {"status":"error"};
            response.send(s);
          }
          else{
              let s = {"status":"Uploaded"};
              response.send(s);
          }
    })

    imagefile.mv(path, function(err) {
        // if (err){
        //   let s = {"status":"error"};
        //   response.send(s);
        // }
        // else{
        //     let s = {"status":"Uploaded"};
        //     // console.log(s);
        //     response.send(s);
        // }
      });

})



app.listen(3000, ()=>{console.log('Port number running in 3000')});