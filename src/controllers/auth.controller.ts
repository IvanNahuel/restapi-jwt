import { Request, Response } from 'express'
import User, { IUser } from '../models/User'
import jwt from 'jsonwebtoken'

export const signup = async(req: Request, res: Response) => {
    //guardando un nuevo usuario
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    //encriptamos la contraseña
    user.password = await user.encryptPassword(user.password)

    //creando un token
    const savedUser = await user.save()

    //Creacion del token
    const token:string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'TOKEN')

    res.header('auth-token', token).json(savedUser)
}

export const signin = async(req: Request, res: Response) => {
    //busco el correo en mi base de datos 
    const user = await User.findOne({email: req.body.email})    
    if(!user){
        return res
        .status(400)
        .json('El email ingresado no existe')
    }
    const correctPassword: boolean = await user.validatePassword(req.body.password)
    if(!correctPassword){
        return res
        .status(400)
        .json('La contraseña ingresada no es valida')
    }

    const token:string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'TOKEN', {
        expiresIn: 60 * 60 * 24
    })

    res.header('auth-token',token).json(user)
}

export const profile = async(req: Request, res: Response) => {
    const user = await User.findById(req.userId, {password: 0})

    if(!user) 
        return res.status(404).json('No user found')

    res.send(user)
}