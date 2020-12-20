const handleUsers = (req,res,db)=>{
	db('users')
                .select('id','name','email','entries','joined')
   			    .then(response =>  {res.json(response)})
    // res.send(database.users);
}

module.exports =
{
    handleUsers : handleUsers
}