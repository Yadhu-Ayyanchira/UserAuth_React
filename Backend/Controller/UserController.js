const UserModel = require('../Model/userModels');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { response } = require('express');
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

const UserLogin = async (req,res) =>{
    try {
        console.log('inside user login controller');
        const {email,password} = req.body
        const exists = await UserModel.findOne({email:email})
        if(exists){
            const access =await bcrypt.compare(password,exists.password)
            if(access){
                const token = jwt.sign({ userId: access._id },process.env.JWTKEY,{expiresIn: "1min"})
                return res.status(200).json({user:exists,token:token,message:"login",status:true})
            }else{
                return res.status(201).json({ alert: "Password is wrong", status: false });
            }
        }else{
            return res.status(201).json({ alert: "No Account in this Email", status: false });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateImage = async (req, res) => {
  console.log("in up img");
  try {
    const id = req.body.userId;
    const image = req.file.filename;
    const updateImg = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { image: image } },
      { new: true }
    ); // Removed .then and the unnecessary response parameter

    // Sending response after the update
    res.json({ updated: true, data: updateImg });
  } catch (error) {
    console.log(error);
  }
};

module.exports={
    UserReg,
    UserLogin,
    updateImage
}