import { Schema, model } from "mongoose"


export interface IPost {
    authorId: string
    title: string
    content: string
    photosUrl: string[]
    likes: number
    views: number
}

const PostSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        index: true
    },
    photosUrl: Array<String>,
    likes: Number,
    views: Number
}, {
    timestamps: true
})

const Post = model<IPost>("Post", PostSchema)

export default Post