import { Schema, model } from "mongoose"

export interface IUser {
    userAccess: string
    email: string
    login: string,
    avatar: string,
    password: string
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    userAccess: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    group: {
        type: String,
    }
})

const User = model<IUser>("User", UserSchema)

export default User
