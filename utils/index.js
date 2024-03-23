import  Jwt  from "jsonwebtoken"

const generatetoken=(user)=>Jwt.sign({id:user.id} ,process.env.SERCERT_KEY,{expiresIn:"60m"})

export default generatetoken