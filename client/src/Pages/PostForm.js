import React, { useEffect, useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {usePosts} from '../Context/postContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import * as Yup from 'yup'

export function PostForm() {
  const {createPost, getPost, updatePost} = usePosts()
  const navigate = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null
  })
  console.log(params)
  useEffect(()=> {
    (async () => {
        if (params.id){
          const post = await getPost(params.id)
          setPost(post)
        }
    }) ()
  }, [params.id])
  return (
    <div className='flex items-center'>
      <div className='bg-zinc-800 p-10 shadow-md shadow-black'>
        <header className = "text justify-between items-center">
          <h3 className = "text-xl">New Post</h3>
          <Link to="/" className ="text-gray text-sm hover:text-gray-300">Go Back</Link>
        </header>
      <Formik
      initialValues={post}
      validationSchema = { Yup.object ({
        title : Yup.string().required("title is required"),
        description : Yup.string().required("description is required")
      })}
      onSubmit = {async (values, actions) => {
        if (params.id){
          await updatePost(params.id, values)
        }
        else {
          await createPost(values)
        }
        actions.setSubmitting(false)
        navigate('/')
      }}
      enabledReinitialize
      >
        {({handleSubmit, setFieldValue, isSubmitting}) => (
          <Form onSubmit={handleSubmit}>
            <label 
              htmlFor='title' 
              className='text-sm block font-bold text-grey-400'>
              Title
            </label>
            <Field 
              name = "title" 
              placeholder = "Title" 
              className="px-3 py-2 focus:outline-none rounded-bggray-600 text-black w-full mb-4"
            />
            <ErrorMessage 
              component={"p"} 
              name='title' 
              className='text-red-400 text-sm' 
            />
            <label 
              htmlFor='description' 
              className='text-sm block font-bold text-grey-400'>
              Description
            </label>
            <Field 
              name = "description" 
              placeholder = "Description" 
              component= "textarea"
              className="px-3 py-2 focus:outline-none rounded-bggray-600 text-black w-full mb-4"
            />

            <ErrorMessage 
              component={'p'} 
              className='text-red-400 text-sm' 
              name='description'
            />

            <label 
              htmlFor='description' 
              className='text-sm block font-bold text-grey-400'>
              Send File
            </label>
            <input 
              type="file"
              name="image"
              className ="px-3 py-2 focus:outline-none rounded bg-gray-600 text-black w-full"
              onChange={ (e) => setFieldValue ('image', e.target.files[0])}
            >
            </input>
            <button 
              type = "submit" 
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-white focus:outline-none
              disabled:bg-indigo-400 "
              disabled={isSubmitting}>
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className='animate-spin h-5 w-5'/>
              ) : 'Save'}
            </button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  )
}
