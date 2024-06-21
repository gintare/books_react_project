import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BooksMenu from './pages/BooksMenu';
import BookList from './pages/BookList';
import ErrorPage from './pages/ErrorPage';
import CreateBook from './pages/CreateBook';
import { getAllBooks } from './services/get';
import CreateBookCategory from './pages/CreateBookCategory';
import { getOneBook } from './services/get';

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BooksMenu/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path:"/",
          element: <BookList />,
          loader: () => getAllBooks(),
        },
        {
          path:"/home",
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
        },
        {
          path:"/editBook/:id",
          element: <CreateBook />,
          loader: ({params}) => getOneBook(params.id)
        },
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
