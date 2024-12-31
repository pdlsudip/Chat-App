import jwt from 'jsonwebtoken'
import { Response } from 'express'
const generateJwtAndSetCookie = async(userId:string, res:Response) =>{
    const token = jwt.sign({userId}, process.env.SECRET_KEY as string,{
        expiresIn: "15d"
    }
    )
    res.cookie("token", token,{
        maxAge: 15*24*3600*1000,
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateJwtAndSetCookie