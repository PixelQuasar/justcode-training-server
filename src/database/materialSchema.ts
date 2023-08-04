import { Schema, model } from "mongoose"

export interface IMaterial {
    name: string,
    link: string,
    description: string,
    photoURL: string,
    isDeprecated: boolean
}

const MaterialSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    photoURL: {
        type: String
    },
    isDeprecated: {
        type: Boolean,
        required: true
    }
})

const Material = model<IMaterial>("Material", MaterialSchema)

export default Material
