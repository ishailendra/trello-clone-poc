import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./component/navbar/Navbar";
import TodoBlock from "./component/todoblock/TodoBlock";


const App: React.FC<{}> = () => {
  

  

  setTimeout(() => {
    document.querySelector(".preload")?.classList.remove("preload");
  }, 500);

  
  return (
    <Fragment>
      <Navbar />
      <TodoBlock />
    </Fragment>
  );
};

export default App;
