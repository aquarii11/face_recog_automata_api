




const handleRegister = (req,res,db,bcrypt)=>{
    			const {email,password,name} = req.body;
    			if(!email || !name || !password)
    			{
    				return res.status(400).json("incorrect form submission")
    			}
    			const hash = bcrypt.hashSync(password)
			    db.transaction(trx =>{
										    	trx.insert({
										    		hash,
										    		email
										    	})
										    	.into('login')
										    	.returning('email')
										    	.then(loginEmail =>
										    	{
										    		    return  trx('users')
										                .returning(['id','name','email','entries','joined'])
										   				.insert({name:name,
										                       email:loginEmail[0],
										                       joined:new Date()})
										               .then(user =>  {
												                res.json(user[0])
										               			})
			               								.catch(err =>res.json("user already exists"))
			   					 				})
			   					 				.then(trx.commit)
			                            		.catch(err => {
			                            			       res.json("user already exists")
			                            			       trx.rollback
			                            		}
			                            			)

										})

}

module.exports ={
   handleRegister :handleRegister

}