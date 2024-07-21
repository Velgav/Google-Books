import { useState } from "react"
import Header from "./components/Header/Header" 
import SearchForm from "./components/SearchForm/SearchForm"
import { fetchBooks } from "./services/booksApi";
import BookContainer from "./container/BookContainer";
import Modal from "./components/Modal/Modal";



const App = () => {
  const [ books,setBooks ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ selectedBook, setSelectedBook ] = useState(null);


  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setBooks([])
    try {
      const data = await fetchBooks(searchQuery);
      console.log(data);
      if (data.totalItems === 0) {
        throw new Error(`No books found for this ${searchQuery} search`);
      }
      setBooks(data.items || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setBooks([]);
  }

  const handleBookClick =(book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div>
      <Header/>
      <SearchForm onSearch={handleSearch} onClearSearch={clearSearch}/>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <BookContainer books={books} onBookClick={handleBookClick}/>
      <Modal show={selectedBook !== null} onClose={handleCloseModal} book={selectedBook}/>
    </div>
  )
}

export default App