import Post from "../Models/Post.js"
import { uploadImage, deleteImage } from "../libs/cloudinary.js"
import fsextra from 'fs-extra'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    try {
        const {title, description} = req.body
        let image;
        if (req.files.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fsextra.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            console.log(result)
            
        }
        console.log(req.files)
        const newPost = new Post ({title, description, image})
        await newPost.save()
        return res.json(newPost)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    try {
        const updatedpost = await Post.findByIdAndUpdate({_id: req.params.id}, req.body, {new : true})
        return res.send(updatedpost)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}

export const deletePost = async (req, res) => {
    try {
        const postremoved = await Post.findByIdAndDelete(req.params.id)
        if (!postremoved) return res.sendStatus(404)
        if (postremoved.image.public_id) {
            await deleteImage(postremoved.image.public_id)
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}