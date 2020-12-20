require('dotenv').config();
const clarifai = require('clarifai');
require('dotenv').config()
const app = new Clarifai.App({
 apiKey: process.env.API_KEY
});
const handleApiCall = (req,res)=>
{

 app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
            .then(data => res.json(data))
            .catch(err => res.status(400).json("unable to work with API"))
}
const imageHandler = (req,res,db)=>
{
	const {id} = req.body;
	// let found = false;
	db('users')  
       .where({id})
       .increment('entries',1)
       .returning('entries')
       .then(count =>{
       	           if(count.length)
			        {
			        		res.json(count[0])
			        }
			        else
			        {
			        	res.status(400).json('unable to get entries')
			        }
       })

      
  }

 module.exports ={
 	handleImage : imageHandler,
 	handleApiCall
 }