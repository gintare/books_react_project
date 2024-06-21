import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from './pages/Menu';
import BookList from './pages/BookList';
import ErrorPage from './pages/ErrorPage';
import CreateBook from './pages/CreateBook';
import { getAllBooks } from './services/get';
import CreateBookCategory from './pages/CreateBookCategory';

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Menu/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path:"/",
          element: <BookList />,
          loader: () => getAllBooks(),
        },
        {
          path:"/createBook",
          element: <CreateBook />
        },
        {
          path:"/createBookCategory",
          element: <CreateBookCategory />
        }
      ]

    }
  ]);

  return (
    <>
    <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
    </>
  )
}

export default App
