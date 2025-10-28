import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Dashboard } from './Components/dashboard/Dashboard'
import { Friends } from './Components/friends/Friends'
import { Main } from './Components/Main'
import { Newfriend } from './Components/friends/New'
import { Friendslist } from './Components/friends/Friendslist.JSX'
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
          path: '/friends',
          element: <Friends />,
          children: [
            {
              path: '', 
              element: <Friendslist />
            },

            {
              path: 'add',
              element: <Newfriend />
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
