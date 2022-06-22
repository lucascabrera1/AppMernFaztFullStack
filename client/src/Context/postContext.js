import { useState, useContext, createContext, useEffect } from "react"
import {getPostsRequests,
     createPostRequest, 
     deletePostRequest, 
     getPostRequest, 
     updatePostRequest
    } from '../api/posts'

const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext)
    return context
}

export const PostProvider = ({children}) => {

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const res = await getPostsRequests()
        console.log(res)
        setPosts(res.data)
    }

    const createPost = async (post) => {
        try {
            const res = await createPostRequest(post)
            console.log(res.data)
            setPosts([...posts, res.data])
        } catch (error) {
            console.error(error)
        }
        
    }

    const deletePost = async (id) => {
        const res = await deletePostRequest(id)
        if (res.status === 204){
            setPosts(posts.filter((post) => post._id !== id))
        }
    }

    const getPost = async (id) => {
        const res = await getPostRequest(id)
        console.log(res)
        return res.data
    }

    const updatePost = async (id, post ) => {
        const res = await updatePostRequest(id, post)
        setPosts (posts.map( post => post._id === id ? res.data: post))
    }

    useEffect ( () => {
        getPosts()
      }, [])

    return <postContext.Provider value={{
        posts, 
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost
    }}>
        {children}
    </postContext.Provider>
}