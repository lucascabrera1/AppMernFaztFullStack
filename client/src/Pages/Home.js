import {usePosts} from '../Context/postContext'
import {Link} from 'react-router-dom'

export function Home() {
  const {setPosts} = usePosts()
  return (
    <div>Home
    </div>
  )
}

