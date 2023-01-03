import React from "react";

import styles from "./styles.module.scss";

export const SearchBar = ({
  posts,
  setSearchResults,
  setValor,
  readData,
  resetLerTodos,
}) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = async (e) => {
    resetLerTodos();
    // posts = original data
    console.log("e.target.value");
    console.log(e.target.value.length);
    if (e.target.value.length < 1) {
      setValor(false);

      return setSearchResults([]);
    }
    const resultsArray = posts.filter((post) =>
      post.email.includes(e.target.value.toLowerCase())
    );
    setValor(true);
    setSearchResults(resultsArray);
    readData();
  };

  return (
    <div className={styles.searchBar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          id="search"
          onChange={handleSearchChange}
          placeholder="Procurar e-mail"
        />
      </form>
    </div>
  );
};
