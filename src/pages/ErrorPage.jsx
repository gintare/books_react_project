import { useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (<>
    <h1>Ups!!!</h1>
    <p>Something went wrong</p>
    <p><i>{error.statusText || error.message}</i></p>
    </>);
}