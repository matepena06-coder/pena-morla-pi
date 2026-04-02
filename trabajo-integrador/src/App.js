import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import Search from "./components/Search/Search";
import Seccion from "./components/Seccion/Seccion";
import NotFoundMessage from "./components/Not-found-message/Not-found-message";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <Navbar/>
        <Search/>
        <NotFoundMessage/>
        <Footer/>
      </div>
      </React.Fragment>
  );
}

export default App;
