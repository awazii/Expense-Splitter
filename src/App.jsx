import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Dashboard } from './Components/dashboard/Dashboard'
import { Friends } from './Components/friends/Friends'
import { Main } from './Components/Main'
import { Newfriend } from './Components/friends/Newf'
import {Groups} from './Components/Groups/Groups'
import { Friendslist } from './Components/friends/Friendslist.JSX'
import { Grouplist } from './Components/Groups/Grouplist'
import { Newg } from './Components/Groups/Newg'
function App() {
  const router = createBrowserRouter([
    {
      element: <Main />,
      children: [
        {
          path: '/',
          element: <Dashboard />
        }
        , {
          path: '/Friends',
          element: <Friends />,
          children: [
            {
              path: '', 
              element: <Friendslist />
            },

            {
              path: 'Addfriend',
              element: <Newfriend />
            }
          ]
        },
        {
          path:'/Groups',
          element:<Groups/>,
          children:[
            {
              path:'',
              element:<Grouplist/>
            },
            {
              path:"AddGroup",
              element:<Newg/>
            }
          ]
        }
      ]
    }

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
