import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import Search from "./components/Search/Search";
import Seccion from "./components/Seccion/Seccion";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <h1>UdeSA Movies</h1>
        <Navbar/>
        <Search/>
        <Seccion/>
        <Footer/>
      </div>
      </React.Fragment>
  );
}

export default App;
