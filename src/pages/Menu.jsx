import { NavLink, Outlet } from "react-router-dom"


export default function Menu(){
    return (<>
    <p><NavLink to={`/`}>Home</NavLink></p>
    <p><NavLink to = {`/createBook`}>Create Book</NavLink></p>
    <p><NavLink to = {`/createBookCategory`}>Create Book Category</NavLink></p>
    <div><Outlet/></div>
    </>)
}