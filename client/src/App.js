import {PostForm, Home, NotFound } from "./Pages";
import {Routes, Router, Route} from 'react-router-dom'
import {PostProvider} from "./Context/postContext.js";


function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto bg-red-100">
        <PostProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/new" element={<PostForm/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </PostProvider>
      </div>
    </div>
  );
}

export default App;