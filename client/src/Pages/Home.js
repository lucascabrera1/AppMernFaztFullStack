import {usePosts} from '../Context/postContext'
import {VscEmptyWindow} from 'react-icons/vsc'
import {Link} from 'react-router-dom'
import {PostCard} from '../Components/PostCard'

export function Home() {
  const {posts} = usePosts()

  if (posts.length === 0) return (
    <div>
      <VscEmptyWindow className='flex flex-col justify-center items-center'/>
      <h1>There aren't posts</h1>
      <Link to = '/new' color='blue'>create a new post</Link>
    </div>
  )
  
  return (
    <div className= 'text-white'>
      <header className='flex justify-between py-4'>
        <h1 className='text-2xl text-gray-300'>Posts ({posts.length})</h1>
        <Link to = '/new' className='px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white'>create a new post</Link>
      </header>
      <div className='grid grid-cols-3 gap-2'>
        {posts.map(post => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  )
}

