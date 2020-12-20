const profileHandler = (req,res,db)=>{
   const {id} = req.params;
   // let found = false;
   // db.users.forEach(user =>
   // {
   // 	   if(user.id === id)
   // 	   {
   // 	   	  found = true;
   // 	   	  return res.json(user)
   // 	   }
   	  
   	   
   // })
   db('users')  
                
                .select('id','name','email','entries','joined')
                .where({id})
   			    .then(user =>  {
   			    	  // found  = true;
             //          console.log(found)
                    if(user.length)
                    {

   			    	  res.json(user[0])
                    }
                    else
                    {
                    	 res.status(400).json('user not found')
                    }
   			    })
   			    
   
   // if(!found)
   // 	   {

   // 	   	res.status(404).json("not found")
   	   
   // 	   }

}

module.exports  = {
  profileHandlerGet :profileHandler
}