import axios from 'axios'

export const getPostsRequests = async () => await axios.get('/posts')
export const createPostRequest = async (post) => {
    const form = new FormData()
    /* {
        title: "title tiene un string"
        description: "description tiene un string"
        image: File
    } */
    for(let key in post) {
        form.append(key, post[key])
    }
    return await axios.post('/posts', form, {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    })
}
export const deletePostRequest = async (id) => await axios.delete('/posts/' + id)
export const getPostRequest = async (id) => await axios.get('/posts/' + id)
export const updatePostRequest = async (id, newFields) => await axios.put(`/posts/${id}`, newFields)