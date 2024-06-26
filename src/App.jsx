import { useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BooksMenu from './pages/BooksMenu';
import BookList from './pages/BookList';
import ErrorPage from './pages/ErrorPage';
import CreateBook from './pages/CreateBook';
import { getAllBooks, getOneCategory } from './services/get';
import CreateBookCategory from './pages/CreateBookCategory';
import { getOneBook } from './services/get';
import LoginForm from './pages/LoginForm';
import { getDefaultToken } from './services/service';
import Logout from './pages/Logout';

export const UserContext = createContext();

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
      {
        path:"/authenticate",
        element: <LoginForm />
      },
      {
        path:"/editcat/:id",
        element: <CreateBookCategory />,
        loader: ({params}) => getOneCategory(params.id)
      },
      {
        path:"/logout",
        element: <Logout />
      },
    ]

  }
]);

function App() {
    const [userToken, setUserToken] = useState(getDefaultToken());
  return (
    
    <>
    <UserContext.Provider value={{ userToken, setUserToken }}>
    <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
    </UserContext.Provider>
    </>
  )
}

export default App
