import {usePosts} from '../Context/postContext'

export function NotFound() {
  const myContext = usePosts()
  console.log(myContext)
  return (
    <div>Not Found</div>
  )
}