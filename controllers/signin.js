const signinHandler = (db,bcrypt)=> (req,res) =>
{
	const {email,password} = req.body;
    if(!email || !password)
    {
          return res.status(400).json("incorrect form submission")
    }
    db.select('email','hash').from('login').where('email','=',email)
      .then(data =>
        { 
             if(data)
             {   

             	    const isValid = bcrypt.compareSync(req.body.password,data[0].hash)
		             if(isValid)
		             {
		             	 return db.select('*').from('users').where('email','=',email)
		             	     .then(user => res.json(user[0]))
		             	     .catch(err => res.status(400).json("No user found"))

		             }
		             else
		             {
		             	  return res.status(400).json("No user found")
		             }

             }
             else
             {
             	   res.status(400).json("No user found")
             }
             
        })
        .catch(err => res.status(400).json("Wrong Credentials"))
  }

module.exports = {
    signinHandler : signinHandler
}