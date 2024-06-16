
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './layout/Main'
import {Auth, Create, Detail, Edit, Error, Posts} from './pages/index'
import { loader as postsLoader} from './pages/Posts'
import { action as deleteAction, loader as postDetailLoader} from './pages/Detail'
import { action as createPostAction} from './components/PostForm'
import { action as editPostAction} from './components/PostForm'
import { action as authAction} from './pages/Auth'
import { loader as logoutLoader} from './pages/Logout'
import { checkTokenLoader, tokenLoader } from './util/auth'

function App() {
  const router = createBrowserRouter([
    {
      path:'',
      element: <Main/>,
      errorElement: <Error/>,
      loader : tokenLoader,
      id : 'root',
      children: [
        {
          index : true,
          element : <Posts/>,
          loader : postsLoader
        },
        {
          path : '/create-post',
          element : <Create/>,
          action : createPostAction,
          loader : checkTokenLoader
        },
        {
          path : ':id',
          id : 'post-detail',
          loader : postDetailLoader,
          children : [
            {
              index : true,
              element : <Detail/>,
              action : deleteAction
            },
            {
              path : 'edit-post/',
              element : <Edit/>,
              action : editPostAction,
              loader : checkTokenLoader
            }
          ]
        },
        {
          path : '/auth',
          element : <Auth/>,
          action : authAction
        },
        {
          path : '/logout',
          loader : logoutLoader
        },
      ]
    }
  ])
  return (
    
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
