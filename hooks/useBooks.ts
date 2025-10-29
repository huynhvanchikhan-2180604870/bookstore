import { useState, useEffect } from "react";
import { bookService } from "@/src/services/bookService";

export const useBooks = (params?: any) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookService.getAll(params);
        setBooks(data.books);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [params]);

  return { books, loading, error };
};
