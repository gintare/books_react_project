import { useLoaderData, useNavigation } from "react-router-dom";
import MediaCard from "../components/MediaCard";
import { useEffect, useState } from "react";
import { getAllBooks } from "../services/get";

export default function BookList() {
  const [deleteBook, setDeleteBook] = useState(null);
  let [books, setBooks] = useState(useLoaderData());
  
  const navigation = useNavigation();

  if (navigation.state == "loading") {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    //console.log("upadte page");
    const useEffectHandler = async () => {
      //console.log("upadte page 1");
      const bookslist = await getAllBooks();
      setBooks(bookslist);
    };
    useEffectHandler();
  }, [deleteBook]);

  return (
    <>
      <h1>Books List</h1>
      <div className="book-content">
        {books.map((book) => {
          return (
            <div key={book.id} className="book-content-item">
              <MediaCard book={book} setDeleteBook={setDeleteBook} />
            </div>
          );
        })}
      </div>
    </>
  );
}
