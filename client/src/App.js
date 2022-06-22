import {PostForm, Home, NotFound } from "./Pages";
import {Routes, Route} from 'react-router-dom'
import {PostProvider} from "./Context/postContext.js";
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto bg-red-100">
        <PostProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/new" element={<PostForm/>}/>
            <Route path="/posts/:id" element={<PostForm/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <Toaster/>
        </PostProvider>
      </div>
    </div>
  );
}

export default App;