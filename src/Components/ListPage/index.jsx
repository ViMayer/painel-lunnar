import React from "react";
import Post from "../Post";
import { Fragment, useState, useEffect } from "react";

export const ListPage = ({ searchResults, readData, resetLerTodos }) => {
  const [teste, setTeste] = useState();
  console.log("searchResults");
  console.log(searchResults);
  // console.log("teste");
  // console.log(teste);
  // useState(() => {
  //   // alert("x");
  //   readData();
  // }, []);
  const results = searchResults.map((post) => (
    <Post
      key={post.id}
      post={post}
      readData={readData}
      resetLerTodos={resetLerTodos}
    />
  ));
  const content = results?.length ? results : <h1>Nada encontrado! :(</h1>;
  return (
    <main>
      <h1>{content}</h1>
    </main>
  );
};
