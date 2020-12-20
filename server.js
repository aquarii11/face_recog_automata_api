const express  = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors  = require('cors');
const knex =  require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
const users = require('./controllers/users.js');
const PORT = process.env.PORT
const db = knex({
   client: 'pg',
 connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});
const app = express();
app.use(bodyParser.json())
app.use(cors())

const database = {
	users:[

        {
        	id:'123',
        	name:'John',
        	email:'john@gmail.com',
        	password:'cookies',
        	entries:0,
        	joined:new Date()
        },
        {
        	id:'124',
        	name:'sally',
        	email:'sally@gmail.com',
        	password:'cookies',
        	entries:0,
        	joined:new Date()
        }
	],
	login:[

         {
         	id:"987",
         	has:'',
         	email:'john@gmail.com'
         }
  
	]
}
app.get('/',(req,res)=>{users.handleUsers(req,res,db)})
app.get('/profile/:id',(req,res)=>{profile.profileHandlerGet(req,res,db)})
app.post('/signin',signin.signinHandler(db,bcrypt))
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})			    
app.put('/image',(req,res) =>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})
app.listen(PORT,()=>{
	console.log(`app is running on port ${PORT}`)
	
})
      	
	// bcrypt.compare("cookies", '$2a$10$MlT02PC95GHg81Q0klL8f.in4kj3Oa6CKCHpzR.bfVq2hJSZPqMYq' , function(err, res) {
 //    // res == true
 //       console.log('first guess',res)
	// });
	// bcrypt.compare("veggies", '$2a$10$MlT02PC95GHg81Q0klL8f.in4kj3Oa6CKCHpzR.bfVq2hJSZPqMYq', function(err, res) {
 //    // res = false
 //        console.log('second guess',res)
	// });
	// if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
	// {
 //        res.json(database.users[0])
	// }
	// else 
	// {
	// 	res.status(400).json('error logging in')
	// }


    
       
	// database.users.forEach((user)=>{
 //       if(user.id === id)
 //       {
 //       	  found = true;
 //       	  user.entries ++;
 //       	  return res.json(user.entries)
 //       }
	// })
	// if(!found)
	// {
	// 	res.status(400).json("not found")
	// }


