import { Schema, model } from "mongoose"


export interface IPost {
    authorId: string
    title: string
    content: string
    photosUrl: string[]
    likes: number
    views: number
}

const MaterialSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    content: String,
    photosUrl: Array<String>,
    likes: Number,
    views: Number
}, {
    timestamps: true
})

const Material = model<IPost>("Material", MaterialSchema)

export default Material
