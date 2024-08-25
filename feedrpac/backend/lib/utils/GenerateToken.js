import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
         expiresIn: '15d' 
        });
    

    res.cookie("jwt_token", token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true, // Prevent XSS attacks
        sameSite: 'strict', // prevent CSRF attacks
        secure: process.env.NODE_ENV !== 'development'
    })
}