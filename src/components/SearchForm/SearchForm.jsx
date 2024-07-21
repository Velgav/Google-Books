import { useState } from "react";
import styles from "./SearchForm.module.scss";

const SearchForm = ({onSearch , onClearSearch}) => {

  const [query, setQuery] =useState('');
  const clearSearch = () => {
    setQuery("");
    onClearSearch();
  }

 
  return (
    <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
        required
      />
      <button onClick={clearSearch}>X</button>
      <button type="submit" onClick={() => onSearch(query)}>
        Search
      </button>
    </form>
  );
}

export default SearchForm;