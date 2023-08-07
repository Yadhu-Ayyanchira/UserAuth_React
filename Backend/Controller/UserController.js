const UserModel = require('../Model/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserReg = async (req,res) => {
    try {
        console.log('in useReg');
        const { name, email, password, mob } = req.body;
        const exists = await UserModel.findOne({email:email})
        if (exists) {
          console.log("email already exists");
          return res.status(200).json({ alert: "Email already Exists", status: false });
        }else{
            const hash = await bcrypt.hash(password,10)
            const newuser = await UserModel.create({name:name,email:email,password:hash,mob:mob,is_admin:false})
            const token = jwt.sign({userId:newuser._id},process.env.JWTKEY,{expiresIn: '1min'});
            return res.status(200).json({token:token,user:newuser,alert:'Registerd',status:true})
        }
    } catch (error) {
         console.log(error);
         res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports={
    UserReg
}