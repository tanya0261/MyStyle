import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";


export const registration = async (req,res)=> {
try {
    console.log("BODY:", req.body);

    const {name , email , password} = req.body;

    console.log("NAME:", name);
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const existUser = await User.findOne({email});

    console.log("EXIST USER:", existUser);

    if(existUser){
        return res.status(400).json({message:"User already exist"});
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message:"Enter valid Email"});
    }

    if(password.length < 8){
        return res.status(400).json({message:"Enter Strong Password"});
    }

    // rest of code...
    let hashPassword = await bcrypt.hash(password,10)

    const user = await User.create({name,email,password:hashPassword})

    let token = await genToken(user._id)
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"Strict",
        maxAge: 7* 24 * 60 * 60 * 1000
    })
    return res.status(201).json(user)
    } catch (error) {
      console.log("registration error")
      return res.status(500).json({message: `registration error ${error}`})
    }
}


  export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36);

      const hashedPassword = await bcrypt.hash(
        randomPassword,
        10
      );

      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: `googleLogin error ${error}`,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `login error ${error}`,
    });
  }
};

export const logOut = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout Successful",
  });
};

export const adminLogin = async (req,res)=>{
  try {
    let {email , password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = await genToken1(email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(token);

    }

    return res.status(400).json({message:"Invalid Credentials"})

  } catch (error) {
    console.log("AdminLogin error");
     return res.status(500).json({
      message: `AdminLogin error ${error}`,
    });
  }
}