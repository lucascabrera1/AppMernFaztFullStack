import {usePosts} from '../Context/postContext'
import { useEffect } from 'react'

export function Home() {
  const {getPosts, posts} = usePosts()
  useEffect ( () => {
    getPosts()
  }, [])
  return (
    <div>Home
    </div>
  )
}

