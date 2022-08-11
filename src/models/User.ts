import {Schema, model, Document} from 'mongoose'
import bcrypt, { compare } from 'bcryptjs'

export interface IUser extends Document{
    userName: string,
    email: string,
    password: string,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password:string): Promise<boolean>
}

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

//Promise<string> este estring esta retornando a traves de una promesa
userSchema.methods.encryptPassword = async(password:string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password:string): Promise<boolean>{
    return bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema)