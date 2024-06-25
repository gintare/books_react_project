import { useLoaderData, useNavigation } from "react-router-dom";
import MediaCard from "../components/MediaCard";


export default function BookList() {
  const books = useLoaderData();
  const navigation = useNavigation();


  if (navigation.state == "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Books List</h1>
      <div className="book-content">
        {books.map((book) => {
          return (
            <div key={book.id} className="book-content-item">
              <MediaCard book={book} />
            </div>
          );
        })}
      </div>
    </>
  );
}
